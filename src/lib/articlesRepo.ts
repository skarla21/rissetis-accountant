// Git-backed storage for the article URL list. The file lives in the repo and is
// the single source of truth: the public site reads the build-bundled copy
// (imported directly in ArticlesSection), while admin writes commit to it through
// the GitHub Contents API and then fire a Vercel Deploy Hook so the public site is
// rebuilt with the new list (a commit made via the API does not reliably trigger
// Vercel's own git-push build).

const OWNER = "skarla21";
const REPO = "rissetis-accountant";
const BRANCH = "main";
// Keep in sync with the bundled import path (@/data/articles.json) the site reads.
const FILE_PATH = "src/data/articles.json";

const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("Missing env.GITHUB_TOKEN");
  }
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/**
 * Read the current URL list straight from GitHub, along with the file's blob `sha`
 * (required to write it back). Reflects the latest committed state, so the admin UI
 * sees its own edits immediately (before the redeploy lands).
 */
export async function readArticlesFromGitHub(): Promise<{
  urls: string[];
  sha: string;
}> {
  const response = await fetch(`${API_BASE}?ref=${BRANCH}`, {
    headers: githubHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `GitHub read failed: ${response.status} ${await response.text()}`
    );
  }

  const data = (await response.json()) as { content: string; sha: string };
  const decoded = Buffer.from(data.content, "base64").toString("utf-8");
  const urls = JSON.parse(decoded) as string[];
  return { urls, sha: data.sha };
}

/**
 * Conflict-safe read-modify-write of the URL list. `mutate` receives the current
 * list and returns the desired one (it must not mutate the argument in place); it
 * is re-run against a fresh read on every attempt, so a concurrent edit is never
 * clobbered (no lost update). If the result
 * is unchanged — adding a URL that already exists, or removing one that is absent —
 * no commit is made. A 409 means the `sha` went stale because of a concurrent edit;
 * we re-read and re-apply `mutate`, up to MAX_ATTEMPTS times.
 */
export async function commitArticles(
  mutate: (urls: string[]) => string[],
  message: string
): Promise<void> {
  const MAX_ATTEMPTS = 3;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const { urls, sha } = await readArticlesFromGitHub();
    const next = mutate(urls);

    // Desired state already matches the repo — nothing to commit.
    if (JSON.stringify(next) === JSON.stringify(urls)) {
      return;
    }

    const content = Buffer.from(
      JSON.stringify(next, null, 2) + "\n",
      "utf-8"
    ).toString("base64");

    const response = await fetch(API_BASE, {
      method: "PUT",
      headers: githubHeaders(),
      body: JSON.stringify({ message, content, sha, branch: BRANCH }),
    });

    if (response.ok) {
      await triggerDeploy();
      return;
    }

    // Stale sha (concurrent edit): loop to re-read and re-apply `mutate` against
    // the fresh list. Give up only once the retries are exhausted.
    if (response.status === 409 && attempt < MAX_ATTEMPTS) {
      continue;
    }

    throw new Error(
      `GitHub write failed: ${response.status} ${await response.text()}`
    );
  }
}

/**
 * Best-effort trigger of a Vercel production rebuild after a commit, so the public
 * site (which serves the build-bundled copy of the list) picks up the change.
 * A commit made through the GitHub API does not reliably fire Vercel's git-push
 * build, so we POST to a Deploy Hook explicitly. No-op if the hook is not
 * configured (e.g. local dev); never throws — the commit has already succeeded, so
 * a failed rebuild trigger must not turn a successful save into an error.
 */
async function triggerDeploy(): Promise<void> {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) {
    console.warn("VERCEL_DEPLOY_HOOK_URL not set; skipping deploy trigger.");
    return;
  }
  try {
    const res = await fetch(hook, { method: "POST" });
    if (!res.ok) {
      console.error(`Deploy hook returned ${res.status}`);
    }
  } catch (err) {
    console.error("Failed to trigger Vercel deploy hook:", err);
  }
}

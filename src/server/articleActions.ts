"use server";

import { readArticlesFromGitHub, commitArticles } from "@/lib/articlesRepo";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

/**
 * Admin read path: reads live from GitHub so the admin UI reflects its own edits
 * immediately (the build-bundled copy the public site serves stays stale on the
 * running deployment until the commit-triggered redeploy finishes). Admin is
 * low-traffic, so the API call is fine here. Errors propagate to the caller so a
 * misconfigured token surfaces as a load error instead of an empty list.
 */
export async function getAdminArticleUrls(): Promise<string[]> {
  const { urls } = await readArticlesFromGitHub();
  return urls;
}

export async function addArticleUrl(
  url: string,
  password: string,
  invalidPasswordMsg: string,
  successMsg: string,
  errorMsg: string
): Promise<{ success: boolean; message: string }> {
  if (password !== ADMIN_PASSWORD) {
    return { success: false, message: invalidPasswordMsg };
  }

  try {
    await commitArticles(
      (urls) => (urls.includes(url) ? urls : [...urls, url]),
      `Add article: ${url}`
    );
    return { success: true, message: successMsg };
  } catch (error) {
    console.error("Error adding URL:", error);
    return { success: false, message: errorMsg };
  }
}

export async function removeArticleUrl(
  url: string,
  password: string,
  invalidPasswordMsg: string,
  successMsg: string,
  errorMsg: string
): Promise<{ success: boolean; message: string }> {
  if (password !== ADMIN_PASSWORD) {
    return { success: false, message: invalidPasswordMsg };
  }

  try {
    await commitArticles(
      (urls) => urls.filter((u) => u !== url),
      `Remove article: ${url}`
    );
    return { success: true, message: successMsg };
  } catch (error) {
    console.error("Error removing URL:", error);
    return { success: false, message: errorMsg };
  }
}

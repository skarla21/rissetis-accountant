import { isAllowedArticleUrl } from "@/lib/articleUrl";
import { getCurrentDate } from "@/lib/utils";
import type { ArticleMetadata } from "@/types/articles";

const FETCH_TIMEOUT_MS = 8_000;

function fallbackMetadata(alt: string): ArticleMetadata {
  return {
    title: alt,
    imageUrl: "/assets/imgs/tax-article-placeholder.jpg",
    date: getCurrentDate(),
  };
}

export function parseMetadataFromHtml(html: string, alt: string): ArticleMetadata {
  const titleMatch =
    html.match(/<title>(.*?)<\/title>/i) ||
    html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i);
  const title = titleMatch ? titleMatch[1] : alt;

  const imageMatch = html.match(
    /<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i
  );
  const imageUrl = imageMatch
    ? imageMatch[1]
    : "/assets/imgs/tax-article-placeholder.jpg";

  const descriptionMatch = html.match(
    /<meta\s+name=["']description["']\s+content=["'].*?\[(.*?)\]/i
  );
  const date = descriptionMatch ? descriptionMatch[1] : getCurrentDate();

  return { title, imageUrl, date };
}

export async function fetchArticleMetadata(
  url: string,
  alt: string
): Promise<ArticleMetadata> {
  if (!isAllowedArticleUrl(url)) {
    console.error("Blocked article metadata fetch for disallowed URL:", url);
    return fallbackMetadata(alt);
  }

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }

    const html = await response.text();
    return parseMetadataFromHtml(html, alt);
  } catch (error: unknown) {
    console.error("Error fetching article metadata:", error);
    return fallbackMetadata(alt);
  }
}

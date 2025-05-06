import { getCurrentDate } from "@/lib/utils";
import { ArticleMetadata } from "@/types/articles";

export async function getArticleMetadata(
  url: string,
  alt: string
): Promise<ArticleMetadata> {
  try {
    const apiUrl = new URL("/api/metadata", window.location.origin);
    apiUrl.searchParams.append("url", url);
    apiUrl.searchParams.append("alt", alt);

    const response = await fetch(apiUrl.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: alt,
      imageUrl: "/assets/imgs/tax-article-placeholder.jpg",
      date: getCurrentDate(),
    };
  }
}

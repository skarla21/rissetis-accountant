"use server";

import { getCurrentDate } from "@/lib/utils";

interface ArticleMetadata {
  title: string;
  imageUrl: string;
  date: string;
}

export async function getArticleMetadata(
  url: string,
  alt: string
): Promise<ArticleMetadata> {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Extract title from OpenGraph or meta title
    const titleMatch =
      html.match(/<title>(.*?)<\/title>/) ||
      html.match(/<meta property="og:title" content="(.*?)"/);
    const title = titleMatch ? titleMatch[1] : alt;

    // Extract image from OpenGraph image
    const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/);
    const imageUrl = imageMatch
      ? imageMatch[1]
      : "/assets/imgs/tax-article-placeholder.jpg";

    // Extract date from description meta tag
    const descriptionMatch = html.match(
      /<meta name="description" content=".*?\[(.*?)\]/
    );
    const date = descriptionMatch ? descriptionMatch[1] : getCurrentDate();

    return { title, imageUrl, date };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: alt,
      imageUrl: "/assets/imgs/tax-article-placeholder.jpg",
      date: getCurrentDate(),
    };
  }
}

"use server";

import { getCurrentDate } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { ArticleMetadata, TaxArticle } from "@/types/articles";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function getArticleMetadata(
  url: string,
  alt: string
): Promise<ArticleMetadata> {
  const controller = new AbortController();
  try {
    const response = await fetch(url, { signal: controller.signal });
    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let html = "";
    let headEnded = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      html += decoder.decode(value, { stream: true });

      // Stop reading when </head> is found
      if (html.includes("</head>")) {
        headEnded = true;
        controller.abort(); // Cancel ongoing fetch
        break;
      }
    }

    if (!headEnded) html += decoder.decode(); // Flush remaining

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
  } catch (error: unknown) {
    if ((error as Error).name === "AbortError") console.log("Fetch aborted");
    console.error("Error fetching metadata:", error);
    return {
      title: alt,
      imageUrl: "/assets/imgs/tax-article-placeholder.jpg",
      date: getCurrentDate(),
    };
  }
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
    const { error } = await supabase
      .from("articles")
      .insert([{ url }])
      .select();

    if (error) throw error;
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
    const { error } = await supabase.from("articles").delete().eq("url", url);

    if (error) throw error;
    return { success: true, message: successMsg };
  } catch (error) {
    console.error("Error removing URL:", error);
    return { success: false, message: errorMsg };
  }
}

export async function getAllArticleUrls(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from("articles").select("url");

    if (error) throw error;
    return (data as TaxArticle[]).map((item) => item.url);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return [];
  }
}

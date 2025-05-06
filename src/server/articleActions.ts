"use server";

import { supabase } from "@/lib/supabase";
import { TaxArticle } from "@/types/articles";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

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

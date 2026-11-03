import { getTranslations } from "next-intl/server";
import HomePage from "@/components/HomePage";
import { loadArticlesWithMetadata } from "@/lib/loadArticles";

export const revalidate = 86400;

export default async function Home() {
  const t = await getTranslations("articles");
  const articles = await loadArticlesWithMetadata(t("altTitle"));

  return <HomePage articles={articles} />;
}

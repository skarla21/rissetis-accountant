import { getTranslations, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { loadArticlesWithMetadata } from "@/lib/loadArticles";
import { buildJsonLd, type FaqItem } from "@/lib/jsonLd";
import { type AppLocale } from "@/lib/seo";

export const revalidate = 86400;

function isAppLocale(locale: string): locale is AppLocale {
  return locale === "el" || locale === "en";
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isAppLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale;

  const t = await getTranslations("articles");
  const articles = await loadArticlesWithMetadata(t("altTitle"));
  const messages = await getMessages();
  const faq = messages.faq as { items?: FaqItem[] } | undefined;
  const faqItems = faq?.items ?? [];
  const jsonLd = buildJsonLd(locale, faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage articles={articles} />
    </>
  );
}

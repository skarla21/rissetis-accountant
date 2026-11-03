import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_URL, type AppLocale } from "@/lib/seo";

function isAppLocale(locale: string): locale is AppLocale {
  return locale === "el" || locale === "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isAppLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale;
  const t = await getTranslations({ locale, namespace: "terms" });
  const canonicalPath = `/${locale}/terms`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        el: `${SITE_URL}/el/terms`,
        en: `${SITE_URL}/en/terms`,
        "x-default": `${SITE_URL}/el/terms`,
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isAppLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <LegalPage
      namespace="terms"
      relatedHref="/privacy"
      relatedLabelKey="relatedPrivacy"
    />
  );
}

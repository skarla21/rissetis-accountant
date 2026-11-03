"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalPageProps = {
  namespace: "terms" | "privacy";
  relatedHref: "/terms" | "/privacy";
  relatedLabelKey: "relatedPrivacy" | "relatedTerms";
};

export default function LegalPage({
  namespace,
  relatedHref,
  relatedLabelKey,
}: LegalPageProps) {
  const t = useTranslations(namespace);
  const sections = t.raw("sections") as LegalSection[];

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-10 md:py-14 max-w-3xl pb-24 md:pb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-500 mb-10">{t("lastUpdated")}</p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {section.title}
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.title}-${index}`} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-600">
          <Link
            href={relatedHref}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {t(relatedLabelKey)}
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}

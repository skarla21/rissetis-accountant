"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import { articleDateToIso } from "@/lib/articleUrl";
import type { ArticleMetadata, TaxArticle } from "@/types/articles";

type ArticleCard = TaxArticle & ArticleMetadata;

export default function ArticlesSection({
  articles,
}: {
  articles: ArticleCard[];
}) {
  const t = useTranslations("articles");

  return (
    <SectionWrapper id="articles" bgColor="gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>
        {articles.length === 0 ? (
          <p className="text-center text-gray-500 py-8">{t("empty")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.url}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.imageUrl}
                      alt={article.title || t("altTitle")}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      quality={75}
                      priority={index < 3}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {article.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <time
                        className="text-sm text-gray-500"
                        dateTime={articleDateToIso(article.date)}
                      >
                        {article.date}
                      </time>
                      <span className="text-blue-600 hover:text-blue-800 transition-colors">
                        {t("readMore")} →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import { useEffect, useState } from "react";
import { getArticleMetadata } from "@/server/articleActions";

interface TaxArticle {
  url: string;
}

interface ArticleMetadata {
  title: string;
  imageUrl: string;
  date: string;
}

export default function ArticlesSection() {
  const t = useTranslations("articles");
  const [articles, setArticles] = useState<(TaxArticle & ArticleMetadata)[]>(
    []
  );

  // This would come from your database/API
  const taxArticles: TaxArticle[] = [
    {
      url: "https://www.taxheaven.gr/news/70551/paratash-gia-th-dhlwsh-kaoarismoy-oikopedwn-ews-15-ioynioy",
    },
    {
      url: "https://www.taxheaven.gr/news/70556/katargoyntai-ws-dikaiologhtika-sto-dhmosio-ta-pistopoihtika-gennhshs-kai-oikogeneiakhs-katastashs",
    },
    {
      url: "https://www.taxheaven.gr/news/70540/ta-krithria-gia-thn-epistrofh-enoikioy-pws-oa-efarmostoyn-ta-nea-metra",
    },
    {
      url: "https://www.taxheaven.gr/news/70541/aade-thn-paraskeyh-25-aprilioy-h-aytomath-ypobolh-twn-prosymplhrwmenwn-dhlwsewn",
    },
    // More articles would be added dynamically
  ];

  useEffect(() => {
    const fetchMetadata = async () => {
      const articlesWithMetadata = await Promise.all(
        taxArticles.map(async (article) => {
          const metadata = await getArticleMetadata(article.url, t("altTitle"));
          return { ...article, ...metadata };
        })
      );
      setArticles(articlesWithMetadata);
    };

    fetchMetadata();
  }, []);

  return (
    <SectionWrapper id="articles" bgColor="gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
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
                    alt={t("altTitle")}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {article.date}
                    </span>
                    <span className="text-blue-600 hover:text-blue-800 transition-colors">
                      {t("readMore")} →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

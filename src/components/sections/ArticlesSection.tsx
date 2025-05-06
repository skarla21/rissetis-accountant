"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import { useEffect, useState } from "react";
import { getAllArticleUrls } from "@/server/articleActions";
import { getArticleMetadata } from "@/lib/metadata";
import { ArticleMetadata, TaxArticle } from "@/types/articles";

export default function ArticlesSection() {
  const t = useTranslations("articles");
  const [articles, setArticles] = useState<(TaxArticle & ArticleMetadata)[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        // Get all URLs from Supabase
        const urls = await getAllArticleUrls();

        // Create an array of promises for metadata fetching

        const metadataPromises = urls.map((url) =>
          getArticleMetadata(url, t("altTitle"))
        );

        // Wait for all metadata to be fetched in parallel
        const metadataResults = await Promise.all(metadataPromises);

        // Combine URLs with their metadata
        const articlesWithMetadata = urls.map((url, index) => ({
          url,
          ...metadataResults[index],
        }));

        setArticles(articlesWithMetadata);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <SectionWrapper id="articles" bgColor="gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
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
                      quality={75}
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
        )}
      </div>
    </SectionWrapper>
  );
}

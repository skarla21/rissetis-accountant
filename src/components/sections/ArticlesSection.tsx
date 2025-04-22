"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

export default function ArticlesSection() {
  const t = useTranslations();

  return (
    <SectionWrapper id="articles" bgColor="gray">
      <h2 className="text-3xl font-bold mb-8">{t("articles.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(t.raw("articles.items") as Record<string, string>).map(
          ([key, value]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-4">{value}</h3>
            </motion.div>
          )
        )}
      </div>
    </SectionWrapper>
  );
}

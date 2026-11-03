"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <SectionWrapper id="faq" bgColor="cool" fullWidth>
      <div className="max-w-3xl mx-auto relative z-10 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
          <p className="text-gray-600 text-lg">{t("description")}</p>
        </motion.div>

        <div className="space-y-3 text-left">
          {items.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <details className="group rounded-lg bg-white border border-gray-200 shadow-sm open:shadow-md">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden
                    className="shrink-0 text-blue-600 text-xl leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {item.answer}
                </p>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

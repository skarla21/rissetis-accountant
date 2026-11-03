"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import {
  HiOutlineCubeTransparent,
  HiOutlineLightBulb,
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineCurrencyDollar,
  HiOutlineSupport,
} from "react-icons/hi";

interface ServiceItem {
  title: string;
  description: string;
}

function formatDescription(text: string) {
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={key} className="list-disc pl-5 space-y-1 mb-3">
        {listItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  text.split("\n").forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList(`list-${index}`);
      return;
    }
    if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
      listItems.push(trimmed.replace(/^[•\-]\s*/, "").trim());
      return;
    }
    flushList(`list-${index}`);
    blocks.push(
      <p key={`p-${index}`} className="mb-3 last:mb-0">
        {trimmed}
      </p>
    );
  });

  flushList("list-end");
  return blocks;
}

function firstParagraph(text: string) {
  return (
    text
      .split("\n")
      .map((line) => line.trim())
      .find(
        (line) =>
          line.length > 0 && !line.startsWith("•") && !line.startsWith("-")
      ) ?? text.slice(0, 180)
  );
}

/** Body shown inside <details>, excluding the teaser paragraph already visible. */
function restAfterFirstParagraph(text: string) {
  const lines = text.split("\n");
  let foundFirst = false;
  const rest: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!foundFirst) {
      if (
        trimmed &&
        !trimmed.startsWith("•") &&
        !trimmed.startsWith("-")
      ) {
        foundFirst = true;
      }
      continue;
    }
    rest.push(line);
  }

  return rest.join("\n").trim();
}

export default function ServicesSection() {
  const t = useTranslations("services");

  const services = Object.entries(
    t.raw("items") as Record<string, ServiceItem>
  ).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  return (
    <SectionWrapper
      id="services"
      bgColor="white"
      className="relative"
      fullWidth
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-white to-blue-50">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(#3b82f6 0.5px, transparent 0.5px), radial-gradient(#3b82f6 0.5px, transparent 0.5px)`,
              backgroundSize: `20px 20px`,
              backgroundPosition: `0 0, 10px 10px`,
            }}
          />

          <div className="absolute top-40 right-10 w-72 h-72 rounded-full bg-blue-100/20" />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-indigo-100/20" />

          <div className="absolute right-28 bottom-32 text-blue-200">
            <HiOutlineDocumentText className="w-24 h-24" />
          </div>

          <div className="absolute left-20 bottom-1/4 text-blue-200/60">
            <HiOutlineLightBulb className="w-16 h-16" />
          </div>

          <div className="absolute left-1/3 top-1/3 text-indigo-200/70">
            <HiOutlineShieldCheck className="w-20 h-20" />
          </div>

          <div className="absolute right-1/4 top-2/3 text-blue-200/50 hidden md:block">
            <HiOutlineCubeTransparent className="w-20 h-20" />
          </div>

          <div className="absolute right-28 top-2/3 text-indigo-200/40">
            <HiOutlineCurrencyDollar className="w-16 h-16" />
          </div>

          <div className="absolute left-1/3 top-3/4 text-blue-200/30">
            <HiOutlineSupport className="w-16 h-16" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 lg:mb-0 lg:sticky lg:top-28"
          >
            <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
            <p className="text-gray-600 text-lg">{t("description")}</p>
          </motion.div>

          <div className="space-y-6 max-w-2xl">
            {services.map((service, index) => {
              const detailsBody = restAfterFirstParagraph(service.description);
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {firstParagraph(service.description)}
                  </p>
                  {detailsBody ? (
                    <details className="group">
                      <summary className="cursor-pointer text-blue-600 text-sm font-medium list-none flex items-center gap-1 hover:text-blue-800">
                        <span className="group-open:hidden">{t("readMore")}</span>
                        <span className="hidden group-open:inline">
                          {t("close")}
                        </span>
                      </summary>
                      <div className="mt-4 prose prose-sm max-w-none text-gray-700">
                        {formatDescription(detailsBody)}
                      </div>
                    </details>
                  ) : null}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

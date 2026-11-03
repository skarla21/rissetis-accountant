"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import {
  ServiceDetails,
  serviceIndexLabel,
} from "@/components/sections/services/serviceContent";

interface ServiceItem {
  title: string;
  description: string;
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
    <SectionWrapper id="services" bgColor="warm" className="relative" fullWidth>
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-14 lg:sticky lg:top-28 lg:col-span-4 lg:mb-0"
            >
              <div className="mb-5 h-0.5 w-12 bg-rissetis" aria-hidden />
              <h2 className="mb-5 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {t("title")}
              </h2>
              <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                {t("description")}
              </p>
            </motion.div>

            <div className="lg:col-span-8">
              <ul className="divide-y divide-gray-200/80 border-y border-gray-200/80">
                {services.map((service, index) => (
                  <motion.li
                    key={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    viewport={{ once: true }}
                  >
                    <article className="border-l-2 border-rissetis py-8 pl-5 pr-2 md:pl-7">
                      <div className="mb-3 flex items-start gap-4 md:gap-6">
                        <span className="mt-0.5 font-mono text-sm tabular-nums text-gray-400">
                          {serviceIndexLabel(index)}
                        </span>
                        <h3 className="text-base font-semibold leading-snug text-gray-900 md:text-lg">
                          {service.title}
                        </h3>
                      </div>
                      <div className="md:pl-10">
                        <ServiceDetails
                          description={service.description}
                          readMore={t("readMore")}
                          close={t("close")}
                        />
                      </div>
                    </article>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

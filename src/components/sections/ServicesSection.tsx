"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IoChevronForward } from "react-icons/io5";
import SectionWrapper from "@/components/SectionWrapper";
import { createPortal } from "react-dom";
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

export default function ServicesSection() {
  const t = useTranslations("services");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null
  );

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedService]);

  const services = Object.entries(
    t.raw("items") as Record<string, ServiceItem>
  ).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const formatDescription = (text: string) => {
    return text.split("\n").map((line, index) => {
      if (line.trim().startsWith("-")) {
        return (
          <div key={index} className="flex items-start mb-2">
            <span className="mr-2">•</span>
            <span>{line.trim().substring(1).trim()}</span>
          </div>
        );
      }
      return (
        <p key={index} className="mb-4 last:mb-0">
          {line}
        </p>
      );
    });
  };

  return (
    <SectionWrapper
      id="services"
      bgColor="white"
      className="relative"
      fullWidth
    >
      {/* Styled background pattern with service-themed icons */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-white to-blue-50">
          {/* Subtle dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(#3b82f6 0.5px, transparent 0.5px), radial-gradient(#3b82f6 0.5px, transparent 0.5px)`,
              backgroundSize: `20px 20px`,
              backgroundPosition: `0 0, 10px 10px`,
            }}
          />

          {/* Subtle decorative shapes */}
          <div className="absolute top-40 right-10 w-72 h-72 rounded-full bg-blue-100/20" />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-indigo-100/20" />

          {/* Service-related React Icons - scattered around but avoiding title area */}
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

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10 py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 lg:mb-0"
          >
            <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
            <p className="text-gray-600 text-lg">{t("description")}</p>
          </motion.div>

          <div className="space-y-6 max-w-2xl">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow flex flex-col h-full"
                onClick={() => setSelectedService(service)}
              >
                <h3 className="text-lg font-semibold mb-4">{service.title}</h3>
                <div className="flex items-center text-blue-600 mt-auto justify-end">
                  <span className="text-sm">{t("readMore")}</span>
                  <IoChevronForward className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {selectedService &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0" style={{ zIndex: 100 }}>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/25"
              aria-hidden="true"
              onClick={() => setSelectedService(null)}
            />

            {/* Dialog Container */}
            <div className="fixed inset-0 flex items-start justify-center p-4 overflow-y-auto pt-4 sm:pt-10 md:pt-20">
              <div className="relative w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-white rounded-lg shadow-xl my-4">
                <div className="bg-gray-100 px-6 py-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedService.title}
                  </div>
                </div>
                <div className="p-6">
                  <div className="prose prose-lg max-w-none">
                    {formatDescription(selectedService.description)}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setSelectedService(null)}
                    >
                      {t("close")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </SectionWrapper>
  );
}

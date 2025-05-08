"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import SectionWrapper from "@/components/SectionWrapper";
import { createPortal } from "react-dom";

interface ServiceItem {
  title: string;
  description: string;
}

export default function ServicesSection() {
  const t = useTranslations("services");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null
  );

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
    <SectionWrapper id="services" bgColor="white">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
            <p className="text-gray-600 text-lg">{t("description")}</p>
          </div>

          <div className="space-y-6">
            {services.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gray-50 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow flex flex-col h-full"
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
            <div className="fixed inset-0 pt-20 flex items-center justify-center p-4 overflow-y-auto">
              <div className="relative w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-white rounded-lg shadow-xl">
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

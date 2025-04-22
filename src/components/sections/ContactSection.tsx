"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

export default function ContactSection() {
  const t = useTranslations();

  return (
    <SectionWrapper id="contact" bgColor="white">
      <h2 className="text-3xl font-bold mb-8">{t("contact.title")}</h2>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg mb-8">{t("contact.description")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">{t("contact.email")}</h3>
            <p className="text-gray-600">{t("contact.emailValue")}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">{t("contact.phone")}</h3>
            <p className="text-gray-600">{t("contact.phoneValue")}</p>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

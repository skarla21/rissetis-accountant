"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function ProfileSection() {
  const t = useTranslations();

  return (
    <section
      id="profile"
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">{t("profile.title")}</h1>
          <h2 className="text-2xl text-gray-600 mb-6">
            {t("profile.subtitle")}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t("profile.description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

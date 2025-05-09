"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";

export default function ProfileSection() {
  const t = useTranslations();

  return (
    <SectionWrapper id="profile" bgColor="gray" className="relative" fullWidth>
      {/* Background Image - Full width with no constraints */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/imgs/rissetis_bg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-white/80" />
      </div>

      {/* Content with position relative to allow absolute positioning */}
      <div className="container mx-auto px-4 py-16 relative z-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Title and subtitle at the top */}
          <div className="mt-16">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {t("profile.title")}
            </h1>
            <h2 className="text-2xl text-gray-700 mb-6">
              {t("profile.subtitle")}
            </h2>
          </div>
        </motion.div>

        {/* Description absolutely positioned from the bottom */}
        <div className="absolute bottom-40 left-0 right-0 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-800 max-w-2xl mx-auto"
          >
            <i>{t("profile.description")}</i>
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
}

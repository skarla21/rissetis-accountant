"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import {
  FaCalculator,
  FaFileInvoiceDollar,
  FaChartLine,
  FaFileAlt,
  FaCreditCard,
  FaRegMoneyBillAlt,
} from "react-icons/fa";

export default function ProfileSection() {
  const t = useTranslations();

  return (
    <SectionWrapper id="profile" bgColor="gray" className="relative" fullWidth>
      {/* Original background image - only visible on 2xl screens */}
      <div className="absolute inset-0 w-full h-full hidden 2xl:block">
        <Image
          src="/assets/imgs/rissetis_bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          sizes="(min-width: 1536px) 100vw, 0px"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-white/80" />
      </div>

      {/* Styled background for smaller screens - subtle accounting-themed pattern */}
      <div className="absolute inset-0 w-full h-full 2xl:hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(#4b5563 0.5px, transparent 0.5px), radial-gradient(#4b5563 0.5px, transparent 0.5px)`,
              backgroundSize: `20px 20px`,
              backgroundPosition: `0 0, 10px 10px`,
            }}
          />

          {/* Subtle decorative elements */}
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-100/20" />
          <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-blue-100/10" />

          <div className="absolute right-10 top-40 text-gray-200">
            <FaCalculator className="w-16 h-16" />
          </div>

          <div className="absolute right-40 top-64 text-gray-200/70">
            <FaFileInvoiceDollar className="w-24 h-24" />
          </div>

          <div className="absolute left-20 bottom-20 text-gray-200">
            <FaFileAlt className="w-20 h-20" />
          </div>

          <div className="absolute left-40 top-40 text-gray-200/50">
            <FaChartLine className="w-16 h-16" />
          </div>

          <div className="absolute left-1/3 bottom-1/4 text-gray-200/60">
            <FaCreditCard className="w-12 h-12" />
          </div>

          <div className="absolute right-1/4 bottom-1/3 text-gray-200/40">
            <FaRegMoneyBillAlt className="w-20 h-20" />
          </div>
        </div>
      </div>

      {/* Content with position relative to allow absolute positioning */}
      <div className="container mx-auto px-4 py-16 relative z-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
          viewport={{ once: true }}
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
            viewport={{ once: true }}
          >
            <i>{t("profile.description")}</i>
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
}

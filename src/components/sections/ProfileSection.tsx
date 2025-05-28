"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import Reviews from "@/components/Reviews";
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
      {/* Background with subtle pattern - visible on all screens */}
      <div className="absolute inset-0 w-full h-full">
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

      {/* Main content with animations */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("profile.title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            {t("profile.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <Image
            src="/assets/imgs/rissetis_modified.png"
            alt="Rissetis Logo"
            width={200}
            height={200}
            className="object-contain rounded-full"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {t("profile.description")}
          </p>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Reviews />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

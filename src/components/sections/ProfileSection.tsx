"use client";

import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/SectionWrapper";
import Image from "next/image";

export default function ProfileSection() {
  const t = useTranslations();

  return (
    <SectionWrapper
      id="profile"
      bgColor="gray"
      className="relative min-h-screen"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/imgs/rissetis_bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-white/80" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="mt-16 mb-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {t("profile.title")}
          </h1>
          <h2 className="text-2xl text-gray-700 mb-6">
            {t("profile.subtitle")}
          </h2>
        </div>

        <div className="mb-80">
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            <i>{t("profile.description")}</i>
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}

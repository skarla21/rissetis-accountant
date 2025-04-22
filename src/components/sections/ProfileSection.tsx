"use client";

import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/SectionWrapper";

export default function ProfileSection() {
  const t = useTranslations();

  return (
    <SectionWrapper id="profile" bgColor="gray">
      <h1 className="text-4xl font-bold mb-4">{t("profile.title")}</h1>
      <h2 className="text-2xl text-gray-600 mb-6">{t("profile.subtitle")}</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        {t("profile.description")}
      </p>
    </SectionWrapper>
  );
}

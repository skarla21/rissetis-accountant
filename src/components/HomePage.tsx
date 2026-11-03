"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileSection from "@/components/sections/ProfileSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FaqSection from "@/components/sections/FaqSection";
import ArticlesSection from "@/components/sections/ArticlesSection";
import ContactSection from "@/components/sections/ContactSection";
import type { ArticleMetadata, TaxArticle } from "@/types/articles";

type ArticleCard = TaxArticle & ArticleMetadata;

const HOME_SECTION_IDS = new Set([
  "profile",
  "services",
  "articles",
  "faq",
  "contact",
]);

export default function HomePage({ articles }: { articles: ArticleCard[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Ensure hash targets scroll into view after navigation from /terms|/privacy
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash || !HOME_SECTION_IDS.has(hash)) return;

    const scrollToHash = () => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToHash();
    const t = window.setTimeout(scrollToHash, 100);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <ProfileSection />
        <ServicesSection />
        <ArticlesSection articles={articles} />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

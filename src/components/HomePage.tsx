"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileSection from "@/components/sections/ProfileSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ArticlesSection from "@/components/sections/ArticlesSection";
import ContactSection from "@/components/sections/ContactSection";
import type { ArticleMetadata, TaxArticle } from "@/types/articles";

type ArticleCard = TaxArticle & ArticleMetadata;

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
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

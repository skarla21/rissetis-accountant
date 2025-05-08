"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileSection from "@/components/sections/ProfileSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ArticlesSection from "@/components/sections/ArticlesSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Force scroll to top on initial load only
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    // No scroll event listeners to interfere with normal scrolling
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <Navbar scrollToSection={scrollToSection} />

      {/* Main content */}
      <main>
        <ProfileSection />
        <ServicesSection />
        <ArticlesSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { FaUser, FaBriefcase, FaNewspaper, FaEnvelope } from "react-icons/fa";
import LocaleSwitcher from "./LocaleSwitcher";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Navbar({ scrollToSection }: NavbarProps) {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState<string>("profile");

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["profile", "services", "articles", "contact"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section active if it's at the top of the viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("profile")}
            className="text-2xl font-bold text-blue-500 hover:text-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ΓΡ
          </motion.button>

          {/* Navigation Links */}
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => scrollToSection("profile")}
              className={`flex items-center space-x-2 ${
                activeSection === "profile"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <FaUser />
              <span>{t("navigation.profile")}</span>
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`flex items-center space-x-2 ${
                activeSection === "services"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <FaBriefcase />
              <span>{t("navigation.services")}</span>
            </button>
            <button
              onClick={() => scrollToSection("articles")}
              className={`flex items-center space-x-2 ${
                activeSection === "articles"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <FaNewspaper />
              <span>{t("navigation.articles")}</span>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`flex items-center space-x-2 ${
                activeSection === "contact"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <FaEnvelope />
              <span>{t("navigation.contact")}</span>
            </button>
          </div>

          {/* Locale Switcher */}
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  );
}

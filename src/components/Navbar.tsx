"use client";

import { useTranslations } from "next-intl";
import { FaUser, FaBriefcase, FaNewspaper, FaEnvelope } from "react-icons/fa";
import SocialMedia from "./SocialMedia";
import LocaleSwitcher from "./LocaleSwitcher";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const navigationText = useTranslations("navigation");
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
    <>
      {/* Main Navbar - Hidden on mobile */}
      <nav className="sticky top-0 left-0 right-0 bg-white shadow-md z-40 hidden md:block">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.a
              href="#profile"
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/assets/imgs/rissetis_modified.png"
                alt="Rissetis Logo"
                width={40}
                height={40}
                className="object-contain rounded-full"
                priority
              />
            </motion.a>

            {/* Navigation Links */}
            <div className="flex justify-center space-x-8">
              <div className="relative group">
                <a
                  href="#profile"
                  className={`flex items-center space-x-2 ${
                    activeSection === "profile"
                      ? "text-blue-500"
                      : "text-gray-600 group-hover:text-blue-600"
                  }`}
                >
                  <FaUser />
                  <span>{navigationText("profile")}</span>
                </a>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all ${
                    activeSection === "profile"
                      ? "w-full bg-blue-500"
                      : "w-0 bg-blue-600 group-hover:w-full"
                  }`}
                ></span>
              </div>
              <div className="relative group">
                <a
                  href="#services"
                  className={`flex items-center space-x-2 ${
                    activeSection === "services"
                      ? "text-blue-500"
                      : "text-gray-600 group-hover:text-blue-600"
                  }`}
                >
                  <FaBriefcase />
                  <span>{navigationText("services")}</span>
                </a>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all ${
                    activeSection === "services"
                      ? "w-full bg-blue-500"
                      : "w-0 bg-blue-600 group-hover:w-full"
                  }`}
                ></span>
              </div>
              <div className="relative group">
                <a
                  href="#articles"
                  className={`flex items-center space-x-2 ${
                    activeSection === "articles"
                      ? "text-blue-500"
                      : "text-gray-600 group-hover:text-blue-600"
                  }`}
                >
                  <FaNewspaper />
                  <span>{navigationText("articles")}</span>
                </a>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all ${
                    activeSection === "articles"
                      ? "w-full bg-blue-500"
                      : "w-0 bg-blue-600 group-hover:w-full"
                  }`}
                ></span>
              </div>
              <div className="relative group">
                <a
                  href="#contact"
                  className={`flex items-center space-x-2 ${
                    activeSection === "contact"
                      ? "text-blue-500"
                      : "text-gray-600 group-hover:text-blue-600"
                  }`}
                >
                  <FaEnvelope />
                  <span>{navigationText("contact")}</span>
                </a>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all ${
                    activeSection === "contact"
                      ? "w-full bg-blue-500"
                      : "w-0 bg-blue-600 group-hover:w-full"
                  }`}
                ></span>
              </div>
            </div>

            {/* Right section with Locale Switcher and Social Media */}
            <div className="flex space-x-8">
              <div className="flex space-x-4">
                {/* Social Media */}
                <SocialMedia />
              </div>
              <div className="flex">
                {/* Locale Switcher */}
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Navbar - Logo and Right Section */}
      <nav className="sticky top-0 left-0 right-0 bg-white shadow-md z-40 md:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.a
              href="#profile"
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/assets/imgs/rissetis_modified.png"
                alt="Rissetis Logo"
                width={40}
                height={40}
                className="object-contain rounded-full"
                priority
              />
            </motion.a>

            {/* Right section with Locale Switcher and Social Media */}
            <div className="flex space-x-8">
              <div className="flex space-x-4">
                {/* Social Media */}
                <SocialMedia />
              </div>
              <div className="flex">
                {/* Locale Switcher */}
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Links - Bottom Fixed */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <a
              href="#profile"
              className={`flex flex-col items-center ${
                activeSection === "profile" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              <FaUser size={20} />
            </a>
            <a
              href="#services"
              className={`flex flex-col items-center ${
                activeSection === "services" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              <FaBriefcase size={20} />
            </a>
            <a
              href="#articles"
              className={`flex flex-col items-center ${
                activeSection === "articles" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              <FaNewspaper size={20} />
            </a>
            <a
              href="#contact"
              className={`flex flex-col items-center ${
                activeSection === "contact" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

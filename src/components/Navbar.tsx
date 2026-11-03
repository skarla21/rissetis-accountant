"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  FaUser,
  FaBriefcase,
  FaNewspaper,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";
import SocialMedia from "./SocialMedia";
import LocaleSwitcher from "./LocaleSwitcher";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

const SECTIONS = [
  { id: "profile", icon: FaUser },
  { id: "services", icon: FaBriefcase },
  { id: "articles", icon: FaNewspaper },
  { id: "faq", icon: FaQuestionCircle },
  { id: "contact", icon: FaEnvelope },
] as const;

export default function Navbar() {
  const navigationText = useTranslations("navigation");
  const [activeSection, setActiveSection] = useState<string>("profile");
  const pathname = usePathname();

  const { isHome, homeHref, sectionHref } = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const currentLocale =
      segments[0] === "en" || segments[0] === "el" ? segments[0] : "el";
    const onHome = segments.length <= 1;
    const home = `/${currentLocale}`;
    return {
      isHome: onHome,
      homeHref: `${home}#profile`,
      sectionHref: (id: string) => (onHome ? `#${id}` : `${home}#${id}`),
    };
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      for (const { id } of SECTIONS) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 bg-white shadow-md z-40 hidden md:block">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.a
              href={homeHref}
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/assets/imgs/RissetisOnlyLogoSocialTransp.png"
                alt="Λογιστικά Ρισσέτης"
                width={40}
                height={40}
                className="object-contain rounded-full"
                priority
              />
            </motion.a>

            <div className="flex justify-center space-x-6 lg:space-x-8">
              {SECTIONS.map(({ id, icon: Icon }) => (
                <div key={id} className="relative group">
                  <a
                    href={sectionHref(id)}
                    className={`flex items-center space-x-2 ${
                      activeSection === id
                        ? "text-blue-500"
                        : "text-gray-600 group-hover:text-blue-600"
                    }`}
                  >
                    <Icon />
                    <span>{navigationText(id)}</span>
                  </a>
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 transition-all ${
                      activeSection === id
                        ? "w-full bg-blue-500"
                        : "w-0 bg-blue-600 group-hover:w-full"
                    }`}
                  ></span>
                </div>
              ))}
            </div>

            <div className="flex space-x-8">
              <div className="flex space-x-4">
                <SocialMedia />
              </div>
              <div className="flex">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav className="sticky top-0 left-0 right-0 bg-white shadow-md z-40 md:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.a
              href={homeHref}
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/assets/imgs/RissetisOnlyLogoSocialTransp.png"
                alt="Λογιστικά Ρισσέτης"
                width={40}
                height={40}
                className="object-contain rounded-full"
                priority
              />
            </motion.a>

            <div className="flex space-x-8">
              <div className="flex space-x-4">
                <SocialMedia />
              </div>
              <div className="flex">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            {SECTIONS.map(({ id, icon: Icon }) => (
              <a
                key={id}
                href={sectionHref(id)}
                className={`flex flex-col items-center ${
                  activeSection === id ? "text-blue-500" : "text-gray-600"
                }`}
                aria-label={navigationText(id)}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

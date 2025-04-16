"use client";

import { useTranslations } from "next-intl";
import {
  FaUser,
  FaBriefcase,
  FaNewspaper,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Navbar({ scrollToSection }: NavbarProps) {
  const t = useTranslations();
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const currentLocale = pathname.split("/")[1] || "en";

  const toggleLocaleMenu = () => {
    setIsLocaleMenuOpen(!isLocaleMenuOpen);
  };

  const changeLocale = (locale: string) => {
    // Replace the locale in the pathname
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setIsLocaleMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Locale Switcher */}
          <div className="relative">
            <button
              onClick={toggleLocaleMenu}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <Image
                src={`/assets/imgs/${currentLocale}.png`}
                alt={currentLocale.toUpperCase()}
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="uppercase">{currentLocale}</span>
              <FaChevronDown className="ml-1" />
            </button>

            {/* Locale Dropdown */}
            {isLocaleMenuOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 z-50">
                <button
                  onClick={() => changeLocale("en")}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 w-full"
                >
                  <Image
                    src="/assets/imgs/en.png"
                    alt="EN"
                    width={24}
                    height={24}
                    className="rounded-sm"
                  />
                  <span>English</span>
                </button>
                <button
                  onClick={() => changeLocale("el")}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 w-full"
                >
                  <Image
                    src="/assets/imgs/el.png"
                    alt="EL"
                    width={24}
                    height={24}
                    className="rounded-sm"
                  />
                  <span>Ελληνικά</span>
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => scrollToSection("profile")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <FaUser />
              <span>{t("navigation.profile")}</span>
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <FaBriefcase />
              <span>{t("navigation.services")}</span>
            </button>
            <button
              onClick={() => scrollToSection("articles")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <FaNewspaper />
              <span>{t("navigation.articles")}</span>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <FaEnvelope />
              <span>{t("navigation.contact")}</span>
            </button>
          </div>

          {/* Empty div for flex spacing */}
          <div className="w-24"></div>
        </div>
      </div>
    </nav>
  );
}

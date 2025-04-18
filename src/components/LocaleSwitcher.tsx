"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLocale = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 focus:outline-none"
      >
        <Image
          src={`/assets/imgs/${currentLocale}.png`}
          alt={currentLocale.toUpperCase()}
          width={24}
          height={24}
          className="rounded-sm"
        />
        <FaChevronDown
          className={cn(
            "ml-1 scale-75 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-50">
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
        </div>
      )}
    </div>
  );
}

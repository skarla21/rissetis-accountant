import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const footerText = useTranslations("footer");

  return (
    <footer className="hidden md:block bg-gray-50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <Image
            src="/assets/imgs/rissetis_logo.png"
            alt="Rissetis Logo"
            width={60}
            height={60}
            className="object-contain"
          />

          {/* Quote */}
          <p className="text-gray-600 text-center italic max-w-2xl">
            {footerText("quote")}
          </p>

          {/* Copyright and Credits */}
          <div className="text-center text-gray-500 text-sm">
            <p>Copyright © 2025 Rissetis Accounting</p>
            <p>
              Designed by{" "}
              <Link
                href="https://github.com/skarla21"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Antonis Skarlatos
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

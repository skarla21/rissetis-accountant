import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import SocialMedia from "./SocialMedia";

function LegalLinks({ className = "" }: { className?: string }) {
  const footerText = useTranslations("footer");

  return (
    <nav
      className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm ${className}`}
      aria-label="Legal"
    >
      <Link
        href="/terms"
        className="text-gray-600 hover:text-blue-700 transition-colors"
      >
        {footerText("terms")}
      </Link>
      <span className="text-gray-300" aria-hidden>
        |
      </span>
      <Link
        href="/privacy"
        className="text-gray-600 hover:text-blue-700 transition-colors"
      >
        {footerText("privacy")}
      </Link>
    </nav>
  );
}

export default function Footer() {
  const footerText = useTranslations("footer");

  return (
    <>
      {/* Desktop / tablet full footer */}
      <footer className="hidden md:block bg-gray-50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            <Image
              src="/assets/imgs/Rissetis_Email Logo Horizontal.png"
              alt="Λογιστικά Ρισσέτης"
              width={200}
              height={44}
              className="object-contain"
              priority
            />

            <p className="text-gray-600 text-center italic max-w-2xl">
              {footerText("quote")}
            </p>

            <div className="flex flex-col items-center space-y-3">
              <p className="text-gray-600 text-center">{footerText("follow")}</p>
              <div className="flex space-x-4">
                <SocialMedia />
              </div>
            </div>

            <LegalLinks />

            <div className="text-center text-gray-500 text-sm">
              <p>Copyright © 2026 Rissetis Accounting</p>
              <p>
                Designed by{" "}
                <a
                  href="https://github.com/skarla21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Antonis Skarlatos
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile slim legal strip (above bottom nav) */}
      <footer className="md:hidden bg-gray-50 border-t border-gray-200 py-3 pb-20 mt-8">
        <div className="container mx-auto px-4 flex flex-col items-center gap-2">
          <LegalLinks />
          <p className="text-center text-gray-500 text-xs">
            Copyright © 2026 Rissetis Accounting
          </p>
        </div>
      </footer>
    </>
  );
}

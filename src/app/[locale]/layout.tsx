import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Λογιστικά Ρισσέτης",
  metadataBase: new URL("https://www.giorgosrissetis.gr"),
  icons: {
    icon: [
      {
        url: "/assets/imgs/rissetis_logo.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
  },
  openGraph: {
    type: "website",
    title: "Λογιστικά Ρισσέτης",
    siteName: "Λογιστικά Ρισσέτης",
    images: [
      {
        url: "/assets/imgs/rissetis.jpg",
        width: 1181,
        height: 709,
      },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Simple check if locale is valid
  if (locale !== "en" && locale !== "el") {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.onload = function() {
              // Force scroll to top
              window.scrollTo(0, 0);
              
              // Remove hash fragment from URL if it exists
              if (window.location.hash) {
                // Create a new URL without the hash
                const newUrl = window.location.pathname + window.location.search;
                
                // Replace the current URL without reloading the page
                window.history.replaceState(null, '', newUrl);
              }
            };
            history.scrollRestoration = "manual";
          `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

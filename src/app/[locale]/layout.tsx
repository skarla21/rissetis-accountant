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
  description:
    "Λογιστικά Ρισσέτης - Επαγγελματικές λογιστικές υπηρεσίες στο Παγκράτι. Φοροτεχνικές συμβουλές, μισθοδοσία και πλήρεις λογιστικές υπηρεσίες για επιχειρήσεις και ιδιώτες.",
  metadataBase: new URL("https://www.giorgosrissetis.gr"),
  alternates: {
    canonical: "https://www.giorgosrissetis.gr",
  },
  keywords: [
    "λογιστικά ρισσέτης",
    "λογιστής παγκράτι",
    "λογιστικές υπηρεσίες",
    "φοροτεχνικά",
    "μισθοδοσία",
    "Ρισσέτης",
    "λογιστήριο αθήνα",
  ],
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
    description:
      "Εξειδικευμένες λογιστικές και φοροτεχνικές υπηρεσίες από τον Γιώργο Ρισσέτη στο Παγκράτι. Πλήρης υποστήριξη για επιχειρήσεις και ιδιώτες.",
    url: "https://www.giorgosrissetis.gr",
    locale: "el_GR",
    images: [
      {
        url: "/assets/imgs/rissetis.jpg",
        width: 1181,
        height: 709,
        alt: "Λογιστικά Ρισσέτης",
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
            // Set scroll restoration to auto to maintain position on refresh
            if ('scrollRestoration' in history) {
              history.scrollRestoration = 'auto';
            }
          `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AccountingService",
              name: "Λογιστικά Ρισσέτης",
              description:
                "Επαγγελματικές λογιστικές υπηρεσίες στο Παγκράτι. Φοροτεχνικές συμβουλές, μισθοδοσία και πλήρεις λογιστικές υπηρεσίες για επιχειρήσεις και ιδιώτες.",
              url: "https://www.giorgosrissetis.gr",
              logo: "https://www.giorgosrissetis.gr/assets/imgs/rissetis_logo.png",
              image: "https://www.giorgosrissetis.gr/assets/imgs/rissetis.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Αρτοτίνης 21",
                addressLocality: "Παγκράτι",
                postalCode: "116 33",
                addressRegion: "Αθήνα",
                addressCountry: "GR",
              },
              telephone: "+306982558553",
              email: "logistikarissetis@gmail.com",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "17:00",
                },
              ],
              priceRange: "$$",
            }),
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

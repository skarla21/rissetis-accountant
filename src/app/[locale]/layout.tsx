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

// Weekdays the office is open, shared by both openingHoursSpecification entries.
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const metadata: Metadata = {
  title: "Λογιστικά Ρισσέτης",
  description:
    "Λογιστικά Ρισσέτης - Επαγγελματικές λογιστικές υπηρεσίες στο Παγκράτι. Φοροτεχνικές συμβουλές, μισθοδοσία και πλήρεις λογιστικές υπηρεσίες για επιχειρήσεις και ιδιώτες.",
  metadataBase: new URL("https://www.giorgosrissetis.gr"),
  alternates: {
    canonical: "https://www.giorgosrissetis.gr",
  },
  verification: {
    google: "mG5kOuSZQYY10SqZFgvxdSHnEcw6DK4WEJaQ3vWdLNY",
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
        url: "/assets/imgs/RissetisOnlyLogoSocialTransp.png",
        type: "image/png",
        sizes: "591x591",
      },
    ],
  },
  openGraph: {
    type: "website",
    title: "Λογιστικά Ρισσέτης",
    siteName: "Λογιστικά Ρισσέτης",
    description:
      "Λογιστικά Ρισσέτης - Επαγγελματικές λογιστικές υπηρεσίες στο Παγκράτι. Φοροτεχνικές συμβουλές, μισθοδοσία και πλήρεις λογιστικές υπηρεσίες για επιχειρήσεις και ιδιώτες.",
    url: "https://www.giorgosrissetis.gr",
    locale: "el_GR",
    images: [
      {
        url: "/assets/imgs/Rissetis_Social Logo Name Circle.png",
        width: 591,
        height: 591,
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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

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
              logo: "https://www.giorgosrissetis.gr/assets/imgs/RissetisOnlyLogoSocialTransp.png",
              image:
                "https://www.giorgosrissetis.gr/assets/imgs/Rissetis_Social%20Logo%20Name%20Circle.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Φιλολάου 27 και Τιμοθέου",
                addressLocality: "Παγκράτι",
                postalCode: "116 33",
                addressRegion: "Αθήνα",
                addressCountry: "GR",
              },
              telephone: "+302130068883",
              email: "logistikarissetis@gmail.com",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: WEEKDAYS,
                  opens: "09:00",
                  closes: "14:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: WEEKDAYS,
                  opens: "17:00",
                  closes: "20:00",
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

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { SEO_COPY, SITE_URL, type AppLocale } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-inter",
});

function isAppLocale(locale: string): locale is AppLocale {
  return locale === "el" || locale === "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isAppLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale;
  const copy = SEO_COPY[locale];
  const canonicalPath = `/${locale}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title: copy.title,
    description: copy.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        el: `${SITE_URL}/el`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/el`,
      },
    },
    verification: {
      google: "mG5kOuSZQYY10SqZFgvxdSHnEcw6DK4WEJaQ3vWdLNY",
    },
    keywords: [...copy.keywords],
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
      title: copy.title,
      siteName: "Λογιστικά Ρισσέτης",
      description: copy.description,
      url: canonicalUrl,
      locale: copy.ogLocale,
      alternateLocale: locale === "el" ? ["en_US"] : ["el_GR"],
      images: [
        {
          url: "/assets/imgs/Rissetis_Social Logo Name Circle.png",
          width: 591,
          height: 591,
          alt: "Λογιστικά Ρισσέτης",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ["/assets/imgs/Rissetis_Social Logo Name Circle.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "Λογιστικά Ρισσέτης",
    alternateName: "Ρισσέτης Δημ. Γεώργιος",
    description: SEO_COPY[locale].description,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/imgs/RissetisOnlyLogoSocialTransp.png`,
    image: `${SITE_URL}/assets/imgs/Rissetis_Social%20Logo%20Name%20Circle.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Φιλολάου 27 και Τιμοθέου",
      addressLocality: "Παγκράτι",
      postalCode: "116 33",
      addressRegion: "Αθήνα",
      addressCountry: "GR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.9666549,
      longitude: 23.7525564,
    },
    telephone: "+302130068883",
    email: "logistikarissetis@gmail.com",
    hasMap:
      "https://www.google.com/maps/place/%CE%A6%CE%B9%CE%BB%CE%BF%CE%BB%CE%AC%CE%BF%CF%85+27,+%CE%91%CE%B8%CE%AE%CE%BD%CE%B1+116+33/@37.9666591,23.7499815,17z",
    areaServed: [
      {
        "@type": "City",
        name: "Αθήνα",
      },
      {
        "@type": "AdministrativeArea",
        name: "Παγκράτι",
      },
    ],
    sameAs: [
      "https://www.facebook.com/share/1Ln9RtP2uG/",
      "https://www.instagram.com/george_rissetis/",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
        opens: "09:00",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Tuesday",
        opens: "09:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Tuesday",
        opens: "17:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Wednesday",
        opens: "09:00",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Thursday",
        opens: "09:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Thursday",
        opens: "17:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "09:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "17:00",
        closes: "20:00",
      },
    ],
    priceRange: "$$",
  };

  return (
    <html lang={locale}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if ('scrollRestoration' in history) {
              history.scrollRestoration = 'auto';
            }
          `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
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

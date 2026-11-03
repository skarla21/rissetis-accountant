import { SEO_COPY, SITE_URL, type AppLocale } from "@/lib/seo";

export type FaqItem = {
  question: string;
  answer: string;
};

const OPENING_HOURS = [
  { dayOfWeek: "Monday", opens: "09:00", closes: "15:00" },
  { dayOfWeek: "Tuesday", opens: "09:00", closes: "14:00" },
  { dayOfWeek: "Tuesday", opens: "17:00", closes: "20:00" },
  { dayOfWeek: "Wednesday", opens: "09:00", closes: "15:00" },
  { dayOfWeek: "Thursday", opens: "09:00", closes: "14:00" },
  { dayOfWeek: "Thursday", opens: "17:00", closes: "20:00" },
  { dayOfWeek: "Friday", opens: "09:00", closes: "14:00" },
  { dayOfWeek: "Friday", opens: "17:00", closes: "20:00" },
] as const;

export function buildJsonLd(locale: AppLocale, faqItems: FaqItem[]) {
  const businessId = `${SITE_URL}/#business`;
  const personId = `${SITE_URL}/#person`;
  const faqId = `${SITE_URL}/${locale}#faq`;

  const accountingService = {
    "@type": "AccountingService",
    "@id": businessId,
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
      { "@type": "City", name: "Αθήνα" },
      { "@type": "AdministrativeArea", name: "Παγκράτι" },
    ],
    sameAs: [
      "https://www.facebook.com/share/1Ln9RtP2uG/",
      "https://www.instagram.com/george_rissetis/",
    ],
    openingHoursSpecification: OPENING_HOURS.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      ...slot,
    })),
    priceRange: "$$",
    employee: { "@id": personId },
  };

  const person = {
    "@type": "Person",
    "@id": personId,
    name: "Γιώργος Ρισσέτης",
    alternateName: "Georgios Rissetis",
    jobTitle: locale === "el" ? "Λογιστής" : "Accountant",
    worksFor: { "@id": businessId },
    url: `${SITE_URL}/${locale}`,
    sameAs: ["https://www.instagram.com/george_rissetis/"],
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": faqId,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [accountingService, person, faqPage],
  };
}

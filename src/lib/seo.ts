export const SITE_URL = "https://www.giorgosrissetis.gr";

export const SEO_COPY = {
  el: {
    title: "Λογιστής Παγκράτι Αθήνα | Λογιστικά Ρισσέτης Γιώργος",
    description:
      "Λογιστικό γραφείο στο Παγκράτι. Λογιστικές & φοροτεχνικές υπηρεσίες, μισθοδοσία και υποστήριξη επιχειρήσεων & ιδιωτών. Επικοινωνήστε μαζί μας.",
    ogLocale: "el_GR",
    keywords: [
      "λογιστής παγκράτι",
      "λογιστικό γραφείο αθήνα",
      "λογιστικά ρισσέτης",
      "φοροτεχνικά",
      "μισθοδοσία",
      "φοροτεχνικός παγκράτι",
      "λογιστήριο αθήνα",
    ],
  },
  en: {
    title: "Accountant Pagkrati Athens | Accounting Rissetis Georgios",
    description:
      "Accounting firm in Pagkrati, Athens. Accounting & tax services, payroll, and support for businesses and individuals. Contact us today.",
    ogLocale: "en_US",
    keywords: [
      "accountant pagkrati",
      "accounting athens",
      "tax services greece",
      "payroll athens",
      "rissetis accounting",
    ],
  },
} as const;

export type AppLocale = keyof typeof SEO_COPY;

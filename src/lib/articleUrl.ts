const ALLOWED_ARTICLE_HOSTS = new Set([
  "www.taxheaven.gr",
  "taxheaven.gr",
  "www.gov.gr",
  "gov.gr",
]);

export function isAllowedArticleUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" && ALLOWED_ARTICLE_HOSTS.has(parsed.hostname)
    );
  } catch {
    return false;
  }
}

/** Display dates are `MM.DD.YYYY`; return ISO `YYYY-MM-DD` for `<time dateTime>`. */
export function articleDateToIso(date: string): string | undefined {
  const [month, day, year] = date.split(".").map(Number);
  if (!year || !month || !day) return undefined;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseArticleDate(date: string): Date {
  const [month, day, year] = date.split(".").map(Number);
  return new Date(year, month - 1, day);
}

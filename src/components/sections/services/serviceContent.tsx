import type { ReactNode } from "react";

export function formatDescription(text: string) {
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={key} className="mb-3 list-disc space-y-1 pl-5">
        {listItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  text.split("\n").forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList(`list-${index}`);
      return;
    }
    if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
      listItems.push(trimmed.replace(/^[•\-]\s*/, "").trim());
      return;
    }
    flushList(`list-${index}`);
    blocks.push(
      <p key={`p-${index}`} className="mb-3 last:mb-0">
        {trimmed}
      </p>
    );
  });

  flushList("list-end");
  return blocks;
}

export function firstParagraph(text: string) {
  return (
    text
      .split("\n")
      .map((line) => line.trim())
      .find(
        (line) =>
          line.length > 0 && !line.startsWith("•") && !line.startsWith("-")
      ) ?? text.slice(0, 180)
  );
}

/** Body shown inside <details>, excluding the teaser paragraph already visible. */
export function restAfterFirstParagraph(text: string) {
  const lines = text.split("\n");
  let foundFirst = false;
  const rest: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!foundFirst) {
      if (
        trimmed &&
        !trimmed.startsWith("•") &&
        !trimmed.startsWith("-")
      ) {
        foundFirst = true;
      }
      continue;
    }
    rest.push(line);
  }

  return rest.join("\n").trim();
}

interface ServiceDetailsProps {
  description: string;
  readMore: string;
  close: string;
}

/** SEO-safe teaser + native <details> body (full text in HTML for crawlers). */
export function ServiceDetails({
  description,
  readMore,
  close,
}: ServiceDetailsProps) {
  const detailsBody = restAfterFirstParagraph(description);

  return (
    <>
      <p className="mb-4 text-sm leading-7 text-gray-600">
        {firstParagraph(description)}
      </p>
      {detailsBody ? (
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-medium text-gray-900 underline decoration-rissetis decoration-2 underline-offset-4 hover:opacity-70">
            <span className="group-open:hidden">{readMore}</span>
            <span className="hidden group-open:inline">{close}</span>
          </summary>
          <div className="prose prose-sm mt-4 max-w-none text-gray-700">
            {formatDescription(detailsBody)}
          </div>
        </details>
      ) : null}
    </>
  );
}

export function serviceIndexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

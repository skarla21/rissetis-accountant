import { NextResponse } from "next/server";
import { getCurrentDate } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const alt = searchParams.get("alt");

  if (!url || !alt) {
    return NextResponse.json(
      { error: "URL and alt text are required" },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  try {
    const response = await fetch(url, { signal: controller.signal });
    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let html = "";
    let headEnded = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      html += decoder.decode(value, { stream: true });

      // Stop reading when </head> is found
      if (html.includes("</head>")) {
        headEnded = true;
        controller.abort(); // Cancel ongoing fetch
        break;
      }
    }

    if (!headEnded) html += decoder.decode(); // Flush remaining

    // Extract title from OpenGraph or meta title
    const titleMatch =
      html.match(/<title>(.*?)<\/title>/) ||
      html.match(/<meta property="og:title" content="(.*?)"/);
    const title = titleMatch ? titleMatch[1] : alt;

    // Extract image from OpenGraph image
    const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/);
    const imageUrl = imageMatch
      ? imageMatch[1]
      : "/assets/imgs/tax-article-placeholder.jpg";

    // Extract date from description meta tag
    const descriptionMatch = html.match(
      /<meta name="description" content=".*?\[(.*?)\]/
    );
    const date = descriptionMatch ? descriptionMatch[1] : getCurrentDate();

    return NextResponse.json({ title, imageUrl, date });
  } catch (error: unknown) {
    if ((error as Error).name === "AbortError") console.log("Fetch aborted");
    console.error("Error fetching metadata:", error);
    return NextResponse.json({
      title: alt,
      imageUrl: "/assets/imgs/tax-article-placeholder.jpg",
      date: getCurrentDate(),
    });
  }
}

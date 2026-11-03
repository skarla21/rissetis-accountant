import { NextResponse } from "next/server";
import { isAllowedArticleUrl } from "@/lib/articleUrl";
import { fetchArticleMetadata } from "@/lib/fetchArticleMetadata";

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

  if (!isAllowedArticleUrl(url)) {
    return NextResponse.json(
      { error: "URL host is not allowed" },
      { status: 400 }
    );
  }

  const metadata = await fetchArticleMetadata(url, alt);
  return NextResponse.json(metadata);
}

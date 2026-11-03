import articleUrls from "@/data/articles.json";
import { parseArticleDate } from "@/lib/articleUrl";
import { fetchArticleMetadata } from "@/lib/fetchArticleMetadata";
import type { ArticleMetadata, TaxArticle } from "@/types/articles";

const FETCH_CONCURRENCY = 5;

async function mapInBatches<T, R>(
  items: T[],
  batchSize: number,
  mapper: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    results.push(...(await Promise.all(batch.map(mapper))));
  }
  return results;
}

export async function loadArticlesWithMetadata(
  altTitle: string
): Promise<(TaxArticle & ArticleMetadata)[]> {
  const metadataResults = await mapInBatches(
    articleUrls,
    FETCH_CONCURRENCY,
    (url) => fetchArticleMetadata(url, altTitle)
  );

  return articleUrls
    .map((url, index) => ({
      url,
      ...metadataResults[index],
    }))
    .sort(
      (a, b) =>
        parseArticleDate(b.date).getTime() - parseArticleDate(a.date).getTime()
    );
}

type SearchCategory = 'AWS SAA' | 'AWS AIF';

export interface SearchablePost {
  title: string;
  description: string;
  slug: string;
  category: SearchCategory;
  href: string;
}

export async function searchPostsByApi(
  query: string,
  options?: { signal?: AbortSignal; limit?: number }
): Promise<SearchablePost[]> {
  const normalized = query.trim();
  if (!normalized) return [];

  const params = new URLSearchParams({
    q: normalized,
    limit: String(options?.limit ?? 20),
  });

  const res = await fetch(`/api/search/posts?${params.toString()}`, {
    method: 'GET',
    signal: options?.signal,
  });
  if (!res.ok) return [];

  const data = (await res.json()) as { items?: SearchablePost[] };
  return Array.isArray(data.items) ? data.items : [];
}

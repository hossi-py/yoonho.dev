import { NextResponse } from 'next/server';

import { allPosts } from '@/lib/blog-posts';
import { searchQuestionPosts } from '@/lib/questions-repository';

export const dynamic = 'force-dynamic';

type SearchCategory = 'AWS SAA' | 'AWS AIF';

interface SearchablePost {
  title: string;
  description: string;
  slug: string;
  category: SearchCategory;
  href: string;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

function mapCategory(category: string): SearchCategory | null {
  if (category === 'aws-saa') return 'AWS SAA';
  if (category === 'aws-aif') return 'AWS AIF';
  return null;
}

function mapHref(category: string, id: string) {
  if (category === 'aws-saa') return `/blog/aws-saa/${id}`;
  if (category === 'aws-aif') return `/blog/aws-aif/${id}`;
  return null;
}

function toSearchable(
  post: { id: string; title: string; description: string; category: string },
  tags: string[]
): SearchablePost | null {
  const category = mapCategory(post.category);
  const href = mapHref(post.category, post.id);
  if (!category || !href) return null;

  return {
    title: post.title,
    description: post.description,
    slug: post.id,
    category,
    href,
  };
}

function rankMatch(item: SearchablePost, query: string) {
  const q = normalize(query);
  const title = normalize(item.title);
  const desc = normalize(item.description);
  const slug = normalize(item.slug);
  const category = normalize(item.category);

  if (title.startsWith(q)) return 1;
  if (title.includes(q)) return 2;
  if (slug.includes(q)) return 3;
  if (desc.includes(q)) return 4;
  if (category.includes(q)) return 5;
  return 99;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() ?? '';
    const limit = Math.min(Math.max(Number(searchParams.get('limit') ?? 20), 1), 50);
    if (!q) {
      return NextResponse.json({ items: [] });
    }

    const staticPosts = allPosts.filter((p) => p.category !== 'aws-aif');
    const { items: aifPosts } = await searchQuestionPosts({
      category: 'aws-aif',
      query: q,
      page: 1,
      pageSize: 100,
    });

    const merged = [
      ...staticPosts.map((p) => toSearchable(p, p.tags)).filter((v): v is SearchablePost => v !== null),
      ...aifPosts
        .map((p) => toSearchable(p, p.tags))
        .filter((v): v is SearchablePost => v !== null),
    ];

    const normalizedQ = normalize(q);
    const filtered = merged.filter((item) => {
      const haystack = `${normalize(item.title)} ${normalize(item.description)} ${normalize(item.slug)} ${normalize(item.category)}`;
      return haystack.includes(normalizedQ);
    });

    filtered.sort((a, b) => rankMatch(a, q) - rankMatch(b, q));

    return NextResponse.json({
      items: filtered.slice(0, limit),
    });
  } catch (error) {
    console.error('[api/search/posts] failed', error);
    return new NextResponse('Search failed', { status: 500 });
  }
}

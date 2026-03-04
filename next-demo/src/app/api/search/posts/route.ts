import { NextResponse } from 'next/server';

import { allPosts } from '@/lib/blog-posts';
import { getFrontendArticlesByFramework } from '@/lib/frontend-articles-repository';
import { searchQuestionPosts } from '@/lib/questions-repository';

export const dynamic = 'force-dynamic';

type SearchCategory = 'AWS SAA' | 'AWS AIF' | 'Frontend';

interface SearchablePost {
  title: string;
  description: string;
  slug: string;
  category: SearchCategory;
  href: string;
  searchableText?: string;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

function mapCategory(category: string): SearchCategory | null {
  if (category === 'aws-saa') return 'AWS SAA';
  if (category === 'aws-aif') return 'AWS AIF';
  if (category === 'frontend') return 'Frontend';
  return null;
}

function mapHref(category: string, id: string, framework?: string) {
  if (category === 'aws-saa') return `/blog/aws-saa/${id}`;
  if (category === 'aws-aif') return `/blog/aws-aif/${id}`;
  if (category === 'frontend' && framework) return `/blog/frontend/${framework}/${id}`;
  return null;
}

function toSearchable(
  post: { id: string; title: string; description: string; category: string; framework?: string },
  tags: string[]
): SearchablePost | null {
  const category = mapCategory(post.category);
  const href = mapHref(post.category, post.id, post.framework);
  if (!category || !href) return null;

  return {
    title: post.title,
    description: post.description,
    slug: post.id,
    category,
    href,
    searchableText: `${post.title} ${post.description} ${post.id} ${post.category} ${post.framework ?? ''} ${tags.join(' ')}`,
  };
}

function rankMatch(item: SearchablePost, query: string) {
  const q = normalize(query);
  const title = normalize(item.title);
  const desc = normalize(item.description);
  const slug = normalize(item.slug);
  const category = normalize(item.category);
  const searchableText = normalize(item.searchableText ?? '');

  if (title.startsWith(q)) return 1;
  if (title.includes(q)) return 2;
  if (slug.includes(q)) return 3;
  if (desc.includes(q)) return 4;
  if (category.includes(q)) return 5;
  if (searchableText.includes(q)) return 6;
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
    const [reactPosts, vuePosts, nextjsPosts] = await Promise.all([
      getFrontendArticlesByFramework('react'),
      getFrontendArticlesByFramework('vue'),
      getFrontendArticlesByFramework('nextjs'),
    ]);
    const frontendPosts = [...reactPosts, ...vuePosts, ...nextjsPosts].map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      category: 'frontend',
      framework: post.framework,
      tags: post.tags,
    }));
    const { items: aifPosts } = await searchQuestionPosts({
      category: 'aws-aif',
      query: q,
      page: 1,
      pageSize: 100,
    });

    const merged = [
      ...staticPosts.map((p) => toSearchable(p, p.tags)).filter((v): v is SearchablePost => v !== null),
      ...frontendPosts
        .map((p) => toSearchable(p, p.tags))
        .filter((v): v is SearchablePost => v !== null),
      ...aifPosts
        .map((p) => toSearchable(p, p.tags))
        .filter((v): v is SearchablePost => v !== null),
    ];

    const normalizedQ = normalize(q);
    const filtered = merged.filter((item) => {
      const haystack = `${normalize(item.title)} ${normalize(item.description)} ${normalize(item.slug)} ${normalize(item.category)} ${normalize(item.searchableText ?? '')}`;
      return haystack.includes(normalizedQ);
    });

    filtered.sort((a, b) => rankMatch(a, q) - rankMatch(b, q));

    return NextResponse.json({
      items: filtered.slice(0, limit).map(({ searchableText: _searchableText, ...item }) => item),
    });
  } catch (error) {
    console.error('[api/search/posts] failed', error);
    return new NextResponse('Search failed', { status: 500 });
  }
}

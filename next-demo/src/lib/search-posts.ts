import { allPosts } from '@/lib/blog-posts';

type SearchCategory = 'AWS SAA' | 'AWS AIF';

export interface SearchablePost {
  title: string;
  description: string;
  slug: string;
  category: SearchCategory;
  href: string;
}

function getCategoryLabel(category: string): SearchCategory | null {
  if (category === 'aws-saa') return 'AWS SAA';
  if (category === 'aws-aif') return 'AWS AIF';
  return null;
}

function getCategoryHref(category: string): string | null {
  if (category === 'aws-saa') return '/blog/aws-saa';
  if (category === 'aws-aif') return '/blog/aws-aif';
  return null;
}

const SEARCHABLE_POSTS: SearchablePost[] = allPosts
  .map((post) => {
    const label = getCategoryLabel(post.category);
    const baseHref = getCategoryHref(post.category);

    if (!label || !baseHref) return null;

    return {
      title: post.title,
      description: post.description,
      slug: post.id,
      category: label,
      href: `${baseHref}/${post.id}`,
    };
  })
  .filter((post): post is SearchablePost => post !== null);

export function searchPosts(query: string): SearchablePost[] {
  const normalizedQuery = query.toLowerCase().replace(/\s+/g, '');
  if (!normalizedQuery) return [];

  return SEARCHABLE_POSTS.filter((post) => {
    const title = post.title.toLowerCase().replace(/\s+/g, '');
    const description = post.description.toLowerCase().replace(/\s+/g, '');
    const category = post.category.toLowerCase().replace(/\s+/g, '');
    const slug = post.slug.toLowerCase().replace(/\s+/g, '');

    return (
      title.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      category.includes(normalizedQuery) ||
      slug.includes(normalizedQuery)
    );
  });
}

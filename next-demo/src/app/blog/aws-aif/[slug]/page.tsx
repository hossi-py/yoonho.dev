import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AwsSaaPostLayout } from '@/components/blog/AwsSaaPostLayout';
import { allPosts, getAdjacentPosts, getPostsByCategory } from '@/lib/blog-posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostsByCategory('aws-aif').map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.id === slug && p.category === 'aws-aif');
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function AwsAifPostPage({ params }: PageProps) {
  const { slug } = await params;

  let content;
  try {
    content = (await import(`@/content/aws-aif/${slug}`)).default;
  } catch {
    notFound();
  }

  const { prev, next } = getAdjacentPosts('aws-aif', slug);

  return (
    <AwsSaaPostLayout
      meta={{
        ...content.meta,
        postId: slug,
      }}
      diagram={content.diagram}
      analyze={content.analyze}
      services={content.services}
      deepDive={content.deepDive}
      navigation={{
        prev: prev ? { id: prev.id, title: prev.title, category: prev.category } : null,
        next: next ? { id: next.id, title: next.title, category: next.category } : null,
      }}
      seriesLabel="AWS AIF-C01"
      listHref="/blog/aws-aif"
      listLabel="카테고리 목록"
    />
  );
}

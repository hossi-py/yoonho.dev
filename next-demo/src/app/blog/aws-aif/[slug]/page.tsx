import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AifQuestionSummaryDiagram } from '@/components/blog/AifQuestionSummaryDiagram';
import { AwsSaaPostLayout } from '@/components/blog/AwsSaaPostLayout';
import { toAwsPostContent } from '@/lib/question-layout';
import {
  getAdjacentQuestionPosts,
  getQuestionById,
  getQuestionPostMetaById,
  getQuestionPostsByCategory,
} from '@/lib/questions-repository';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const dbPosts = (await getQuestionPostsByCategory('aws-aif')).map((post) => post.id);
  return dbPosts.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbPost = await getQuestionPostMetaById(slug);
  if (!dbPost) return {};

  return {
    title: dbPost.title,
    description: dbPost.description,
  };
}

export default async function AwsAifPostPage({ params }: PageProps) {
  const { slug } = await params;
  const question = await getQuestionById(slug);

  if (!question) {
    notFound();
  }

  const content = toAwsPostContent(question);
  const dbNav = await getAdjacentQuestionPosts('aws-aif', slug);

  return (
    <AwsSaaPostLayout
      meta={{
        ...content.meta,
        postId: slug,
      }}
      diagram={<AifQuestionSummaryDiagram question={question} />}
      analyze={content.analyze}
      services={content.services}
      deepDive={content.deepDive}
      navigation={{
        prev: dbNav.prev ? { id: dbNav.prev.id, title: dbNav.prev.title, category: dbNav.prev.category } : null,
        next: dbNav.next ? { id: dbNav.next.id, title: dbNav.next.title, category: dbNav.next.category } : null,
      }}
      seriesLabel="AWS AIF-C01"
      listHref="/blog/aws-aif"
      listLabel="카테고리 목록"
    />
  );
}

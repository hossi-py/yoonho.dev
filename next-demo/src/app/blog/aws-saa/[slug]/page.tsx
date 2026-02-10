import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AwsSaaPostLayout } from "@/components/blog/AwsSaaPostLayout";
import {
  allPosts,
  getAdjacentPosts,
  getPostsByCategory,
} from "@/lib/blog-posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ── SSG: 빌드 시 모든 slug를 정적 생성 ── */
export async function generateStaticParams() {
  return getPostsByCategory("aws-saa").map((post) => ({
    slug: post.id,
  }));
}

/* ── SEO: slug 별 메타데이터 ── */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.id === slug && p.category === "aws-saa");
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

/* ── 페이지 컴포넌트 ── */
export default async function AwsSaaPostPage({ params }: PageProps) {
  const { slug } = await params;

  // 콘텐츠 모듈 동적 import
  let content;
  try {
    content = (await import(`@/content/aws-saa/${slug}`)).default;
  } catch {
    notFound();
  }

  // 이전/다음 게시물 네비게이션
  const { prev, next } = getAdjacentPosts("aws-saa", slug);

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
        prev: prev
          ? { id: prev.id, title: prev.title, category: prev.category }
          : null,
        next: next
          ? { id: next.id, title: next.title, category: next.category }
          : null,
      }}
    />
  );
}

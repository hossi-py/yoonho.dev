import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { FrontendLatestBoard } from '@/components/blog/frontend/FrontendLatestBoard';
import { FrontendTrackShowcase } from '@/components/blog/frontend/FrontendTrackShowcase';
import {
  getFrontendArticlesByFramework,
  getFrontendFrameworkCounts,
} from '@/lib/frontend-articles-repository';

export const metadata: Metadata = {
  title: 'Frontend',
  description: 'React, Vue, Next.js를 프레임워크별로 정리한 프론트엔드 학습 블로그',
};

export default async function FrontendPage() {
  const [counts, reactPosts, vuePosts, nextPosts] = await Promise.all([
    getFrontendFrameworkCounts(),
    getFrontendArticlesByFramework('react'),
    getFrontendArticlesByFramework('vue'),
    getFrontendArticlesByFramework('nextjs'),
  ]);

  const allPosts = [...reactPosts, ...vuePosts, ...nextPosts].sort((a, b) => {
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateDiff !== 0) return dateDiff;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_48%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_48%)]" />
        <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-8 md:px-6 md:pb-16 md:pt-12">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-slate-200"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            카테고리 목록
          </Link>

          <FrontendTrackShowcase
            total={counts.total}
            counts={{ react: counts.react, vue: counts.vue, nextjs: counts.nextjs }}
          />
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-7 md:px-6 md:py-9">
        <section className="relative pt-3 md:pt-4">
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent dark:via-slate-700/90" />
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-900 md:text-[1.4rem] dark:text-slate-100">
              Frontend 최신 글
            </h2>
          </div>

          <FrontendLatestBoard
            posts={allPosts}
            counts={{ react: counts.react, vue: counts.vue, nextjs: counts.nextjs }}
          />
        </section>
      </main>
    </div>
  );
}

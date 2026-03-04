import { ChevronLeft, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { FrontendLatestBoard } from '@/components/blog/frontend/FrontendLatestBoard';
import { Badge } from '@/components/ui/badge';
import {
  getFrontendArticlesByFramework,
  getFrontendFrameworkCounts,
} from '@/lib/frontend-articles-repository';

export const metadata: Metadata = {
  title: 'Frontend / Vue',
  description: 'Vue 학습 글 모음',
};

export default async function FrontendVuePage() {
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
      <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <Link
          href="/blog/frontend"
          className="mb-8 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-slate-200"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Frontend 목록
        </Link>

        <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white px-4 py-6 shadow-sm md:px-7 md:py-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_45%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.1),_transparent_45%)]" />
          <div className="relative mb-7">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              <Badge variant="secondary" className="rounded-full px-2.5 py-1 text-[11px]">
                Vue Focus
              </Badge>
            </div>
            <h1 className="text-xl font-semibold tracking-[-0.02em] text-slate-900 md:text-2xl dark:text-slate-100">
              Vue 글 모아보기
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-[15px] dark:text-slate-300">
              기본 필터는 Vue로 맞춰두었고, 같은 영역에서 React/Next.js로 바로 전환할 수 있습니다.
            </p>
          </div>
          <div className="relative">
            <FrontendLatestBoard
              posts={allPosts}
              counts={{ react: counts.react, vue: counts.vue, nextjs: counts.nextjs }}
              initialFilter="vue"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

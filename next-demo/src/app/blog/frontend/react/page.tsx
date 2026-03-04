import { ChevronLeft, Component, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { FrontendArticleList } from '@/components/blog/frontend/FrontendArticleList';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getFrontendArticlesByFramework } from '@/lib/frontend-articles-repository';

export const metadata: Metadata = {
  title: 'Frontend / React',
  description: 'React 공식 문서 기반 학습 글 모음',
};

export default async function FrontendReactPage() {
  const posts = await getFrontendArticlesByFramework('react');
  const latest = posts[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.14),_transparent_52%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_52%)]" />
        <div className="relative mx-auto max-w-5xl px-4 md:px-6 pt-8 pb-12 md:pt-12 md:pb-16">
          <Link
            href="/blog/frontend"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Frontend 목록
          </Link>

          <div className="grid gap-7 md:grid-cols-[1.2fr_0.8fr] md:gap-12 items-start">
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <Badge className="bg-sky-600 text-white hover:bg-sky-700">React Track</Badge>
                <Badge variant="outline" className="border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                  {posts.length} posts
                </Badge>
              </div>
              <h1 className="text-[2.05rem] md:text-[3.2rem] font-semibold tracking-[-0.04em] leading-[1.08] text-slate-900 dark:text-slate-100">
                React를
                <br />
                설계 관점으로 읽는 기록
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                개념 요약보다 판단 기준을 남깁니다. 컴포넌트 경계, 상태 흐름, 렌더링 모델을 실무 맥락으로 연결합니다.
              </p>
            </div>

            <Card className="rounded-3xl border-slate-200/90 dark:border-slate-700 bg-white/95 dark:bg-slate-900/80 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                  <Component className="h-4 w-4 text-sky-500" />
                  Latest
                </div>
                {latest ? (
                  <>
                    <p className="mt-4 text-base font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100 line-clamp-2">
                      {latest.title}
                    </p>
                    <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{latest.description}</p>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">아직 글이 없습니다.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 md:px-6 py-10 md:py-12">
        <section className="rounded-3xl border border-slate-200/90 bg-white px-4 py-6 md:px-7 md:py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-500" />
            <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">
              모든 React 글
            </h2>
          </div>
          <FrontendArticleList framework="react" posts={posts} />
        </section>
      </main>
    </div>
  );
}

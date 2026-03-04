import { ArrowRight, ChevronLeft, Layout, Sparkles, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { FrontendArticleList } from '@/components/blog/frontend/FrontendArticleList';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  getFrontendArticlesByFramework,
  getFrontendFrameworkCounts,
} from '@/lib/frontend-articles-repository';

export const metadata: Metadata = {
  title: 'Frontend',
  description: 'React, Vue, Next.js를 프레임워크별로 정리한 프론트엔드 학습 블로그',
};

const TRACKS: Array<{
  id: 'react' | 'vue' | 'nextjs';
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tone: string;
}> = [
  {
    id: 'react',
    title: 'React',
    subtitle: 'UI Engineering',
    description: '문서 개념을 실무 설계 기준으로 재해석합니다.',
    href: '/blog/frontend/react',
    tone: 'from-sky-500/15 to-blue-500/5 border-sky-200/70 dark:border-sky-800/70',
  },
  {
    id: 'vue',
    title: 'Vue',
    subtitle: 'Composition Patterns',
    description: '컴포지션 API 중심의 유지보수 패턴을 다룹니다.',
    href: '/blog/frontend/vue',
    tone: 'from-emerald-500/15 to-teal-500/5 border-emerald-200/70 dark:border-emerald-800/70',
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    subtitle: 'Production Runtime',
    description: 'App Router와 서버 경계 설계를 실전 기준으로 정리합니다.',
    href: '/blog/frontend/nextjs',
    tone: 'from-slate-500/15 to-slate-900/5 border-slate-300/80 dark:border-slate-700/70',
  },
];

export default async function FrontendPage() {
  const [{ total, react, vue, nextjs }, reactPosts] = await Promise.all([
    getFrontendFrameworkCounts(),
    getFrontendArticlesByFramework('react'),
  ]);

  const trackCountMap: Record<'react' | 'vue' | 'nextjs', number> = {
    react,
    vue,
    nextjs,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_48%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_48%)]" />
        <div className="relative mx-auto max-w-5xl px-4 md:px-6 pt-8 pb-12 md:pt-12 md:pb-16">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            카테고리 목록
          </Link>

          <div className="grid gap-7 md:grid-cols-[1.2fr_0.8fr] md:gap-12 items-start">
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <Badge className="bg-sky-600 text-white hover:bg-sky-700">Frontend Archive</Badge>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Weekly updated
                </span>
              </div>
              <h1 className="text-[2.05rem] md:text-[3.2rem] font-semibold tracking-[-0.04em] leading-[1.08] text-slate-900 dark:text-slate-100">
                읽기 쉬운 구조로,
                <br />
                오래 남는 프론트엔드 기록
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                React, Vue, Next.js를 각각의 트랙으로 분리해 누적합니다. 문법 요약보다 설계 기준과 디버깅 판단력에 초점을 둡니다.
              </p>
            </div>

            <Card className="rounded-3xl border-slate-200/90 dark:border-slate-700 bg-white/95 dark:bg-slate-900/80 shadow-sm">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Coverage</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Metric label="Total" value={total} />
                  <Metric label="React" value={react} />
                  <Metric label="Vue" value={vue} />
                  <Metric label="Next.js" value={nextjs} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {TRACKS.map((track) => (
              <Link key={track.id} href={track.href}>
                <Card className={`h-full rounded-2xl border bg-gradient-to-br ${track.tone} bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}>
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.11em] text-slate-500 dark:text-slate-400">{track.subtitle}</p>
                      <Badge variant="secondary" className="bg-white/80 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {trackCountMap[track.id]}
                      </Badge>
                    </div>
                    <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">{track.title}</h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{track.description}</p>
                    <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                      트랙 보기
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 md:px-6 py-10 md:py-12">
        <section className="rounded-3xl border border-slate-200/90 bg-white px-4 py-6 md:px-7 md:py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-500" />
            <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">
              React 최신 글
            </h2>
          </div>
          <FrontendArticleList framework="react" posts={reactPosts.slice(0, 3)} />
        </section>
      </main>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700 px-3 py-3">
      <p className="text-[11px] uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  );
}

import { ChevronLeft, Layout } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { FrontendArticleList } from '@/components/blog/frontend/FrontendArticleList';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  description: string;
  href: string;
}> = [
  {
    id: 'react',
    title: 'React',
    description: 'UI 모델과 렌더링 사고법을 문서 기반으로 깊이 있게 정리합니다.',
    href: '/blog/frontend/react',
  },
  {
    id: 'vue',
    title: 'Vue',
    description: 'Composition API 중심의 실전 패턴을 단계적으로 누적합니다.',
    href: '/blog/frontend/vue',
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    description: 'App Router, 서버 컴포넌트, 캐싱 전략을 실무 기준으로 다룹니다.',
    href: '/blog/frontend/nextjs',
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
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-6 md:mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            카테고리 목록
          </Link>

          <div className="flex items-start md:items-center gap-4 md:gap-6 flex-col md:flex-row">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <Layout className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-nunito">
                  Frontend
                </h1>
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0 text-xs md:text-sm">
                  {total} Posts
                </Badge>
              </div>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                React, Vue, Next.js를 트랙별로 분리해 문서 기반 학습 글을 누적합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-10">
        <section className="grid md:grid-cols-3 gap-4">
          {TRACKS.map((track) => (
            <Link key={track.id} href={track.href}>
              <Card className="h-full hover:shadow-md transition-shadow border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {track.title}
                    <Badge variant="outline">{trackCountMap[track.id]}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                  {track.description}
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
            React 최신 글
          </h2>
          <FrontendArticleList framework="react" posts={reactPosts.slice(0, 3)} />
        </section>
      </div>
    </div>
  );
}


import { ChevronLeft, Component } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { FrontendArticleList } from '@/components/blog/frontend/FrontendArticleList';
import { Badge } from '@/components/ui/badge';
import { getFrontendArticlesByFramework } from '@/lib/frontend-articles-repository';

export const metadata: Metadata = {
  title: 'Frontend / React',
  description: 'React 공식 문서 기반 학습 글 모음',
};

export default async function FrontendReactPage() {
  const posts = await getFrontendArticlesByFramework('react');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <Link
            href="/blog/frontend"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-6 md:mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Frontend 목록
          </Link>

          <div className="flex items-start md:items-center gap-4 md:gap-6 flex-col md:flex-row">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center shrink-0">
              <Component className="w-8 h-8 md:w-10 md:h-10 text-sky-500" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-nunito">
                  React
                </h1>
                <Badge className="bg-sky-500 hover:bg-sky-600 text-white border-0 text-xs md:text-sm">
                  {posts.length} Posts
                </Badge>
              </div>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                공식 문서를 실무에 바로 적용할 수 있도록 정리합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <FrontendArticleList framework="react" posts={posts} />
      </div>
    </div>
  );
}

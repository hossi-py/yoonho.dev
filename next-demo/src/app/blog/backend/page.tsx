import { ChevronLeft, Construction, Server } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getCategoryCount } from '@/lib/blog-posts';

export const metadata: Metadata = {
  title: 'Backend',
  description: 'NestJS, Spring Boot, System Design 등 백엔드 기술을 다루는 블로그 카테고리',
};

export default function BackendPage() {
  const count = getCategoryCount('backend');

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
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
              <Server className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-nunito">
                  Backend
                </h1>
                <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 text-xs md:text-sm">
                  {count} Posts
                </Badge>
              </div>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                NestJS, Spring Boot, System Design 등 백엔드 기술을 다룹니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <Card className="border-2 border-dashed border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center gap-4">
            <Construction className="w-12 h-12 text-green-400" />
            <h2 className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-200">
              콘텐츠 준비 중입니다
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              백엔드 관련 글이 곧 업데이트될 예정입니다. 기대해 주세요! 🚀
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

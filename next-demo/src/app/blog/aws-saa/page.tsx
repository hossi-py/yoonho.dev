import { ChevronLeft, Cloud } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { AwsSaaPostList } from '@/components/blog/AwsSaaPostList';
import { Badge } from '@/components/ui/badge';
import { getPostsByCategory } from '@/lib/blog-posts';

export const metadata: Metadata = {
  title: 'AWS SAA - Solutions Architect Associate',
  description:
    'AWS Solutions Architect Associate 자격증 준비를 위한 핵심 개념과 아키텍처 패턴을 정리합니다.',
};

export default function AwsSaaPage() {
  const posts = getPostsByCategory('aws-saa');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Category Header */}
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
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
              <Cloud className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-nunito">
                  AWS SAA
                </h1>
                <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 text-xs md:text-sm">
                  {posts.length} Posts
                </Badge>
              </div>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                AWS Solutions Architect Associate 자격증 준비를 위한 핵심 개념과 아키텍처 패턴을
                <br />
                정리합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid — Client Component */}
      <AwsSaaPostList posts={posts} />
    </div>
  );
}

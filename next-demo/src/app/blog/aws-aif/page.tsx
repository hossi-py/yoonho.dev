import { ChevronLeft, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { AwsAifPostList } from '@/components/blog/AwsAifPostList';
import { Badge } from '@/components/ui/badge';
import { getQuestionPostsByCategory } from '@/lib/questions-repository';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'AWS AIF-C01 - AI Practitioner',
  description: 'AWS Certified AI Practitioner (AIF-C01) 문제를 실전형 해설로 정리한 카테고리',
};

export default async function AwsAifPage() {
  const posts = await getQuestionPostsByCategory('aws-aif');

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
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-cyan-500" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-nunito">
                  AWS AIF-C01
                </h1>
                <Badge className="bg-cyan-500 hover:bg-cyan-600 text-white border-0 text-xs md:text-sm">
                  {posts.length} Posts
                </Badge>
              </div>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                AWS Certified AI Practitioner 문제를
                <br />
                정리한 아카이브입니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AwsAifPostList posts={posts} />
    </div>
  );
}

import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getFrontendArticlesByFramework } from '@/lib/frontend-articles-repository';

export const metadata: Metadata = {
  title: 'Frontend / Vue',
  description: 'Vue 학습 글 모음',
};


export default async function FrontendVuePage() {
  const posts = await getFrontendArticlesByFramework('vue');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <Link href="/blog/frontend" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-5">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Frontend 목록
        </Link>
        <h1 className="text-3xl font-bold mb-3">Vue</h1>
        <Badge className="mb-6">{posts.length} Posts</Badge>
        <Card>
          <CardContent className="py-10 text-slate-600 dark:text-slate-300">
            Vue 문서 기반 글은 다음 배치에서 추가합니다.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


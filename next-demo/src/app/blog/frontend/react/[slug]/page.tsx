import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { FrontendArticleContent } from '@/components/blog/frontend/FrontendArticleContent';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  getAdjacentFrontendArticles,
  getFrontendArticleById,
  getFrontendArticleMetaById,
  getFrontendArticlesByFramework,
} from '@/lib/frontend-articles-repository';

interface PageProps {
  params: Promise<{ slug: string }>;
}


export async function generateStaticParams() {
  const posts = await getFrontendArticlesByFramework('react');
  return posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getFrontendArticleMetaById(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function ReactArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getFrontendArticleById(slug);

  if (!article || article.framework !== 'react') {
    notFound();
  }

  const nav = await getAdjacentFrontendArticles('react', slug);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="pt-8 pb-10 px-4 md:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog/frontend/react"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            React 목록
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-sky-500 hover:bg-sky-600 text-white">React</Badge>
              <Badge variant="outline">{article.date}</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
              {article.title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {article.description}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 py-10 md:py-12">
        <div className="max-w-4xl mx-auto">
          <FrontendArticleContent article={article} />
        </div>
      </section>

      {(nav.prev || nav.next) && (
        <section className="px-4 md:px-6 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {nav.prev ? (
              <Link href={`/blog/frontend/react/${nav.prev.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-start gap-3">
                    <ChevronLeft className="w-5 h-5 text-slate-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-500 mb-1">이전 글</div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {nav.prev.title}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div />
            )}

            {nav.next ? (
              <Link href={`/blog/frontend/react/${nav.next.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-start justify-end gap-3 text-right">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">다음 글</div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {nav.next.title}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500 mt-0.5" />
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}
    </div>
  );
}


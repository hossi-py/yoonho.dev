import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { FrontendArticleContent } from '@/components/blog/frontend/FrontendArticleContent';
import { Badge } from '@/components/ui/badge';
import {
  getAdjacentFrontendArticles,
  getFrontendArticleById,
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
  const article = await getFrontendArticleById(slug);
  if (!article || article.framework !== 'react') return {};

  return {
    title: `${article.title} | Frontend React`,
    description: article.description,
  };
}

export default async function FrontendReactPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getFrontendArticleById(slug);

  if (!article || article.framework !== 'react') {
    notFound();
  }

  const { prev, next } = await getAdjacentFrontendArticles('react', article.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-12">
        <Link
          href="/blog/frontend/react"
          className="mb-6 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-slate-200"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          {'React \uBAA9\uB85D'}
        </Link>

        <header className="mb-8 border-b border-slate-200 pb-7 dark:border-slate-800 md:pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge className="bg-sky-600 text-white hover:bg-sky-700">React</Badge>
            <Badge variant="outline" className="rounded-full text-xs">
              {'\uB09C\uC774\uB3C4'} {article.difficulty}
            </Badge>
            <span className="text-xs text-slate-500 dark:text-slate-400">{article.date}</span>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Frontend / React
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-slate-900 dark:text-slate-100 md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-[15px]">
            {article.description}
          </p>
        </header>

        <FrontendArticleContent article={article} />

        <nav className="mt-8 grid gap-3 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/blog/frontend/react/${prev.id}`}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition-colors hover:text-sky-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-sky-400"
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">{'\uC774\uC804 \uAE00'}</p>
              <p className="mt-1 line-clamp-2">{prev.title}</p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/frontend/react/${next.id}`}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right text-sm text-slate-700 transition-colors hover:text-sky-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-sky-400"
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">{'\uB2E4\uC74C \uAE00'}</p>
              <p className="mt-1 line-clamp-2">{next.title}</p>
              <ChevronRight className="ml-auto mt-1 h-4 w-4" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </main>
    </div>
  );
}

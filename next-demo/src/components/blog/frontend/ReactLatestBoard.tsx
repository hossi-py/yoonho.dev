'use client';

import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { FrontendArticleListItem } from '@/lib/frontend-article-types';

type SortKey = 'latest' | 'short' | 'difficulty';

const SORT_OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: 'latest', label: '최신순' },
  { key: 'short', label: '짧게 읽기' },
  { key: 'difficulty', label: '입문 우선' },
];

const DIFFICULTY_WEIGHT: Record<FrontendArticleListItem['difficulty'], number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

interface ReactLatestBoardProps {
  posts: FrontendArticleListItem[];
}

export function ReactLatestBoard({ posts }: ReactLatestBoardProps) {
  const [sortKey, setSortKey] = useState<SortKey>('latest');

  const sortedPosts = useMemo(() => {
    const list = [...posts];

    if (sortKey === 'short') {
      return list.sort((a, b) => a.readTimeMinutes - b.readTimeMinutes);
    }

    if (sortKey === 'difficulty') {
      return list.sort((a, b) => {
        const diff = DIFFICULTY_WEIGHT[a.difficulty] - DIFFICULTY_WEIGHT[b.difficulty];
        if (diff !== 0) {
          return diff;
        }
        return a.readTimeMinutes - b.readTimeMinutes;
      });
    }

    return list;
  }, [posts, sortKey]);

  if (posts.length === 0) {
    return (
      <Card className="rounded-2xl border-dashed border-slate-300 bg-slate-50/70 dark:border-slate-700 dark:bg-slate-900/50">
        <CardContent className="py-12 text-center text-slate-500 dark:text-slate-400">
          아직 등록된 글이 없습니다.
        </CardContent>
      </Card>
    );
  }

  const [featured, ...rest] = sortedPosts;

  return (
    <div>
      <div className="mb-5 inline-flex rounded-full border border-slate-200/90 bg-slate-100/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
        {SORT_OPTIONS.map((option) => {
          const active = option.key === sortKey;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => setSortKey(option.key)}
              className={[
                'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                active
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
              ].join(' ')}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 md:grid-cols-12 md:gap-4">
        <Link
          href={`/blog/frontend/react/${featured.id}`}
          className="group md:col-span-7 xl:col-span-8"
        >
          <Card className="h-full rounded-3xl border-slate-200/90 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
            <CardContent className="space-y-4 p-6 md:p-7">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Badge className="rounded-full bg-sky-600 text-white hover:bg-sky-700">Featured</Badge>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {featured.date}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                  <Clock3 className="h-3.5 w-3.5" />
                  {featured.readTimeMinutes} min
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-slate-900 transition-colors group-hover:text-sky-600 md:text-[1.8rem] dark:text-slate-100 dark:group-hover:text-sky-400">
                  {featured.title}
                </h3>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-sky-500" />
              </div>

              <p className="text-sm leading-relaxed text-slate-600 md:text-[15px] dark:text-slate-300">
                {featured.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="rounded-full text-xs">
                  {featured.difficulty}
                </Badge>
                {featured.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>

        <div className="grid gap-3 md:col-span-5 xl:col-span-4">
          {rest.map((post) => (
            <Link key={post.id} href={`/blog/frontend/react/${post.id}`} className="group">
              <Card className="rounded-2xl border-slate-200/90 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                      <Clock3 className="h-3.5 w-3.5" />
                      {post.readTimeMinutes} min
                    </span>
                    <Badge variant="outline" className="rounded-full text-[11px]">
                      {post.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-[1.02rem] font-semibold leading-snug tracking-[-0.01em] text-slate-900 transition-colors group-hover:text-sky-600 dark:text-slate-100 dark:group-hover:text-sky-400">
                      {post.title}
                    </h4>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-sky-500" />
                  </div>

                  <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {post.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

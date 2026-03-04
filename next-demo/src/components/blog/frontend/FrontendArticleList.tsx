import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { FrontendArticleListItem } from '@/lib/frontend-article-types';

interface FrontendArticleListProps {
  framework: 'react' | 'vue' | 'nextjs';
  posts: FrontendArticleListItem[];
}

export function FrontendArticleList({ framework, posts }: FrontendArticleListProps) {
  if (posts.length === 0) {
    return (
      <Card className="rounded-2xl border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/50">
        <CardContent className="py-12 text-center text-slate-500 dark:text-slate-400">
          아직 등록된 글이 없습니다.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:gap-5">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/frontend/${framework}/${post.id}`}>
          <Card className="group rounded-2xl border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <CardContent className="p-6 md:p-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1">
                  <Clock3 className="w-3.5 h-3.5" />
                  {post.readTimeMinutes} min
                </span>
                <Badge variant="outline" className="text-xs rounded-full">
                  {post.difficulty}
                </Badge>
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl md:text-[1.65rem] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100 leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {post.title}
                </h3>
                <ArrowUpRight className="h-4 w-4 mt-1 text-slate-400 group-hover:text-sky-500 transition-colors shrink-0" />
              </div>

              <p className="text-sm md:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{post.description}</p>

              <div className="flex flex-wrap gap-2 pt-0.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

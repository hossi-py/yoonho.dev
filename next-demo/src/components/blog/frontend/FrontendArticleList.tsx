import { CalendarDays, Clock3 } from 'lucide-react';
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
      <Card className="border-dashed">
        <CardContent className="py-12 text-center text-slate-500 dark:text-slate-400">
          아직 등록된 글이 없습니다.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/frontend/${framework}/${post.id}`}>
          <Card className="hover:shadow-md transition-shadow border-slate-200 dark:border-slate-700">
            <CardContent className="p-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="w-3.5 h-3.5" />
                  {post.readTimeMinutes} min
                </span>
                <Badge variant="outline" className="text-xs">
                  {post.difficulty}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{post.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
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


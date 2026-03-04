'use client';

import { ArrowUpRight, CalendarDays, Clock3, GripVertical } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { FrontendArticleListItem, FrontendFramework } from '@/lib/frontend-article-types';

type SortKey = 'latest' | 'short' | 'difficulty';
type FrameworkFilter = 'all' | FrontendFramework;
type BoardOrderState = Record<string, string[]>;

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

const FILTER_META: Array<{ key: FrameworkFilter; label: string }> = [
  { key: 'all', label: '전체' },
  { key: 'react', label: 'React' },
  { key: 'vue', label: 'Vue' },
  { key: 'nextjs', label: 'Next.js' },
];

const MAX_VISIBLE = 5;

interface FrontendLatestBoardProps {
  posts: FrontendArticleListItem[];
  counts: Record<FrontendFramework, number>;
  initialFilter?: FrameworkFilter;
}

function toDateValue(date: string): number {
  return new Date(date).getTime();
}

function applyCustomOrder(items: FrontendArticleListItem[], orderIds?: string[]) {
  if (!orderIds || orderIds.length === 0) {
    return items;
  }

  const byId = new Map(items.map((item) => [item.id, item]));
  const ordered: FrontendArticleListItem[] = [];

  for (const id of orderIds) {
    const matched = byId.get(id);
    if (matched) {
      ordered.push(matched);
      byId.delete(id);
    }
  }

  for (const item of items) {
    if (byId.has(item.id)) {
      ordered.push(item);
      byId.delete(item.id);
    }
  }

  return ordered;
}

function sanitizeState(input: unknown): BoardOrderState {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {};
  }

  const out: BoardOrderState = {};
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (!Array.isArray(v)) continue;
    out[k] = v.filter((x): x is string => typeof x === 'string');
  }
  return out;
}

function itemLayoutClass(index: number) {
  if (index === 0) {
    return 'md:col-span-7 xl:col-span-8';
  }
  return 'md:col-span-5 md:col-start-8 xl:col-span-4 xl:col-start-9';
}

function reorderIds(ids: string[], fromId: string, toId: string) {
  if (fromId === toId) return ids;
  const next = [...ids];
  const from = next.indexOf(fromId);
  const to = next.indexOf(toId);
  if (from < 0 || to < 0) return ids;
  next.splice(from, 1);
  next.splice(to, 0, fromId);
  return next;
}

export function FrontendLatestBoard({
  posts,
  counts,
  initialFilter = 'all',
}: FrontendLatestBoardProps) {
  const [filter, setFilter] = useState<FrameworkFilter>(initialFilter);
  const [sortKey, setSortKey] = useState<SortKey>('latest');
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [customOrderByView, setCustomOrderByView] = useState<BoardOrderState>({});
  const [isOrderLoaded, setIsOrderLoaded] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const viewKey = `${filter}:${sortKey}`;

  useEffect(() => {
    const controller = new AbortController();

    async function loadOrderState() {
      try {
        const res = await fetch('/api/frontend/board-order', {
          method: 'GET',
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!res.ok) {
          setIsOrderLoaded(true);
          return;
        }

        const json = (await res.json()) as { state?: unknown };
        setCustomOrderByView(sanitizeState(json.state));
      } catch {
      } finally {
        setIsOrderLoaded(true);
      }
    }

    loadOrderState();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!isOrderLoaded) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        await fetch('/api/frontend/board-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: customOrderByView }),
          signal: controller.signal,
        });
      } catch {
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [customOrderByView, isOrderLoaded]);

  const processed = useMemo(() => {
    const filtered = filter === 'all' ? posts : posts.filter((post) => post.framework === filter);
    const sorted = [...filtered];

    if (sortKey === 'short') {
      sorted.sort((a, b) => {
        const readDiff = a.readTimeMinutes - b.readTimeMinutes;
        if (readDiff !== 0) return readDiff;
        return toDateValue(b.date) - toDateValue(a.date);
      });
    } else if (sortKey === 'difficulty') {
      sorted.sort((a, b) => {
        const diff = DIFFICULTY_WEIGHT[a.difficulty] - DIFFICULTY_WEIGHT[b.difficulty];
        if (diff !== 0) return diff;
        return a.readTimeMinutes - b.readTimeMinutes;
      });
    } else {
      sorted.sort((a, b) => {
        const dateDiff = toDateValue(b.date) - toDateValue(a.date);
        if (dateDiff !== 0) return dateDiff;
        return a.title.localeCompare(b.title);
      });
    }

    return {
      total: sorted.length,
      visible: sorted.slice(0, MAX_VISIBLE),
    };
  }, [filter, posts, sortKey]);

  if (posts.length === 0) {
    return (
      <Card className="rounded-2xl border-dashed border-slate-300 bg-slate-50/70 dark:border-slate-700 dark:bg-slate-900/50">
        <CardContent className="py-12 text-center text-slate-500 dark:text-slate-400">
          아직 등록된 글이 없습니다.
        </CardContent>
      </Card>
    );
  }

  const orderedVisible = applyCustomOrder(processed.visible, customOrderByView[viewKey]);

  const applyDrop = (targetId: string) => {
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      setDropTargetId(null);
      return;
    }

    setCustomOrderByView((prev) => {
      const currentIds = orderedVisible.map((item) => item.id);
      return {
        ...prev,
        [viewKey]: reorderIds(currentIds, draggingId, targetId),
      };
    });

    setDraggingId(null);
    setDropTargetId(null);
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-slate-200/90 bg-slate-100/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
          {FILTER_META.map((item) => {
            const active = item.key === filter;
            const count = item.key === 'all' ? posts.length : counts[item.key];
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={[
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                  active
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
                ].join(' ')}
              >
                {item.label}
                <span className="text-[11px] text-slate-400 dark:text-slate-500">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-full border border-slate-200/90 bg-slate-100/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
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

          <button
            type="button"
            onClick={() => {
              setIsReorderMode((prev) => !prev);
              setDraggingId(null);
              setDropTargetId(null);
            }}
            className={[
              'inline-flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-medium transition-colors',
              isReorderMode
                ? 'border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300'
                : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-slate-100',
            ].join(' ')}
          >
            <GripVertical className="h-3.5 w-3.5" />
            재배치
          </button>
        </div>
      </div>

      <div className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        총 {processed.total}개 중 {orderedVisible.length}개 표시
        {isReorderMode ? ' · 타깃 카드 위에서 놓으면 깔끔하게 자리 교체됩니다.' : ''}
      </div>

      {orderedVisible.length === 0 ? (
        <Card className="rounded-2xl border-dashed border-slate-300 bg-slate-50/70 dark:border-slate-700 dark:bg-slate-900/50">
          <CardContent className="py-12 text-center text-slate-500 dark:text-slate-400">
            선택한 프레임워크에 등록된 글이 없습니다.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-12 md:gap-4">
          {orderedVisible.map((post, index) => {
            const isFeatured = index === 0;
            const isDragging = draggingId === post.id;
            const isDropTarget = dropTargetId === post.id && draggingId !== post.id;

            const cardBody = (
              <Card
                className={[
                  isFeatured
                    ? 'h-full rounded-3xl border-slate-200/90 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900'
                    : 'rounded-2xl border-slate-200/90 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900',
                  isReorderMode
                    ? 'ring-1 ring-slate-200/80 dark:ring-slate-700 shadow-[0_10px_30px_-18px_rgba(56,189,248,0.72)]'
                    : '',
                  isDragging ? 'opacity-45 scale-[0.99] blur-[0.3px]' : '',
                  isDropTarget ? 'ring-2 ring-sky-300 dark:ring-sky-700' : '',
                ].join(' ')}
              >
                <CardContent className={isFeatured ? 'space-y-4 p-6 md:p-7' : 'space-y-3 p-5'}>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <div className="inline-flex items-center gap-1.5">
                      {isReorderMode ? <GripVertical className="h-3.5 w-3.5 text-slate-400" /> : null}
                      <Badge
                        className={isFeatured ? 'rounded-full bg-sky-600 text-white hover:bg-sky-700' : 'rounded-full'}
                        variant={isFeatured ? 'default' : 'secondary'}
                      >
                        {post.framework.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="inline-flex items-center gap-2">
                      {isFeatured ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {post.date}
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                        <Clock3 className="h-3.5 w-3.5" />
                        {post.readTimeMinutes} min
                      </span>
                      {isFeatured ? (
                        <Badge variant="outline" className="rounded-full text-xs">
                          {post.difficulty}
                        </Badge>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className={
                        isFeatured
                          ? 'text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-slate-900 transition-colors group-hover:text-sky-600 md:text-[1.8rem] dark:text-slate-100 dark:group-hover:text-sky-400'
                          : 'text-[1.02rem] font-semibold leading-snug tracking-[-0.01em] text-slate-900 transition-colors group-hover:text-sky-600 dark:text-slate-100 dark:group-hover:text-sky-400'
                      }
                    >
                      {post.title}
                    </h3>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-sky-500" />
                  </div>

                  <p
                    className={
                      isFeatured
                        ? 'text-sm leading-relaxed text-slate-600 md:text-[15px] dark:text-slate-300'
                        : 'line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300'
                    }
                  >
                    {post.description}
                  </p>

                  {isFeatured ? (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );

            return (
              <div
                key={post.id}
                className={`${itemLayoutClass(index)} ${isReorderMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
                draggable={isReorderMode}
                onDragStart={(e) => {
                  if (!isReorderMode) return;
                  setDraggingId(post.id);
                  e.dataTransfer.effectAllowed = 'move';
                }}
                onDragEnd={() => {
                  setDraggingId(null);
                  setDropTargetId(null);
                }}
                onDragEnter={() => {
                  if (!isReorderMode || !draggingId) return;
                  setDropTargetId(post.id);
                }}
                onDragOver={(e) => {
                  if (!isReorderMode) return;
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => {
                  if (!isReorderMode) return;
                  e.preventDefault();
                  applyDrop(post.id);
                }}
              >
                {isReorderMode ? (
                  cardBody
                ) : (
                  <Link href={`/blog/frontend/${post.framework}/${post.id}`} className="group block">
                    {cardBody}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

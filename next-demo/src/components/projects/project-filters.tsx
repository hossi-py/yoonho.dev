'use client';

import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Briefcase,
  LayoutGrid,
  List,
  Sparkles,
  User,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { PROJECTS } from '@/lib/projects';
import { cn } from '@/lib/utils';

export type FilterType = 'all' | 'company' | 'personal';
export type SortType = 'latest' | 'oldest';
export type ViewMode = 'grid' | 'list';

const FILTERS: {
  value: FilterType;
  label: string;
  icon: typeof Sparkles;
}[] = [
  { value: 'all', label: 'All', icon: Sparkles },
  { value: 'company', label: 'Company', icon: Briefcase },
  { value: 'personal', label: 'Personal', icon: User },
];

function getFilterCount(filter: FilterType): number {
  if (filter === 'all') return PROJECTS.length;
  return PROJECTS.filter((p) => p.category === filter).length;
}

interface ProjectFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

export function ProjectFilters({
  currentFilter,
  onFilterChange,
  currentSort,
  onSortChange,
  viewMode,
  onViewModeChange,
  className,
}: ProjectFiltersProps) {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const filterRefs = useRef<Map<FilterType, HTMLButtonElement>>(new Map());

  // IntersectionObserver for sticky detection
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => setIsSticky(!entry.isIntersecting), {
      threshold: 0,
      rootMargin: '-1px 0px 0px 0px',
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Sliding pill position calculator
  const updatePillPosition = useCallback(() => {
    const el = filterRefs.current.get(currentFilter);
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPillStyle({
      left: elRect.left - parentRect.left,
      width: elRect.width,
    });
  }, [currentFilter]);

  useEffect(() => {
    const frame = requestAnimationFrame(updatePillPosition);
    window.addEventListener('resize', updatePillPosition);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updatePillPosition);
    };
  }, [updatePillPosition]);

  const setFilterRef = useCallback(
    (filter: FilterType) => (el: HTMLButtonElement | null) => {
      if (el) filterRefs.current.set(filter, el);
    },
    []
  );

  return (
    <>
      {/* Sentinel for IntersectionObserver */}
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      <div
        className={cn(
          'sticky top-0 z-40 mb-12 transition-all duration-500 ease-out',
          isSticky && '-mx-4 px-4 py-3 sm:-mx-6 sm:px-6',
          className
        )}
      >
        <div
          className={cn(
            'mx-auto max-w-6xl rounded-2xl border transition-all duration-500 ease-out',
            isSticky
              ? 'border-border/40 bg-background/80 shadow-lg shadow-black/5 backdrop-blur-xl dark:shadow-black/20'
              : 'border-transparent bg-transparent'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between gap-2 transition-all duration-500',
              isSticky ? 'px-3 py-2 sm:px-4 sm:py-3' : 'px-0 py-0'
            )}
          >
            {/* Filter Tabs -- scrollable on mobile */}
            <div className="min-w-0 flex-1 overflow-x-auto [-webkit-overflow-scrolling:touch] scrollbar-hide">
              <nav
                className="relative inline-flex items-center gap-0.5 rounded-xl bg-muted/40 p-1 ring-1 ring-border/50"
                role="tablist"
                aria-label="Filter projects by category"
              >
                {/* Animated sliding pill */}
                <div
                  className="absolute top-1 bottom-1 rounded-lg bg-foreground transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    left: `${pillStyle.left}px`,
                    width: `${pillStyle.width}px`,
                  }}
                  aria-hidden="true"
                />

                {FILTERS.map((filter) => {
                  const Icon = filter.icon;
                  const count = getFilterCount(filter.value);
                  const isActive = currentFilter === filter.value;

                  return (
                    <button
                      key={filter.value}
                      ref={setFilterRef(filter.value)}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => onFilterChange(filter.value)}
                      className={cn(
                        'relative z-10 flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-300',
                        'sm:gap-2 sm:px-4 sm:py-2',
                        'min-h-[44px] min-w-[44px]', // 터치 영역 확보
                        isActive ? 'text-background' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-4 w-4 shrink-0 transition-all duration-300',
                          'sm:h-3.5 sm:w-3.5',
                          'hidden sm:block',
                          isActive ? 'opacity-100' : 'opacity-40'
                        )}
                      />
                      <span className="text-xs sm:text-sm">{filter.label}</span>
                      <span
                        className={cn(
                          'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums transition-all duration-300',
                          isActive
                            ? 'bg-background/20 text-background'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right-side controls */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              {/* Sort Toggle */}
              <button
                onClick={() => onSortChange(currentSort === 'latest' ? 'oldest' : 'latest')}
                className={cn(
                  'group flex items-center gap-1.5 rounded-xl px-2 py-2 text-sm font-medium transition-all duration-200',
                  'sm:gap-2 sm:px-3',
                  'min-h-[44px] min-w-[44px]', // 터치 영역 확보
                  'text-muted-foreground ring-1 ring-transparent hover:bg-muted/40 hover:text-foreground hover:ring-border/50'
                )}
                aria-label={`Sort by ${currentSort === 'latest' ? 'oldest' : 'newest'} first`}
              >
                <span className="hidden text-xs uppercase tracking-widest opacity-40 sm:inline">
                  Sort
                </span>
                <span className="hidden text-foreground text-xs sm:inline sm:text-sm">
                  {currentSort === 'latest' ? 'Newest' : 'Oldest'}
                </span>
                <div className="relative h-4 w-4 overflow-hidden">
                  <ArrowDownWideNarrow
                    className={cn(
                      'absolute inset-0 h-4 w-4 transition-all duration-300 ease-out',
                      currentSort === 'latest'
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-full opacity-0'
                    )}
                  />
                  <ArrowUpNarrowWide
                    className={cn(
                      'absolute inset-0 h-4 w-4 transition-all duration-300 ease-out',
                      currentSort === 'oldest'
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-full opacity-0'
                    )}
                  />
                </div>
              </button>

              {/* Divider */}
              <div className="mx-0.5 hidden h-5 w-px bg-border/60 sm:block" aria-hidden="true" />

              {/* View Mode Toggle */}
              <div
                className="flex items-center gap-0.5 rounded-xl bg-muted/40 p-1 ring-1 ring-border/50"
                role="radiogroup"
                aria-label="View mode"
              >
                {(
                  [
                    { mode: 'grid' as const, icon: LayoutGrid, label: 'Grid view' },
                    { mode: 'list' as const, icon: List, label: 'List view' },
                  ] as const
                ).map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    role="radio"
                    aria-checked={viewMode === mode}
                    aria-label={label}
                    onClick={() => onViewModeChange(mode)}
                    className={cn(
                      'relative rounded-lg p-2 transition-all duration-200',
                      'min-h-[44px] min-w-[44px] flex items-center justify-center', // 터치 영역 확보
                      viewMode === mode
                        ? 'bg-foreground text-background shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

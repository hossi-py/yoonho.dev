'use client';

import { Filter, Grid, LayoutList, SortAsc, SortDesc } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type FilterType = 'all' | 'company' | 'personal';
export type SortType = 'latest' | 'oldest';
export type ViewMode = 'grid' | 'list';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector('main');
    const target = scrollContainer || window;

    const handleScroll = () => {
      const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    target.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

  // Compact 상태: 스크롤됨 AND 호버되지 않음
  const isCompact = isScrolled && !isHovered;

  return (
    <div
      className={cn(
        'sticky z-40 mb-12 flex gap-4 border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
        // 스크롤 여부에 따른 위치 및 기본 스타일
        isScrolled
          ? 'top-6 mr-6 ml-auto rounded-2xl shadow-xl bg-black/40 border-white/10' // 우측 상단 고정
          : 'top-20 mx-auto w-full max-w-5xl rounded-2xl p-2', // 중앙 정렬 (기본)

        // Compact 여부에 따른 Layout 스타일
        isCompact
          ? 'w-fit flex-row items-center px-3 py-2'
          : isScrolled
            ? 'w-auto flex-col p-4 md:flex-row items-center justify-between' // 스크롤 상태에서 펼쳐짐
            : 'flex-col md:flex-row md:items-center md:justify-between', // 기본 상태
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Filter Group */}
      <div
        className={cn(
          'flex items-center gap-1 transition-all duration-500',
          !isCompact && 'rounded-xl bg-muted/20 p-1'
        )}
      >
        {isCompact ? (
          <div className="flex items-center gap-2 px-2 text-sm font-medium text-primary">
            <Filter className="h-4 w-4" />
            <span className="capitalize">{currentFilter}</span>
          </div>
        ) : (
          (['all', 'company', 'personal'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={cn(
                'relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
                currentFilter === filter
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
              )}
            >
              {filter === 'all' && 'All'}
              {filter === 'company' && 'Company'}
              {filter === 'personal' && 'Personal'}
            </button>
          ))
        )}
      </div>

      <div className={cn('flex items-center gap-2', !isCompact && 'gap-4')}>
        {/* Sort Toggle */}
        <button
          onClick={() => onSortChange(currentSort === 'latest' ? 'oldest' : 'latest')}
          className={cn(
            'group flex items-center gap-2 rounded-xl text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-muted/30 hover:text-foreground',
            isCompact ? 'px-2 py-2' : 'px-4 py-2'
          )}
        >
          <span
            className={cn(
              'transition-all duration-300 overflow-hidden',
              isCompact ? 'w-0 opacity-0 hidden' : 'w-auto opacity-70 block'
            )}
          >
            Sort by
          </span>
          <span className={cn('text-foreground', isCompact && 'hidden')}>
            {currentSort === 'latest' ? 'Newest' : 'Oldest'}
          </span>
          {currentSort === 'latest' ? (
            <SortDesc className="h-4 w-4 transition-transform group-hover:scale-110" />
          ) : (
            <SortAsc className="h-4 w-4 transition-transform group-hover:scale-110" />
          )}
        </button>

        <div className="h-6 w-px bg-white/10" />

        {/* View Mode Toggle */}
        <div
          className={cn(
            'flex items-center gap-1 rounded-xl transition-all duration-500',
            !isCompact && 'bg-muted/20 p-1'
          )}
        >
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'rounded-lg transition-all duration-300',
              isCompact ? 'p-2' : 'p-2',
              viewMode === 'grid'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
            )}
            aria-label="Grid View"
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              'rounded-lg transition-all duration-300',
              isCompact ? 'p-2' : 'p-2',
              viewMode === 'list'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
            )}
            aria-label="List View"
          >
            <LayoutList className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

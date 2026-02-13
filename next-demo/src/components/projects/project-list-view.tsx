'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo,useState } from 'react';

import { ProjectCard } from '@/components/projects/project-card';
import {
  type FilterType,
  ProjectFilters,
  type SortType,
  type ViewMode,
} from '@/components/projects/project-filters';
import { ProjectListItem } from '@/components/projects/project-list-item';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/projects';
import { PROJECTS } from '@/lib/projects';
import { cn } from '@/lib/utils';

export function ProjectListView() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('latest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    let result = [...PROJECTS];

    // Filter
    if (filter !== 'all') {
      result = result.filter((p) => p.category === filter);
    }

    // Sort (Assuming original array is sorted by latest)
    if (sort === 'oldest') {
      result = result.reverse();
    }

    return result;
  }, [filter, sort]);

  return (
    <>
      <div className="mx-auto max-w-6xl">
        {/* ✨ Hero Section */}
        <header className="mb-24 relative">
          <div className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-primary/20 blur-3xl animate-pulse" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary px-3 py-1 text-xs tracking-widest uppercase font-bold"
              >
                Portfolio 2026
              </Badge>
              <div className="h-px w-12 bg-border" />
              <span className="text-xs font-mono text-muted-foreground">Updated Feb. 12</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">
              Crafting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                Digital Experiences.
              </span>
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
              사용자 경험에 집착하는 프론트엔드 개발자 황윤호입니다.
              <br />
              <span className="text-foreground font-medium underline decoration-primary/30 underline-offset-4">
                문제 해결 능력
              </span>
              과
              <span className="text-foreground font-medium underline decoration-purple-500/30 underline-offset-4 ml-1">
                기술적 깊이
              </span>
              를 증명하는 프로젝트들을 소개합니다.
            </p>
          </div>

          {/* ✨ Stats */}
          <div className="absolute right-0 bottom-0 hidden md:flex gap-12 border-l border-border pl-12 py-2">
            <div>
              <p className="text-3xl font-bold text-foreground">{PROJECTS.length}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                Projects
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">4+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                Years Exp.
              </p>
            </div>
          </div>
        </header>

        {/* ✨ Filters & Controls */}
        <ProjectFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          currentSort={sort}
          onSortChange={setSort}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* ✨ Project List */}
        <div
          className={cn(
            'min-h-[600px] transition-all duration-500',
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-0'
          )}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => {
              // Grid View: First project is featured (large) if no filter is applied and sorted by latest
              const isfeatured =
                viewMode === 'grid' && filter === 'all' && sort === 'latest' && index === 0;

              return (
                <div
                  key={project.id}
                  className={cn(
                    'animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards',
                    viewMode === 'grid' && isfeatured
                      ? 'md:col-span-2 lg:col-span-2 row-span-2'
                      : 'col-span-1'
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {viewMode === 'grid' ? (
                    <ProjectCard project={project} index={index} featured={isfeatured} />
                  ) : (
                    <ProjectListItem project={project} index={index} />
                  )}
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              조건에 맞는 프로젝트가 없습니다.
            </div>
          )}
        </div>

        {/* ✨ Footer CTA */}
        <footer className="mt-32 border-t border-border/40 pt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Let&apos;s build something amazing together.</h2>
          <p className="text-muted-foreground mb-8">새로운 기회와 협업을 기다립니다.</p>

          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105"
            >
              <span className="mr-2">Contact Me</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shimmer" />
            </Link>

            <a
              href="https://github.com/hossi-py"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 font-medium transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

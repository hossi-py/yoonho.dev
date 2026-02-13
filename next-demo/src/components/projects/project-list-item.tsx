'use client';

import { ArrowUpRight, Calendar, Github, Globe, Terminal } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import type { PROJECTS } from '@/lib/projects';
import { cn } from '@/lib/utils';

export function ProjectListItem({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const isCurrent = index === 0;

  return (
    <div className="group relative border-b border-border/40 py-8 transition-colors hover:bg-muted/5">
      <div className="absolute left-0 top-0 h-full w-[2px] scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100" />

      <div className="flex flex-col gap-6 px-4 md:flex-row md:items-start md:justify-between md:px-8">
        {/* Left: Index & Title & Role */}
        <div className="flex flex-1 flex-col gap-2 md:max-w-xs">
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground/60">
            <span>{String(index + 1).padStart(2, '0')}</span>
            {isCurrent && (
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-500 px-1.5 py-0 text-[10px] uppercase tracking-wider"
              >
                Live
              </Badge>
            )}
          </div>

          <h3 className="text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
            <Link href={project.href} className="focus:outline-none">
              <span className="absolute inset-0 z-10" aria-hidden="true" />
              {project.title}
            </Link>
          </h3>

          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Terminal className="h-3 w-3" />
            <span>{project.role}</span>
          </div>
        </div>

        {/* Center: Description & Tech Stack */}
        <div className="flex flex-[2] flex-col gap-4">
          <p className="line-clamp-2 text-sm text-muted-foreground/80 transition-colors group-hover:text-foreground/90 md:max-w-lg">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-md bg-muted/50 px-2 py-1 text-[10px] font-medium text-muted-foreground border border-border/30"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="inline-flex items-center rounded-md px-2 py-1 text-[10px] font-medium text-muted-foreground">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Right: Meta & Links */}
        <div className="flex flex-col items-end justify-between gap-4 md:items-end">
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
            <Calendar className="h-3 w-3" />
            <span>{project.period.split(' ')[0]}</span>
          </div>

          <div className="flex items-center gap-3 relative z-20">
            {/* External Links (Clickable separately from the card link) */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-background text-muted-foreground transition-all hover:border-foreground/20 hover:text-foreground"
                aria-label="GitHub Repository"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.deployUrl && (
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-background text-muted-foreground transition-all hover:border-foreground/20 hover:text-foreground"
                aria-label="Deploy URL"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="h-4 w-4" />
              </a>
            )}

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/20 text-muted-foreground transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

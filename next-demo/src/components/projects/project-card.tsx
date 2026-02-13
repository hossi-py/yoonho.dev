'use client';

import { ArrowUpRight, Calendar, Github, Globe,Terminal, Users } from 'lucide-react';
import Link from 'next/link';
import { useCallback,useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import type { PROJECTS } from '@/lib/projects';
import { cn } from '@/lib/utils';

export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  featured?: boolean;
}) {
  const isCurrent = index === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <Link
      href={project.href}
      className={cn('group relative block h-full', featured ? 'md:col-span-2' : 'md:col-span-1')}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-6',
          'transition-all duration-500 ease-out',
          'hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]',
          'backdrop-blur-sm',
          featured ? 'md:p-10' : 'flex flex-col justify-between'
        )}
      >
        {/* Mouse-tracking spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: isHovered
              ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.12), transparent 40%)`
              : '',
          }}
        />

        {/* Animated border glow that follows mouse */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: isHovered
              ? `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.25), transparent 40%)`
              : '',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />

        {/* Top-edge shimmer line on hover */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Background dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] transition-opacity duration-500 group-hover:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header: Status & Index */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-bold text-muted-foreground/60 transition-colors duration-300 group-hover:text-primary/60">
                {String(index + 1).padStart(2, '0')}
              </span>
              {isCurrent && (
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/10 text-emerald-500 gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-wider animate-pulse"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  Live
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* External Links */}
              {project.github && (
                <div
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(project.github, '_blank');
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-muted/10 text-muted-foreground transition-all duration-300 hover:bg-background hover:text-foreground hover:border-foreground/20 z-20 cursor-pointer"
                >
                  <Github className="h-4 w-4" />
                </div>
              )}
              {project.deployUrl && (
                <div
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(project.deployUrl, '_blank');
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-muted/10 text-muted-foreground transition-all duration-300 hover:bg-background hover:text-foreground hover:border-foreground/20 z-20 cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                </div>
              )}

              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-muted/20 text-muted-foreground transition-all duration-500 group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-12">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>

          {/* Body: Title & Description */}
          <div className="mb-8 flex-grow">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10">
              <Terminal className="h-3 w-3" />
              <span>{project.role}</span>
            </div>

            <h3
              className={cn(
                'font-bold text-foreground transition-colors duration-300 group-hover:text-primary mb-3 mt-2',
                featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
              )}
            >
              {project.title}
            </h3>

            <p
              className={cn(
                'text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-muted-foreground/90',
                featured ? 'text-lg max-w-2xl line-clamp-3' : 'text-sm line-clamp-2'
              )}
            >
              {project.detail.intro}
            </p>
          </div>

          {/* Footer: Tech Stack & Meta */}
          <div className="mt-auto pt-6 border-t border-border/40 transition-colors duration-500 group-hover:border-primary/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, featured ? 5 : 3).map((tech, i) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-muted/50 border border-border/30 text-[10px] font-medium text-muted-foreground transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 group-hover:translate-y-0"
                    style={{
                      transitionDelay: `${i * 40}ms`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > (featured ? 5 : 3) && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted/30 text-[10px] font-medium text-muted-foreground">
                    +{project.techStack.length - (featured ? 5 : 3)}
                  </span>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-3 text-[10px] font-medium text-muted-foreground/70 transition-colors duration-300 group-hover:text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.period.split(' ')[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {project.detail.teamSize}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

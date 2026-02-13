import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PROJECTS } from '@/lib/projects';
import { cn } from '@/lib/utils';

export function FeaturedProjects() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <section className="px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Selected Work
            </p>
            <h2 className="text-2xl font-bold text-foreground">
              Featured Projects
            </h2>
          </div>
          <Button variant="ghost" size="sm" asChild className="gap-1 text-muted-foreground hover:text-foreground">
            <Link href="/projects">
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-4">
          {featured.map((project, index) => (
            <Link
              key={project.id}
              href={project.href}
              className="group block"
            >
              <div
                className={cn(
                  'relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6',
                  'p-5 md:p-6 rounded-2xl',
                  'bg-card/40 backdrop-blur-sm',
                  'border border-border/50',
                  'hover:bg-card/70 hover:border-primary/20',
                  'hover:shadow-lg hover:shadow-primary/5',
                  'transition-all duration-300'
                )}
              >
                {/* Index number */}
                <span className="hidden md:flex items-center justify-center h-10 w-10 shrink-0 rounded-xl bg-muted/50 text-sm font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all -translate-x-1 group-hover:translate-x-0 -translate-y-1 group-hover:translate-y-0" />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-[10px] font-medium px-2 py-0.5 bg-muted/40 text-muted-foreground border-0"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] text-muted-foreground/60 self-center px-1">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Period */}
                <div className="md:text-right shrink-0">
                  <span className="text-xs font-mono text-muted-foreground/70 bg-muted/30 px-2.5 py-1 rounded-lg">
                    {project.period}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PROJECTS } from '@/lib/projects';
import { cn } from '@/lib/utils';

export function CareerTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(PROJECTS[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Experience
          </p>
          <h2 className="text-2xl font-bold text-foreground">Career Journey</h2>
        </div>

        {/* Timeline */}
        <div className="relative min-w-0 overflow-x-hidden">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border/60" />

          <div className="flex flex-col gap-2 min-w-0">
            {PROJECTS.map((project, index) => {
              const isExpanded = expandedId === project.id;
              const isCurrent = index === 0;

              return (
                <div key={project.id} className="relative pl-10 min-w-0">
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      'absolute left-[6px] top-[18px] h-3 w-3 rounded-full border-2 z-10',
                      isCurrent
                        ? 'bg-primary border-primary shadow-[0_0_8px_2px] shadow-primary/30'
                        : 'bg-muted border-muted-foreground/30'
                    )}
                  >
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-primary/40" />
                    )}
                  </div>

                  {/* Card */}
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className={cn(
                      'w-full min-w-0 text-left rounded-2xl p-5',
                      'border transition-all duration-300',
                      isExpanded
                        ? 'bg-card/60 border-primary/20 shadow-lg shadow-primary/5'
                        : 'bg-card/20 border-border/30 hover:bg-card/40 hover:border-border/60'
                    )}
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-semibold text-foreground">
                            {project.title}
                          </h3>
                          {isCurrent && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/15 text-primary">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{project.role}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono text-muted-foreground/70 hidden sm:block">
                          {project.period}
                        </span>
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 text-muted-foreground transition-transform duration-300',
                            isExpanded && 'rotate-180'
                          )}
                        />
                      </div>
                    </div>

                    {/* Period (mobile) */}
                    <span className="text-xs font-mono text-muted-foreground/60 sm:hidden">
                      {project.period}
                    </span>

                    {/* Expanded content — grid-rows trick for iOS Safari compat */}
                    <div
                      className={cn(
                        'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                        isExpanded
                          ? 'grid-rows-[1fr] opacity-100 mt-4'
                          : 'grid-rows-[0fr] opacity-0 mt-0'
                      )}
                    >
                      <div className="overflow-hidden min-h-0">
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Achievements */}
                        <ul className="space-y-2 mb-5">
                          {project.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm text-muted-foreground/90"
                            >
                              <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
                              <span className="leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-[10px] font-medium px-2.5 py-0.5 bg-primary/8 text-primary/90 border-0"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

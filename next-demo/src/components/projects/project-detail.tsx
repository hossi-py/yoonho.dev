'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  Code2,
  Terminal,
  Layers,
  Star,
  Quote,
  Clock,
  GitBranch,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { PROJECTS } from '@/lib/projects';
import type { Project } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface ProjectDetailProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

// ✨ Dot Pattern Background
function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-purple-500/5 blur-3xl" />
    </div>
  );
}

// ✨ Trendy Glitch Text (Modified for cleaner look)
function GlitchText({ text }: { text: string }) {
  return (
    <span className="relative inline-block group font-extrabold tracking-tighter">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-[3px] group-hover:translate-y-[1px] transition-all duration-100 mix-blend-screen">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-purple-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[3px] group-hover:-translate-y-[1px] transition-all duration-100 delay-75 mix-blend-screen">
        {text}
      </span>
    </span>
  );
}

// ✨ Section Header
function SectionHeader({
  number,
  label,
  description,
}: {
  number: string;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-2 mb-8 border-l-2 border-primary/30 pl-4 py-1">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono font-bold text-primary/80">{number}</span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{label}</h2>
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

// ✨ Bento Grid Item
function BentoItem({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/50',
        className
      )}
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground/70 mb-1">
          {label}
        </p>
        <p className="font-semibold text-foreground leading-tight">{value}</p>
      </div>
    </div>
  );
}

// ✨ Spotlight Card for Work Items
function WorkItemCard({ work, index }: { work: Project['detail']['works'][0]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/20 p-6 md:p-8 transition-colors hover:border-primary/20"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--primary-rgb), 0.1), transparent 40%)`,
        }}
      />

      <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold ring-4 ring-background">
            {index + 1}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold leading-tight">Background</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{work.background}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {work.keywords.map((kw) => (
              <span
                key={kw}
                className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border/50"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4 md:border-l md:border-border/30 md:pl-6">
          {/* Problem */}
          <div className="relative pl-4 border-l-2 border-red-500/30">
            <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-red-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
              Problem
            </h4>
            <p className="text-sm text-foreground/80">{work.problem}</p>
          </div>

          {/* Solution */}
          <div className="relative pl-4 border-l-2 border-emerald-500/30">
            <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-emerald-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1">
              Solution
            </h4>
            <p className="text-sm font-medium text-foreground">{work.solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✨ Process Step Card
function ProcessStep({ step, index }: { step: string; index: number }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl border border-transparent hover:bg-muted/30 hover:border-border/50 transition-all group">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-mono font-medium text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
        {String(index + 1).padStart(2, '0')}
      </div>
      <p className="text-sm text-foreground/80 group-hover:text-foreground">{step}</p>
    </div>
  );
}

// ✨ Feature/Result Card
function ResultCard({ highlight }: { highlight: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-card/50 to-card/10 p-5 border border-border/40 hover:border-primary/40 transition-all">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm font-medium leading-relaxed text-foreground/90">{highlight}</p>
      </div>
    </div>
  );
}

export function ProjectDetail({ project, prevProject, nextProject }: ProjectDetailProps) {
  const { detail } = project;
  const isCurrent = project.period.includes('진행 중');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <BackgroundPattern />

      <div className="relative min-h-screen pb-24">
        {/* ✨ Scroll Progress */}
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-muted/20 backdrop-blur-sm">
          <div
            className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <main className="container max-w-4xl mx-auto px-6 pt-12 md:pt-20">
          {/* ✨ Navigation Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground/60">
            <Link
              href="/projects"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Projects</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">{project.title}</span>
          </nav>

          {/* ✨ Hero Section */}
          <header className="mb-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono text-[10px] py-1">
                  PROJECT 0{PROJECTS.findIndex((p) => p.id === project.id) + 1}
                </Badge>
                {isCurrent && (
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 gap-1.5 px-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    IN PROGRESS
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
                <GlitchText text={project.title} />
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {detail.intro}
              </p>
            </div>

            {/* ✨ Bento Grid Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <BentoItem icon={Code2} label="Role" value={project.role} />
              <BentoItem icon={Calendar} label="Period" value={project.period} />
              <BentoItem icon={Users} label="Team" value={`${detail.teamSize}명`} />
              <BentoItem icon={Clock} label="Duration" value={detail.duration} />
            </div>

            {/* Tech Stack Marquee-ish */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-mono font-bold text-muted-foreground mr-2 uppercase tracking-wider">
                Tech Stack
              </span>
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-muted/40 hover:bg-primary/10 hover:text-primary transition-colors border-border/50"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </header>

          <div className="space-y-20">
            {/* 01. Overview */}
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              <SectionHeader number="01" label="Overview" description="프로젝트의 배경과 목표" />
              <div className="rounded-2xl bg-card/30 border border-border/50 p-6 md:p-8 backdrop-blur-sm">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-base md:text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
                  {detail.overview}
                </p>
              </div>
            </section>

            {/* 02. Works */}
            <section>
              <SectionHeader
                number="02"
                label="Problem & Solution"
                description="핵심 문제 해결 과정"
              />
              <div className="grid gap-6">
                {detail.works.map((work, i) => (
                  <WorkItemCard key={i} work={work} index={i} />
                ))}
              </div>
            </section>

            {/* 03. Process & Results Grid */}
            <div className="grid md:grid-cols-2 gap-10">
              <section>
                <SectionHeader number="03" label="Process" />
                <div className="space-y-1">
                  {detail.process.map((item, i) => (
                    <ProcessStep key={i} step={item} index={i} />
                  ))}
                </div>
              </section>

              <section>
                <SectionHeader number="04" label="Key Results" />
                <div className="grid gap-3">
                  {detail.resultHighlights.map((highlight, i) => (
                    <ResultCard key={i} highlight={highlight} />
                  ))}
                </div>
              </section>
            </div>

            {/* 05. Growth & Competency */}
            <section className="rounded-3xl bg-gradient-to-b from-primary/5 via-transparent to-transparent border border-primary/10 p-1">
              <div className="rounded-[22px] bg-background/50 p-6 md:p-10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Growth & Competency</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  {detail.growth.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        {item.type === 'achievement' ? (
                          <Star className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Lightbulb className="h-4 w-4 text-blue-500" />
                        )}
                        <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">
                          {item.type}
                        </h3>
                      </div>
                      <p className="text-base font-medium leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-muted/30 p-6">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  <div className="relative flex gap-4">
                    <Rocket className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Total Competency</h3>
                      <p className="text-muted-foreground leading-relaxed">{detail.competency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ✨ Bottom Navigation */}
          <nav className="mt-24 grid grid-cols-2 gap-4 border-t border-border/40 pt-8">
            {prevProject ? (
              <Link
                href={prevProject.href}
                className="group flex flex-col gap-2 rounded-2xl border border-border/40 bg-card/30 p-6 transition-all hover:border-primary/40 hover:bg-card/50"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                  <ArrowLeft className="h-3 w-3" />
                  PREV PROJECT
                </div>
                <span className="text-lg font-bold text-foreground line-clamp-1">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={nextProject.href}
                className="group flex flex-col items-end gap-2 rounded-2xl border border-border/40 bg-card/30 p-6 transition-all hover:border-primary/40 hover:bg-card/50 text-right"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                  NEXT PROJECT
                  <ArrowRight className="h-3 w-3" />
                </div>
                <span className="text-lg font-bold text-foreground line-clamp-1">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </main>
      </div>
    </>
  );
}

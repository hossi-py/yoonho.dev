'use client';

import { ArrowRight, Command, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSearchStore } from '@/stores/search-store';

export function HeroSection() {
  const { setOpen } = useSearchStore();

  return (
    <section className="relative pt-16 pb-20 flex flex-col items-center text-center px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Status badge */}
      <Badge
        variant="secondary"
        className={cn(
          'mb-6 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide',
          'bg-primary/10 text-primary border border-primary/20',
          'backdrop-blur-sm'
        )}
      >
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        Currently working at KB Planit
      </Badge>

      {/* Main heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance leading-tight">
        <span className="text-foreground">Crafting</span>{' '}
        <span className="text-primary">Interfaces</span>
        <br />
        <span className="text-muted-foreground/80">that users love.</span>
      </h1>

      <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed text-pretty">
        {'4\ub144 \ucc28 \ud504\ub860\ud2b8\uc5d4\ub4dc \uac1c\ubc1c\uc790\ub85c\uc11c, \ube44\uc988\ub2c8\uc2a4 \ubb38\uc81c\ub97c \uae30\uc220\ub85c \ud574\uacb0\ud558\uace0'}
        <br className="hidden md:block" />
        {'\ud655\uc7a5 \uac00\ub2a5\ud55c \uc6f9 \uc544\ud0a4\ud14d\ucc98\ub97c \uc124\uacc4\ud569\ub2c8\ub2e4.'}
      </p>

      {/* Search trigger */}
      <div className="relative w-full max-w-md group cursor-pointer mb-8">
        <button
          onClick={() => setOpen(true)}
          className={cn(
            'relative w-full flex items-center gap-3 px-4 py-3.5',
            'bg-card/60 backdrop-blur-sm',
            'border border-border rounded-2xl',
            'shadow-sm hover:shadow-md',
            'hover:border-primary/30',
            'transition-all duration-300',
            'text-muted-foreground text-left'
          )}
        >
          <Search className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-sm">{'\ud504\ub85c\uc81d\ud2b8, \uae30\uc220 \ube14\ub85c\uadf8 \uac80\uc0c9...'}</span>
          <kbd className="hidden md:inline-flex h-6 items-center gap-0.5 rounded-md bg-muted/60 px-1.5 text-[10px] font-medium text-muted-foreground border border-border/50">
            <Command className="h-2.5 w-2.5" />
            <span>K</span>
          </kbd>
        </button>
      </div>

      {/* CTA buttons */}
      <div className="flex items-center gap-3">
        <Button asChild variant="default" className="rounded-xl px-6 gap-2">
          <Link href="/about">
            <Sparkles className="w-4 h-4" />
            About Me
          </Link>
        </Button>
        <Button asChild variant="ghost" className="rounded-xl px-6 gap-2 group">
          <Link href="/projects">
            Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

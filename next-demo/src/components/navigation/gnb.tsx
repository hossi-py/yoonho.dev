'use client';

import { Bell, Search, Command } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebarExpandedStore } from '@/stores/sidebar-expanded-store';

export default function GNB() {
  const expanded = useSidebarExpandedStore((s) => s.expanded);
  const isHydrated = useSidebarExpandedStore((s) => s.isHydrated);
  const pathname = usePathname();

  if (!isHydrated) return null;

  // Simple breadcrumb logic
  const getBreadcrumb = () => {
    if (pathname === '/') return 'Home';
    if (pathname === '/abc') return 'Intro';
    if (pathname === '/projects') return 'Projects';
    if (pathname === '/blog') return 'Blog';
    return pathname.split('/').pop() || 'Home';
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 flex items-center justify-between px-6 transition-all duration-300 ease-out z-50',
        'h-[var(--height-header)]',
        // Glassmorphism
        'bg-white/40 dark:bg-zinc-950/50',
        'backdrop-blur-2xl backdrop-saturate-200',
        'border-b border-white/30 dark:border-white/10',
        'shadow-[0_1px_0_0_rgb(255,255,255,0.5)] dark:shadow-[0_1px_0_0_rgb(255,255,255,0.06)]',
        expanded
          ? 'left-[var(--width-expanded-lnb)] w-[calc(100%-var(--width-expanded-lnb))]'
          : 'left-[var(--width-collapsed-lnb)] w-[calc(100%-var(--width-collapsed-lnb))]'
      )}
    >
      <div className="flex items-center gap-4">
        {/* Enhanced Search Input */}
        <div
          className={cn(
            'group flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200',
            'bg-white/50 dark:bg-white/5',
            'hover:bg-white/70 dark:hover:bg-white/10',
            'border border-transparent hover:border-white/50 dark:hover:border-white/20',
            'shadow-sm hover:shadow-md',
            'w-48 focus-within:w-64 md:w-56 md:focus-within:w-72'
          )}
        >
          <Search className="h-4 w-4 text-muted-foreground/70 transition-colors group-focus-within:text-primary" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none flex-1 min-w-0"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md bg-white/60 dark:bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground border border-black/5 dark:border-white/10">
            <Command className="h-2.5 w-2.5" />
            <span>K</span>
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications - Enhanced */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'relative h-9 w-9 rounded-xl transition-all duration-200',
            'hover:bg-white/60 dark:hover:bg-white/10',
            'active:scale-95'
          )}
        >
          <Bell className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-white/50 dark:ring-zinc-950/50 animate-pulse" />
        </Button>

        {/* User Avatar - Enhanced */}
        <Button
          variant="ghost"
          className={cn(
            'h-9 pl-1.5 pr-3 gap-2 rounded-full transition-all duration-200',
            'hover:bg-white/60 dark:hover:bg-white/10',
            'active:scale-95'
          )}
        >
          <Avatar className="h-7 w-7 border-2 border-white/50 dark:border-white/20 shadow-sm">
            <AvatarImage src="/avatars/01.png" alt="YH" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-[10px] font-bold text-primary-foreground">
              YH
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden md:block">YH</span>
        </Button>
      </div>
    </header>
  );
}

'use client';

import { Bell, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
        'fixed top-0 right-0 flex items-center justify-between border-b border-border bg-background px-6 transition-all duration-300 ease-in-out z-10',
        'h-[var(--height-header)]',
        expanded
          ? 'left-[var(--width-expanded-lnb)] w-[calc(100%-var(--width-expanded-lnb))]'
          : 'left-[var(--width-collapsed-lnb)] w-[calc(100%-var(--width-collapsed-lnb))]'
      )}
    >
      <div className="flex items-center gap-4">
        {/* Search Input (Replaces Breadcrumb) */}
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 transition-colors hover:bg-secondary/80">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none w-32 md:w-48"
          />
          <kbd className="hidden sm:inline-flex ml-2 rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            /
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        {/* User Avatar (header) */}
        <Avatar className="h-8 w-8 cursor-pointer border border-border">
          <AvatarImage src="/avatars/01.png" alt="YH" />
          <AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary">
            YH
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

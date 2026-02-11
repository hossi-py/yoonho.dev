'use client';

import { Menu, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSearchStore } from '@/stores/search-store';
import { useSidebarExpandedStore } from '@/stores/sidebar-expanded-store';

export default function GNBMobile() {
  const setExpanded = useSidebarExpandedStore((s) => s.setExpanded);
  const { setOpen: setSearchOpen } = useSearchStore();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-4 transition-all duration-300',
        // Glassmorphism
        'bg-white/40 dark:bg-zinc-950/50',
        'backdrop-blur-2xl backdrop-saturate-200',
        'border-b border-white/30 dark:border-white/10',
        'shadow-[0_1px_0_0_rgb(255,255,255,0.5)] dark:shadow-[0_1px_0_0_rgb(255,255,255,0.06)]'
      )}
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(true)}
          className={cn(
            'h-9 w-9 rounded-xl transition-all duration-200',
            'hover:bg-white/60 dark:hover:bg-white/10',
            'active:scale-95'
          )}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Search Trigger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSearchOpen(true)}
        className={cn(
          'h-9 w-9 rounded-xl transition-all duration-200',
          'hover:bg-white/60 dark:hover:bg-white/10',
          'active:scale-95'
        )}
      >
        <Search className="h-[18px] w-[18px]" />
      </Button>
    </header>
  );
}

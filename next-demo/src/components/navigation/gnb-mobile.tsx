'use client';
import { Text } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useSidebarExpandedStore } from '@/stores/sidebar-expanded-store';

import { Button } from '../ui/button';

export default function GNBMobile() {
  const setExpanded = useSidebarExpandedStore((s) => s.setExpanded);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-4 transition-all duration-300',
        'bg-white/40 dark:bg-zinc-950/50',
        'backdrop-blur-2xl',
        'backdrop-saturate-200',
        'border-b border-white/30 dark:border-white/10',
        'shadow-[0_1px_0_0_rgb(255,255,255,0.5)] dark:shadow-[0_1px_0_0_rgb(255,255,255,0.06)]'
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(true)}
          className="hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Text className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

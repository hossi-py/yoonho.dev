'use client';

import { Moon, Sparkles, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { NAV_CONFIG } from '@/lib/nav-config';
import { cn } from '@/lib/utils';
import { useSidebarExpandedStore } from '@/stores/sidebar-expanded-store';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

export default function LNBMobile() {
  const expanded = useSidebarExpandedStore((s) => s.expanded);
  const setExpanded = useSidebarExpandedStore((s) => s.setExpanded);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Hydration safety
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Active link logic
  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <Sheet open={expanded} onOpenChange={setExpanded}>
      <SheetContent
        side="left"
        className="w-[300px] p-0 border-r border-white/40 dark:border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl backdrop-saturate-200 flex flex-col"
        showCloseButton={false}
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <SheetTitle className="text-base font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Yoonho.dev
              </SheetTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpanded(false)}
              className="rounded-xl h-9 w-9 hover:bg-white/50 dark:hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {NAV_CONFIG.map((section, idx) => (
            <div key={section.label} className={cn('mb-6', idx !== 0 && 'mt-6')}>
              <span className="mb-3 block px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                {section.label}
              </span>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isActive = isLinkActive(item.href);
                  const isExternal = item.external;

                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setExpanded(false)}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className={cn(
                          'group relative flex w-full items-center gap-3 rounded-xl py-3 px-3 text-sm transition-all duration-200',
                          isActive
                            ? 'bg-primary/10 text-primary font-semibold shadow-sm shadow-primary/5'
                            : 'text-muted-foreground hover:bg-white/40 dark:hover:bg-white/5 hover:text-foreground'
                        )}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-full bg-primary" />
                        )}

                        <item.icon
                          className={cn(
                            'h-[18px] w-[18px] shrink-0 transition-transform duration-200',
                            isActive ? 'text-primary scale-110' : 'group-hover:scale-105'
                          )}
                        />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-primary/20 text-primary">
                            {item.badge}
                          </span>
                        )}
                        {isExternal && (
                          <span className="text-[10px] text-muted-foreground/50">↗</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer - Theme Toggle & Profile */}
        <div className="border-t border-white/30 dark:border-white/10 p-4 space-y-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl p-2 transition-all duration-200',
              'hover:bg-white/40 dark:hover:bg-white/5',
              'active:scale-[0.98]'
            )}
          >
            <div className="relative h-9 w-9 shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400/20 to-yellow-400/20 dark:from-indigo-500/20 dark:to-purple-500/20">
              <Sun className="h-4 w-4 text-orange-600 absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="h-4 w-4 text-indigo-400 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
            {mounted && (
              <span className="text-sm text-muted-foreground font-medium">
                {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            )}
          </button>

          {/* Mini Profile */}
          <div className="flex items-center gap-3 rounded-xl p-2 bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10">
            <div className="relative shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 ring-2 ring-white/50 dark:ring-white/10">
                <span className="text-sm font-bold text-primary">YH</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-950 bg-emerald-500 shadow-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate leading-tight">
                Yoonho Hwang
              </p>
              <p className="text-[11px] text-muted-foreground/70 truncate">FE Developer</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

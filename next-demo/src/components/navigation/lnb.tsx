'use client';

import { ChevronLeft, ChevronRight, Moon, Sparkles, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { NAV_CONFIG } from '@/lib/nav-config';
import { cn } from '@/lib/utils';
import { useSidebarExpandedStore } from '@/stores/sidebar-expanded-store';

export default function LNB() {
  const expanded = useSidebarExpandedStore((s) => s.expanded);
  const setExpanded = useSidebarExpandedStore((s) => s.setExpanded);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Hydration safety for theme-specific values
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Active link logic that handles nested paths
  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full transition-all duration-300 ease-out z-40 flex flex-col',
        'bg-white/60 dark:bg-zinc-950/60',
        'backdrop-blur-2xl backdrop-saturate-200',
        'border-r border-white/40 dark:border-white/10',
        expanded ? 'w-[var(--width-expanded-lnb)]' : 'w-[var(--width-collapsed-lnb)]'
      )}
    >
      {/* Header - Logo */}
      <div className="flex h-[var(--height-header)] shrink-0 items-center px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span
            className={cn(
              'truncate text-base font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent transition-all duration-300',
              expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0'
            )}
          >
            Yoonho.dev
          </span>
        </div>
      </div>

      {/* Collapse Toggle */}
      <div className={cn('mt-2', expanded ? 'px-3' : 'flex justify-center px-2')}>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            'flex items-center gap-2 rounded-lg text-muted-foreground transition-all duration-200',
            'hover:bg-white/50 dark:hover:bg-white/10',
            'active:scale-95',
            expanded ? 'w-full px-3 py-2 text-xs justify-between' : 'h-8 w-8 justify-center'
          )}
        >
          {expanded ? (
            <>
              <span className="whitespace-nowrap truncate font-medium">Collapse</span>
              <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
            </>
          ) : (
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
        {NAV_CONFIG.map((section, idx) => (
          <div key={section.label} className={cn('mb-5', idx !== 0 && 'mt-5')}>
            {expanded && (
              <span className="mb-2 block px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                {section.label}
              </span>
            )}
            {!expanded && idx !== 0 && <div className="mx-auto mb-3 h-px w-6 bg-border/50" />}
            <ul className="flex flex-col gap-1">
              {section.items.map((item) => {
                const isActive = isLinkActive(item.href);
                const isExternal = item.external;

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'group relative flex w-full items-center gap-3 rounded-xl py-2.5 text-sm transition-all duration-200',
                        isActive
                          ? 'bg-primary/10 text-primary font-semibold shadow-sm shadow-primary/5'
                          : 'text-muted-foreground hover:bg-white/40 dark:hover:bg-white/5 hover:text-foreground',
                        expanded ? 'px-3' : 'justify-center px-0'
                      )}
                      title={!expanded ? item.label : undefined}
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

                      {expanded && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-primary/20 text-primary">
                              {item.badge}
                            </span>
                          )}
                          {isExternal && (
                            <span className="text-[10px] text-muted-foreground/50">↗</span>
                          )}
                        </>
                      )}

                      {!expanded && item.badge && (
                        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white dark:ring-zinc-950" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer - Theme Toggle & Mini Profile */}
      <div className="border-t border-white/30 dark:border-white/10 p-3 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl p-2 transition-all duration-200',
            'hover:bg-white/40 dark:hover:bg-white/5',
            'active:scale-[0.98]',
            expanded ? '' : 'justify-center'
          )}
          title="Toggle theme"
        >
          <div className="relative h-9 w-9 shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400/20 to-yellow-400/20 dark:from-indigo-500/20 dark:to-purple-500/20">
            <Sun className="h-4 w-4 text-orange-600 absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="h-4 w-4 text-indigo-400 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
          {expanded && mounted && (
            <span className="text-sm text-muted-foreground">
              {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
          )}
        </button>

        {/* Mini Profile */}
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl p-2 transition-all duration-200',
            'hover:bg-white/40 dark:hover:bg-white/5 cursor-pointer',
            'active:scale-[0.98]',
            expanded ? '' : 'justify-center'
          )}
        >
          <div className="relative shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 ring-2 ring-white/50 dark:ring-white/10">
              <span className="text-sm font-bold text-primary">YH</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-950 bg-emerald-500 shadow-sm" />
          </div>

          {expanded && (
            <div className="flex flex-1 flex-col overflow-hidden min-w-0">
              <span className="truncate text-sm font-semibold text-foreground">Yoonho Hwang</span>
              <span className="truncate text-[11px] text-muted-foreground/70">FE Developer</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

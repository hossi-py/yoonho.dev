'use client';

import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Home,
  Inbox,
  Layers,
  LogOut,
  Plus,
  Settings,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useSidebarExpandedStore } from '@/stores/sidebar-expanded-store';

const navSections = [
  {
    label: 'Overview',
    items: [
      { icon: Home, label: 'Home', href: '/', badge: null },
      { icon: Inbox, label: 'Inbox', href: '/abc', badge: '12' },
      { icon: BarChart3, label: 'Analytics', href: '#', badge: null },
      { icon: FileText, label: 'Blog', href: '/blog', badge: null },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { icon: Users, label: 'Team', href: '#', badge: null },
      { icon: Layers, label: 'Projects', href: '/projects', badge: '3' },
      { icon: Star, label: 'Favorites', href: '#', badge: null },
    ],
  },
  {
    label: 'Settings',
    items: [
      { icon: Settings, label: 'Preferences', href: '#', badge: null },
      { icon: HelpCircle, label: 'Help Center', href: '#', badge: null },
    ],
  },
];

export default function LNB() {
  const expanded = useSidebarExpandedStore((s) => s.expanded);
  const isHydrated = useSidebarExpandedStore((s) => s.isHydrated);
  const setExpanded = useSidebarExpandedStore((s) => s.setExpanded);
  const pathname = usePathname();

  if (!isHydrated) return null;

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full transition-all duration-300 ease-out z-40 flex flex-col',
        // Glassmorphism background
        'bg-white/60 dark:bg-zinc-950/60',
        'backdrop-blur-2xl backdrop-saturate-200',
        'border-r border-white/40 dark:border-white/10',
        expanded ? 'w-[var(--width-expanded-lnb)]' : 'w-[var(--width-collapsed-lnb)]'
      )}
    >
      {/* Sidebar Header - Logo */}
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
            Workspace
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
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
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
        {navSections.map((section, idx) => (
          <div key={section.label} className={cn('mb-5', idx !== 0 && 'mt-5')}>
            {expanded && (
              <span className="mb-2 block px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                {section.label}
              </span>
            )}
            {!expanded && idx !== 0 && <div className="mx-auto mb-3 h-px w-6 bg-border/50" />}
            <ul className="flex flex-col gap-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group relative flex w-full items-center gap-3 rounded-xl py-2.5 text-sm transition-all duration-200',
                        isActive
                          ? 'bg-primary/10 text-primary font-semibold shadow-sm shadow-primary/5'
                          : 'text-muted-foreground hover:bg-white/40 dark:hover:bg-white/5 hover:text-foreground',
                        expanded ? 'px-3' : 'justify-center px-0'
                      )}
                      title={!expanded ? item.label : undefined}
                    >
                      {/* Active indicator */}
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
                            <span
                              className={cn(
                                'rounded-full px-2 py-0.5 text-[10px] font-bold',
                                isActive
                                  ? 'bg-primary/20 text-primary'
                                  : 'bg-muted text-muted-foreground'
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {/* Collapsed badge dot */}
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

      {/* Sidebar Footer - User */}
      <div className="border-t border-white/30 dark:border-white/10 p-3">
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
              <span className="truncate text-[11px] text-muted-foreground/70">
                hossi0128@gmail.com
              </span>
            </div>
          )}

          {expanded && (
            <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/10 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

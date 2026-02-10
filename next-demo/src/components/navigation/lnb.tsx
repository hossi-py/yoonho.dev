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
  Star,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useSidebarExpandedStore } from '@/stores/sidebar-expanded-store';

const navSections = [
  {
    label: 'Main',
    items: [
      { icon: Home, label: 'Home', href: '/', badge: null },
      { icon: Inbox, label: 'Intro', href: '/abc', badge: '12' },
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
    label: 'System',
    items: [
      { icon: Settings, label: 'Settings', href: '#', badge: null },
      { icon: HelpCircle, label: 'Help', href: '#', badge: null },
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
        'fixed top-0 left-0 h-full bg-card transition-all duration-300 ease-in-out z-20 flex flex-col',
        'border-r border-border',
        expanded ? 'w-[var(--width-expanded-lnb)]' : 'w-[var(--width-collapsed-lnb)]'
      )}
    >
      {/* Sidebar Header - Logo / Brand */}
      <div className="flex h-14 shrink-0 items-center px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">W</span>
          </div>
          <span
            className={cn(
              'truncate text-sm font-semibold text-foreground tracking-tight transition-opacity duration-300',
              expanded ? 'opacity-100' : 'opacity-0 w-0'
            )}
          >
            Workspace
          </span>
        </div>
      </div>

      {/* Collapse Toggle (Replaces New Item) */}
      <div className={cn('pt-3', expanded ? 'px-3' : 'flex justify-center px-2')}>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            'flex items-center gap-2 rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
            expanded ? 'w-full px-3 py-2 text-sm justify-between' : 'h-9 w-9 justify-center'
          )}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {expanded ? (
            <>
              <span className="whitespace-nowrap truncate">Collapse Sidebar</span>
              <ChevronLeft className="h-4 w-4 shrink-0" />
            </>
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 scrollbar-hide">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            {expanded && (
              <span className="mb-1.5 block px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                {section.label}
              </span>
            )}
            {!expanded && section.label !== 'Main' && (
              <div className="my-2 border-t border-border" />
            )}
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex w-full items-center gap-3 rounded-lg py-2 text-sm transition-all',
                        isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                        expanded ? 'px-3' : 'justify-center px-0'
                      )}
                      title={!expanded ? item.label : undefined}
                    >
                      <item.icon
                        className={cn('h-[18px] w-[18px] shrink-0', isActive ? 'text-primary' : '')}
                      />
                      {expanded && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                'rounded-full px-2 py-0.5 text-[10px] font-medium',
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
                      {!expanded && item.badge && (
                        <span className="absolute right-1 top-0.5 h-2 w-2 rounded-full bg-primary" />
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
      <div className="border-t border-border px-3 py-3">
        <div
          className={cn(
            'flex items-center gap-3 rounded-lg py-2 transition-colors hover:bg-secondary',
            expanded ? 'px-2' : 'justify-center px-0'
          )}
        >
          <div className="relative h-8 w-8 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <span className="text-xs font-semibold text-primary">YH</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
          </div>
          {expanded && (
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-foreground">Yoonho Hwang</span>
              <span className="truncate text-[11px] text-muted-foreground">
                hossi0128@gmail.com
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

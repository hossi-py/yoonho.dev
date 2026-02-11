'use client';

import { X, Sparkles, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useSidebarExpandedStore } from '@/stores/sidebar-expanded-store';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

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

// Icons import for mobile
import {
  BarChart3,
  FileText,
  HelpCircle,
  Home,
  Inbox,
  Layers,
  Settings,
  Star,
  Users,
  LogOut,
} from 'lucide-react';

export default function LNBMobile() {
  const expanded = useSidebarExpandedStore((s) => s.expanded);
  const setExpanded = useSidebarExpandedStore((s) => s.setExpanded);
  const pathname = usePathname();

  return (
    <Sheet open={expanded} onOpenChange={setExpanded}>
      <SheetContent
        side="left"
        className="w-[300px] p-0 border-r border-white/40 dark:border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl backdrop-saturate-200"
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
                Workspace
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
        <nav className="flex-1 overflow-y-auto p-4">
          {navSections.map((section, idx) => (
            <div key={section.label} className={cn('mb-6', idx !== 0 && 'mt-6')}>
              <span className="mb-3 block px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                {section.label}
              </span>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setExpanded(false)}
                        className={cn(
                          'group flex w-full items-center gap-3 rounded-xl py-3 px-3 text-sm transition-all duration-200',
                          isActive
                            ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                            : 'text-muted-foreground hover:bg-white/40 dark:hover:bg-white/5 hover:text-foreground'
                        )}
                      >
                        <item.icon
                          className={cn(
                            'h-[18px] w-[18px] shrink-0',
                            isActive ? 'text-primary' : ''
                          )}
                        />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span
                            className={cn(
                              'rounded-full px-2.5 py-0.5 text-[10px] font-bold',
                              isActive
                                ? 'bg-primary/20 text-primary'
                                : 'bg-muted text-muted-foreground'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer - User */}
        <div className="border-t border-border/50 p-4">
          <div className="flex items-center gap-3 rounded-xl p-3 bg-white/40 dark:bg-white/5">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 ring-2 ring-white/50 dark:ring-white/10">
                <span className="text-sm font-bold text-primary">YH</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-950 bg-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Yoonho Hwang</p>
              <p className="text-[11px] text-muted-foreground/70 truncate">hossi0128@gmail.com</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8">
              <LogOut className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

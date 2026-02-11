'use client';

import { Bell, Search, Command, FileText } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { ALL_NAV_ITEMS } from '@/lib/nav-config';
import { searchPosts, type SearchablePost } from '@/lib/search-posts';
import { cn } from '@/lib/utils';
import { useSidebarExpandedStore } from '@/stores/sidebar-expanded-store';

export default function GNB() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [postResults, setPostResults] = React.useState<SearchablePost[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const expanded = useSidebarExpandedStore((s) => s.expanded);
  const isHydrated = useSidebarExpandedStore((s) => s.isHydrated);

  // ⌘K 단축키
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // 검색어 입력 시 포스트 검색 수행
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPostResults(searchPosts(value));
  };

  // 검색 실행 (이동 후 닫기)
  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    setSearch('');
    setPostResults([]);
    command();
  }, []);

  const handleInputFocus = () => {
    setOpen(true);
    // 포커스를 CommandDialog의 input으로 옮기기 위해 약간의 딜레이
    setTimeout(() => {
      inputRef.current?.blur();
    }, 0);
  };

  if (!isHydrated) return null;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 flex items-center justify-between px-6 transition-all duration-300 ease-out z-50',
          'h-[var(--height-header)]',
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
          {/* Search Input - 클릭/포커스 시 Command Palette 열림 */}
          <div
            className={cn(
              'group flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200',
              'bg-white/50 dark:bg-white/5',
              'hover:bg-white/70 dark:hover:bg-white/10',
              'border border-transparent hover:border-white/50 dark:hover:border-white/20',
              'shadow-sm hover:shadow-md',
              'w-48 focus-within:w-64 md:w-56 md:focus-within:w-72',
              'cursor-pointer'
            )}
            onClick={handleInputFocus}
          >
            <Search className="h-4 w-4 text-muted-foreground/70 transition-colors group-hover:text-primary" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none flex-1 min-w-0 cursor-pointer pointer-events-none"
              readOnly
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md bg-white/60 dark:bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground border border-black/5 dark:border-white/10">
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'relative h-9 w-9 rounded-xl transition-all duration-200',
              'hover:bg-white/60 dark:hover:bg-white/10',
              'active:scale-95'
            )}
          >
            <Bell className="h-[18px] w-[18px] text-muted-foreground" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-white/50 dark:ring-zinc-950/50 animate-pulse" />
          </Button>

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

      {/* Command Palette Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={search}
          onValueChange={handleSearchChange}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Navigation Items */}
          <CommandGroup heading="Navigation">
            {ALL_NAV_ITEMS.filter((item) => !item.external).map((item) => (
              <CommandItem
                key={item.label}
                onSelect={() => runCommand(() => router.push(item.href))}
                className="gap-2"
              >
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Blog Post Results */}
          {postResults.length > 0 && (
            <CommandGroup heading="Blog Posts">
              {postResults.map((post) => (
                <CommandItem
                  key={post.slug}
                  onSelect={() => runCommand(() => router.push(`/blog/aws-saa/${post.slug}`))}
                  className="gap-2 flex-col items-start py-2"
                >
                  <div className="flex items-center gap-2 w-full">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-medium truncate">{post.title}</span>
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground/60 shrink-0">
                      {post.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground line-clamp-1 pl-6">
                    {post.description}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

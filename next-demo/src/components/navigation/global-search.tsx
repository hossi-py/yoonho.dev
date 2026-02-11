'use client';

import { FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

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
import { useSearchStore } from '@/stores/search-store';

export function GlobalSearch() {
  const { open, setOpen } = useSearchStore();
  const [search, setSearch] = React.useState('');
  const [postResults, setPostResults] = React.useState<SearchablePost[]>([]);
  const router = useRouter();

  // 검색어 입력 시 포스트 검색 수행
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPostResults(searchPosts(value));
  };

  // 검색 실행 (이동 후 닫기)
  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false);
      setSearch('');
      setPostResults([]);
      command();
    },
    [setOpen]
  );

  // ⌘K 단축키
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  return (
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
  );
}

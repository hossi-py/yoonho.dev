'use client';

import { FileText, FolderGit2 } from 'lucide-react';
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
import { type Project, searchProjects } from '@/lib/projects';
import { type SearchablePost, searchPostsByApi } from '@/lib/search-posts';
import { useSearchStore } from '@/stores/search-store';

export function GlobalSearch() {
  const { open, setOpen } = useSearchStore();
  const [search, setSearch] = React.useState('');
  const [postResults, setPostResults] = React.useState<SearchablePost[]>([]);
  const [projectResults, setProjectResults] = React.useState<Project[]>([]);
  const router = useRouter();

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false);
      setSearch('');
      setPostResults([]);
      setProjectResults([]);
      command();
    },
    [setOpen]
  );

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

  React.useEffect(() => {
    const keyword = search.trim();
    if (!keyword) {
      setPostResults([]);
      setProjectResults([]);
      return;
    }

    const controller = new AbortController();
    let disposed = false;
    const timer = setTimeout(async () => {
      try {
        const [postItems, projectItems] = await Promise.all([
          searchPostsByApi(keyword, { signal: controller.signal, limit: 20 }),
          Promise.resolve(searchProjects(keyword)),
        ]);

        if (disposed) return;
        setPostResults(postItems);
        setProjectResults(projectItems);
      } catch (error) {
        if (disposed) return;
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error('[global-search] search failed', error);
      }
    }, 320);

    return () => {
      disposed = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        value={search}
        onValueChange={handleSearchChange}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {ALL_NAV_ITEMS.filter((item) => !item.external).map((item) => (
            <CommandItem
              key={item.label}
              value={item.label}
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

        {projectResults.length > 0 && (
          <CommandGroup heading="Projects">
            {projectResults.map((project) => (
              <CommandItem
                key={project.id}
                value={`${project.title} ${project.description} ${search}`}
                onSelect={() => runCommand(() => router.push(`/projects/${project.id}`))}
                className="gap-2 flex-col items-start py-2"
              >
                <div className="flex items-center gap-2 w-full">
                  <FolderGit2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="font-medium truncate">{project.title}</span>
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground/60 shrink-0">
                    {project.category}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground line-clamp-1 pl-6">
                  {project.description}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {postResults.length > 0 && (
          <CommandGroup heading="Blog Posts">
            {postResults.map((post) => (
              <CommandItem
                key={post.slug}
                value={`${post.title} ${post.description} ${post.category} ${search}`}
                onSelect={() => runCommand(() => router.push(post.href))}
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

'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';

import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      value={theme}
      onValueChange={(value: 'light' | 'dark') => setTheme(value)}
      variant="outline"
      type="single"
    >
      <ToggleGroupItem value="light" aria-label="Toggle Light" asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Toggle Dark" asChild>
        <Button variant="ghost" size="icon">
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface SidebarExpandedState {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  toggleExpanded: () => void;
}

export const useSidebarExpandedStore = create<SidebarExpandedState>()(
  persist(
    immer((set) => ({
      expanded: false,
      setExpanded: (value) => {
        set((state) => {
          state.expanded = value;
        });
      },
      toggleExpanded: () => {
        set((state) => {
          state.expanded = !state.expanded;
        });
      },
    })),
    {
      name: 'lnb-expanded',
    }
  )
);

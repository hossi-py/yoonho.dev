import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface SettingsState {
  bgAnimation: boolean;
  customCursor: boolean;
  scrollAnimation: boolean;
  toggle: (key: keyof Omit<SettingsState, 'toggle'>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    immer((set) => ({
      bgAnimation: false,
      customCursor: false,
      scrollAnimation: false,
      toggle: (key) => set((state) => ({ [key]: !state[key] })),
    })),
    {
      name: 'settings',
    }
  )
);

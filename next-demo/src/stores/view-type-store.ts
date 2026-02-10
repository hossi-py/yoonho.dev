import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ViewType = 'card' | 'list';

interface ViewTypeState {
  viewType: ViewType;
  setViewType: (type: ViewType) => void;
}

export const useViewTypeStore = create<ViewTypeState>()(
  persist(
    immer((set) => ({
      viewType: 'card',
      setViewType: (value) => {
        set((state) => {
          state.viewType = value;
        });
      },
    })),
    {
      name: 'view-type',
    }
  )
);

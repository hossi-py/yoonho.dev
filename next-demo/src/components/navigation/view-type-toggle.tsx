import { LayoutGrid, List } from 'lucide-react';

import { useViewTypeStore } from '@/stores/view-type-store';

import CustomButton from '../custom/custom-button';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

export default function ViewTypeToggle() {
  const viewType = useViewTypeStore((s) => s.viewType);
  const setViewType = useViewTypeStore((s) => s.setViewType);

  return (
    <ToggleGroup
      value={viewType}
      onValueChange={(value: 'card' | 'list') => setViewType(value)}
      variant="outline"
      type="single"
    >
      <ToggleGroupItem value="card" aria-label="Toggle card" asChild>
        <CustomButton
          variant="ghost"
          icon={<LayoutGrid />}
          tooltipPosition="top"
          tooltipContent="카드형 보기"
        />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="Toggle list" asChild>
        <CustomButton
          variant="ghost"
          icon={<List />}
          tooltipPosition="top"
          tooltipContent="리스트형 보기"
        />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

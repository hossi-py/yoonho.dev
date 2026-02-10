'use client';

import { PanelLeftClose } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useSidebarExpandedStore } from '@/stores/sidebar-expanded-store';

import CustomButton from '../custom/custom-button';
import LNBContent from './lnb-content';
import SidebarToggleButton from './sidebar-toggle-button';

export default function LNB() {
  const expanded = useSidebarExpandedStore((s) => s.expanded);
  const isHydrated = useSidebarExpandedStore((s) => s.isHydrated);
  const setExpanded = useSidebarExpandedStore((s) => s.setExpanded);
  const toggleExpanded = useSidebarExpandedStore((s) => s.toggleExpanded);

  /** hydration 전에는 렌더링 안 함 => TODO 스켈레톤 컴포넌트 넣어보기 */
  if (!isHydrated) return null;

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full transition-all ease-in-out duration-300 overflow-hidden',
        'border-r [border-color:var(--color-navigation-border)]',
        expanded ? '[width:var(--width-expanded-lnb)]' : '[width:var(--width-collapsed-lnb)]'
      )}
    >
      {/* 상단 영역 */}
      <div className="flex items-center justify-between p-2">
        <SidebarToggleButton expanded={expanded} onToggle={toggleExpanded} />

        {/* 열려있을 때만 닫기 버튼 표시 */}
        {expanded && (
          <CustomButton
            className="cursor-ew-resize"
            size="icon"
            variant="ghost"
            tooltipContent="사이드바 닫기"
            tooltipPosition="bottom"
            onClick={() => setExpanded(false)}
          >
            <PanelLeftClose style={{ width: '20px', height: '20px' }} />
          </CustomButton>
        )}
      </div>

      <LNBContent expanded={expanded} />
    </aside>
  );
}

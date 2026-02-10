'use client';

import { Heading, X } from 'lucide-react';

import { useSidebarExpandedStore } from '@/stores/sidebar-expanded-store';

import { Button } from '../ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../ui/drawer';
import LNBContent from './lnb-content';

export default function LNBMobile() {
  const expanded = useSidebarExpandedStore((s) => s.expanded);
  const setExpanded = useSidebarExpandedStore((s) => s.setExpanded);

  return (
    <Drawer open={expanded} onOpenChange={setExpanded} direction="left">
      <DrawerContent className="![width:var(--width-expanded-lnb)]">
        <DrawerHeader className="p-0">
          <DrawerTitle className="flex items-center justify-between p-2">
            <Button className="cursor-pointer" variant="ghost" size="icon" autoFocus>
              <Heading />
            </Button>
            <Button
              className="cursor-ew-resize"
              size="icon"
              variant="ghost"
              aria-label="사이드바 닫기"
              onClick={() => setExpanded(false)}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </Button>
          </DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>

        <LNBContent expanded={expanded} />
      </DrawerContent>
    </Drawer>
  );
}

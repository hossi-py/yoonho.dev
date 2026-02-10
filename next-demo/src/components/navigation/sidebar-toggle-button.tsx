'use client';

import { Heading, PanelLeftOpen } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import CustomButton from '../custom/custom-button';

interface SidebarToggleButtonProps {
  expanded: boolean;
  onToggle: (next: boolean) => void;
}

export default function SidebarToggleButton({ expanded, onToggle }: SidebarToggleButtonProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const icon = expanded ? <Heading /> : isHovered ? <PanelLeftOpen /> : <Heading />;

  const ariaLabel = !expanded && isHovered ? '사이드바 열기' : '';

  const handleToggleButtonClick = () => {
    if (!expanded && isHovered) {
      onToggle(!expanded);
    } else {
      alert('홈으로');
    }
  };

  return (
    <CustomButton
      size="icon"
      variant="ghost"
      className={cn('cursor-pointer', !expanded && isHovered && 'cursor-ew-resize')}
      aria-label={ariaLabel}
      aria-expanded={expanded}
      tooltipContent={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleToggleButtonClick}
    >
      {icon}
    </CustomButton>
  );
}

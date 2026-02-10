'use client';

import { cn } from '@/lib/utils';

type RainbowFrameProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  blur?: number;
  outlineSize?: number;
  active: boolean;
};

export default function RainbowFrame({
  children,
  className = '',
  style,
  blur = 20,
  outlineSize = 1,
  active = true,
}: RainbowFrameProps) {
  return (
    <div
      className={cn('rainbow-frame', active ? 'animate-visible' : 'animate-hidden', className)}
      style={
        {
          '--rf-blur': `${blur}px`,
          '--rf-outline': `${outlineSize}px`,
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

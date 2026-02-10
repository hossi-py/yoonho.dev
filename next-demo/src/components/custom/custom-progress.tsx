'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type ProgressRootProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>;

type Segment = {
  value: number;
  className?: string;
  title?: string;
  color?: string;
};

interface CustomProgressProps extends Omit<ProgressRootProps, 'value'> {
  segments?: Segment[];
  value?: number;
}

function CustomProgress({ className, value, segments, ...props }: CustomProgressProps) {
  const total = React.useMemo(() => {
    return segments?.reduce((acc, curr) => acc + Number(curr.value), 0) || 0;
  }, [segments]);

  /** Progress 하단에 간소화 */
  const items = React.useMemo(() => {
    if (!segments?.length || total === 0) return [];

    const raw = segments.map((s) => ({
      ...s,
      percent: (Number(s.value) / total) * 100,
    }));

    // 연산과정에서 생기는 오차 문제 해결
    const sumPercent = raw.reduce((a, b) => a + b.percent, 0);
    const diff = 100 - sumPercent;
    raw[raw.length - 1].percent += diff;

    return raw;
  }, [segments, total]);

  /** 애니메이션용 상태 */
  const [animatedItems, setAnimatedItems] = React.useState<typeof items>([]);

  React.useEffect(() => {
    if (items.length) {
      // 처음엔 0%로 세팅
      setAnimatedItems(items.map((s) => ({ ...s, percent: 0 })));

      // 다음 프레임에서 실제 값으로 업데이트
      const id = requestAnimationFrame(() => {
        setAnimatedItems(items);
      });

      return () => cancelAnimationFrame(id);
    }
  }, [items]);

  const singleBar = (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className="bg-primary h-full w-full flex-1 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  );

  const multiBar = (
    <div className="absolute inset-0 flex h-full w-full space-x-[2px]">
      {animatedItems.map((item) => (
        <Tooltip key={item.title}>
          <TooltipTrigger asChild>
            <div
              className="h-full transition-all duration-1000"
              style={{
                width: `${Math.max(0, item.percent)}%`,
                // 너무 작은 비율이 사라지지 않게 최소 폭(옵션)
                minWidth: item.percent > 0 && item.percent < 1 ? 1 : undefined,
                backgroundColor: item.color,
              }}
              role="img"
              aria-label={`${item.title}: ${item.percent.toFixed(1)}%`}
            />
          </TooltipTrigger>
          <TooltipContent>{`${item.title}: ${item.percent.toFixed(1)}%`}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn('bg-primary/20 relative h-2 overflow-hidden rounded-full', className)}
        value={segments?.length ? 100 : value}
        max={100}
        {...props}
      >
        {segments?.length ? multiBar : singleBar}
      </ProgressPrimitive.Root>

      {segments?.length ? (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {items.map((item, idx) => (
            <div key={item.title ?? idx} className="flex items-center gap-1">
              <span
                className="inline-block h-2 w-2 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span>
                {item.title} {item.percent.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export { CustomProgress };

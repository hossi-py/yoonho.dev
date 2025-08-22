"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ProgressRootProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
>;

type Segment = {
  value: number;
  className?: string;
  title?: string;
  color?: string;
};

interface CustomProgressProps extends Omit<ProgressRootProps, "value"> {
  segments?: Segment[];
  value?: number;
}

function CustomProgress({
  className,
  value,
  segments,
  ...props
}: CustomProgressProps) {
  const total =
    React.useMemo(
      () => segments?.reduce((acc, curr) => acc + Number(curr.value), 0),
      [segments]
    ) || 0;

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

  const singleBar = (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className="bg-primary h-full w-full flex-1 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  );

  const multiBar = (
    <div className="absolute inset-0 flex h-full w-full">
      {items.map((item) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              key={item.title}
              className="h-full"
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
          <TooltipContent>
            {`${item.title}: ${item.percent.toFixed(1)}%`}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
          className
        )}
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

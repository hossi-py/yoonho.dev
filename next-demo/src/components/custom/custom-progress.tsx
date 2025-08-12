"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

type ProgressRootProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
>;

type Segment = { value: number; className?: string; title?: string };

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
  const singleBar = (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className="bg-primary h-full w-full flex-1 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  );

  const multiBar = (
    <div>
      {segments?.map((segment, title) => (
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          key={title}
          className="bg-primary h-full w-full flex-1 transition-all"
          style={{ width: `${segment.value}%` }}
        />
      ))}
    </div>
  );

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {segments?.length ? multiBar : singleBar}
    </ProgressPrimitive.Root>
  );
}

export { CustomProgress };

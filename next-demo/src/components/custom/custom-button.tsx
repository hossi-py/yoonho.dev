import { type VariantProps } from 'class-variance-authority';

import { useIsMobile } from '@/hooks/use-mobile';

import { Button, type buttonVariants } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface CustomButtonProps
  extends React.ComponentProps<typeof Button>, VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  expanded?: boolean;
  label?: string;
  tooltipContent?: React.ReactNode;
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
  size: 'default' | 'sm' | 'lg' | 'icon';
}

export default function CustomButton({
  icon,
  expanded,
  label,
  children,
  tooltipContent,
  tooltipPosition = 'right',
  size,
  ...buttonProps
}: any) {
  const isMobile = useIsMobile();
  const buttonSize = !expanded && icon ? 'icon' : size;

  const button = (
    <Button size={buttonSize} {...buttonProps}>
      {children ?? (
        <div className="flex justify-center items-center gap-2">
          {icon}
          {expanded && label && <span>{label}</span>}
        </div>
      )}
    </Button>
  );

  if (isMobile || !tooltipContent) return button;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side={tooltipPosition}>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

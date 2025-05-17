import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';

export const IconTooltip = ({
  tooltipText,
  Icon,
  className,
  size = 16,
  color = 'text-primary'
}: {
  tooltipText: string;
  Icon: LucideIcon;
  className?: string;
  size?: number;
  color?: string;
}) => {
  if (!Icon) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Icon size={size} className={cn(className, color)} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

'use client';;
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const Actions = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('flex items-center gap-1', className)} {...props}>
    {children}
  </div>
);

export const Action = ({
  tooltip,
  children,
  label,
  className,
  variant = 'outline',
  size = 'lg',
  ...props
}) => {
  const button = (
    <Button
      className={cn('size-7 p-1 text-muted-foreground hover:text-foreground', className)}
      size={size}
      type="button"
      variant={variant}
      {...props}>
      {children}
      <span className="sr-only">{label || tooltip}</span>
    </Button>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
};

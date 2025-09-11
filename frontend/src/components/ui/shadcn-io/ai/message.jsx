import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export const Message = ({
  className,
  from,
  ...props
}) => (
  <div
    className={cn(
      'group flex w-full items-start justify-end gap-2 py-4',
      from === 'user' ? 'is-user' : 'is-assistant  ',
      '[&>div]:max-w-[80%]',
      className
    )}
    {...props} />
);

export const MessageContent = ({
  children,
  className,
  
  ...props
}) => (
     <div
    className={cn(
      'flex flex-col gap-2 overflow-hidden rounded-lg px-4 py-3 text-foreground text-sm',
      'group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground',
      'group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground ',
      
      className
    )}
    {...props}>
    <div className="is-user:dark max-w-xl">{children}</div>
  </div>
)

export const MessageAvatar = ({
  src,
  name,
  className,
  ...props
}) => (
  <Avatar className={cn('size-7  ring-1 ring-border', className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || 'AS'}</AvatarFallback>
  </Avatar>
);

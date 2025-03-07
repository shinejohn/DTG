import { forwardRef } from 'react';

import { Slot, Slottable } from '@radix-ui/react-slot';

import { cn } from '../../lib/utils';

export const HeroTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    asChild?: boolean;
  }
>(function HeroTitleComponent({ children, className, ...props }, ref) {
  const Comp = props.asChild ? Slot : 'h1';

  return (
    <Comp
      ref={ref}
      className={cn(
        'hero-title flex flex-col text-center font-sans text-4xl font-semibold tracking-tighter sm:text-6xl lg:max-w-5xl lg:text-7xl xl:text-[4.85rem] dark:text-white',
        className,
      )}
      {...props}
    >
      <Slottable>{children}</Slottable>
    </Comp>
  );
});

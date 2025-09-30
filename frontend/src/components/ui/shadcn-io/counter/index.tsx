'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps, type Transition } from 'motion/react';

import {
  SlidingNumber,
  type SlidingNumberProps,
} from './slidingNumber';
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

type CounterProps = HTMLMotionProps<'div'> & {
  number: number;
  setNumber: (number: number) => void;
  slidingNumberProps?: Omit<SlidingNumberProps, 'number'>;
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'onClick'>;
  transition?: Transition;
};

function Counter({
  number,
  setNumber,
  className,
  slidingNumberProps,
  buttonProps,
  transition = { type: 'spring', bounce: 0, stiffness: 300, damping: 30 },
  ...props
}: CounterProps) {
  return (
    <motion.div
      data-slot="counter"
      layout
      transition={transition}
      className={cn(
        // más pequeño, fondo transparente
        'flex items-center gap-x-1 px-1 py-0.5 rounded-lg bg-transparent',
        className,
      )}
      {...props}
    >

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          {...buttonProps}
          onClick={() => setNumber(Math.max(1, number - 1))} // mínimo 1
          className={cn(
            'h-7 w-7 text-sm bg-transparent hover:bg-neutral-200/30 dark:hover:bg-neutral-700/30 text-neutral-800 dark:text-neutral-200',
            buttonProps?.className,
          )}
        >
          -
        </Button>
      </motion.div>

      <SlidingNumber
        number={number}
        {...slidingNumberProps}
        className={cn(
          'text-base font-medium text-neutral-900 dark:text-neutral-100',
          slidingNumberProps?.className,
        )}
      />

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          {...buttonProps}
          onClick={() => setNumber(number + 1)}
          className={cn(
            'h-7 w-7 text-sm bg-transparent hover:bg-neutral-200/30 dark:hover:bg-neutral-700/30 text-neutral-800 dark:text-neutral-200',
            buttonProps?.className,
          )}
        >
          +
        </Button>
      </motion.div>
    </motion.div>
  );
}

export { Counter, type CounterProps };

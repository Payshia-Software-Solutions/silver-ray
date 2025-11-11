'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface AnimatedInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function AnimatedInView({ children, className, delay = 0, once = true }: AnimatedInViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

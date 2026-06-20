import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  width?: 'auto' | '100%';
  overflowHidden?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '',
  width = 'auto',
  overflowHidden = false
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '0px' });

  const getVariants = () => {
    switch (direction) {
      case 'left': return { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
      case 'right': return { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };
      case 'down': return { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } };
      case 'up':
      default: return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <div ref={ref} style={{ width }} className={`${className} h-full ${overflowHidden ? 'overflow-hidden' : ''}`}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.8, delay: delay, ease: [0.17, 0.55, 0.55, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

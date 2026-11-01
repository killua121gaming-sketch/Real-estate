import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_LUX } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: EASE_LUX, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

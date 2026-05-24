'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlowCard = ({ children, className, onClick }: GlowCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        "relative rounded-xl p-6 transition-all duration-300",
        "bg-slate-800/50 backdrop-blur-sm border border-white/10",
        "hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
        onClick ? "cursor-pointer" : "",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

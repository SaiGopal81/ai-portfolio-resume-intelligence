'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { ChangeItem } from '@/types';
import { PlusCircle, Edit2, ArrowUpDown, Sparkles } from 'lucide-react';

export const ChangesMade = ({ changes }: { changes: ChangeItem[] }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const getTypeStyles = (type: ChangeItem['type']) => {
    switch (type) {
      case 'added': return { icon: <PlusCircle className="w-5 h-5 text-green-400" />, bg: 'bg-green-500/10 border-green-500/20 text-green-400' };
      case 'modified': return { icon: <Edit2 className="w-5 h-5 text-yellow-400" />, bg: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' };
      case 'reordered': return { icon: <ArrowUpDown className="w-5 h-5 text-blue-400" />, bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400' };
      case 'enhanced': return { icon: <Sparkles className="w-5 h-5 text-purple-400" />, bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400' };
    }
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {changes.map((change, index) => {
        const style = getTypeStyles(change.type);
        
        return (
          <motion.div 
            key={index} 
            variants={item}
            className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800"
          >
            <div className="mt-1">{style.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={style.bg}>{change.type}</Badge>
                <Badge className="bg-slate-800 border-slate-700 text-slate-300">{change.section}</Badge>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{change.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

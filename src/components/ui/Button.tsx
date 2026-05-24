import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
    const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
    
    const variants = {
      primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 border border-white/10",
      secondary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25 border border-white/10",
      outline: "border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white",
      ghost: "hover:bg-slate-800 text-slate-400 hover:text-white",
    };
    
    const sizes = {
      sm: "text-sm px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-6 py-3 gap-2",
    };

    return (
      <button ref={ref} className={cn(baseStyle, variants[variant], sizes[size], className)} {...props}>
        {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

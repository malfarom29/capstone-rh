import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[#168AAD] text-white hover:bg-[#1A759F]': variant === 'primary',
            'bg-[#D9ED92] text-[#184E77] hover:bg-[#B5E48C]': variant === 'secondary',
            'border border-[#34A0A4] text-[#34A0A4] hover:bg-[#34A0A4] hover:text-white': variant === 'outline',
            'h-9 px-4 py-2': size === 'sm',
            'h-10 px-8 py-2': size === 'md',
            'h-11 px-8 py-2': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
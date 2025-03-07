import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border border-[#34A0A4] bg-white px-3 py-2',
            'text-sm placeholder:text-gray-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34A0A4]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
import React, { forwardRef } from 'react';
import { BaseComponentProps, Size, Variant, ComponentState, ClickableProps } from '../../types';
import { cn } from '../../utils/cn';

export interface ButtonProps 
  extends BaseComponentProps, 
         ComponentState, 
         ClickableProps,
         Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  children,
  className,
  testId,
  type = 'button',
  onClick,
  ...props
}, ref) => {
  const baseClasses = [
    'microhub-component',
    'inline-flex items-center justify-center',
    'font-medium rounded-lg',
    'transition-smooth focus-ring',
    'border border-transparent',
    'select-none',
    
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    
    loading && 'cursor-wait',
  ];

  const variantClasses = {
    primary: [
      'bg-primary-600 hover:bg-primary-700 active:bg-primary-800',
      'text-white',
      'shadow-sm hover:shadow-md',
    ],
    secondary: [
      'bg-white hover:bg-gray-50 active:bg-gray-100',
      'text-gray-900 border-gray-300',
      'shadow-sm hover:shadow-md',
    ],
    success: [
      'bg-green-600 hover:bg-green-700 active:bg-green-800',
      'text-white',
      'shadow-sm hover:shadow-md',
    ],
    danger: [
      'bg-red-600 hover:bg-red-700 active:bg-red-800',
      'text-white',
      'shadow-sm hover:shadow-md',
    ],
    warning: [
      'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700',
      'text-white',
      'shadow-sm hover:shadow-md',
    ],
    info: [
      'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
      'text-white',
      'shadow-sm hover:shadow-md',
    ],
  };

  const sizeClasses = {
    sm: ['px-3 py-1.5 text-sm', 'gap-1.5'],
    md: ['px-4 py-2 text-base', 'gap-2'],
    lg: ['px-6 py-3 text-lg', 'gap-2.5'],
  };

  const widthClasses = fullWidth ? 'w-full' : '';

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    className
  );

  const LoadingSpinner = () => (
    <svg 
      className={cn(
        'animate-spin',
        size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
      )}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        className="opacity-25"
      />
      <path
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      data-testid={testId}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          {children && <span className="ml-2">{children}</span>}
        </>
      ) : (
        <>
          {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
          {children}
          {endIcon && <span className="flex-shrink-0">{endIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
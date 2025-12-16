import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            className = '',
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

        const variantStyles = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-lg hover:shadow-xl focus:ring-primary-500',
            secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 shadow-lg hover:shadow-xl focus:ring-secondary-500',
            outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',
            ghost: 'text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',
            danger: 'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 shadow-lg hover:shadow-xl focus:ring-danger-500',
        };

        const sizeStyles = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                    </>
                ) : (
                    <>
                        {leftIcon && <span>{leftIcon}</span>}
                        {children}
                        {rightIcon && <span>{rightIcon}</span>}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

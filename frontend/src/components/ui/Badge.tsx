import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const variantStyles = {
        primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
        success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200',
        warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200',
        danger: 'bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-200',
        secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    };

    const sizeStyles = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

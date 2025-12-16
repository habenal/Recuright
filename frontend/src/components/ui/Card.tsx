import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    noPadding?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, hover = false, noPadding = false, className = '', ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`
          bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700
          ${!noPadding ? 'p-6' : ''}
          ${hover ? 'hover-lift cursor-pointer' : ''}
          ${className}
        `}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <div className={`mb-4 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${className}`} {...props}>
            {children}
        </h3>
    );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`} {...props}>
            {children}
        </p>
    );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 ${className}`} {...props}>
            {children}
        </div>
    );
};

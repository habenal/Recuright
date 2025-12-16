import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            error,
            helperText,
            options,
            className = '',
            id,
            ...props
        },
        ref
    ) => {
        const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    id={selectId}
                    className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-200
            focus:outline-none focus:ring-2
            bg-white dark:bg-slate-800
            ${error
                            ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-200'
                            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
                        }
            ${className}
          `}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1 text-sm text-danger-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-gray-500">{helperText}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({
    className,
    variant = 'primary',
    size = 'default',
    isLoading = false,
    children,
    disabled,
    ...props
}, ref) => {
    const variants = {
        primary: 'bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/20',
        secondary: 'bg-secondary hover:bg-secondary-dark text-white shadow-md shadow-secondary/20',
        outline: 'border-2 border-primary text-primary hover:bg-primary/5',
        ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
    };

    const sizes = {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || disabled}
            ref={ref}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;

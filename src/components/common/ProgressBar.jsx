import React from 'react';
import { cn } from '../../utils/cn';

const ProgressBar = ({
    value = 0,
    max = 100,
    className,
    colorClass = "bg-primary",
    showLabel = false
}) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className={cn("w-full", className)}>
            {showLabel && (
                <div className="flex justify-between mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span>Progress</span>
                    <span>{Math.round(percentage)}%</span>
                </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                <div
                    className={cn("h-2.5 rounded-full transition-all duration-500 ease-out", colorClass)}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;

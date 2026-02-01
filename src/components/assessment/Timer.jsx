import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '../../utils/cn';

const Timer = ({ seconds, onTimeout }) => {
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (seconds <= 0) {
            onTimeout();
        }
    }, [seconds, onTimeout]);

    return (
        <div className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-lg font-mono font-bold text-lg border",
            seconds < 300
                ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                : "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
        )}>
            <Clock size={20} />
            <span>{formatTime(seconds)}</span>
        </div>
    );
};

export default Timer;

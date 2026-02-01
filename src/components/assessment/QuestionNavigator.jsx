import React from 'react';
import { cn } from '../../utils/cn';

const QuestionNavigator = ({ questions, currentIndex, answers, onNavigate }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Questions
            </h3>
            <div className="grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {questions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isActive = idx === currentIndex;

                    return (
                        <button
                            key={q.id}
                            onClick={() => onNavigate(idx)}
                            className={cn(
                                "h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-white ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800"
                                    : isAnswered
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                            )}
                        >
                            {idx + 1}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 space-y-2">
                <div className="flex items-center text-xs text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    Current
                </div>
                <div className="flex items-center text-xs text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-green-100 mr-2"></div>
                    Answered
                </div>
                <div className="flex items-center text-xs text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-gray-100 mr-2"></div>
                    Not Answered
                </div>
            </div>
        </div>
    );
};

export default QuestionNavigator;

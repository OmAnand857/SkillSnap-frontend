import React from 'react';
import CodeEditor from './CodeEditor';
import { cn } from '../../utils/cn';

const QuestionCard = ({ question, answer, onAnswer }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Question {question.id}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {question.text}
                </p>
            </div>

            {question.type === 'mcq' && (
                <div className="space-y-3">
                    {question.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => onAnswer(idx)}
                            className={cn(
                                "w-full text-left p-4 rounded-lg border-2 transition-all",
                                answer === idx
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-700"
                            )}
                        >
                            <div className="flex items-center">
                                <span className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 text-xs font-bold",
                                    answer === idx ? "border-primary bg-primary text-white" : "border-gray-400 text-gray-500"
                                )}>
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                <span className="dark:text-gray-200">{option}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {question.type === 'code' && (
                <CodeEditor
                    value={answer}
                    onChange={onAnswer}
                />
            )}
        </div>
    );
};

export default QuestionCard;

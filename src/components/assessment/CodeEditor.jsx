import React from 'react';
import { Play, Send, ChevronDown } from 'lucide-react';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

const LANGUAGES = [
    { id: 63, name: 'JavaScript (Node.js 12.14.0)' },
    { id: 71, name: 'Python (3.8.1)' },
    { id: 50, name: 'C (GCC 9.2.0)' },
    { id: 54, name: 'C++ (GCC 9.2.0)' },
    { id: 62, name: 'Java (OpenJDK 13.0.1)' },
];

const CodeEditor = ({
    value,
    onChange,
    languageId,
    onLanguageChange,
    onRun,
    isExecuting
}) => {
    return (
        <div className="w-full h-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col bg-white dark:bg-gray-800 shadow-sm">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <select
                            value={languageId}
                            onChange={(e) => onLanguageChange(Number(e.target.value))}
                            className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang.id} value={lang.id}>{lang.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                            <ChevronDown size={14} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={onRun}
                        disabled={isExecuting}
                        className="text-gray-600 dark:text-gray-300"
                    >
                        <Play size={16} className="mr-2 text-green-600" />
                        Run
                    </Button>
                </div>
            </div>

            {/* Editor Area */}
            <textarea
                className="flex-grow w-full p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none resize-none"
                spellCheck="false"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="// Write your code here..."
            />
        </div>
    );
};

export default CodeEditor;

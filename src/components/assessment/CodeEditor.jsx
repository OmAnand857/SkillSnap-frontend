import React from 'react';

const CodeEditor = ({ value, onChange, language = 'javascript' }) => {
    return (
        <div className="w-full h-64 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col">
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-xs text-gray-500 uppercase font-mono">
                {language}
            </div>
            <textarea
                className="flex-grow w-full p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none resize-none"
                spellCheck="false"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="// Write your code here..."
            />
        </div>
    );
};

export default CodeEditor;

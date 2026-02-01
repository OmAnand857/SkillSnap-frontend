import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, ChevronDown } from 'lucide-react';
import Button from '../common/Button';

const LANGUAGES = [
    { id: 112, name: 'JavaScript (Node.js)' },
    { id: 116, name: 'Python 3' },
    { id: 10, name: 'Java' },
    { id: 44, name: 'C++' },
    { id: 11, name: 'C' },
    { id: 27, name: 'C#' },
    { id: 114, name: 'Go' },
    { id: 93, name: 'Rust' },
    { id: 29, name: 'PHP' },
    { id: 57, name: 'TypeScript' },
];

const LANGUAGE_MAP = {
    112: 'javascript',
    116: 'python',
    10: 'java',
    44: 'cpp',
    11: 'c',
    27: 'csharp',
    114: 'go',
    93: 'rust',
    29: 'php',
    57: 'typescript'
};

const BOILERPLATES = {
    javascript: `// Write your JavaScript code here
console.log("Hello World");
`,
    python: `# Write your Python code here
print("Hello World")
`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
`,
    cpp: `#include <iostream>

int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}
`,
    c: `#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}
`,
    csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello World");
    }
}
`,
    go: `package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}
`,
    rust: `fn main() {
    println!("Hello World");
}
`,
    php: `<?php
echo "Hello World";
?>
`,
    typescript: `// Write your TypeScript code here
const message: string = "Hello World";
console.log(message);
`
};

const CodeEditor = ({
    value,
    onChange,
    languageId,
    onLanguageChange,
    onRun,
    isExecuting
}) => {
    const monacoLanguage = LANGUAGE_MAP[languageId] || 'javascript';

    // When language changes, update content to boilerplate if it's empty or we want to force it.
    // However, usually we might want to preserve correct code if possible, or just reset.
    // The requirement says: "replace the editor content with that language’s boilerplate."
    useEffect(() => {
        const boilerplate = BOILERPLATES[monacoLanguage];
        // Always replace content with boilerplate when language changes, 
        // effectively implementing the user's request to "preload" and "replace".
        onChange(boilerplate);
    }, [languageId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="w-full h-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col bg-white dark:bg-gray-800 shadow-sm">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <select
                            value={languageId}
                            onChange={(e) => onLanguageChange(Number(e.target.value))}
                            className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-gray-100"
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

            {/* Monaco Editor */}
            <div className="flex-grow">
                <Editor
                    height="100%"
                    language={monacoLanguage}
                    theme="vs-dark"
                    value={value}
                    onChange={onChange}
                    options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        automaticLayout: true,
                        tabSize: 4,
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;

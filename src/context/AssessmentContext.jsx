import React, { createContext, useContext, useState, useEffect } from 'react';

const AssessmentContext = createContext();

export const AssessmentProvider = ({ children }) => {
    const [activeAssessment, setActiveAssessment] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [status, setStatus] = useState('idle'); // idle, in-progress, completed
    const [executionResult, setExecutionResult] = useState(null);
    const [isExecuting, setIsExecuting] = useState(false);

    const startAssessment = (assessmentId) => {
        // In a real app, fetch assessment details here
        setActiveAssessment({
            id: assessmentId,
            questions: [
                {
                    id: 1,
                    type: 'mcq',
                    text: 'Which method creates a new array with all elements that pass the test implemented by the provided function?',
                    options: ['forEach()', 'map()', 'filter()', 'reduce()'],
                    correct: 2,
                    examples: [],
                    constraints: []
                },
                {
                    id: 2,
                    type: 'mcq',
                    text: 'What is the output of "2" + 2 in JavaScript?',
                    options: ['4', '"22"', 'NaN', 'Error'],
                    correct: 1,
                    examples: [],
                    constraints: []
                },
                {
                    id: 3,
                    type: 'code',
                    title: 'Prime Number Checker',
                    text: 'Write a function `isPrime(n)` that returns `true` if a number is prime, and `false` otherwise.',
                    initialCode: 'function isPrime(n) {\n  // Your code here\n  return false;\n}',
                    examples: [
                        { input: 'isPrime(7)', output: 'true' },
                        { input: 'isPrime(4)', output: 'false' }
                    ],
                    constraints: ['1 <= n <= 1000']
                }
            ],
            duration: 1800 // 30 mins in seconds
        });
        setAnswers({});
        setTimeLeft(1800);
        setStatus('in-progress');
        setExecutionResult(null);
    };

    const submitAnswer = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const runCode = async (code, languageId) => {
        setIsExecuting(true);
        setExecutionResult(null);

        // Simulate API call to Backend/Judge0
        return new Promise(resolve => {
            setTimeout(() => {
                // Mock logic: check if code is empty or has syntax error keyword
                if (!code || code.trim() === '') {
                    const res = { status: 'Error', error: 'Source code is empty' };
                    setExecutionResult(res);
                    resolve(res);
                } else if (code.includes('error')) {
                    const res = { status: 'Compilation Error', error: 'SyntaxError: Unexpected token' };
                    setExecutionResult(res);
                    resolve(res);
                } else {
                    const res = {
                        status: 'Accepted',
                        output: 'Test Case 1: Passed\nTest Case 2: Passed',
                        execution_time: '0.05s'
                    };
                    setExecutionResult(res);
                    resolve(res);
                }
                setIsExecuting(false);
            }, 1500);
        });
    };

    const finishAssessment = () => {
        setStatus('completed');
    };

    return (
        <AssessmentContext.Provider value={{
            activeAssessment,
            startAssessment,
            answers,
            submitAnswer,
            finishAssessment,
            timeLeft,
            setTimeLeft,
            status,
            runCode,
            executionResult,
            setExecutionResult,
            isExecuting
        }}>
            {children}
        </AssessmentContext.Provider>
    );
};

export const useAssessment = () => useContext(AssessmentContext);

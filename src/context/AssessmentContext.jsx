import React, { createContext, useContext, useState, useEffect } from 'react';

const AssessmentContext = createContext();

export const AssessmentProvider = ({ children }) => {
    const [activeAssessment, setActiveAssessment] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [status, setStatus] = useState('idle'); // idle, in-progress, completed

    const startAssessment = (assessmentId) => {
        // In a real app, fetch assessment details here
        setActiveAssessment({
            id: assessmentId,
            questions: [
                { id: 1, type: 'mcq', text: 'Which method creates a new array with all elements that pass the test implemented by the provided function?', options: ['forEach()', 'map()', 'filter()', 'reduce()'], correct: 2 },
                { id: 2, type: 'mcq', text: 'What is the output of "2" + 2 in JavaScript?', options: ['4', '"22"', 'NaN', 'Error'], correct: 1 },
                { id: 3, type: 'code', text: 'Write a function that returns true if a number is prime.', initialCode: 'function isPrime(n) {\n  // Your code here\n}' }
            ],
            duration: 1800 // 30 mins in seconds
        });
        setAnswers({});
        setTimeLeft(1800);
        setStatus('in-progress');
    };

    const submitAnswer = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
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
            status
        }}>
            {children}
        </AssessmentContext.Provider>
    );
};

export const useAssessment = () => useContext(AssessmentContext);

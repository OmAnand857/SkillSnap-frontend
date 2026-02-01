import React, { createContext, useContext, useState, useEffect } from 'react';
import assessmentService from '../services/assessmentService';

const AssessmentContext = createContext();

// ... (AssessmentContext creation)

export const AssessmentProvider = ({ children }) => {
    const [activeAssessment, setActiveAssessment] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [status, setStatus] = useState('idle');
    const [executionResult, setExecutionResult] = useState(null);
    const [isExecuting, setIsExecuting] = useState(false);
    const [error, setError] = useState(null);

    const startAssessment = async (skillId) => {
        try {
            setStatus('loading');
            const data = await assessmentService.getAssessment(skillId);
            const assessment = data.assessment;

            // Transform or ensure data structure matches what we need
            setActiveAssessment({
                id: skillId,
                questions: assessment.questions,
                duration: assessment.timeLimit || 1800
            });

            setAnswers({});
            setTimeLeft(assessment.timeLimit || 1800);
            setStatus('in-progress');
            setExecutionResult(null);
        } catch (err) {
            console.error("Failed to start assessment", err);
            setError(err.message);
            setStatus('error');
        }
    };

    const submitAnswer = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const runCode = async (sourceCode, languageId) => {
        if (!activeAssessment) return;
        setIsExecuting(true);
        setExecutionResult(null);

        // Find current question ID (assuming one code question for now or passing it)
        // Ideally runCode should take questionId. 
        // For this refactor we might need to find the question from activeAssessment questions list if strictly needed, 
        // but let's assume the caller passes the right context or we fix the signature later.
        // The API requires question_id.
        // Let's defer finding the question ID to the caller or assume the current active one.
        // Since runCode signature in Context is (code, languageId), we need to find the question ID.
        // We can try to find the "code" type question in the active assessment.
        const codeQuestion = activeAssessment.questions.find(q => q.type === 'code');
        const questionId = codeQuestion ? codeQuestion.id : 'unknown';

        try {
            const data = await assessmentService.runCode(languageId, sourceCode, questionId);

            // Adapt API response to UI expected format
            // API returns { status: "...", results: [...] }
            // UI expects { status: "...", output: "...", error: "..." }

            const firstResult = data.results && data.results[0];
            const output = firstResult ? (firstResult.stdout || firstResult.stderr || firstResult.compile_output) : 'No output';

            setExecutionResult({
                status: data.status, // "Accepted"
                output: output,
                error: firstResult?.stderr,
                execution_time: firstResult?.execution_time
            });

        } catch (err) {
            setExecutionResult({
                status: 'Error',
                error: err.message || 'Execution failed'
            });
        } finally {
            setIsExecuting(false);
        }
    };

    // ... (rest of methods like finishAssessment)
    const finishAssessment = async () => {
        if (!activeAssessment) return;
        try {
            setStatus('submitting');
            await assessmentService.submitAssessment(activeAssessment.id, answers);
            setStatus('completed');
        } catch (err) {
            console.error("Failed to submit assessment", err);
            setError(err.message);
            // Optionally set status to error or completed with error
            setStatus('completed');
        }
    };

    return (
        <AssessmentContext.Provider value={{
            activeAssessment,
            startAssessment,
            answers,
            submitAnswer,
            finishAssessment, // Note: finishAssessment needs to call submitAssessment API too eventually
            timeLeft,
            setTimeLeft,
            status,
            runCode,
            executionResult,
            setExecutionResult,
            isExecuting,
            error
        }}>
            {children}
        </AssessmentContext.Provider>
    );
};

export const useAssessment = () => useContext(AssessmentContext);

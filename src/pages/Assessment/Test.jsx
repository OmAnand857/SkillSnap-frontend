import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';
import Timer from '../../components/assessment/Timer';
import CodeEditor from '../../components/assessment/CodeEditor';
import { useAssessment } from '../../context/AssessmentContext';
import { ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, Terminal } from 'lucide-react';
import { cn } from '../../utils/cn';

const Test = () => {
    const { skillId } = useParams();
    const navigate = useNavigate();
    const {
        activeAssessment,
        answers,
        submitAnswer,
        finishAssessment,
        timeLeft,
        setTimeLeft,
        runCode,
        executionResult,
        setExecutionResult,
        isExecuting
    } = useAssessment();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [languageId, setLanguageId] = useState(63); // Default JS
    const [activeTab, setActiveTab] = useState('description'); // description, constraints

    useEffect(() => {
        if (!activeAssessment) {
            navigate(`/assessment/${skillId}/instructions`);
        }
    }, [activeAssessment, navigate, skillId]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && activeAssessment) {
            handleFinish();
        }
    }, [timeLeft, activeAssessment]);

    const handleFinish = () => {
        finishAssessment();
        navigate(`/assessment/${skillId}/results`);
    };

    if (!activeAssessment) return null;

    const currentQuestion = activeAssessment.questions[currentIndex];
    const isCodeQuestion = currentQuestion.type === 'code';

    // Mock handle run
    const handleRunCode = async () => {
        await runCode(answers[currentQuestion.id], languageId);
    };

    return (
        <PageWrapper hideFooter>
            <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50 dark:bg-gray-900">
                {/* Top Bar */}
                <header className="h-14 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-4 flex-shrink-0">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                            {activeAssessment.id} / Question {currentIndex + 1}
                        </h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Timer seconds={timeLeft} onTimeout={handleFinish} />
                        <Button onClick={handleFinish} size="sm" variant="primary">
                            Submit Test
                        </Button>
                    </div>
                </header>

                {/* Main Split Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Panel: Problem Statement */}
                    <div className="w-1/2 flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
                        <div className="border-b border-gray-100 dark:border-gray-700">
                            <div className="flex space-x-0">
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={cn("px-4 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === 'description' ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700")}
                                >
                                    Description
                                </button>
                                <button
                                    onClick={() => setActiveTab('examples')}
                                    className={cn("px-4 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === 'examples' ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700")}
                                >
                                    Examples
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {currentIndex + 1}. {currentQuestion.title || 'Question Title'}
                                </h1>
                                <span className={cn("px-2 py-1 rounded text-xs font-medium",
                                    currentQuestion.type === 'mcq' ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                                )}>
                                    {currentQuestion.type === 'mcq' ? 'Multiple Choice' : 'Coding Challenge'}
                                </span>
                            </div>

                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-gray-700 dark:text-gray-300">
                                    {currentQuestion.text}
                                </p>
                            </div>

                            {/* Examples (Visible if tab active OR always visible if simple) */}
                            {(activeTab === 'examples' || activeTab === 'description') && currentQuestion.examples && currentQuestion.examples.length > 0 && (
                                <div className="space-y-4">
                                    {currentQuestion.examples.map((ex, i) => (
                                        <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-sm font-mono border border-gray-200 dark:border-gray-700">
                                            <div className="mb-1"><span className="text-gray-500">Input:</span> {ex.input}</div>
                                            <div><span className="text-gray-500">Output:</span> {ex.output}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* MCQ Options */}
                            {currentQuestion.type === 'mcq' && (
                                <div className="space-y-3 pt-4">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => submitAnswer(currentQuestion.id, idx)}
                                            className={cn(
                                                "w-full text-left p-4 rounded-lg border-2 transition-all flex items-center",
                                                answers[currentQuestion.id] === idx
                                                    ? "border-primary bg-primary/5 text-primary"
                                                    : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                                            )}
                                        >
                                            <span className={cn(
                                                "w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 text-xs font-bold",
                                                answers[currentQuestion.id] === idx ? "border-primary bg-primary text-white" : "border-gray-400 text-gray-500"
                                            )}>
                                                {String.fromCharCode(65 + idx)}
                                            </span>
                                            <span className="dark:text-gray-200">{option}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Constraints Section */}
                            {currentQuestion.constraints && currentQuestion.constraints.length > 0 && (
                                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Constraints:</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                        {currentQuestion.constraints.map((c, i) => (
                                            <li key={i}>{c}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Footer Navigation (Inside Left Panel) */}
                        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between bg-gray-50 dark:bg-gray-900">
                            <Button
                                variant="outline" size="sm"
                                disabled={currentIndex === 0}
                                onClick={() => {
                                    setCurrentIndex(prev => prev - 1);
                                    setExecutionResult(null);
                                }}
                            >
                                <ChevronLeft className="mr-1 h-4 w-4" /> Prev
                            </Button>
                            <Button
                                variant="outline" size="sm"
                                disabled={currentIndex === activeAssessment.questions.length - 1}
                                onClick={() => {
                                    setCurrentIndex(prev => prev + 1);
                                    setExecutionResult(null);
                                }}
                            >
                                Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Panel: Code Editor & Output */}
                    <div className="w-1/2 flex flex-col bg-gray-100 dark:bg-gray-900 overflow-hidden">
                        {isCodeQuestion ? (
                            <div className="flex flex-col h-full p-2 gap-2">
                                <div className="flex-grow flex flex-col min-h-0">
                                    <CodeEditor
                                        value={answers[currentQuestion.id] || currentQuestion.initialCode}
                                        onChange={(val) => submitAnswer(currentQuestion.id, val)}
                                        languageId={languageId}
                                        onLanguageChange={setLanguageId}
                                        onRun={handleRunCode}
                                        isExecuting={isExecuting}
                                    />
                                </div>

                                {/* Console Output Panel */}
                                <div className="h-1/3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
                                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                        <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            <Terminal className="mr-2 h-4 w-4" /> Console
                                        </div>
                                        {executionResult && (
                                            <span className={cn("text-xs font-bold px-2 py-0.5 rounded",
                                                executionResult.status === 'Accepted' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            )}>
                                                {executionResult.status}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-grow p-4 font-mono text-sm overflow-auto text-gray-800 dark:text-gray-200">
                                        {isExecuting ? (
                                            <div className="flex items-center space-x-2 text-gray-500">
                                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                <span>Running code against test cases...</span>
                                            </div>
                                        ) : executionResult ? (
                                            <div className="space-y-2">
                                                {executionResult.error ? (
                                                    <div className="text-red-500 bg-red-50 dark:bg-red-900/10 p-2 rounded">
                                                        {executionResult.error}
                                                    </div>
                                                ) : (
                                                    <pre className="whitespace-pre-wrap">{executionResult.output}</pre>
                                                )}
                                                {executionResult.execution_time && (
                                                    <div className="text-xs text-gray-400 mt-2">
                                                        Execution Time: {executionResult.execution_time}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-gray-400 italic">Run your code to see output here.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Placeholder for non-code questions on the right panel
                            <div className="h-full flex items-center justify-center p-8 text-center text-gray-500">
                                <div className="max-w-xs">
                                    <CheckCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                    <p>This is a multiple-choice question. Select your answer in the panel on the left.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Test;

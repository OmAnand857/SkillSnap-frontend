import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';
import { useAssessment } from '../../context/AssessmentContext';
import { CheckCircle, XCircle, Award, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const Results = () => {
    const navigate = useNavigate();
    const { activeAssessment, submissionResult } = useAssessment();
    const result = submissionResult || { score: 0, totalQuestions: 0, results: [] };
    const percentage = result.totalQuestions > 0 ? Math.round((result.score / result.totalQuestions) * 100) : 0;

    if (!activeAssessment) {
        return (
            <PageWrapper>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <h2 className="text-2xl font-bold mb-4">Assessment Not Found</h2>
                    <Button onClick={() => navigate('/skills')}>Back to Skills</Button>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <div className={cn("w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
                            percentage >= 70 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
                            {percentage >= 70 ? <CheckCircle size={48} /> : <XCircle size={48} />}
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {percentage >= 70 ? "Assessment Passed!" : "Assessment Failed"}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                            You scored <span className="font-bold">{percentage}%</span> ({result.score}/{result.totalQuestions})
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Question Breakdown</h3>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                            {activeAssessment.questions.map((question, index) => {
                                const questionResult = result.results ? result.results.find(r => r.questionId === question.id) : null;
                                const isCorrect = questionResult?.correct;

                                return (
                                    <div key={question.id} className="p-6">
                                        <div className="flex items-start">
                                            <div className="mr-4 mt-1">
                                                {isCorrect ?
                                                    <CheckCircle className="text-green-500" size={20} /> :
                                                    <XCircle className="text-red-500" size={20} />
                                                }
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                                    {index + 1}. {question.title}
                                                </h4>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                                                    {question.text}
                                                </p>
                                                {!isCorrect && (
                                                    <div className="text-sm bg-red-50 dark:bg-red-900/20 text-red-600 p-2 rounded">
                                                        Incorrect Answer
                                                    </div>
                                                )}
                                                {isCorrect && (
                                                    <div className="text-sm bg-green-50 dark:bg-green-900/20 text-green-600 p-2 rounded">
                                                        Correct Answer
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Button onClick={() => navigate('/dashboard')}>
                            Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/skills')}>
                            Take Another Assessment
                        </Button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Results;

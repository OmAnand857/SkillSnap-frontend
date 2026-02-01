import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';
import Timer from '../../components/assessment/Timer';
import QuestionCard from '../../components/assessment/QuestionCard';
import QuestionNavigator from '../../components/assessment/QuestionNavigator';
import { useAssessment } from '../../context/AssessmentContext';

const Test = () => {
    const { skillId } = useParams();
    const navigate = useNavigate();
    const {
        activeAssessment,
        answers,
        submitAnswer,
        finishAssessment,
        timeLeft,
        setTimeLeft
    } = useAssessment();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!activeAssessment) {
            // If page refreshed, in a real app check local storage or redirect
            // For now redirect to instructions/start
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

    return (
        <PageWrapper hideFooter>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
                {/* Top Bar */}
                <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-16 z-30">
                    <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Assessment: {skillId} {/* In real app use skill name */}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Timer seconds={timeLeft} onTimeout={handleFinish} />
                            <Button onClick={handleFinish} variant="primary">
                                Submit Test
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Question Area */}
                        <div className="lg:col-span-2 space-y-6">
                            <QuestionCard
                                question={currentQuestion}
                                answer={answers[currentQuestion.id]}
                                onAnswer={(val) => submitAnswer(currentQuestion.id, val)}
                            />

                            <div className="flex justify-between">
                                <Button
                                    variant="outline"
                                    disabled={currentIndex === 0}
                                    onClick={() => setCurrentIndex(prev => prev - 1)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    disabled={currentIndex === activeAssessment.questions.length - 1}
                                    onClick={() => setCurrentIndex(prev => prev + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>

                        {/* Sidebar Navigator */}
                        <div className="lg:col-span-1">
                            <QuestionNavigator
                                questions={activeAssessment.questions}
                                currentIndex={currentIndex}
                                answers={answers}
                                onNavigate={setCurrentIndex}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Test;

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';
import { useAssessment } from '../../context/AssessmentContext';
import { CheckCircle, XCircle, Award, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const Results = () => {
    const navigate = useNavigate();
    const { activeAssessment, answers } = useAssessment();

    // Calculate Score (Mock logic)
    const scoreData = useMemo(() => {
        if (!activeAssessment) return { correct: 0, total: 0, percentage: 0, passed: false };

        let correct = 0;
        activeAssessment.questions.forEach(q => {
            // Mock check: For MCQ assume correct option index is in q.correct
            // For code assume answer length > 10 is pass
            if (q.type === 'mcq' && answers[q.id] === q.correct) correct++;
            if (q.type === 'code' && answers[q.id] && answers[q.id].length > 10) correct++;
        });

        const total = activeAssessment.questions.length;
        const percentage = Math.round((correct / total) * 100);
        return {
            correct,
            total,
            percentage,
            passed: percentage >= 70
        };
    }, [activeAssessment, answers]);

    if (!activeAssessment) {
        return (
            <PageWrapper>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <h2 className="text-2xl font-bold mb-4">No results found</h2>
                    <Button onClick={() => navigate('/skills')}>Back to Skills</Button>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center space-y-8">
                    <div className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
                        scoreData.passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    )}>
                        {scoreData.passed ? <Award size={48} /> : <XCircle size={48} />}
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {scoreData.passed ? "Congratulations!" : "Keep Practicing!"}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            You scored <span className="font-bold text-gray-900 dark:text-white">{scoreData.percentage}%</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                            <p className="text-gray-500 text-sm">Correct Answers</p>
                            <p className="text-2xl font-bold text-green-600">{scoreData.correct}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                            <p className="text-gray-500 text-sm">Total Questions</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{scoreData.total}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-8">
                        <Button variant="outline" onClick={() => navigate('/skills')}>
                            Explore More Skills
                        </Button>
                        {scoreData.passed ? (
                            <Button onClick={() => navigate(`/certificate/${activeAssessment.id}`)}>
                                View Certificate <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        ) : (
                            <Button onClick={() => navigate(`/assessment/${activeAssessment.id}/instructions`)}>
                                Retry Assessment
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Results;

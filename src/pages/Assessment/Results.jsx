import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';
import { useAssessment } from '../../context/AssessmentContext';
import { CheckCircle, XCircle, Award, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const Results = () => {
    const navigate = useNavigate();
    const { activeAssessment } = useAssessment();

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
                <div className="max-w-2xl mx-auto text-center space-y-8">
                    <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Assessment Submitted!
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Your answers for <span className="font-bold text-gray-900 dark:text-white">{activeAssessment.id}</span> have been recorded.
                        </p>
                        <p className="mt-4 text-gray-500">
                            Your results are being processed. If you passed, your certificate will be available in your dashboard shortly.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-8">
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

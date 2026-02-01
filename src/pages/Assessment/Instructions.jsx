import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';
import { useAssessment } from '../../context/AssessmentContext';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

const Instructions = () => {
    const { skillId } = useParams();
    const navigate = useNavigate();
    const { startAssessment } = useAssessment();

    const handleStart = () => {
        startAssessment(skillId);
        navigate(`/assessment/${skillId}/test`);
    };

    return (
        <PageWrapper hideFooter>
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Assessment Instructions
                    </h1>

                    <div className="space-y-6 mb-8">
                        <div className="flex items-start">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-4">
                                <Clock className="text-blue-600 dark:text-blue-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Duration: 30 Minutes</h3>
                                <p className="text-gray-600 dark:text-gray-400">The test will auto-submit when the time is up.</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-4">
                                <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Passing Score: 70%</h3>
                                <p className="text-gray-600 dark:text-gray-400">You must answer at least 70% of questions correctly to earn the certificate.</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg mr-4">
                                <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rules</h3>
                                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                    <li>Do not refresh the page.</li>
                                    <li>Using other tabs/windows is monitored.</li>
                                    <li>Ensure stable internet connection.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => navigate('/skills')}>Back</Button>
                        <Button onClick={handleStart} size="lg">Start Assessment</Button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Instructions;

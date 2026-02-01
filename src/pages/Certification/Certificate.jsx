import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';
import { Download, Share2, CheckCircle, Award } from 'lucide-react';
import assessmentService from '../../services/assessmentService';

const Certificate = () => {
    const { id } = useParams();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                // For demo/testing without a valid ID, we might fall back to mock if ID is "demo"
                if (id === 'demo') {
                    // Mock data fallback
                    setCertificate({
                        id: 'demo',
                        userName: 'Demo User',
                        skillName: 'JavaScript Assessment',
                        issuedAt: new Date().toISOString(),
                        verifiedId: 'SKILLSNAP-2024-DEMO',
                        url: '#'
                    });
                    setLoading(false);
                    return;
                }

                const data = await assessmentService.getCertificate(id);
                setCertificate(data);
            } catch (err) {
                console.error("Failed to fetch certificate", err);
                setError(err.message || "Certificate not found");
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [id]);

    if (loading) {
        return (
            <PageWrapper>
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </PageWrapper>
        );
    }

    if (error || !certificate) {
        return (
            <PageWrapper>
                <div className="flex flex-col justify-center items-center h-[calc(100vh-4rem)] p-4">
                    <p className="text-red-500 text-xl mb-4">{error || "Certificate not found"}</p>
                    <Link to="/dashboard">
                        <Button>Go to Dashboard</Button>
                    </Link>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-12">
                {/* Certificate Preview Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 relative">
                    {/* Decorative Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                    <div className="p-8 md:p-12 text-center space-y-8">
                        {/* Header */}
                        <div className="space-y-2">
                            <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                                <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white tracking-tight">
                                Certificate of Achievement
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                This is to verify that
                            </p>
                        </div>

                        {/* Recipient */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-light mb-2">
                                {certificate.userName || certificate.recipient}
                            </h3>
                            <div className="w-48 h-0.5 bg-gray-200 dark:bg-gray-700 mx-auto my-4"></div>
                            <p className="text-gray-500 dark:text-gray-400">
                                has successfully passed the assessment for
                            </p>
                        </div>

                        {/* Course/Skill */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                                {certificate.skillName || certificate.course}
                            </h3>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400 pt-8 border-t border-gray-100 dark:border-gray-700">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Date Issued</p>
                                <p>{new Date(certificate.issuedAt || certificate.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Verification ID</p>
                                <p className="font-mono">{certificate.verifiedId || certificate.verificationId}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Score</p>
                                <p>{certificate.score || 'Passed'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button icon={Download} onClick={() => window.open(certificate.url || '#', '_blank')}>
                        Download PDF
                    </Button>
                    <Button variant="outline" icon={Share2} onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: `${certificate.skillName} Certificate`,
                                text: `Check out my ${certificate.skillName} certificate on SkillSnap!`,
                                url: window.location.href
                            });
                        }
                    }}>
                        Share Certificate
                    </Button>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Certificate;

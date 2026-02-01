import React from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';
import { Download, Share2, ShieldCheck, Award } from 'lucide-react';

const Certificate = () => {
    const { id } = useParams();

    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 relative">
                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

                        <div className="p-12 text-center space-y-8">
                            <div className="flex justify-center mb-8">
                                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Award size={48} />
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">
                                Certificate of Completion
                            </h1>

                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                This certifies that
                            </p>

                            <h2 className="text-3xl font-bold text-primary underline decoration-2 decoration-secondary underline-offset-4">
                                Demo User
                            </h2>

                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                has successfully demonstrated proficiency in
                            </p>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                JavaScript Fundamentals
                            </h3>

                            <div className="flex justify-center items-center space-x-2 text-gray-500 text-sm mt-8">
                                <ShieldCheck size={16} className="text-green-500" />
                                <span>Verified Assessment ID: {id || 'SK-8392-2938'}</span>
                                <span className="mx-2">•</span>
                                <span>Date: {new Date().toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Footer of Certificate */}
                        <div className="bg-gray-50 dark:bg-gray-900 p-6 flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest border-t dark:border-gray-700">
                            <span>SkillSnap Certified</span>
                            <span className="font-bold">SkillSnap.com</span>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center space-x-4">
                        <Button>
                            <Download className="mr-2 h-4 w-4" /> Download PDF
                        </Button>
                        <Button variant="outline">
                            <Share2 className="mr-2 h-4 w-4" /> Share on LinkedIn
                        </Button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Certificate;

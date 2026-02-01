import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Award, Users, ArrowRight, CheckCircle } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';

const LandingPage = () => {
    return (
        <PageWrapper>
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl -z-10" />

                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
                        Valdiate Your Skills. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Earn Your Future.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                        Join thousands of developers proving their expertise with industry-recognized assessments and certifications.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/signup">
                            <Button size="lg" className="rounded-full px-8 text-lg">
                                Get Started <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to="/skills">
                            <Button variant="outline" size="lg" className="rounded-full px-8 text-lg">
                                Explore Skills
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white/50 dark:bg-gray-800/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why SkillSnap?</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            We provide the most comprehensive validation platform for your technical journey.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Code2 className="h-8 w-8 text-primary" />,
                                title: "Real-world Challenges",
                                desc: "Solve actual coding problems, not just multiple choice questions."
                            },
                            {
                                icon: <Award className="h-8 w-8 text-secondary" />,
                                title: "Verified Certificates",
                                desc: "Earn shareable certificates that validate your expertise to employers."
                            },
                            {
                                icon: <Users className="h-8 w-8 text-green-500" />,
                                title: "Community Benchmarking",
                                desc: "See how you stack up against thousands of other developers globally."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                                <div className="mb-4 bg-gray-50 dark:bg-gray-900 w-16 h-16 rounded-xl flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Supported Skills Preview */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Master In-Demand Skills
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'C++', 'Java', 'Golang'].map((skill) => (
                            <div key={skill} className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span className="font-medium dark:text-white">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Ready to Prove Your Skills?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Join the platform today and take your career to the next level.
                    </p>
                    <Link to="/signup">
                        <Button size="lg" className="rounded-full px-10 text-lg shadow-lg shadow-primary/25">
                            Start Assessment Now
                        </Button>
                    </Link>
                </div>
            </section>
        </PageWrapper>
    );
};

export default LandingPage;

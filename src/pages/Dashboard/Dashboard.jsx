import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import { Award, Clock, Activity } from 'lucide-react';
import Profile from '../../pages/Profile/Profile';

const DashboardOverview = () => {
    const { user } = useAuth();

    return (
        <div className="p-6 md:p-8 space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Hello, {user?.name || 'Developer'}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Ready to test your skills today?
                    </p>
                </div>
                <Button>Browse Skills</Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Assessments Taken', value: '12', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    { label: 'Skills Verified', value: '5', icon: Award, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                    { label: 'Learning Hours', value: '48h', icon: Clock, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' }
                ].map((stat, idx) => (
                    <div key={idx} className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Progress */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[
                            { skill: 'React Basics', score: 85, date: '2 days ago' },
                            { skill: 'JavaScript Advanced', score: 92, date: '1 week ago' },
                            { skill: 'CSS Grid & Flexbox', score: 78, date: '2 weeks ago' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.skill}</h4>
                                    <span className="text-xs text-gray-500">{item.date}</span>
                                </div>
                                <div className="text-right">
                                    <span className={`font-bold ${item.score >= 90 ? 'text-green-500' : 'text-primary'}`}>{item.score}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skill Progress</h3>
                    <div className="space-y-6">
                        {[
                            { skill: 'Frontend Development', progress: 75 },
                            { skill: 'Backend (Node.js)', progress: 40 },
                            { skill: 'Database Design', progress: 60 }
                        ].map((item, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">{item.skill}</span>
                                    <span className="text-gray-500">{item.progress}%</span>
                                </div>
                                <ProgressBar value={item.progress} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};



const Dashboard = () => {
    const { user } = useAuth();

    if (!user) {
        // For development, we might not want to redirect strictly yet, 
        // but for production logic:
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Navbar />
            <div className="flex flex-1 container mx-auto px-4 max-w-7xl">
                <Sidebar className="hidden lg:block w-64 flex-shrink-0" />
                <main className="flex-1 w-full">
                    <Routes>
                        <Route index element={<DashboardOverview />} />
                        <Route path="profile" element={<Profile />} />
                        {/* Add more nested routes here later e.g. /skills, /certificates */}
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;

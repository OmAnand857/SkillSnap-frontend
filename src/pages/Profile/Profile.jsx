import React from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { User, Mail, Lock, Moon, Sun } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Profile Settings</h1>

                <div className="space-y-6">
                    {/* Personal Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                            <User className="mr-2 h-5 w-5" /> Personal Information
                        </h2>
                        <div className="space-y-4">
                            <Input label="Full Name" defaultValue={user?.name || "Demo User"} />
                            <Input label="Email" defaultValue={user?.email || "demo@example.com"} readOnly disabled />
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                            <Lock className="mr-2 h-5 w-5" /> Security
                        </h2>
                        <div className="space-y-4">
                            <Input label="Current Password" type="password" placeholder="••••••••" />
                            <Input label="New Password" type="password" placeholder="••••••••" />
                            <Button variant="outline" className="w-full sm:w-auto">Update Password</Button>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
                            <p className="text-sm text-gray-500">Customize how SkillSnap looks on your device.</p>
                        </div>
                        <Button variant="outline" onClick={toggleTheme} className="flex items-center space-x-2">
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                        </Button>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <Button variant="ghost">Cancel</Button>
                        <Button>Save Changes</Button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Profile;

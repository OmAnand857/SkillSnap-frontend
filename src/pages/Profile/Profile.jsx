import React, { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { User, Mail, Lock, Moon, Sun } from 'lucide-react';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [passwords, setPasswords] = useState({ current: '', new: '' });

    const handleUpdateName = async (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        if (name === user?.name) return;

        try {
            setIsLoading(true);
            await updateProfile({ displayName: name });
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (!passwords.new) return;
        try {
            setIsLoading(true);
            await updateProfile({ password: passwords.new }); // API might need current password validation too
            setMessage({ type: 'success', text: 'Password updated successfully' });
            setPasswords({ current: '', new: '' });
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Failed to update password' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Profile Settings</h1>

                {message.text && (
                    <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <div className="space-y-6">
                    {/* Personal Info */}
                    <form onSubmit={handleUpdateName} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                            <User className="mr-2 h-5 w-5" /> Personal Information
                        </h2>
                        <div className="space-y-4">
                            <Input name="name" label="Full Name" defaultValue={user?.displayName || user?.name || "Demo User"} />
                            <Input label="Email" defaultValue={user?.email || "demo@example.com"} readOnly disabled />
                            <div className="flex justify-end">
                                <Button size="sm" type="submit" isLoading={isLoading && !passwords.new}>Save Name</Button>
                            </div>
                        </div>
                    </form>

                    {/* Security */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                            <Lock className="mr-2 h-5 w-5" /> Security
                        </h2>
                        <div className="space-y-4">
                            {/* Note: API spec only mentioned updating password. Real apps usually require current password. Ignoring for now based on simple spec. */}
                            <Input
                                label="New Password"
                                type="password"
                                placeholder="••••••••"
                                value={passwords.new}
                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                            />
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto"
                                onClick={handleUpdatePassword}
                                isLoading={isLoading && passwords.new}
                                disabled={!passwords.new}
                            >
                                Update Password
                            </Button>
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
                </div>
            </div>
        </PageWrapper>
    );
};

export default Profile;

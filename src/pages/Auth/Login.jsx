import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/layout/PageWrapper';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!formData.email || !formData.password) {
                setError('Please enter both email and password.');
                setIsLoading(false);
                return;
            }
            await login({ email: formData.email, password: formData.password });
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Login failed. Please check your credentials.');
            setIsLoading(false);
        }
    };

    return (
        <PageWrapper hideFooter>
            <div className="flex h-full min-h-[calc(100vh-4rem)] items-center justify-center p-4">
                <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl dark:border dark:border-gray-700">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Sign in to your SkillSnap account
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                label="Email address"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                error={error && !formData.email && 'Email is required'}
                                required
                            />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                error={error && !formData.password && 'Password is required'}
                                required
                            />
                        </div>

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Sign in
                        </Button>
                    </form>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-primary hover:text-primary-dark">
                            Sign up for free
                        </Link>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Login;

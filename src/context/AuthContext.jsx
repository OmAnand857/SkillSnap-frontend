import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await authService.getCurrentUser();
                setUser(response.user);
            }
        } catch (error) {
            console.error("Failed to fetch user", error);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        const response = await authService.login(credentials);
        setUser(response.user || { email: credentials.email }); // Fallback if API doesn't return user immediately
        return response;
    };

    const signup = async (data) => {
        const response = await authService.signup(data);
        // Note: Signup usually doesn't return token immediately in this flow, usually requires login
        return response;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const updateProfile = async (data) => {
        const response = await authService.updateProfile(data);
        if (response.user) {
            setUser(prev => ({ ...prev, ...response.user }));
        }
        return response;
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

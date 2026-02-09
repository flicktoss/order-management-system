import React, { createContext, useContext, useState, useEffect } from 'react';
import { decodeToken, isTokenExpired, getUserFromToken } from '../utils/jwt';
import * as authApi from '../api/auth.api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            // Check if token is expired
            if (isTokenExpired(storedToken)) {
                logout();
            } else {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authApi.login(credentials);
            const { token: newToken, ...userData } = response;

            // Store in localStorage
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));

            // Update state
            setToken(newToken);
            setUser(userData);

            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message || 'Login failed' };
        }
    };

    const register = async (data) => {
        try {
            const response = await authApi.register(data);
            const { token: newToken, ...userData } = response;

            // Store in localStorage
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));

            // Update state
            setToken(newToken);
            setUser(userData);

            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!token && !!user && !isTokenExpired(token);
    };

    const isAdmin = () => {
        return user && user.role === 'ADMIN';
    };

    const isUser = () => {
        return user && user.role === 'USER';
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
        isUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

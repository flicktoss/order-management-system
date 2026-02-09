import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Button from './Button';

const Navbar = () => {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-surface border-b border-border shadow-soft sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <svg className="h-8 w-8 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="text-xl font-bold text-primary">Order MS</span>
                    </Link>

                    {/* Navigation Links */}
                    {isAuthenticated() && (
                        <div className="flex items-center space-x-6">
                            <Link to="/products" className="text-primary hover:text-accent transition-colors font-medium">
                                Products
                            </Link>
                            <Link to="/cart" className="text-primary hover:text-accent transition-colors font-medium flex items-center gap-1">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Cart
                            </Link>
                            <Link to="/orders" className="text-primary hover:text-accent transition-colors font-medium">
                                My Orders
                            </Link>
                            {isAdmin() && (
                                <>
                                    <Link to="/admin/orders" className="text-primary hover:text-accent transition-colors font-medium">
                                        All Orders
                                    </Link>
                                    <Link to="/admin/users" className="text-primary hover:text-accent transition-colors font-medium">
                                        Users
                                    </Link>
                                </>
                            )}
                        </div>
                    )}

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated() ? (
                            <>
                                <div className="text-sm">
                                    <span className="text-muted">Hello, </span>
                                    <span className="text-primary font-medium">{user?.name}</span>
                                </div>
                                <Button variant="secondary" size="sm" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
                                    Login
                                </Button>
                                <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                                    Register
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

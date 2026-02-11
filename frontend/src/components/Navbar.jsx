import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../context/CartContext';
import Button from './Button';

const Navbar = () => {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { cartCount } = useCart();
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
                        <div className="flex items-center space-x-1 sm:space-x-6">
                            <Link to="/products" className="group flex items-center space-x-1 px-3 py-2 rounded-lg text-primary hover:bg-blue-50 hover:text-blue-600 transition-all font-medium">
                                <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                <span>Products</span>
                            </Link>

                            <Link to="/cart" className="relative group flex items-center space-x-1 px-3 py-2 rounded-lg text-primary hover:bg-blue-50 hover:text-blue-600 transition-all font-medium">
                                <div className="relative">
                                    <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <span className="hidden sm:inline">Cart</span>
                            </Link>

                            <Link to="/orders" className="group flex items-center space-x-1 px-3 py-2 rounded-lg text-primary hover:bg-blue-50 hover:text-blue-600 transition-all font-medium">
                                <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                <span className="hidden sm:inline">Orders</span>
                            </Link>

                            {isAdmin() && (
                                <>
                                    <Link to="/admin/orders" className="group flex items-center space-x-1 px-3 py-2 rounded-lg text-primary hover:bg-blue-50 hover:text-blue-600 transition-all font-medium">
                                        <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="hidden lg:inline">Manage Orders</span>
                                    </Link>
                                    <Link to="/admin/users" className="group flex items-center space-x-1 px-3 py-2 rounded-lg text-primary hover:bg-blue-50 hover:text-blue-600 transition-all font-medium">
                                        <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <span className="hidden lg:inline">Users</span>
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

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Button from '../components/Button';
import ErrorBanner from '../components/ErrorBanner';
import { isValidEmail } from '../utils/formatters';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear field error on change
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        const result = await login(formData);
        setLoading(false);

        if (result.success) {
            navigate('/products');
        } else {
            setApiError(result.error);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="card p-8 shadow-medium">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
                        <p className="text-muted">Sign in to your account</p>
                    </div>

                    {/* Error Banner */}
                    {apiError && <ErrorBanner message={apiError} onClose={() => setApiError('')} />}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="label">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'input-error' : 'input'}
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="label">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'input-error' : 'input'}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-1 text-sm text-error">{errors.password}</p>}
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" variant="primary" className="w-full" loading={loading} disabled={loading}>
                            Sign In
                        </Button>
                    </form>

                    {/* Footer */}
                    <p className="mt-6 text-center text-sm text-muted">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-accent hover:text-accent-hover">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

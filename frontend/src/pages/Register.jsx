import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Button from '../components/Button';
import ErrorBanner from '../components/ErrorBanner';
import { isValidEmail, isValidPhone, validatePassword } from '../utils/formatters';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [apiErrorDetails, setApiErrorDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.valid) {
            newErrors.password = passwordValidation.errors[0];
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone is required';
        } else if (!isValidPhone(formData.phone)) {
            newErrors.phone = 'Phone must be exactly 10 digits';
        }

        if (!formData.address || formData.address.length < 10) {
            newErrors.address = 'Address must be at least 10 characters';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        setApiErrorDetails([]);

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        const { confirmPassword, ...dataToSend } = formData;
        const result = await register(dataToSend);
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
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-primary mb-2">Create Account</h2>
                        <p className="text-muted">Join us today</p>
                    </div>

                    {apiError && <ErrorBanner message={apiError} details={apiErrorDetails} onClose={() => setApiError('')} />}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="label">Full Name</label>
                            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className={errors.name ? 'input-error' : 'input'} placeholder="John Doe" />
                            {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="label">Email Address</label>
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={errors.email ? 'input-error' : 'input'} placeholder="you@example.com" />
                            {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="label">Password</label>
                            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className={errors.password ? 'input-error' : 'input'} placeholder="••••••••" />
                            {errors.password && <p className="mt-1 text-sm text-error">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                            <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? 'input-error' : 'input'} placeholder="••••••••" />
                            {errors.confirmPassword && <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="label">Phone Number</label>
                            <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={errors.phone ? 'input-error' : 'input'} placeholder="9876543210" maxLength="10" />
                            {errors.phone && <p className="mt-1 text-sm text-error">{errors.phone}</p>}
                        </div>

                        <div>
                            <label htmlFor="address" className="label">Address</label>
                            <textarea id="address" name="address" rows="3" value={formData.address} onChange={handleChange} className={errors.address ? 'input-error' : 'input'} placeholder="123 Main Street, City, State, ZIP"></textarea>
                            {errors.address && <p className="mt-1 text-sm text-error">{errors.address}</p>}
                        </div>

                        <Button type="submit" variant="primary" className="w-full" loading={loading} disabled={loading}>
                            Create Account
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-accent hover:text-accent-hover">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { createOrder } from '../api/order.api';
import Button from '../components/Button';
import ErrorBanner from '../components/ErrorBanner';
import { formatCurrency } from '../utils/formatters';

const Cart = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    // Simple cart implementation - in production use CartContext
    const [cartItems, setCartItems] = useState(
        location.state?.product ? [{
            ...location.state.product,
            quantity: location.state.quantity
        }] : []
    );

    const [shippingAddress, setShippingAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;
        const newItems = [...cartItems];
        newItems[index].quantity = Math.min(newQuantity, newItems[index].stock);
        setCartItems(newItems);
    };

    const removeItem = (index) => {
        setCartItems(cartItems.filter((_, i) => i !== index));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        if (!shippingAddress || shippingAddress.length < 10) {
            setError('Please enter a valid shipping address (minimum 10 characters)');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const orderData = {
                userId: user.id,
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                })),
                shippingAddress,
                notes
            };

            const result = await createOrder(orderData);
            navigate(`/orders/${result.id}`);
        } catch (err) {
            setError(err.message || 'Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold text-primary mb-4">Your cart is empty</h2>
                <Button onClick={() => navigate('/products')}>Browse Products</Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

            {error && <ErrorBanner message={error} onClose={() => setError('')} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item, index) => (
                        <div key={index} className="card p-4 flex gap-4">
                            <div className="w-24 h-24 bg-surface-hover rounded flex-shrink-0 flex items-center justify-center">
                                <svg className="h-12 w-12 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-primary">{item.name}</h3>
                                <p className="text-sm text-muted">{formatCurrency(item.price)}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => updateQuantity(index, item.quantity - 1)}
                                        className="btn-secondary px-3 py-1 text-sm"
                                    >
                                        -
                                    </button>
                                    <span className="text-sm font-medium text-primary min-w-[2rem] text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(index, item.quantity + 1)}
                                        className="btn-secondary px-3 py-1 text-sm"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeItem(index)}
                                        className="ml-auto text-error hover:text-red-700 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-primary">{formatCurrency(item.price * item.quantity)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <h2 className="text-xl font-semibold text-primary mb-4">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="label">Shipping Address *</label>
                                <textarea
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    className="input resize-none"
                                    rows="3"
                                    placeholder="Enter your shipping address"
                                />
                            </div>
                            <div>
                                <label className="label">Notes (Optional)</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="input resize-none"
                                    rows="2"
                                    placeholder="Any special instructions?"
                                />
                            </div>
                        </div>

                        <div className="border-t border-border pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Subtotal</span>
                                <span className="text-primary">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span className="text-primary">Total</span>
                                <span className="text-primary">{formatCurrency(subtotal)}</span>
                            </div>
                        </div>

                        <Button
                            variant="primary"
                            className="w-full mt-6"
                            onClick={handleCheckout}
                            loading={loading}
                            disabled={loading || !shippingAddress}
                        >
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

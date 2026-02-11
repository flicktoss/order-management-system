import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/order.api';
import Button from '../components/Button';
import ErrorBanner from '../components/ErrorBanner';
import { formatCurrency } from '../utils/formatters';

const Cart = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartItems, updateQuantity, removeFromCart, clearCart, cartCount } = useCart();

    const [shippingAddress, setShippingAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // Example 10% tax
    const total = subtotal;

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
            clearCart(); // Clear cart after successful order
            navigate(`/orders/${result.id}`);
        } catch (err) {
            setError(err.message || 'Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="mb-6">
                    <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any items to the cart yet.</p>
                <Button onClick={() => navigate('/products')} variant="primary" className="px-8 py-3 text-lg">
                    Start Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart ({cartCount} items)</h1>
                <Button onClick={() => navigate('/products')} variant="secondary" className="hidden sm:flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                </Button>
            </div>

            {error && <ErrorBanner message={error} onClose={() => setError('')} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-6 transition-transform hover:scale-[1.01]">
                            {/* Product Image */}
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <p className="text-xs text-blue-600 font-medium mb-1">{item.category}</p>
                                            <h3 className="font-bold text-gray-900 text-lg sm:text-lg hover:text-blue-600 cursor-pointer" onClick={() => navigate(`/products/${item.id}`)}>
                                                {item.name}
                                            </h3>
                                        </div>
                                        <p className="font-bold text-gray-900 text-lg">{formatCurrency(item.price * item.quantity)}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-2">{formatCurrency(item.price)} each</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-all"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-all"
                                            disabled={item.quantity >= item.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Mobile Continue Shopping */}
                    <div className="sm:hidden pt-4">
                        <Button onClick={() => navigate('/products')} variant="secondary" className="w-full flex justify-center items-center gap-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Continue Shopping
                        </Button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                                <textarea
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                                    rows="3"
                                    placeholder="Enter your full street address..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes (Optional)</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                                    rows="2"
                                    placeholder="Any special instructions for delivery?"
                                />
                            </div>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-4 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 mt-2">
                                <span className="text-gray-900">Total</span>
                                <span className="text-blue-600">{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <Button
                            variant="primary"
                            className="w-full mt-6 py-3 text-lg font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40"
                            onClick={handleCheckout}
                            loading={loading}
                            disabled={loading || !shippingAddress || cartItems.length === 0}
                        >
                            Place Order
                        </Button>

                        <p className="text-xs text-center text-gray-500 mt-4">
                            Secure checkout powered by OrderSys
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

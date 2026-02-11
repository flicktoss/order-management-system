import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { getOrdersByUserId } from '../api/order.api';
import Loader from '../components/Loader';
import ErrorBanner from '../components/ErrorBanner';
import Badge from '../components/Badge';
import { formatCurrency, formatDate } from '../utils/formatters';

const Orders = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getOrdersByUserId(user.id);
            setOrders(data);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullScreen />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">My Orders</h1>
                <p className="text-muted">Track and manage your orders</p>
            </div>

            {error && <ErrorBanner message={error} onClose={() => setError('')} />}

            {orders.length === 0 ? (
                <div className="card p-12 text-center">
                    <p className="text-muted mb-4">You haven't placed any orders yet</p>
                    <button onClick={() => navigate('/products')} className="btn-primary">
                        Browse Products
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div
                            key={order.id}
                            className="card p-6 hover:shadow-medium transition-shadow cursor-pointer"
                            onClick={() => navigate(`/orders/${order.id}`)}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-primary">{order.orderNumber}</h3>
                                        <Badge variant={order.status}>{order.status}</Badge>
                                    </div>
                                    <p className="text-sm text-muted">
                                        Placed on {formatDate(order.createdAt)}
                                    </p>
                                    <p className="text-sm text-muted">
                                        {order.items.length} item(s)
                                    </p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-2xl font-bold text-primary">
                                        {formatCurrency(order.totalAmount)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;

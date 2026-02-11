import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, updateOrderStatus } from '../api/order.api';
import Loader from '../components/Loader';
import ErrorBanner from '../components/ErrorBanner';
import Badge from '../components/Badge';
import { formatCurrency, formatDate } from '../utils/formatters';

const AdminOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

    const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'FAILED'];

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getAllOrders();
            setOrders(data);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            setUpdatingId(orderId);
            await updateOrderStatus(orderId, newStatus);
            await fetchOrders();
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to update order status');
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) return <Loader fullScreen />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">All Orders</h1>
                <p className="text-muted">Manage customer orders</p>
            </div>

            {error && <ErrorBanner message={error} onClose={() => setError('')} />}

            {orders.length === 0 ? (
                <div className="card p-12 text-center">
                    <p className="text-muted">No orders found</p>
                </div>
            ) : (
                <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Order Number</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>
                                            <button
                                                onClick={() => navigate(`/orders/${order.id}`)}
                                                className="text-accent hover:text-accent-hover font-medium"
                                            >
                                                {order.orderNumber}
                                            </button>
                                        </td>
                                        <td>
                                            <div>
                                                <p className="font-medium text-primary">{order.userName}</p>
                                                <p className="text-sm text-muted">{order.userEmail}</p>
                                            </div>
                                        </td>
                                        <td className="text-sm">{formatDate(order.createdAt)}</td>
                                        <td>{order.items.length}</td>
                                        <td className="font-semibold">{formatCurrency(order.totalAmount)}</td>
                                        <td>
                                            <Badge variant={order.status}>{order.status}</Badge>
                                        </td>
                                        <td>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                disabled={updatingId === order.id}
                                                className="input py-1 px-2 text-sm"
                                            >
                                                {ORDER_STATUSES.map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;

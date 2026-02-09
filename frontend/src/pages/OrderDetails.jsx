import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, cancelOrder } from '../api/order.api';
import Loader from '../components/Loader';
import ErrorBanner from '../components/ErrorBanner';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { formatCurrency, formatDate } from '../utils/formatters';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cancelModal, setCancelModal] = useState(false);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const data = await getOrderById(id);
            setOrder(data);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to load order details');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async () => {
        try {
            setCancelling(true);
            await cancelOrder(id);
            setCancelModal(false);
            fetchOrder();
        } catch (err) {
            setError(err.message || 'Failed to cancel order');
        } finally {
            setCancelling(false);
        }
    };

    if (loading) return <Loader fullScreen />;
    if (error && !order) return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ErrorBanner message={error} />
            <Button onClick={() => navigate('/orders')}>Back to Orders</Button>
        </div>
    );
    if (!order) return null;

    const canCancel = order.status !== 'SHIPPED' && order.status !== 'DELIVERED' && order.status !== 'CANCELLED';

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Button variant="secondary" onClick={() => navigate('/orders')} className="mb-6">
                ← Back to Orders
            </Button>

            {error && <ErrorBanner message={error} onClose={() => setError('')} />}

            {/* Order Header */}
            <div className="card p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-primary mb-2">Order Details</h1>
                        <p className="text-muted">Order #{order.orderNumber}</p>
                    </div>
                    <Badge variant={order.status} className="text-base px-4 py-2">{order.status}</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted">Placed on</p>
                        <p className="text-primary font-medium">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                        <p className="text-muted">Last updated</p>
                        <p className="text-primary font-medium">{formatDate(order.updatedAt)}</p>
                    </div>
                    <div>
                        <p className="text-muted">Customer</p>
                        <p className="text-primary font-medium">{order.userName}</p>
                    </div>
                    <div>
                        <p className="text-muted">Email</p>
                        <p className="text-primary font-medium">{order.userEmail}</p>
                    </div>
                </div>
            </div>

            {/* Shipping Address */}
            <div className="card p-6 mb-6">
                <h2 className="text-lg font-semibold text-primary mb-3">Shipping Address</h2>
                <p className="text-muted">{order.shippingAddress}</p>
                {order.notes && (
                    <div className="mt-4">
                        <h3 className="text-sm font-semibold text-primary mb-1">Notes</h3>
                        <p className="text-muted text-sm">{order.notes}</p>
                    </div>
                )}
            </div>

            {/* Order Items */}
            <div className="card p-6 mb-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Order Items</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map(item => (
                                <tr key={item.id}>
                                    <td className="font-medium text-primary">{item.productName}</td>
                                    <td>{formatCurrency(item.price)}</td>
                                    <td>{item.quantity}</td>
                                    <td className="font-semibold">{formatCurrency(item.subtotal)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="border-t border-border mt-4 pt-4 flex justify-end">
                    <div className="text-right">
                        <p className="text-sm text-muted mb-1">Total Amount</p>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(order.totalAmount)}</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            {canCancel && (
                <Button variant="danger" onClick={() => setCancelModal(true)}>
                    Cancel Order
                </Button>
            )}

            {/* Cancel Confirmation Modal */}
            <Modal isOpen={cancelModal} onClose={() => setCancelModal(false)} title="Cancel Order">
                <p className="text-muted mb-6">Are you sure you want to cancel this order? This action cannot be undone.</p>
                <div className="flex gap-3 justify-end">
                    <Button variant="secondary" onClick={() => setCancelModal(false)}>
                        No, Keep Order
                    </Button>
                    <Button variant="danger" onClick={handleCancelOrder} loading={cancelling}>
                        Yes, Cancel Order
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default OrderDetails;

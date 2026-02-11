import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/product.api';
import Loader from '../components/Loader';
import ErrorBanner from '../components/ErrorBanner';
import Button from '../components/Button';
import { formatCurrency } from '../utils/formatters';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await getProductById(id);
            setProduct(data);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to load product details');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        // For now, navigate to a simple cart flow
        // In production, you'd use CartContext
        navigate('/cart', { state: { product, quantity } });
    };

    if (loading) return <Loader fullScreen />;
    if (error) return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ErrorBanner message={error} />
            <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
    );
    if (!product) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Button variant="secondary" onClick={() => navigate('/products')} className="mb-6">
                ← Back to Products
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="card p-8">
                    <div className="aspect-square bg-surface-hover rounded-lg flex items-center justify-center">
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <svg className="h-32 w-32 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Product Details */}
                <div className="card p-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">{product.name}</h1>
                    <p className="text-sm text-muted mb-4">Category: {product.category}</p>

                    <div className="mb-6">
                        <span className="text-3xl font-bold text-primary">{formatCurrency(product.price)}</span>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-primary mb-2">Description</h3>
                        <p className="text-muted">{product.description || 'No description available'}</p>
                    </div>

                    <div className="mb-6">
                        <p className="text-sm">
                            <span className="font-medium text-primary">Availability: </span>
                            {product.stock > 0 ? (
                                <span className="text-success">{product.stock} in stock</span>
                            ) : (
                                <span className="text-error">Out of stock</span>
                            )}
                        </p>
                    </div>

                    {product.stock > 0 && (
                        <>
                            <div className="mb-6">
                                <label className="label">Quantity</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="btn-secondary px-4 py-2"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-medium text-primary min-w-[3rem] text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="btn-secondary px-4 py-2"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                className="w-full"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

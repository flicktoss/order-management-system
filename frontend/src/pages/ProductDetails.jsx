import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../api/product.api';
import Loader from '../components/Loader';
import ErrorBanner from '../components/ErrorBanner';
import Button from '../components/Button';
import { formatCurrency } from '../utils/formatters';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
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
        addToCart(product, quantity);
        navigate('/cart');
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <button
                onClick={() => navigate('/products')}
                className="flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-6 font-medium"
            >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Products
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sm:p-4">
                    <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center relative group">
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <svg className="h-32 w-32 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        )}
                        {/* Status Badge */}
                        <div className="absolute top-4 left-4">
                            {product.stock > 0 ? (
                                <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-sm shadow-sm">
                                    In Stock
                                </span>
                            ) : (
                                <span className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full text-sm shadow-sm">
                                    Out of Stock
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                    <div className="mb-2">
                        <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">{product.category}</span>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

                    <div className="flex items-baseline gap-4 mb-6">
                        <span className="text-3xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
                        {product.stock <= 10 && product.stock > 0 && (
                            <span className="text-red-500 text-sm font-medium">Only {product.stock} left in stock!</span>
                        )}
                    </div>

                    <div className="prose prose-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
                        <h3 className="text-gray-900 font-semibold mb-2 text-lg">Description</h3>
                        <p className="leading-relaxed">{product.description || 'No description available for this product.'}</p>
                    </div>

                    {product.stock > 0 ? (
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-1/3">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                    <div className="relative flex items-center bg-white rounded-lg border border-gray-200">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors border-r border-gray-200"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            readOnly
                                            value={quantity}
                                            className="w-full text-center text-gray-900 font-bold focus:outline-none"
                                        />
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors border-l border-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 pt-7">
                                    <p className="text-sm text-gray-500">
                                        Total: <span className="font-bold text-gray-900">{formatCurrency(product.price * quantity)}</span>
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                className="w-full py-4 text-lg font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 rounded-xl transition-all hover:-translate-y-0.5"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                            <p className="text-gray-500 font-medium">This product is currently unavailable.</p>
                            <Button onClick={() => navigate('/products')} variant="secondary" className="mt-4">
                                Browse Other Products
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

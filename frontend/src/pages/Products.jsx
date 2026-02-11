import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableProducts } from '../api/product.api';
import Loader from '../components/Loader';
import ErrorBanner from '../components/ErrorBanner';
import Button from '../components/Button';
import { formatCurrency } from '../utils/formatters';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getAvailableProducts();
            setProducts(data);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return <Loader fullScreen />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">Products</h1>
                <p className="text-muted">Browse our available products</p>
            </div>

            {error && <ErrorBanner message={error} onClose={() => setError('')} />}

            {/* Filters */}
            <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input flex-1"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input sm:w-48"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted">No products found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="card p-4 hover:shadow-medium transition-shadow">
                            <div className="aspect-square bg-surface-hover rounded-lg mb-4 flex items-center justify-center">
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                    <svg className="h-16 w-16 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                )}
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-1">{product.name}</h3>
                            <p className="text-sm text-muted mb-2 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xl font-bold text-primary">{formatCurrency(product.price)}</span>
                                <span className="text-sm text-muted">Stock: {product.stock}</span>
                            </div>
                            <Button
                                variant="primary"
                                className="w-full"
                                onClick={() => navigate(`/products/${product.id}`)}
                            >
                                View Details
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;

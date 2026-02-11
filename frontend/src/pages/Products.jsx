import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableProducts } from '../api/product.api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import ErrorBanner from '../components/ErrorBanner';
import Button from '../components/Button';
import { formatCurrency } from '../utils/formatters';

const Products = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
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
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Our Collection</h1>
                    <p className="text-gray-500">Explore premium products curated just for you.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && <ErrorBanner message={error} onClose={() => setError('')} />}

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 mb-8 items-center justify-between">
                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === cat
                                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 shadow-sm"
                        />
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                        <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/products/${product.id}`)}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2 flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="aspect-[4/5] sm:aspect-square bg-gray-50 relative overflow-hidden">
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-300 bg-gray-100">
                                            <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                                        {product.stock < 10 && (
                                            <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-red-400">
                                                Low Stock
                                            </span>
                                        )}
                                        {product.price > 500 ? (
                                            <span className="bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-gray-700">
                                                Premium
                                            </span>
                                        ) : (
                                            <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-blue-400">
                                                Best Seller
                                            </span>
                                        )}
                                    </div>

                                    {/* Desktop Add to Cart Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 hidden lg:block bg-gradient-to-t from-black/20 to-transparent">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product, 1);
                                            }}
                                            className="w-full py-3 bg-white text-gray-900 font-bold rounded-xl shadow-xl hover:bg-blue-600 hover:text-white active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="mb-2">
                                        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                                            {product.category}
                                        </p>
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {product.name}
                                        </h3>
                                    </div>

                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5rem]">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 font-medium">Price</span>
                                            <span className="text-xl font-bold text-gray-900">
                                                {formatCurrency(product.price)}
                                            </span>
                                        </div>
                                        <div className="lg:hidden">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product, 1);
                                                }}
                                                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md transition-colors active:scale-95"
                                            >
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;

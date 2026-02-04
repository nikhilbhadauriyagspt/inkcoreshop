import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/api';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
    Filter, Search, Star, Heart, ShoppingBag, X,
    CheckCircle2, ChevronDown, SlidersHorizontal
} from 'lucide-react';

const Shop = () => {
    const location = useLocation();

    // State
    const [priceRange, setPriceRange] = useState(100000);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categorySEO, setCategorySEO] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filters State
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(location.search).get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(new URLSearchParams(location.search).get('category') || 'All');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        if (selectedCategory !== 'All') {
            const cat = categories.find(c => c.name === selectedCategory);
            if (cat) setCategorySEO(cat);
        } else {
            setCategorySEO(null);
        }
    }, [selectedCategory, categories]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (selectedCategory !== 'All') params.append('category', selectedCategory);
                if (searchTerm) params.append('search', searchTerm);
                if (priceRange < 100000) params.append('maxPrice', priceRange);
                if (sortBy) params.append('sort', sortBy);

                const res = await api.get(`/products?${params.toString()}`);
                setProducts(res.data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory, searchTerm, priceRange, sortBy]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const catRes = await api.get('/categories');
                console.log("Fetched Categories:", catRes.data); // Debugging
                setCategories(catRes.data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setSearchTerm(queryParams.get('search') || '');
        setSelectedCategory(queryParams.get('category') || 'All');
    }, [location.search]);

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
        setPriceRange(100000);
        setSortBy('newest');
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans selection:bg-brand-100 selection:text-brand-600">
            {categorySEO ? (
                <Helmet>
                    <title>{categorySEO.meta_title || `${categorySEO.name} | Inkcore`}</title>
                    <meta name="description" content={categorySEO.meta_description || `Shop our best collection of ${categorySEO.name}.`} />
                </Helmet>
            ) : (
                <SEO pageName="shop" fallbackTitle="Shop Premium Tech - Inkcore" fallbackDesc="Browse our curated selection of printers and office tech." />
            )}

            {/* --- HERO HEADER --- */}
            <div className="bg-white border-b border-slate-100 p-0">

                {/* --- PROMOTIONAL BANNER --- */}
                {/* <div className="w-full overflow-hidden">
                    <img
                        src="/product-banner/banner.webp"
                        alt="Product Banner"
                        className="w-full h-auto object-cover"
                    />
                </div> */}


            </div>

            <div className="container mx-auto px-6 py-12">

                <div className="flex flex-col lg:flex-row gap-12 items-start">


                    {/* --- SIDEBAR FILTERS (Sticky) --- */}
                    <div className={`fixed inset-0 z-[100] lg:sticky lg:top-32 lg:z-0 lg:w-72 lg:h-auto bg-white lg:bg-transparent lg:inset-auto transition-all duration-300 lg:block ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:opacity-100 lg:visible'}`}>
                        <div className="h-full overflow-y-auto lg:overflow-visible bg-white lg:bg-transparent p-8 lg:p-0">

                            {/* Mobile Header */}
                            <div className="flex lg:hidden justify-between items-center mb-8">
                                <h3 className="text-xl font-bold">Filters</h3>
                                <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
                            </div>

                            {/* Search */}
                            <div className="mb-10">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full bg-white border border-slate-200 px-5 py-3 rounded-xl text-sm font-medium focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all shadow-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-10">
                                <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                                    Categories <ChevronDown size={14} className="text-slate-400" />
                                </h4>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setSelectedCategory('All')}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === 'All' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
                                    >
                                        View All
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.slug)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat.slug ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Slider */}
                            <div className="mb-10">
                                <h4 className="font-bold text-slate-900 mb-4">Price Range</h4>
                                <input
                                    type="range" min="0" max="100000" step="1000"
                                    value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600 mb-3"
                                />
                                <div className="flex justify-between text-xs font-bold text-slate-500">
                                    <span>$0</span>
                                    <span className="text-brand-600">Max: ${priceRange}</span>
                                </div>
                            </div>

                            {/* Clear Button */}
                            <button onClick={clearAllFilters} className="w-full py-3 border border-dashed border-slate-300 text-slate-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all">
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    {/* --- MAIN GRID --- */}
                    <div className="flex-1 w-full">

                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200 lg:hidden">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="flex items-center gap-2 text-sm font-bold text-slate-700"
                            >
                                <SlidersHorizontal size={18} /> Filters
                            </button>
                        </div>

                        {/* Sorting (Desktop) */}
                        <div className="hidden lg:flex justify-end items-center mb-8 gap-6">
                            <div className="text-sm font-medium text-slate-500">
                                <span className="text-slate-900 font-bold">{products.length}</span> Products Found
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort By:</span>
                                <select 
                                    value={sortBy} 
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white border-none text-sm font-bold text-slate-900 focus:ring-0 cursor-pointer"
                                >
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="bg-white p-4 rounded-[2rem] h-[400px] animate-pulse">
                                        <div className="bg-slate-100 h-[60%] rounded-[1.5rem] mb-4"></div>
                                        <div className="bg-slate-100 h-4 w-3/4 rounded mb-2"></div>
                                        <div className="bg-slate-100 h-4 w-1/2 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <ShopProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[2rem] p-12 text-center border border-dashed border-slate-300">
                                <ShoppingBag size={48} className="text-slate-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No Products Found</h3>
                                <p className="text-slate-500 mb-6">Try adjusting your filters.</p>
                                <button onClick={clearAllFilters} className="text-brand-600 font-bold hover:underline">Clear all filters</button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

const ShopProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [isAdded, setIsAdded] = useState(false);
    const activeWishlist = isInWishlist(product.id);
    const imageUrl = product.image_url?.startsWith('http') ? product.image_url : `/products/${product.image_url}`;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-brand-900/5 transition-all duration-300 flex flex-col h-full">

            {/* Image */}
            <div className="relative aspect-square p-8 bg-white flex items-center justify-center border-b border-slate-50">
                {parseFloat(product.mrp) > parseFloat(product.price) && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-wider rounded-lg">
                        Sale
                    </span>
                )}

                <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                </Link>

                <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all ${activeWishlist ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400 hover:bg-brand-50 hover:text-brand-600'
                        }`}
                >
                    <Heart size={16} className={activeWishlist ? 'fill-current' : ''} />
                </button>
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col flex-1">
                <div className="mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category_name}</div>
                <Link to={`/product/${product.slug}`} className="block mb-4">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">{product.name}</h3>
                </Link>

                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black text-slate-900">${product.price}</span>
                            {parseFloat(product.mrp) > parseFloat(product.price) && <span className="text-xs text-slate-400 line-through">${product.mrp}</span>}
                        </div>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm ${isAdded ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-brand-600'
                            }`}
                    >
                        {isAdded ? <CheckCircle2 size={18} /> : <ShoppingBag size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shop;
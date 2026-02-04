import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import HeroCinematic from '../components/HeroCinematic';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';
import Skeleton from '../components/Skeleton';
import {
    Star, Heart, Truck, ShieldCheck, Mail,
    ChevronLeft, ChevronRight, Zap, Quote,
    MoveRight, Headphones, CreditCard, ShoppingBag, Plus, ArrowUpRight, Play, CheckCircle2, ArrowRight
} from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [activeTab, setActiveTab] = useState('New Arrivals');
    const [deal, setDeal] = useState(null);
    const { addToCart } = useCart();
    const scrollRef = useRef(null);
    const [email, setEmail] = useState('');
    
    // Loading states
    const [isProductsLoading, setIsProductsLoading] = useState(true);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // 1. Fetch Fast Data (Critical for First Paint)
    useEffect(() => {
        const fetchFastData = async () => {
            try {
                const [catRes, dealRes, blogRes] = await Promise.all([
                    api.get('/categories'),
                    api.get('/settings/deal'),
                    api.get('/blogs')
                ]);
                setCategories(catRes.data);
                setDeal(dealRes.data);
                setBlogs(blogRes.data);
            } catch (error) {
                console.error("Error fetching fast data:", error);
            } finally {
                setIsInitialLoading(false);
            }
        };
        fetchFastData();
    }, []);

    // 2. Fetch Heavy Data (Products) Separately
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Optimization: If possible, ask backend for just top 20 products initially
                // For now, we fetch all as per existing logic, but separately
                const prodRes = await api.get('/products');
                setProducts(prodRes.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsProductsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const getTabProducts = () => {
        if (activeTab === 'New Arrivals') return [...products].sort((a, b) => b.id - a.id).slice(0, 8);
        if (activeTab === 'Best Sellers') return products.filter(p => p.is_best_selling).slice(0, 8);
        if (activeTab === 'On Sale') return products.filter(p => parseFloat(p.mrp) > parseFloat(p.price)).slice(0, 8);
        return products.slice(0, 8);
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }
        toast.success("Successfully Subscribed!");
        setEmail('');
    };

    const tabProducts = getTabProducts();

    return (
        <div className="bg-white min-h-screen relative font-sans selection:bg-brand-100 selection:text-brand-600">
            <SEO pageName="home" fallbackTitle="Home - Inkcore" fallbackDesc="Shop premium technology." />

            <HeroCinematic />

            {/* --- SECTION 1: PREMIUM PARTNERS --- */}
            <section className="py-12 border-b border-slate-100 bg-white">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div className="shrink-0 flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center">
                            <ShieldCheck size={20} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-900 leading-tight">
                            Authorized <br /> Global Partners
                        </span>
                    </div>
                    <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
                    <div className="flex-1 w-full overflow-hidden relative group">
                        <div className="flex items-center justify-around gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            {['HP', 'CANON', 'EPSON', 'BROTHER', 'XEROX', 'RICOH'].map((brand) => (
                                <span key={brand} className="text-2xl font-black text-slate-400 hover:text-brand-600 tracking-tighter cursor-default transition-colors">{brand}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: CATEGORIES (BUBBLE SLIDER) --- */}
            <section className="container mx-auto px-6 py-20 relative group/section">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 text-center md:text-left">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 rounded-full border border-brand-100 mb-4">
                            <span className="w-1.5 h-1.5 bg-brand-600 rounded-full animate-pulse"></span>
                            <span className="text-brand-600 font-bold tracking-[0.3em] uppercase text-[10px]">Explore Collections</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Shop by Category</h2>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => document.getElementById('cat-slider').scrollBy({ left: -300, behavior: 'smooth' })}
                            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => document.getElementById('cat-slider').scrollBy({ left: 300, behavior: 'smooth' })}
                            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Slider Container */}
                <div
                    id="cat-slider"
                    className="flex gap-8 md:gap-12 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory px-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {isInitialLoading ? (
                        // Skeletons for Categories
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="flex flex-col items-center min-w-[140px] gap-4">
                                <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full" />
                                <Skeleton className="w-20 h-4 rounded-md" />
                            </div>
                        ))
                    ) : (
                        categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/products?category=${cat.slug}`}
                                className="group flex flex-col items-center min-w-[140px] snap-center"
                            >
                                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-5">
                                    {/* Outer Ring Animation */}
                                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-200/50 group-hover:border-brand-500 group-hover:rotate-90 transition-all duration-700"></div>

                                    {/* Image Container */}
                                    <div className="absolute inset-2 rounded-full bg-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 border-[4px] border-white group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={cat.image?.startsWith('http') ? cat.image : `/category/${cat.image}`}
                                            alt={cat.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/200'}
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-brand-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </div>

                                <h3 className="text-sm font-bold text-slate-900 tracking-tight text-center group-hover:text-brand-600 transition-colors">
                                    {cat.name}
                                </h3>
                                <div className="h-0.5 w-0 bg-brand-600 mt-2 transition-all duration-300 group-hover:w-8"></div>
                            </Link>
                        ))
                    )}
                </div>
            </section>

            {/* --- SECTION 3: TECH SPECS GRID (REVISED) --- */}
            <section className="bg-slate-950 py-24 text-white border-t border-white/10 relative overflow-hidden">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        {/* <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></span>
                            <span className="text-brand-300 font-mono text-[10px] uppercase tracking-widest">System Architecture</span>
                        </div> */}
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Engineered for <span className="text-brand-500">Performance.</span>
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            Next-generation printing solutions built on a secure, cloud-native architecture.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                        {/* Feature 1 */}
                        <div className="bg-white/[0.02] p-8 md:p-12 border border-white/5 hover:bg-white/[0.04] transition-colors group">
                            <div className="w-12 h-12 bg-brand-500/10 rounded-lg flex items-center justify-center text-brand-500 mb-8 group-hover:scale-110 transition-transform">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Hyper-Fast Wireless</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                Dual-band Wi-Fi 6 technology ensures zero latency printing from any device in your network ecosystem.
                            </p>
                            <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent"></div>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white/[0.02] p-8 md:p-12 border border-white/5 hover:bg-white/[0.04] transition-colors group relative">
                            <div className="absolute top-0 right-0 px-3 py-1 bg-brand-600 text-[9px] font-bold uppercase tracking-widest text-white rounded-bl-xl">New</div>
                            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Military-Grade Security</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                End-to-end 256-bit encryption protects your sensitive documents from unauthorized access.
                            </p>
                            <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white/[0.02] p-8 md:p-12 border border-white/5 hover:bg-white/[0.04] transition-colors group">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
                                <ShoppingBag size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Eco-Smart Efficiency</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                Reduce energy consumption by up to 50% with our intelligent auto-sleep and instant-on technology.
                            </p>
                            <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: CURATED SELECTION --- */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center md:items-end mb-20 gap-10">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full mb-4">
                                <ShoppingBag size={12} className="text-brand-600" />
                                <span className="text-slate-900 font-black tracking-widest uppercase text-[9px]">Marketplace</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter leading-none">
                                Curated <br /> <span className="text-slate-300">Selection.</span>
                            </h2>
                        </div>

                        <div className="flex p-1.5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                            {['New Arrivals', 'Best Sellers', 'On Sale'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab
                                        ? 'bg-white text-slate-950 shadow-md shadow-slate-200/50 scale-105'
                                        : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {isProductsLoading ? (
                             // Skeletons for Curated Selection
                             Array(8).fill(0).map((_, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <Skeleton className="w-full aspect-square rounded-[2rem]" />
                                    <div className="p-2 space-y-3">
                                        <Skeleton className="w-1/2 h-3 rounded-md" />
                                        <Skeleton className="w-full h-6 rounded-md" />
                                        <div className="flex justify-between items-center pt-2">
                                            <Skeleton className="w-16 h-6 rounded-md" />
                                            <Skeleton className="w-20 h-10 rounded-xl" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            tabProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </div>

                    <div className="mt-20 text-center">
                        <Link to="/products" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-600 transition-all group">
                            Explore Full Collection <MoveRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- SECTION 5: FLAGSHIP SPOTLIGHT (REFINED) --- */}
            {deal && (
                <section className="container mx-auto px-6 py-20">
                    <div className="relative bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-900/10">
                        {/* Subtle Background Glow */}
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]"></div>

                        <div className="flex flex-col lg:flex-row items-stretch">

                            {/* Left: Content (Controlled Size) */}
                            <div className="w-full lg:w-5/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center border-r border-white/5">
                                <div className="inline-flex items-center gap-2 mb-6">
                                    <span className="px-3 py-1 bg-brand-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-lg">
                                        Editor's Choice
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-4">
                                    {deal.name}
                                </h2>

                                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
                                    {deal.description}
                                </p>

                                {/* Specs Grid (Simplified) */}
                                <div className="grid grid-cols-2 gap-8 mb-10">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-bold text-md leading-none">50 PPM</span>
                                        <span className="text-slate-500 text-[9px] uppercase tracking-widest font-bold">Print Speed</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-bold text-md leading-none">4K Res</span>
                                        <span className="text-slate-500 text-[9px] uppercase tracking-widest font-bold">DPI Quality</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                                    <button
                                        onClick={() => addToCart(deal)}
                                        className="px-8 py-4 bg-brand-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all active:scale-95 shadow-lg shadow-brand-600/20"
                                    >
                                        Buy Now - ${deal.price}
                                    </button>
                                    <Link
                                        to={`/product/${deal.slug}`}
                                        className="px-8 py-4 bg-white/5 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-all"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>

                            {/* Right: Image (Clean & Centered) */}
                            <div className="w-full lg:w-7/12 bg-slate-800/30 flex items-center justify-center p-12 lg:p-20 relative">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.1)_0%,transparent_70%)] opacity-50"></div>
                                <img
                                    src={deal.image_url?.startsWith('http') ? deal.image_url : `/products/${deal.image_url}`}
                                    alt={deal.name}
                                    className="relative z-10 max-w-full max-h-[350px] md:max-h-[450px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Product+Image'}
                                />
                            </div>

                        </div>
                    </div>
                </section>
            )}

            {/* --- SECTION 6: FRESH DROPS (HORIZONTAL SLIDER) --- */}
            <section className="py-20 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Fresh Drops</h2>
                        <div className="flex gap-2">
                            <button onClick={() => document.getElementById('fresh-drops').scrollBy({ left: -300, behavior: 'smooth' })} className="p-3 bg-white rounded-full shadow-sm hover:bg-slate-900 hover:text-white transition-colors"><ChevronLeft size={20} /></button>
                            <button onClick={() => document.getElementById('fresh-drops').scrollBy({ left: 300, behavior: 'smooth' })} className="p-3 bg-white rounded-full shadow-sm hover:bg-slate-900 hover:text-white transition-colors"><ChevronRight size={20} /></button>
                        </div>
                    </div>

                    <div id="fresh-drops" className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x px-4 -mx-4">
                        {isProductsLoading ? (
                             // Skeletons for Fresh Drops
                             Array(5).fill(0).map((_, i) => (
                                <div key={i} className="min-w-[280px] md:min-w-[320px] snap-start flex flex-col gap-4">
                                     <Skeleton className="w-full aspect-square rounded-[2rem]" />
                                     <Skeleton className="w-3/4 h-6 rounded-md" />
                                     <Skeleton className="w-1/2 h-6 rounded-md" />
                                </div>
                             ))
                        ) : (
                            products.slice(0, 6).map((product) => (
                                <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                                    <ProductCard product={product} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* --- SECTION 7: TRENDING NOW (2-COL GRID) --- */}
            <section className="py-20 container mx-auto px-6">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-12">Trending Now</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {isProductsLoading ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="flex h-64 bg-white border border-slate-100 rounded-[2rem] p-6">
                                <Skeleton className="w-1/3 h-full rounded-2xl" />
                                <div className="w-2/3 pl-6 flex flex-col justify-center space-y-4">
                                    <Skeleton className="w-20 h-6 rounded-md" />
                                    <Skeleton className="w-full h-8 rounded-md" />
                                    <Skeleton className="w-32 h-10 rounded-md" />
                                    <Skeleton className="w-full h-12 rounded-xl" />
                                </div>
                            </div>
                        ))
                    ) : (
                        products.filter(p => p.is_best_selling).slice(0, 4).map((product) => (
                            <div key={product.id} className="flex bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-xl hover:border-brand-200 transition-all duration-300 group">
                                <div className="w-1/3 p-4 bg-slate-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                                    <img
                                        src={product.image_url?.startsWith('http') ? product.image_url : `/products/${product.image_url}`}
                                        alt={product.name}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="w-2/3 pl-6 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-2 py-1 rounded-md">Trending</span>
                                        <div className="flex text-yellow-400"><Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /></div>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{product.name}</h3>
                                    <p className="text-2xl font-black text-slate-900 mb-6">${product.price}</p>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-600 transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* --- SECTION 8: WHY CHOOSE US (REFINED) --- */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-[10px] mb-3 block">The Nova Standard</span>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Why Industry Leaders Choose Us</h2>
                        <p className="text-slate-500 text-md">We don't just sell printers; we engineer printing ecosystems for efficiency and security.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <BenefitCard
                            icon={<ShieldCheck size={32} />}
                            title="Certified Authentic"
                            desc="Every product is sourced directly from manufacturers with verified serial numbers."
                        />
                        <BenefitCard
                            icon={<Truck size={32} />}
                            title="Express Global Logistics"
                            desc="Same-day dispatch for metro cities and secure packaging for all shipments."
                        />
                        <BenefitCard
                            icon={<Headphones size={32} />}
                            title="24/7 Priority Support"
                            desc="Dedicated technical account managers for enterprise clients."
                        />
                    </div>
                </div>
            </section>

            {/* --- SECTION 9: READY TO UPGRADE CTA --- */}
            <section className="bg-brand-900 py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-8">Ready to Upgrade Your Workflow?</h2>
                    <p className="text-brand-100 text-md mb-10 max-w-2xl mx-auto">Join 5000+ businesses optimizing their print infrastructure today.</p>
                    <div className="flex justify-center gap-4">
                        <Link to="/contact" className="px-8 py-4 bg-white text-brand-900 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-50 transition-all shadow-xl">
                            Request Consultation
                        </Link>
                        <Link to="/products" className="px-8 py-4 border border-brand-700 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-800 transition-all">
                            Browse Catalog
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- SECTION 10: TECH INSIGHTS (BLOGS) --- */}
            {blogs.length > 0 && (
                <section className="bg-slate-50 py-24">
                    <div className="container mx-auto px-6">
                        <div className="flex justify-between items-end mb-16">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Latest Insights</h2>
                                <p className="text-slate-500 text-sm">Trends and tips from our experts.</p>
                            </div>
                            <Link to="/blogs" className="text-brand-600 font-bold uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors">
                                Read All Articles &rarr;
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blogs.slice(0, 3).map((blog) => (
                                <Link key={blog.id} to={`/blog/${blog.slug}`} className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100">
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={blog.image_url || "https://via.placeholder.com/800x500"}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            alt={blog.title}
                                        />
                                        {/* Floating Date Badge */}
                                        <div className="absolute top-5 left-5 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm">
                                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter text-center leading-none">
                                                {new Date(blog.created_at).toLocaleString('en-US', { day: '2-digit' })} <br />
                                                <span className="text-[8px] text-brand-600 font-bold uppercase tracking-widest">{new Date(blog.created_at).toLocaleString('en-US', { month: 'short' })}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <span className="px-2 py-1 bg-brand-50 text-brand-600 text-[9px] font-black uppercase tracking-widest rounded-md">Insight</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm line-clamp-2 mb-8 leading-relaxed">
                                            {blog.description}
                                        </p>

                                        <div className="mt-auto flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] group-hover:text-brand-600 transition-colors">
                                            Read Full Story
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- SECTION 11: NEWSLETTER --- */}
            <section className="container mx-auto px-6 py-24">
                <div className="relative rounded-[3rem] bg-slate-900 overflow-hidden px-8 py-20 text-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(13,148,136,0.15),transparent_50%)]"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <Mail size={48} className="text-brand-500 mx-auto mb-6" />
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                            Stay Ahead of the Curve.
                        </h2>
                        <p className="text-slate-400 mb-10 text-md">
                            Get exclusive deals, tech reviews, and early access to new launches directly to your inbox.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="px-8 py-4 bg-brand-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-500 transition-all shadow-lg hover:shadow-brand-500/25">
                                Subscribe
                            </button>
                        </form>
                        <p className="text-slate-600 text-xs mt-6">No spam, just premium content. Unsubscribe anytime.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProductCard = ({ product }) => {
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
        <div className="group flex flex-col bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 hover:border-slate-200">

            {/* Image Container */}
            <div className="relative aspect-square bg-slate-50 p-8 flex items-center justify-center overflow-hidden">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {parseFloat(product.mrp) > parseFloat(product.price) && (
                        <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                            Sale
                        </span>
                    )}
                </div>

                <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/400'}
                    />
                </Link>

                {/* Quick Actions (Floating) */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border ${activeWishlist
                                ? 'bg-red-500 border-red-500 text-white'
                                : 'bg-white border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-200'
                            }`}
                    >
                        <Heart size={16} className={activeWishlist ? 'fill-current' : ''} />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                <div className="mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{product.category_name}</span>
                </div>
                <Link to={`/product/${product.slug}`} className="block mb-4 flex-1">
                    <h3 className="text-md font-bold text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-end justify-between gap-4 mt-auto">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Price</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-slate-900 tracking-tight">${product.price}</span>
                            {parseFloat(product.mrp) > parseFloat(product.price) && (
                                <span className="text-xs text-slate-300 font-bold line-through">${product.mrp}</span>
                            )}
                        </div>
                    </div>

                    {/* Smart Add Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`h-12 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-500/10 ${isAdded
                                ? 'bg-green-500 text-white w-auto px-8'
                                : 'bg-slate-900 text-white hover:bg-brand-600 hover:scale-105 active:scale-95'
                            }`}
                    >
                        {isAdded ? (
                            <>
                                <CheckCircle2 size={16} /> Added
                            </>
                        ) : (
                            <>
                                <ShoppingBag size={16} /> Add
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const BenefitCard = ({ icon, title, desc }) => (
    <div className="flex flex-col items-center text-center group">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 group-hover:bg-brand-50 transition-all duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{desc}</p>
    </div>
);

export default Home;
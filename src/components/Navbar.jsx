import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchBar from './SearchBar';
import api from '../api/api';
import {
    ShoppingCart,
    User,
    Heart,
    Menu,
    X,
    Search,
    ChevronDown,
    LogOut,
    Package,
    LayoutDashboard,
    Zap,
    LogIn,
    UserPlus,
    Store,
    ArrowRight,
    Home,
    Phone,
    Info,
    HelpCircle
} from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [branding, setBranding] = useState({ name: 'Inkcore' });

    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';
    // Navbar is transparent only on Home Page when not scrolled
    const isTransparent = isHomePage && !isScrolled;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
        api.get(`/websites/${websiteId}`).then(res => setBranding(res.data)).catch(() => { });
    }, []);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Sidebar Navigation */}
            <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div
                    className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMenuOpen(false)}
                ></div>
                <div className={`absolute top-0 left-0 bottom-0 w-[320px] bg-white shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        <div className="p-8 flex items-center justify-between border-b border-slate-100">
                            {branding.logo_url ? (
                                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                    <img
                                        src={branding.logo_url}
                                        alt={branding.name}
                                        className="h-8 w-auto object-contain"
                                    />
                                </Link>
                            ) : (
                                <span className="text-2xl font-black tracking-tighter text-slate-900">{branding.name}.</span>
                            )}
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                            <MenuLink to="/" icon={<Home size={20} />} onClick={() => setIsMenuOpen(false)}>Home</MenuLink>
                            <MenuLink to="/products" icon={<Store size={20} />} onClick={() => setIsMenuOpen(false)}>Shop Collection</MenuLink>
                            <MenuLink to="/about" icon={<Info size={20} />} onClick={() => setIsMenuOpen(false)}>Our Story</MenuLink>
                            <MenuLink to="/contact" icon={<Phone size={20} />} onClick={() => setIsMenuOpen(false)}>Contact Us</MenuLink>
                            <MenuLink to="/faq" icon={<HelpCircle size={20} />} onClick={() => setIsMenuOpen(false)}>Help Center</MenuLink>
                            <div className="my-6 h-px bg-slate-100"></div>
                            <MenuLink to="/orders" icon={<Package size={20} />} onClick={() => setIsMenuOpen(false)}>My Orders</MenuLink>
                            <MenuLink to="/wishlist" icon={<Heart size={20} />} onClick={() => setIsMenuOpen(false)}>Wishlist</MenuLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar - Sticky beneath TopBar */}
            <header className={`sticky top-0 z-[60] w-full transition-all duration-500 ${isTransparent
                ? 'bg-transparent py-5 border-transparent'
                : 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/5 py-3 border-b border-slate-100'
                }`}>
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-3 items-center">

                        {/* 1. LEFT: Toggle */}
                        <div className="flex justify-start">
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className={`group flex items-center gap-3 p-2 -ml-2 rounded-xl transition-all ${isTransparent ? 'hover:bg-white/10' : 'hover:bg-slate-50'
                                    }`}
                            >
                                <div className="space-y-1.5">
                                    <span className={`block h-0.5 transition-all duration-300 ${isTransparent ? 'bg-white w-6 group-hover:w-8' : 'bg-slate-900 w-6 group-hover:w-8'}`}></span>
                                    <span className={`block h-0.5 transition-all duration-300 ${isTransparent ? 'bg-white w-4 group-hover:w-6' : 'bg-slate-900 w-4 group-hover:w-6'}`}></span>
                                    <span className={`block h-0.5 transition-all duration-300 ${isTransparent ? 'bg-white w-6 group-hover:w-4' : 'bg-slate-900 w-6 group-hover:w-4'}`}></span>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block pt-0.5 ${isTransparent ? 'text-white' : 'text-slate-900'}`}>Menu</span>
                            </button>
                        </div>

                        {/* 2. CENTER: Logo */}
                        <div className="flex justify-center">
                            <Link to="/" className="flex items-center gap-2 group">
                                {branding.logo_url ? (
                                    <img
                                        src={branding.logo_url}
                                        alt={branding.name}
                                        className="w-[200px] object-contain"
                                    />
                                ) : (
                                    <>
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 ${isTransparent ? 'bg-white text-slate-900 shadow-xl shadow-white/10' : 'bg-slate-900 text-white shadow-lg'
                                            } group-hover:rotate-12`}>
                                            <Zap size={18} fill="currentColor" />
                                        </div>
                                        <span className={`font-black tracking-tighter text-2xl transition-colors duration-500 ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
                                            {branding.name}
                                        </span>
                                    </>
                                )}
                            </Link>
                        </div>

                        {/* 3. RIGHT: Actions */}
                        <div className="flex justify-end items-center gap-1 sm:gap-2">

                            {/* Compact Search Bar (Desktop) */}
                            <div
                                onClick={() => setIsSearchOpen(true)}
                                className={`hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-full border cursor-pointer mr-2 transition-all group ${isTransparent
                                    ? 'bg-white/10 border-white/20 hover:bg-white/20'
                                    : 'bg-white border-slate-200 hover:border-brand-300 shadow-sm'
                                    }`}
                                style={{ width: '200px' }}
                            >
                                <Search size={16} className={isTransparent ? 'text-white/70' : 'text-slate-400 group-hover:text-brand-600'} />
                                <span className={`text-xs font-medium ${isTransparent ? 'text-white/70' : 'text-slate-400'}`}>Search...</span>
                            </div>

                            {/* Mobile Search Icon */}
                            <div className="lg:hidden">
                                <NavActionIcon
                                    onClick={() => setIsSearchOpen(true)}
                                    icon={<Search size={20} />}
                                    isTransparent={isTransparent}
                                />
                            </div>

                            <Link to="/products">
                                <NavActionIcon icon={<Store size={20} />} isTransparent={isTransparent} highlight />
                            </Link>

                            {/* Wishlist Icon */}
                            <Link to="/wishlist" className="relative hidden sm:block">
                                <NavActionIcon icon={<Heart size={20} />} isTransparent={isTransparent} />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                                )}
                            </Link>

                            <Link to="/cart" className="relative">
                                <NavActionIcon icon={<ShoppingCart size={20} />} isTransparent={isTransparent} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-600 text-white text-[9px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Profile */}
                            <div className="relative ml-1">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-colors p-0.5 ${isTransparent ? 'border-white/20 hover:border-white' : 'border-slate-100 hover:border-slate-900'
                                        }`}
                                >
                                    <div className={`w-full h-full rounded-full flex items-center justify-center transition-colors ${isTransparent ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        <User size={20} />
                                    </div>
                                </button>
                                {/* Dropdown logic stays the same... */}

                                {isProfileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                                        <div className="absolute top-full right-0 mt-4 w-72 bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {user ? (
                                                <div className="p-2 text-slate-900">
                                                    <div className="bg-slate-50 rounded-xl p-4 mb-2 flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-brand-600 font-black text-lg">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <div className="overflow-hidden">
                                                            <p className="text-sm font-bold truncate">Hi, {user.name.split(' ')[0]}</p>
                                                            <Link to="/profile" className="text-[10px] font-bold text-brand-600 uppercase tracking-wider hover:underline">View Profile</Link>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <DropdownItem to="/orders" icon={<Package size={16} />} text="My Orders" />
                                                        <DropdownItem to="/wishlist" icon={<Heart size={16} />} text="Wishlist" />
                                                        {user.role === 'admin' && (
                                                            <DropdownItem to="/admin" icon={<LayoutDashboard size={16} />} text="Admin Panel" />
                                                        )}
                                                        <div className="h-px bg-slate-100 my-1"></div>
                                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                            <LogOut size={16} /> Sign Out
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-4 text-center text-slate-900">
                                                    <p className="text-sm font-bold mb-4">Access your account</p>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Link to="/login" className="py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl">Login</Link>
                                                        <Link to="/register" className="py-2.5 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl">Register</Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

const NavActionIcon = ({ icon, onClick, highlight, isTransparent }) => (
    <button
        onClick={onClick}
        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${highlight
            ? (isTransparent ? 'bg-white text-slate-900 shadow-xl' : 'bg-brand-600 text-white shadow-lg shadow-brand-600/20')
            : (isTransparent
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200')
            }`}
    >
        {React.cloneElement(icon, { strokeWidth: 2.5 })}
    </button>
);

const MenuLink = ({ to, children, icon, onClick }) => (
    <Link to={to} onClick={onClick} className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
        <span className="group-hover:text-brand-600 transition-colors">{icon}</span>
        <span className="font-bold text-sm uppercase tracking-wide">{children}</span>
        <ArrowRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-slate-300" />
    </Link>
);

const DropdownItem = ({ to, icon, text }) => (
    <Link to={to} className="flex items-center gap-3 px-3 py-2.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all font-bold group">
        <span className="text-slate-400 group-hover:text-brand-600 transition-colors">{icon}</span>
        {text}
    </Link>
);

export default Navbar;
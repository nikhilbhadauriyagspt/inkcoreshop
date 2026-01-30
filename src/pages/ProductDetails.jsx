import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';
import toast from 'react-hot-toast';
import { 
    Star, ShoppingBag, Heart, ShieldCheck, Truck, 
    Minus, Plus, ChevronRight, Share2, Zap, RotateCcw
} from 'lucide-react';

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist: checkWishlist } = useWishlist();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                const productRes = await api.get(`/products/slug/${slug}`);
                setProduct(productRes.data);

                // Fetch Related Products (Robust Fallback)
                const relRes = await api.get('/products');
                const allProducts = relRes.data;
                const related = allProducts
                    .filter(p => p.category_name === productRes.data.category_name && p.id !== productRes.data.id)
                    .slice(0, 4);
                
                // If no exact category match, just show random other products (Discovery mode)
                if (related.length === 0) {
                     setRelatedProducts(allProducts.filter(p => p.id !== productRes.data.id).slice(0, 4));
                } else {
                     setRelatedProducts(related);
                }

            } catch (error) {
                console.error("Failed to fetch product data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
        window.scrollTo(0, 0);
    }, [slug]);

    const activeWishlist = product ? checkWishlist(product.id) : false;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success(`Added ${product.name} to cart`);
    };

    const handleShare = async () => {
        const shareData = {
            title: product.name,
            text: product.description,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-8 h-8 border-4 border-slate-100 border-t-brand-600 rounded-full animate-spin"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h1>
            <Link to="/products" className="text-brand-600 hover:underline">Back to Shop</Link>
        </div>
    );

    const imageUrl = product.image_url ? (product.image_url.startsWith('http') ? product.image_url : `/products/${product.image_url}`) : 'https://via.placeholder.com/800';

    return (
        <div className="bg-white min-h-screen pb-20 font-sans text-slate-600">
            <SEO pageName={`prod_${product.id}`} fallbackTitle={product.name} fallbackDesc={product.description} image={imageUrl} type="product" />
            <SchemaMarkup type="product" data={product} />

            {/* Breadcrumb */}
            <div className="container mx-auto px-6 py-6 pt-28">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <Link to="/" className="hover:text-brand-600">Home</Link>
                    <ChevronRight size={12} />
                    <Link to="/products" className="hover:text-brand-600">Shop</Link>
                    <ChevronRight size={12} />
                    <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-6 pb-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20">
                    
                    {/* --- IMAGE SECTION (Left) --- */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-slate-50 rounded-2xl p-8 lg:p-12 flex items-center justify-center relative group border border-slate-100">
                            <img 
                                src={imageUrl} 
                                alt={product.name} 
                                className="w-full max-h-[500px] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
                            />
                            <div className="absolute top-4 right-4 flex flex-col gap-3">
                                <button 
                                    onClick={() => toggleWishlist(product)} 
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${activeWishlist ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-slate-100 text-slate-400 hover:text-slate-900'}`}
                                >
                                    <Heart size={18} className={activeWishlist ? 'fill-current' : ''} />
                                </button>
                                <button 
                                    onClick={handleShare}
                                    className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                                >
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- DETAILS SECTION (Right) --- */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-brand-600 font-bold text-xs bg-brand-50 px-2 py-1 rounded">{product.category_name}</span>
                                <div className="flex text-amber-400 text-xs items-center">
                                    <Star size={14} fill="currentColor" />
                                    <span className="ml-1 text-slate-500">4.9 (120+ Reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-4">{product.name}</h1>
                            
                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-3xl font-black text-slate-900">${product.price}</span>
                                {parseFloat(product.mrp) > parseFloat(product.price) && (
                                    <span className="text-lg text-slate-400 line-through">${product.mrp}</span>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-6 pb-10 border-b border-slate-100">
                            {/* Quantity & Cart */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center border border-slate-200 rounded-xl h-12 w-32">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center hover:bg-slate-50 rounded-l-xl text-slate-500"><Minus size={16}/></button>
                                    <span className="flex-1 text-center font-bold text-slate-900">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center hover:bg-slate-50 rounded-r-xl text-slate-500"><Plus size={16}/></button>
                                </div>
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={product.stock <= 0}
                                    className="flex-1 h-12 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-brand-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={18} /> {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>

                            {/* Buy Now */}
                            {product.stock > 0 && (
                                <button 
                                    onClick={() => { handleAddToCart(); navigate('/checkout'); }}
                                    className="w-full h-12 border-2 border-slate-900 text-slate-900 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2"
                                >
                                    <Zap size={18} fill="currentColor" className="text-yellow-500" /> Buy Now
                                </button>
                            )}
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-y-8 gap-x-4 mt-8">
                            <div className="flex gap-3 items-start text-left">
                                <Truck className="text-brand-600 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Free Shipping</h4>
                                    <p className="text-xs text-slate-400">On all orders over $500</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start text-left">
                                <ShieldCheck className="text-brand-600 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">2 Year Warranty</h4>
                                    <p className="text-xs text-slate-400">Full coverage included</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start text-left">
                                <RotateCcw className="text-brand-600 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">7-Day Return</h4>
                                    <p className="text-xs text-slate-400">Easy replacement policy</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start text-left">
                                <Zap className="text-brand-600 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Secure Payment</h4>
                                    <p className="text-xs text-slate-400">100% encrypted checkout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FULL WIDTH TABS SECTION --- */}
                <div className="max-w-4xl mx-auto border-t border-slate-100 pt-16">
                    <div className="flex justify-center gap-8 border-b border-slate-100 mb-8">
                        {['Description', 'Reviews'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative ${
                                    activeTab === tab.toLowerCase() 
                                    ? 'text-brand-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-600' 
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    
                    <div className="prose max-w-none text-slate-500 leading-relaxed">
                        {activeTab === 'description' ? (
                            <div>
                                <p className="mb-6 text-lg">{product.description}</p>
                                <p>
                                    Experience premium quality with our {product.category_name} collection. 
                                    Designed for modern lifestyles, this product combines durability with aesthetic appeal.
                                    Rigorous quality control ensures that every unit meets our high standards.
                                </p>
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">No reviews yet</p>
                                <p className="text-slate-500 text-sm">Be the first to review this product.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- SECTION: WHY CHOOSE THIS --- */}
                <div className="mt-20 border-t border-slate-100 pt-16">
                    <h3 className="text-2xl font-black text-slate-900 mb-10 text-center">Why Choose This Model</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-600 shadow-sm mx-auto mb-4">
                                <Zap size={24} />
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2">High Efficiency</h4>
                            <p className="text-sm text-slate-500">Optimized for low energy consumption without compromising performance.</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-600 shadow-sm mx-auto mb-4">
                                <ShieldCheck size={24} />
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2">Commercial Grade</h4>
                            <p className="text-sm text-slate-500">Built with industrial-strength materials for long-lasting durability.</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-600 shadow-sm mx-auto mb-4">
                                <Star size={24} />
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2">Top Rated</h4>
                            <p className="text-sm text-slate-500">Consistently rated 5-stars by professionals across the industry.</p>
                        </div>
                    </div>
                </div>

                {/* --- SECTION: TECHNICAL SPECS --- */}
                <div className="mt-20">
                    <h3 className="text-2xl font-black text-slate-900 mb-8">Technical Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-200 rounded-2xl overflow-hidden">
                        {[
                            { label: "Model Number", value: `PN-${product.id}X` },
                            { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.0, USB-C" },
                            { label: "Power Consumption", value: "450W (Active), 1.2W (Sleep)" },
                            { label: "Print Resolution", value: "4800 x 1200 DPI" },
                            { label: "Compatibility", value: "Windows 10/11, macOS, Linux" },
                            { label: "Warranty", value: "2 Years On-site" }
                        ].map((spec, i) => (
                            <div key={i} className={`flex justify-between p-4 ${i % 4 < 2 ? 'bg-slate-50' : 'bg-white'} border-b border-slate-100 last:border-0 md:border-r md:last:border-r-0`}>
                                <span className="font-bold text-slate-700 text-sm">{spec.label}</span>
                                <span className="text-slate-500 text-sm font-medium">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SECTION: RELATED PRODUCTS --- */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-slate-100">
                        <div className="flex justify-between items-end mb-10">
                            <h3 className="text-2xl font-black text-slate-900">You Might Also Like</h3>
                            <Link to="/products" className="text-brand-600 font-bold text-sm hover:underline">View All</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((relProduct) => (
                                <Link key={relProduct.id} to={`/product/${relProduct.slug}`} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-square bg-slate-50 p-6 flex items-center justify-center">
                                        <img 
                                            src={relProduct.image_url?.startsWith('http') ? relProduct.image_url : `/products/${relProduct.image_url}`} 
                                            alt={relProduct.name} 
                                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-slate-900 truncate mb-1 group-hover:text-brand-600 transition-colors">{relProduct.name}</h4>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 text-xs font-medium">{relProduct.category_name}</span>
                                            <span className="font-black text-slate-900">${relProduct.price}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProductDetails;
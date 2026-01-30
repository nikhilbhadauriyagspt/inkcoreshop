import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck, ShoppingCart, MoveRight, ChevronRight } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 49;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
                <div className="w-32 h-32 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 mb-8 border border-slate-100">
                    <ShoppingBag size={48} strokeWidth={1} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Your cart is empty</h2>
                <p className="text-slate-400 mb-10 text-center max-w-sm font-medium leading-relaxed">Discover our premium range of printers and accessories to get started.</p>
                <Link to="/products" className="group flex items-center gap-3 bg-slate-950 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl hover:-translate-y-1">
                    Start Shopping <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-20 lg:py-28">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-brand-600 font-black text-[10px] uppercase tracking-[0.3em] mb-3">
                            <span className="w-8 h-[2px] bg-brand-600"></span>
                            Your Bag
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Shopping Cart</h1>
                    </div>
                    <p className="text-slate-400 font-bold text-sm">
                        Total {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Items List */}
                    <div className="flex-1 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="group relative flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-slate-100 rounded-[2rem] transition-all hover:border-brand-200 hover:shadow-xl hover:shadow-slate-200/50">
                                <div className="w-32 h-32 bg-slate-50 rounded-2xl flex items-center justify-center p-4 flex-shrink-0 group-hover:scale-105 transition-transform">
                                    <img 
                                        src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `/products/${item.image_url}`) : 'https://via.placeholder.com/100'} 
                                        alt={item.name} 
                                        className="w-full h-full object-contain mix-blend-multiply" 
                                    />
                                </div>
                                
                                <div className="flex-1 text-center sm:text-left min-w-0">
                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1 block">{item.category_name}</span>
                                    <Link to={`/product/${item.slug}`}>
                                        <h3 className="font-black text-slate-900 text-lg mb-4 hover:text-brand-600 transition-colors truncate">{item.name}</h3>
                                    </Link>
                                    
                                    <div className="flex items-center justify-center sm:justify-start gap-6">
                                        <div className="flex items-center bg-slate-100 rounded-xl p-1">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-10 text-center text-sm font-black text-slate-900">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-slate-300 hover:text-red-500 transition-all p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="sm:text-right">
                                    <p className="font-black text-slate-950 text-2xl tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">${item.price} each</p>
                                </div>
                            </div>
                        ))}

                        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-brand-600 transition-colors uppercase tracking-[0.2em] pt-4">
                            <ArrowLeft size={16} /> Add more items
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-slate-50/50 p-10 rounded-[3rem] border border-slate-100 sticky top-32 shadow-sm">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Order Summary</h2>
                            
                            <div className="space-y-5 mb-10">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-400">SUBTOTAL</span>
                                    <span className="text-slate-900 tracking-tight">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-400">ESTIMATED SHIPPING</span>
                                    <span className="text-brand-600">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="h-px bg-slate-200/50 my-2"></div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="font-black text-slate-900 tracking-tight">TOTAL</span>
                                    <span className="text-3xl font-black text-slate-950 tracking-tighter">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-2xl shadow-slate-900/20 mb-6 flex items-center justify-center gap-3 group"
                            >
                                Checkout Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="flex items-start gap-4 p-5 bg-white/50 rounded-2xl border border-slate-100">
                                <ShieldCheck size={24} className="text-brand-600 shrink-0" />
                                <p className="text-[9px] font-black text-slate-400 leading-relaxed uppercase tracking-[0.15em]">
                                    SECURE CHECKOUT PROTECTED BY SSL ENCRYPTION & BUYER PROTECTION POLICY.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="md:hidden fixed bottom-[72px] left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 p-4 z-[50] flex items-center justify-between shadow-2xl">
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Total</p>
                    <p className="text-2xl font-black text-slate-950 tracking-tighter">${total.toFixed(2)}</p>
                </div>
                <button 
                    onClick={() => navigate('/checkout')}
                    className="bg-slate-950 text-white px-8 h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                    Checkout <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Cart;

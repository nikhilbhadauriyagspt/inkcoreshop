import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { 
    Mail, Phone, MapPin, Zap, 
    ArrowRight, Globe, ShieldCheck
} from 'lucide-react';

const Footer = () => {
    const [branding, setBranding] = useState({
        name: 'Inkcore',
        contact_email: 'support@inkcore.com',
        contact_address: '123 Innovation Way, Tech City',
        phone: '+91 98765 43210'
    });
    const [email, setEmail] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
                const [brandingRes, catRes] = await Promise.all([
                    api.get(`/websites/${websiteId}`),
                    api.get('/categories')
                ]);
                setBranding(brandingRes.data);
                setCategories(catRes.data.slice(0, 5)); // Take first 5 categories
            } catch (error) {
                console.error("Footer data fetch error", error);
            }
        };
        fetchData();
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }
        toast.success("Successfully Subscribed!");
        setEmail('');
    };

    return (
        <footer className="bg-[#080808] text-slate-400 pt-24 pb-12 relative overflow-hidden font-sans border-t border-white/5">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[120px] -translate-y-1/2"></div>
            
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                
                {/* --- TOP SECTION: NEWSLETTER & BRAND --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    <div className="lg:col-span-4">
                        <Link to="/" className="flex items-center gap-3 mb-8 group">
                            {branding.logo_url ? (
                                <div className="bg-white p-2 rounded-xl shadow-sm inline-block">
                                    <img 
                                        src={branding.logo_url} 
                                        alt={branding.name} 
                                        className="h-10 w-auto object-contain"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-600/20">
                                        <Zap size={20} fill="currentColor" />
                                    </div>
                                    <span className="text-3xl font-black text-white tracking-tighter uppercase">
                                        {branding.name}
                                    </span>
                                </>
                            )}
                        </Link>
                        <p className="text-base text-slate-500 leading-relaxed max-w-sm mb-8">
                            Premium office technology and printing solutions engineered for the modern enterprise.
                        </p>
                    </div>

                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
                            <div className="max-w-xs text-center md:text-left">
                                <h3 className="text-white font-bold text-xl mb-2">Weekly Tech Insights</h3>
                                <p className="text-slate-500 text-sm">Join 10k+ professionals getting our best print optimization tips.</p>
                            </div>
                            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2">
                                <input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="flex-1 md:w-64 bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white p-3 rounded-xl transition-all group">
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* --- MIDDLE SECTION: NAVIGATION --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-y border-white/5">
                    <FooterColumn title="Solutions" links={
                        categories.length > 0 
                        ? categories.map(cat => ({ label: cat.name, to: `/products?category=${cat.slug}` }))
                        : [
                            { label: 'Laser Series', to: '/products' },
                            { label: 'Inkjet Pro', to: '/products' },
                            { label: 'SuperTank', to: '/products' },
                            { label: 'Business Hub', to: '/products' }
                        ]
                    } />
                    <FooterColumn title="Information" links={[
                        { label: 'Our Story', to: '/about' },
                        { label: 'Tech Blog', to: '/blogs' },
                        { label: 'Support FAQ', to: '/faq' },
                        { label: 'Contact Us', to: '/contact' }
                    ]} />
                    <FooterColumn title="Legal & Policies" links={[
                        { label: 'Privacy Policy', to: '/pages/privacy' },
                        { label: 'Terms of Service', to: '/pages/terms' },
                        { label: 'Shipping Policy', to: '/pages/shipping' },
                        { label: 'Refund Policy', to: '/pages/refund' },
                        { label: 'Cookie Policy', to: '/pages/cookies' }
                    ]} />
                    <div>
                        <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Reach Us</h4>
                        <div className="space-y-5">
                            <ContactRow icon={<Phone size={16} />} text={branding.phone} />
                            <ContactRow icon={<Mail size={16} />} text={branding.contact_email} />
                            <ContactRow icon={<MapPin size={16} />} text={branding.contact_address} />
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM SECTION: LEGAL & TRUST --- */}
                <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                            © 2026 {branding.name} • A subsidiary of PrimeFix Solutions LLC • All Rights Reserved
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                            <ShieldCheck size={14} className="text-brand-500" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">SSL SECURE</span>
                        </div>
                        <div className="flex gap-4 opacity-30 grayscale brightness-200">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-3" alt="PayPal" />
                             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2" alt="Visa" />
                             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

// --- HELPER COMPONENTS ---

const FooterColumn = ({ title, links }) => (
    <div>
        <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">{title}</h4>
        <ul className="space-y-4">
            {links.map((link, i) => (
                <li key={i}>
                    <Link to={link.to} className="text-sm font-medium hover:text-brand-400 transition-colors">
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const ContactRow = ({ icon, text }) => (
    <div className="flex items-start gap-4 group">
        <div className="mt-1 text-brand-600 group-hover:scale-110 transition-transform">{icon}</div>
        <p className="text-xs font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{text}</p>
    </div>
);

export default Footer;
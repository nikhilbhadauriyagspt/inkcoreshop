import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { 
    Mail, Phone, MapPin, Zap, 
    ArrowRight, Globe, ShieldCheck
} from 'lucide-react';

const Footer = () => {
    const [branding, setBranding] = useState(null);

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

    return (
        <footer className="bg-[#080808] text-slate-400 pt-24 pb-12 relative overflow-hidden font-sans border-t border-white/5">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[120px] -translate-y-1/2"></div>
            
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                
                {/* --- MAIN FOOTER CONTENT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-16 border-b border-white/5">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <Link to="/" className="flex items-center gap-3 mb-8 group">
                            {branding?.logo_url ? (
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
                                        {branding?.name || 'Inkcore'}
                                    </span>
                                </>
                            )}
                        </Link>
                        <p className="text-base text-slate-500 leading-relaxed max-w-sm">
                            Premium office technology and printing solutions engineered for the modern enterprise.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">
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
                            { label: 'Terms and Conditions', to: '/pages/terms' },
                            { label: 'Shipping Policy', to: '/pages/shipping' },
                            { label: 'Return Policy', to: '/pages/refund' },
                            { label: 'Cookie Policy', to: '/pages/cookies' }
                        ]} />
                        <div>
                            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Reach Us</h4>
                            <div className="space-y-5">
                                <ContactRow icon={<Phone size={16} />} text={branding?.phone || '...'} />
                                <ContactRow icon={<Mail size={16} />} text={branding?.contact_email || '...'} />
                                <ContactRow icon={<MapPin size={16} />} text={branding?.contact_address || '...'} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM SECTION: LEGAL & TRUST --- */}
                <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                            © 2026 {branding?.name || 'Inkcore'} • A subsidiary of PrimeFix Solutions LLC • All Rights Reserved
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
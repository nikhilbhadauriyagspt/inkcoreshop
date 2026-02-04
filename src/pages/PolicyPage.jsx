import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import SEO from '../components/SEO';
import { ChevronRight, FileText, Clock, Printer, Share2, Scale, Shield, Landmark, ScrollText } from 'lucide-react';
import toast from 'react-hot-toast';

const PolicyPage = () => {
    const { type } = useParams();
    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);

    const staticPolicies = {
        cookies: {
            meta_title: 'Cookie Policy | Inkcore',
            meta_description: 'Cookie Policy for Inkcore.',
            content: `
                <h1>Cookie Policy for Inkcore</h1>
                <p>At Inkcore, we are committed to transparency and protecting your privacy. This Cookie Policy explains what cookies are, how and why we use them, and the choices available to you when using our website. This policy should be read alongside our Privacy Policy to better understand how we handle your personal data.</p>
                
                <h2>1. What Are Cookies?</h2>
                <p>Cookies are small text files that are stored on your device (computer, mobile phone, tablet, or other Internet-enabled devices) when you visit a website. Cookies help websites function efficiently, enhance user experience, and provide information to website owners about how their site is used. Cookies do not contain personal documents, cannot access files on your device, and do not give us control over your system.</p>
                
                <h2>2. How We Use Cookies</h2>
                <p>Inkcore uses cookies to ensure the proper functioning of the website and to improve your overall experience. Cookies help us to:</p>
                <ul>
                    <li>Enable essential website features such as secure login and shopping cart functionality</li>
                    <li>Remember your preferences and settings during and between visits</li>
                    <li>Maintain session continuity and prevent fraudulent activity</li>
                    <li>Analyze website traffic and user behavior to improve performance and usability</li>
                </ul>
                <p>The information collected through cookies is used in an aggregated and anonymized manner and does not directly identify individual users unless explicitly stated.</p>
                
                <h2>3. Types of Cookies We Use</h2>
                <h3>Essential Cookies</h3>
                <p>These cookies are necessary for the website to operate correctly. Without these cookies, certain features such as user authentication, checkout processes, and secure access areas may not function properly.</p>
                <h3>Performance and Analytics Cookies</h3>
                <p>These cookies collect information about how visitors use our website, such as pages visited, time spent on the site, and error messages encountered. This data helps us understand user interactions and improve website performance.</p>
                <h3>Functional Cookies</h3>
                <p>Functional cookies allow the website to remember your choices, such as language preferences, region, or previously viewed items. These cookies enhance personalization and provide a more tailored experience.</p>
                
                <h2>4. Managing Cookies</h2>
                <p>Most web browsers allow you to manage or disable cookies through their settings. You may choose to accept, block, or delete cookies at any time. Please note that restricting cookies may impact the availability and functionality of certain parts of the website. For more information on managing cookies, you can refer to your browser's help section.</p>
                
                <h2>5. Updates to Policy</h2>
                <p>We may update this Cookie Policy from time to time to reflect changes in legal requirements, technology, or our business practices. Any updates will be posted on this page with a revised effective date.</p>
                
                <h2>6. Contact Information</h2>
                <p>If you have any questions or concerns regarding this Cookie Policy or our use of cookies, please contact us through the details provided on our website.</p>
            `
        },
        privacy: {
            meta_title: 'Privacy Policy | Inkcore',
            meta_description: 'Privacy Policy for Inkcore.',
            content: `
                <h1>PRIVACY POLICY</h1>
                <p><strong>Last updated February 04, 2026</strong></p>
                <p>This Privacy Notice for Ink Core ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services").</p>
                
                <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
                <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us. The personal information we collect may include names, phone numbers, email addresses, billing addresses, and debit/credit card numbers.</p>
                
                <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                <p>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes only with your prior explicit consent.</p>
                
                <h2>3. WHAT LEGAL BASES DO WE RELY ON?</h2>
                <p>We only process your personal information when we believe it is necessary and we have a valid legal reason to do so under applicable law, like with your consent, to comply with laws, to provide you with services, or to fulfill our legitimate business interests.</p>
                
                <h2>4. WHEN AND WITH WHOM DO WE SHARE?</h2>
                <p>We may share information in specific situations described in this section and/or with the following third parties, such as during business transfers, mergers, or acquisition of all or a portion of our business to another company.</p>
                
                <h2>5. DO WE USE COOKIES?</h2>
                <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Specific information about how we use such technologies is set out in our Cookie Notice.</p>
                
                <h2>6. HOW LONG DO WE KEEP INFORMATION?</h2>
                <p>We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law (such as tax, accounting, or other legal requirements).</p>
                
                <h2>7. HOW DO WE KEEP INFORMATION SAFE?</h2>
                <p>We aim to protect your personal information through a system of organizational and technical security measures designed to protect the security of any personal information we process.</p>
                
                <h2>8. INFORMATION FROM MINORS?</h2>
                <p>We do not knowingly collect data from or market to children under 18 years of age. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data.</p>
                
                <h2>9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                <p>Depending on your state of residence in the US or in some regions, such as Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</p>
                
                <h2>10. CONTROLS FOR DO-NOT-TRACK</h2>
                <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature. At this stage, no uniform technology standard has been finalized.</p>
                
                <h2>11. UNITED STATES RESIDENT RIGHTS</h2>
                <p>If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have specific rights regarding your personal information.</p>
                
                <h2>12. DO WE MAKE UPDATES?</h2>
                <p>Yes, we will update this notice as necessary to stay compliant with relevant laws. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice.</p>
                
                <h2>13. HOW CAN YOU CONTACT US?</h2>
                <p>If you have questions or comments about this notice, you may email us at inkcore.shop@outlook.com or contact us by post at: Ink Core, 258 W 39th St, New York, NY 10018, United States.</p>
                
                <h2>14. REVIEW, UPDATE, OR DELETE DATA</h2>
                <p>Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information.</p>
            `
        },
        terms: {
            meta_title: 'Terms and Conditions | Inkcore',
            meta_description: 'Legal Terms and Conditions for using Inkcore services and website.',
            content: `
                <h1>TERMS AND CONDITIONS</h1>
                <p><strong>Last updated February 04, 2026</strong></p>
                <p>We are Ink Core ("Company," "we," "us," or "our"), a company registered in New York, United States at 258 W 39th St, , New York, NY 10018. We operate the website <a href="https://inkcore.shop/">https://inkcore.shop/</a> (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").</p>
                
                <h2>1. OUR SERVICES</h2>
                <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.</p>
                
                <h2>2. INTELLECTUAL PROPERTY RIGHTS</h2>
                <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").</p>
                
                <h2>3. USER REPRESENTATIONS</h2>
                <p>By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms.</p>
                
                <h2>4. USER REGISTRATION</h2>
                <p>You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password.</p>
                
                <h2>5. PRODUCTS</h2>
                <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Services. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.</p>
                
                <h2>6. PURCHASES AND PAYMENT</h2>
                <p>We accept Visa, Mastercard, and PayPal. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information.</p>
                
                <h2>7. RETURN POLICY</h2>
                <p>Please review our Return Policy prior to making any purchases: <a href="https://inkcore.shop/pages/refund">https://inkcore.shop/pages/refund</a>.</p>
                
                <h2>8. PROHIBITED ACTIVITIES</h2>
                <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
                
                <h2>9. USER CONTRIBUTIONS</h2>
                <p>The Services does not offer users to submit or post content. When you create or make available any Contributions, you thereby represent and warrant that the creation, distribution, transmission, public display, or performance do not and will not infringe the proprietary rights of any third party.</p>
                
                <h2>10. CONTRIBUTION LICENSE</h2>
                <p>You and Services agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).</p>
                
                <h2>11. GUIDELINES FOR REVIEWS</h2>
                <p>We may provide you areas on the Services to leave reviews or ratings. When posting a review, you must comply with our criteria, ensuring reviews are based on firsthand experience and are not discriminatory or offensive.</p>
                
                <h2>12. SERVICES MANAGEMENT</h2>
                <p>We reserve the right, but not the obligation, to monitor the Services for violations of these Legal Terms and take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms.</p>
                
                <h2>13. PRIVACY POLICY</h2>
                <p>We care about data privacy and security. Please review our Privacy Policy: <a href="https://inkcore.shop/pages/privacy">https://inkcore.shop/pages/privacy</a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms.</p>
                
                <h2>14. TERM AND TERMINATION</h2>
                <p>These Legal Terms shall remain in full force and effect while you use the Services. We reserve the right to deny access to and use of the Services to any person for any reason or for no reason at our sole discretion.</p>
                
                <h2>15. MODIFICATIONS</h2>
                <p>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Services without notice at any time.</p>
                
                <h2>16. GOVERNING LAW</h2>
                <p>These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of New York applicable to agreements made and to be entirely performed within the State of New York.</p>
                
                <h2>17. DISPUTE RESOLUTION</h2>
                <p>Any legal action of whatever nature brought by either you or us shall be commenced or prosecuted in the state and federal courts located in New York, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction.</p>
                
                <h2>18. CORRECTIONS</h2>
                <p>There may be information on the Services that contains typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information at any time.</p>
                
                <h2>19. DISCLAIMER</h2>
                <p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES.</p>
                
                <h2>20. LIABILITY LIMITATIONS</h2>
                <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES.</p>
                
                <h2>21. INDEMNIFICATION</h2>
                <p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, or liability.</p>
                
                <h2>22. USER DATA</h2>
                <p>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services.</p>
                
                <h2>23. ELECTRONIC COMMUNICATIONS</h2>
                <p>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, and disclosures satisfy legal requirements.</p>
                
                <h2>24. CALIFORNIA USERS</h2>
                <p>If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs.</p>
                
                <h2>25. MISCELLANEOUS</h2>
                <p>These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right shall not operate as a waiver.</p>
                
                <h2>26. CONTACT US</h2>
                <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at: Ink Core, 258 W 39th St, New York, NY 10018, United States. Phone: +1-530-564-1063, Email: inkcore.shop@outlook.com.</p>
            `
        },
        shipping: {
            meta_title: 'Shipping Policy | Inkcore',
            meta_description: 'Shipping and Delivery Policy for Inkcore.',
            content: `
                <h1>SHIPPING DELIVERY POLICY</h1>
                <p><strong>Last updated February 04, 2026</strong></p>
                <p>This Shipping & Delivery Policy is part of our Terms and Conditions ("Terms") and should be therefore read alongside our main Terms: <a href="https://inkcore.shop/pages/terms">https://inkcore.shop/pages/terms</a>. Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.</p>
                
                <h2>1. SHIPPING OPTIONS</h2>
                <p>We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products. We offer free Standard shipping on all orders.</p>
                
                <h2>2. INTERNATIONAL DELIVERY</h2>
                <p>We do not offer international shipping at this time. Our services are focused on delivering high-quality printing solutions within our specified domestic regions.</p>
                
                <h2>3. ORDER DELAYS</h2>
                <p>If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery. We strive to maintain transparency regarding your shipment's progress.</p>
                
                <h2>4. QUESTIONS ABOUT RETURNS?</h2>
                <p>If you have questions about returns, please review our Return Policy: <a href="https://inkcore.shop/pages/refund">https://inkcore.shop/pages/refund</a>. Our return policy provides detailed instructions on how to proceed with satisfied solutions.</p>
                
                <h2>5. CONTACT US</h2>
                <p>If you have any further questions or comments, you may contact us by phone at +1-530-564-1063 or email at inkcore.shop@outlook.com. We are here to assist you with any inquiries regarding our shipping practices.</p>
            `
        },
        refund: {
            meta_title: 'Return Policy | Inkcore',
            meta_description: 'Return Policy for Inkcore.',
            content: `
                <h1>RETURN POLICY</h1>
                <p><strong>Last updated February 04, 2026</strong></p>
                <p>Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a refund only. Please see below for more information on our return policy.</p>
                
                <h2>1. RETURNS</h2>
                <p>All returns must be postmarked within thirty (30) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached to ensure a smooth return process.</p>
                
                <h2>2. RETURN PROCESS</h2>
                <p>To return an item, place the item securely in its original packaging and include your proof of purchase, then mail your return to the following address: Ink Core, Attn: Returns, 258 W 39th St, New York, NY 10018, United States. Return shipping charges will be paid or reimbursed by us.</p>
                
                <h2>3. REFUNDS</h2>
                <p>After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least seven (7) days from the receipt of your item to process your return. Refunds may take 1-2 billing cycles to appear on your credit card statement.</p>
                
                <h2>4. EXCEPTIONS</h2>
                <p>For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange. We are committed to ensuring our customers receive products in perfect working condition.</p>
                
                <h2>5. QUESTIONS</h2>
                <p>If you have any questions concerning our return policy, please contact us at +1-530-564-1063 or email us at inkcore.shop@outlook.com. Our support team is ready to help resolve any issues you may encounter.</p>
            `
        }
    };

    useEffect(() => {
        const fetchPolicy = async () => {
            if (staticPolicies[type]) {
                setPolicy(staticPolicies[type]);
                setLoading(false);
                return;
            }

            const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
            try {
                setLoading(true);
                const res = await api.get(`/policies`, { params: { website_id: websiteId } });
                if (res.data && res.data[type]) {
                    setPolicy(res.data[type]);
                } else {
                    setPolicy(null);
                }
            } catch (error) {
                console.error(`Failed to fetch policy: ${type}`, error);
                setPolicy(null);
            } finally {
                setLoading(false);
            }
        };
        fetchPolicy();
        window.scrollTo(0, 0);
    }, [type]);

    const pageTitle = policy?.meta_title?.split('|')[0].trim() || type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 pt-20">
                <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium animate-pulse">Loading documentation...</p>
            </div>
        );
    }

    if (!policy) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-slate-50 pt-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
                    <FileText size={40} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Policy Not Found</h1>
                <p className="text-slate-500 mb-8 max-w-md">The document you are looking for does not exist or has been moved.</p>
                <Link to="/" className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20">
                    Return to Home
                </Link>
            </div>
        );
    }

    const sectionConfig = {
        privacy: [
            "Information Collection", "Processing Info", "Legal Bases", "Data Sharing", 
            "Cookies & Tracking", "Retention Policy", "Data Security", "Minors Info", 
            "Privacy Rights", "Do-Not-Track", "US Resident Rights", "Updates", "Contact Us", "Data Review"
        ],
        terms: [
            "Our Services", "Intellectual Property", "User Representations", "Registration", 
            "Products", "Payment", "Return Policy", "Prohibited Activities", "Contributions",
            "License", "Reviews", "Management", "Privacy Policy", "Termination", "Modifications",
            "Governing Law", "Dispute Resolution", "Corrections", "Disclaimer", "Liability",
            "Indemnification", "User Data", "Electronic Comms", "California Users", "Miscellaneous", "Contact"
        ],
        cookies: [
            "What Are Cookies?", "How We Use Them", "Types of Cookies", "Managing Cookies", "Updates", "Contact"
        ],
        shipping: [
            "Shipping Options", "International", "Delays", "Returns", "Contact"
        ],
        refund: [
            "Returns", "Return Process", "Refunds", "Exceptions", "Questions"
        ]
    };

    const sections = sectionConfig[type] || [];

    const getIcon = () => {
        switch(type) {
            case 'privacy': return <Shield className="w-12 h-12 text-brand-600" />;
            case 'terms': return <Scale className="w-12 h-12 text-brand-600" />;
            case 'cookies': return <FileText className="w-12 h-12 text-brand-600" />;
            case 'shipping': return <ScrollText className="w-12 h-12 text-brand-600" />;
            default: return <FileText className="w-12 h-12 text-brand-600" />;
        }
    };

    const getPdfName = () => {
        switch(type) {
            case 'privacy': return 'PRIVACY POLICY Inc core.pdf';
            case 'terms': return 'TERMS AND CONDITIONS Ink Core.pdf';
            case 'cookies': return 'Cookie Policy for Inkcore.pdf';
            case 'shipping': return 'SHIPPING DELIVERY POLICY InkCore.pdf';
            case 'refund': return 'RETURN POLICYinkcore.pdf';
            default: return null;
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-100 selection:text-brand-700">
            <SEO
                pageName={`policy_${type}`}
                fallbackTitle={policy.meta_title || pageTitle}
                fallbackDesc={policy.meta_description}
            />

            {/* --- REFINED PREMIUM HEADER --- */}
            <div className="bg-slate-50 border-b border-slate-200/60 pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-50/50 to-transparent"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-100/30 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-6">
                                <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
                                <ChevronRight size={10} strokeWidth={3} />
                                <span className="text-slate-900">Legal Center</span>
                            </div>
                            
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-brand-600 rounded-full animate-pulse"></span>
                                <span className="text-brand-600 font-bold uppercase tracking-widest text-[9px]">Official Documentation</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                                {pageTitle}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-slate-400" />
                                    <span>Last Updated: <span className="text-slate-900 font-bold">Feb 04, 2026</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText size={16} className="text-slate-400" />
                                    <span>Document Type: <span className="text-slate-900 font-bold uppercase">{type}</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-brand-500/10 flex items-center justify-center border border-slate-100 transform rotate-3">
                                {getIcon()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT LAYOUT --- */}
            <div className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Sidebar Navigation */}
                    {sections.length > 0 && (
                        <aside className="lg:w-1/4">
                            <div className="sticky top-32 space-y-8">
                                <div className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">In this document</h3>
                                    <nav className="flex flex-col gap-1 border-l border-slate-200">
                                        {sections.map((section, idx) => (
                                            <a 
                                                key={idx}
                                                href={`#section-${idx + 1}`}
                                                className="pl-4 py-2 text-sm font-bold text-slate-500 hover:text-brand-600 hover:border-l-2 hover:border-brand-600 -ml-[1px] transition-all"
                                            >
                                                {idx + 1}. {section}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                                
                                <div className="p-8 bg-slate-900 rounded-[2rem] text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group">
                                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                    <div className="relative z-10">
                                        <h4 className="font-bold text-lg mb-2">Legal Help</h4>
                                        <p className="text-slate-400 text-xs mb-6 leading-relaxed">Need professional clarification regarding our legal terms or policies?</p>
                                        <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-400 hover:text-white transition-colors">
                                            Talk to Expert <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    )}

                    {/* Main Content Body */}
                    <main className={`${sections.length > 0 ? 'lg:w-3/4' : 'w-full max-w-4xl mx-auto'}`}>
                        <div className="bg-white border border-slate-200/60 rounded-[3rem] p-8 md:p-20 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
                            {/* Decorative Background Icon */}
                            <div className="absolute top-12 right-12 opacity-[0.02] pointer-events-none transform rotate-12">
                                {getIcon()}
                            </div>

                            <article className="prose prose-slate prose-lg md:prose-xl prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-100 prose-h3:mt-10 prose-h3:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8 prose-li:text-slate-600 prose-li:mb-3 prose-strong:text-slate-900 prose-a:text-brand-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline max-w-none
                                prose-table:border prose-table:border-slate-100 prose-th:bg-slate-50 prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-slate-50">
                                <div 
                                    className="policy-content"
                                    dangerouslySetInnerHTML={{ 
                                        __html: policy.content.replace(/<h2>(\d+)\./g, (match, p1) => `<h2 id="section-${p1}" class="scroll-mt-32">${p1}.`) 
                                    }} 
                                />
                            </article>
                        </div>

                        {/* Document Footer */}
                        <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-sm text-slate-400 font-medium">
                                © 2026 Inkcore • Official Regulatory Documentation
                            </div>
                            <div className="flex gap-4">
                                {getPdfName() && (
                                    <a 
                                        href={`/${getPdfName()}`} 
                                        download
                                        className="px-6 py-3 border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
                                    >
                                        <Printer size={14} /> Download PDF
                                    </a>
                                )}
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        toast.success("Link copied to clipboard!");
                                    }}
                                    className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-brand-600 transition-all shadow-lg flex items-center gap-2"
                                >
                                    <Share2 size={14} /> Share Link
                                </button>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );

};

export default PolicyPage;
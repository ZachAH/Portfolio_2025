import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

// ── TYPES ─────────────────────────────────────────────────
type Addon = { name: string; price: number };

interface Field {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    options?: { value: string; label: string }[];
    label_text?: string;
    condition?: (data: any) => boolean;
}

interface Step {
    id: string;
    label: string;
    fields: Field[];
}

// ── CONFIGURATION ─────────────────────────────────────────
const STEPS: Step[] = [
    {
        id: 'template',
        label: 'Select Design',
        fields: [
            {
                id: 'templateId',
                label: 'Choose Your Foundation',
                type: 'select',
                options: [
                    { value: 'buisness_modern', label: 'Universal Business (Standard - Included)' },
                    { value: 'buisness_template2', label: 'Clean Corporate (Standard - Included)' },
                    { value: 'construction_template', label: 'The Contractor (Standard - Included)' },
                    { value: 'saas_template', label: 'Modern Business Elite (+$20 Deployment Fee)' }
                ]
            },
            {
                id: 'saasNotice',
                label: '💳 Deployment Fee Notice',
                type: 'header',
                label_text: 'The Modern Business Elite foundation requires a manual $20 deployment fee. Zach will email a secondary invoice for this upon form completion.',
                condition: (data: any) => data.templateId === 'saas_template'
            },
            {
                id: 'layoutToggle',
                label: 'Enable Multi-View Toggle?',
                type: 'select',
                condition: (data: any) => data.templateId === 'saas_template',
                options: [
                    { value: 'single', label: 'Standard (1 Layout - Included)' },
                    { value: 'double', label: 'Dual-View Config (+$100)' },
                    { value: 'triple', label: 'Elite-Tier Config (+$150)' }
                ]
            },
            {
                id: 'layoutNotice',
                label: '💳 Custom Motion Fee Notice',
                type: 'header',
                label_text: 'Multi-view layouts require custom GSAP motion engineering. A secondary invoice for this configuration will be sent to your primary email.',
                condition: (data: any) => data.layoutToggle === 'double' || data.layoutToggle === 'triple'
            }
        ]
    },
    {
        id: 'brand',
        label: 'Brand DNA',
        fields: [
            { id: 'businessName', label: 'Official Business Name', placeholder: 'e.g., Blackline Ink Co.', type: 'text' },
            {
                id: 'taglineStrategy',
                label: 'Main Tagline Strategy',
                type: 'select',
                options: [
                    { value: 'manual', label: 'I have a specific tagline' },
                    { value: 'expert', label: 'I trust Zach to write a high-conversion tagline' }
                ]
            },
            {
                id: 'tagline',
                label: 'Main Tagline',
                placeholder: 'e.g., Art that outlasts trends.',
                type: 'text',
                condition: (data: any) => data.taglineStrategy !== 'expert'
            },
            { id: 'targetAudience', label: 'Who is your ideal customer?', placeholder: 'e.g., Tattoo enthusiasts in New Berlin.', type: 'text' },
            { id: 'coreServices', label: 'Top 3 Services/Products', placeholder: 'e.g., Custom Tattoos, Piercings...', type: 'textarea' },

            /* --- THEME #2 DNA --- */
            {
                id: 'theme2Header',
                label: '✨ Theme #2 Configuration',
                type: 'header',
                condition: (data: any) => data.layoutToggle === 'double' || data.layoutToggle === 'triple'
            },
            {
                id: 'theme2Name', label: 'Toggle Button Text #2', placeholder: 'e.g., Midnight', type: 'text',
                condition: (data: any) => data.layoutToggle === 'double' || data.layoutToggle === 'triple'
            },
            {
                id: 'theme2Tagline', label: 'Theme #2 Hero Tagline', placeholder: 'e.g., Dark precision.', type: 'text',
                condition: (data: any) => data.layoutToggle === 'double' || data.layoutToggle === 'triple'
            },
            {
                id: 'theme2Vibe', label: 'Theme #2 Visual Vibe', placeholder: 'e.g., Neon accents, dark grays...', type: 'textarea',
                condition: (data: any) => data.layoutToggle === 'double' || data.layoutToggle === 'triple'
            },

            /* --- THEME #3 DNA --- */
            {
                id: 'theme3Header',
                label: '🔥 Theme #3 Configuration',
                type: 'header',
                condition: (data: any) => data.layoutToggle === 'triple'
            },
            {
                id: 'theme3Name', label: 'Toggle Button Text #3', placeholder: 'e.g., Solstice', type: 'text',
                condition: (data: any) => data.layoutToggle === 'triple'
            },
            {
                id: 'theme3Tagline', label: 'Theme #3 Hero Tagline', placeholder: 'e.g., Minimalist Ink.', type: 'text',
                condition: (data: any) => data.layoutToggle === 'triple'
            },
            {
                id: 'theme3Vibe', label: 'Theme #3 Visual Vibe', placeholder: 'e.g., Industrial, stark white...', type: 'textarea',
                condition: (data: any) => data.layoutToggle === 'triple'
            },
            { id: 'brandNotes', label: 'Additional Brand Notes (Optional)', placeholder: 'Anything else?', type: 'textarea' }
        ]
    },
    {
        id: 'technical',
        label: 'Digital Infrastructure',
        fields: [
            {
                id: 'setupExplainer',
                label: '🔒 Why White Glove Setup?',
                type: 'header',
                label_text: 'By letting me create your accounts, I ensure your hosting, domain, and security are configured to elite standards. I will email you a secure master-list of all credentials once your 48-hour sprint is finalized.'
            },
            {
                id: 'accountSetup',
                label: 'Current Setup Status',
                type: 'select',
                options: [
                    { value: 'create_for_me', label: 'White Glove: Create all accounts for me (Recommended ⭐)' },
                    { value: 'existing', label: 'I already own a domain' },
                    { value: 'transfer', label: 'I want to move from Wix/Squarespace' }
                ]
            },
            { id: 'domainChoice', label: 'Primary Domain Choice', placeholder: 'e.g., yourbrand.com', type: 'text' },
            { id: 'emailAddress', label: 'Primary Contact Email', type: 'email' },
            { id: 'phoneForAuth', label: 'Recovery Phone (2FA)', type: 'tel' }
        ]
    },
    {
        id: 'conversion',
        label: 'Lead Capture Logic',
        fields: [
            { id: 'mainFormHeader', label: '📱 Primary Theme: Contact Form', type: 'header' },
            {
                id: 'contactGoal', label: 'Form Goal', type: 'select',
                options: [{ value: 'leads', label: 'General Inquiries' }, { value: 'quotes', label: 'Project Quotes' }]
            },
            { id: 'formFields', label: 'Required Fields', placeholder: 'e.g., Name, Email, Phone, Project Details...', type: 'textarea' },
            { id: 'formSuccess', label: 'Confirmation Message', placeholder: 'e.g., Thanks! We will be in touch shortly.', type: 'text' },

            /* --- THEME #2 FORM --- */
            { id: 'theme2FormHeader', label: '✨ Theme #2: Contact Form', type: 'header', condition: (data: any) => data.layoutToggle === 'double' || data.layoutToggle === 'triple' },
            { id: 'theme2FormFields', label: 'Theme #2 Required Fields', type: 'textarea', condition: (data: any) => data.layoutToggle === 'double' || data.layoutToggle === 'triple' },
            { id: 'theme2FormSuccess', label: 'Theme #2 Confirmation Message', type: 'text', condition: (data: any) => data.layoutToggle === 'double' || data.layoutToggle === 'triple' },

            /* --- THEME #3 FORM --- */
            { id: 'theme3FormHeader', label: '🔥 Theme #3: Contact Form', type: 'header', condition: (data: any) => data.layoutToggle === 'triple' },
            { id: 'theme3FormFields', label: 'Theme #3 Required Fields', type: 'textarea', condition: (data: any) => data.layoutToggle === 'triple' },
            { id: 'theme3FormSuccess', label: 'Theme #3 Confirmation Message', type: 'text', condition: (data: any) => data.layoutToggle === 'triple' }
        ]
    },
    {
        id: 'assets',
        label: 'Visual Assets',
        fields: [
            {
                id: 'qualityAlert',
                label: '⚠️ Quality Alert: Email is King',
                type: 'header',
                label_text: 'Texting photos compresses files, which can make your professional site look blurry. Please email high-res assets directly to zach@zachhowell.dev.'
            },
            {
                id: 'assetMethod',
                label: 'How will you send your photos/logo?',
                type: 'select',
                options: [
                    { value: 'email', label: 'Email (Recommended for Quality ⭐)' },
                    { value: 'link', label: 'Google Drive / Dropbox' },
                    { value: 'socials', label: 'Social Media Handle' },
                    { value: 'text', label: 'Text/iMessage (Low Quality)' }
                ]
            },
            { id: 'assetInput', label: 'Link or Handle', placeholder: 'Paste here...', type: 'text', condition: (data: any) => data.assetMethod === 'link' || data.assetMethod === 'socials' }
        ]
    },
    {
        id: 'launch',
        label: 'Launch Sequence',
        fields: [
            { id: 'agreement', label: 'Sprint Agreement', type: 'checkbox', label_text: 'The 48h clock starts once all high-res assets are received.' },
            { id: 'onboardingFeedback', label: 'Process Feedback', placeholder: 'What was hard or easy about this onboarding? Help me make this better!', type: 'textarea' },
            { id: 'notes', label: 'Final Notes', type: 'textarea' }
        ]
    }
];

export default function OnboardingForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);
    const accentColor = "#616B59";

    // ── PERSISTENCE ─────────────────────────────────────────
    useEffect(() => {
        const savedProgress = localStorage.getItem('onboarding_draft');
        if (savedProgress) {
            const { data, step } = JSON.parse(savedProgress);
            setFormData(data);
            setCurrentStep(step);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(formData).length > 0) {
            localStorage.setItem('onboarding_draft', JSON.stringify({ data: formData, step: currentStep }));
        }
    }, [formData, currentStep]);

    useEffect(() => {
        gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
    }, [currentStep, isComplete]);

    const handleInputChange = (id: string, value: any) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // ── DYNAMIC ADDON LOGIC ─────────────────────────────────
    const getActiveAddons = (): Addon[] => {
        const list: Addon[] = [];
        if (formData.templateId === 'saas_template') list.push({ name: 'Modern Business Elite Deployment', price: 20 });
        if (formData.layoutToggle === 'double') list.push({ name: 'Dual-View Configuration', price: 100 });
        if (formData.layoutToggle === 'triple') list.push({ name: 'Elite-Tier Triple Layout Configuration', price: 150 });
        return list;
    };

    const activeAddons = getActiveAddons();

    const validateStep = () => {
        const currentFields = STEPS[currentStep].fields;
        for (const field of currentFields) {
            if (typeof field.condition === 'function' && !field.condition(formData)) continue;
            const val = formData[field.id];
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!val || !emailRegex.test(val)) {
                    alert("Please provide a valid email.");
                    return false;
                }
            }
            if (field.type === 'tel') {
                if (!val || val.length < 10) {
                    alert("Please provide a valid phone number.");
                    return false;
                }
            }
        }
        return true;
    };

    const handleNext = () => {
        if (!validateStep()) return;
        if (currentStep < STEPS.length - 1) setCurrentStep(s => s + 1);
    };

    const handleSubmit = async () => {
        if (formData.faxNumber) {
            setIsComplete(true);
            localStorage.removeItem('onboarding_draft');
            return;
        }

        if (!formData.agreement) {
            alert("Please check the Agreement to begin.");
            return;
        }

        setIsSubmitting(true);
        try {
            // FIX: Explicitly type 'sum' as number for TS overload match
            const totalDelta = activeAddons.reduce((sum: number, item) => sum + item.price, 0);

            await addDoc(collection(db, "Projects"), {
                ...formData,
                detected_addons: activeAddons,
                total_addon_delta: totalDelta,
                status: 'onboarding_complete',
                type: '48h_sprint',
                submittedAt: serverTimestamp()
            });

            localStorage.removeItem('onboarding_draft');
            setIsComplete(true);
        } catch (error: any) {
            alert(`Submission failed: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isComplete) {
        return (
            <div className="max-w-2xl mx-auto py-20 px-6 text-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl">
                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">⚡</div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Clock Started. Thank you so much for your order being a small buisness it means the world to me!</h2>
                    <p className="text-zinc-500 mb-2 leading-relaxed">I will be starting on your project shortly.</p>

                    {/* SPAM FOLDER SAFEGUARD */}
                    <p className="text-zinc-400 text-[11px] mb-8 italic">
                        Please check your <strong className="text-zinc-300">Spam folder</strong> for your confirmation if it is not in your primary mailbox within the next 2 minutes.
                    </p>

                    {activeAddons.length > 0 && (
                        <div className="bg-amber-500/10 text-amber-600 p-6 rounded-2xl mb-8 border border-amber-500/20 text-left shadow-sm">
                            <p className="text-[10px] uppercase tracking-widest font-black mb-3 text-amber-500">Premium Choices Detected</p>
                            <ul className="text-xs space-y-2 opacity-90">
                                {activeAddons.map((addon, i) => (
                                    <li key={i} className="flex justify-between font-bold"><span>• {addon.name}</span><span>+${addon.price}</span></li>
                                ))}
                            </ul>
                            <p className="mt-4 pt-4 border-t border-amber-500/20 text-[10px] italic">I will email a manual Stripe link for these additions shortly.</p>
                        </div>
                    )}

                    <Link to="/" className="inline-block px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">
                        Return to Dashboard
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div ref={formRef} className="max-w-5xl mx-auto p-6 md:p-10 bg-white dark:bg-zinc-950/50 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl mt-10 mb-10">

            <div className="opacity-0 absolute -top-96 left-0 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <input type="text" name="faxNumber" autoComplete="off" tabIndex={-1} value={formData.faxNumber || ''} onChange={(e) => handleInputChange('faxNumber', e.target.value)} />
            </div>

            <div className="flex justify-between mb-12 px-4 max-w-3xl mx-auto">
                {STEPS.map((step, i) => (
                    <div key={step.id} className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all" style={{ backgroundColor: i <= currentStep ? accentColor : 'transparent', color: i <= currentStep ? 'white' : '#71717a', border: i <= currentStep ? 'none' : '1px solid #3f3f46' }}>{i + 1}</div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">{STEPS[currentStep].label}</h2>

                    {STEPS[currentStep].fields.map((field: Field) => {
                        if (field.condition && !field.condition(formData)) return null;

                        if (field.type === 'header') return (
                            <div key={field.id} className="pt-8 mb-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-3">{field.label}</h3>
                                {field.label_text && (
                                    <div className="p-5 bg-zinc-900/60 border-l-4 border-amber-500/50 rounded-r-2xl shadow-inner transition-all">
                                        <p className="text-[12px] text-zinc-100 leading-relaxed font-semibold">{field.label_text}</p>
                                    </div>
                                )}
                            </div>
                        );

                        return (
                            <div key={field.id} className="flex flex-col gap-2 mb-4">
                                {field.type !== 'checkbox' && <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold ml-1">{field.label}</label>}
                                {field.type === 'textarea' ? (
                                    <textarea value={formData[field.id] || ''} onChange={(e) => handleInputChange(field.id, e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-zinc-900 dark:text-white h-32 outline-none focus:border-zinc-400 transition-colors" placeholder={field.placeholder} />
                                ) : field.type === 'select' ? (
                                    <select value={formData[field.id] || ''} onChange={(e) => handleInputChange(field.id, e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-zinc-900 dark:text-white outline-none">
                                        <option value="">Select an option...</option>
                                        {field.options?.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                    </select>
                                ) : field.type === 'checkbox' ? (
                                    <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors" onClick={() => handleInputChange(field.id, !formData[field.id])}>
                                        <input type="checkbox" checked={!!formData[field.id]} readOnly className="w-4 h-4 accent-olive-500" />
                                        <span className="text-xs text-zinc-400 font-medium">{field.label_text}</span>
                                    </div>
                                ) : (
                                    <input type={field.type} value={formData[field.id] || ''} onChange={(e) => handleInputChange(field.id, e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-zinc-900 dark:text-white outline-none focus:border-zinc-400 transition-colors" placeholder={field.placeholder} />
                                )}
                            </div>
                        );
                    })}

                    <div className="flex gap-4 mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800/50">
                        {currentStep > 0 && <button onClick={() => setCurrentStep(s => s - 1)} className="px-8 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 font-bold text-xs uppercase hover:bg-zinc-100 dark:hover:bg-zinc-800">Back</button>}
                        <button disabled={isSubmitting} onClick={currentStep === STEPS.length - 1 ? handleSubmit : handleNext} className="flex-1 px-8 py-4 text-white rounded-xl font-black text-xs uppercase shadow-lg transition-all active:scale-95 disabled:opacity-50" style={{ backgroundColor: accentColor }}>
                            {isSubmitting ? 'Securing Lead Data...' : currentStep === STEPS.length - 1 ? 'Start 48h Sprint' : 'Continue'}
                        </button>
                    </div>
                </div>

                <div className="lg:sticky lg:top-10">
                    <AnimatePresence mode="wait">
                        {formData.templateId ? (
                            <motion.div key={formData.templateId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-900 aspect-video">
                                    <img src={`/${formData.templateId}.png`} className="w-full h-full object-cover" alt="Preview" />
                                </div>
                                <div className="p-4 bg-zinc-900/40 rounded-xl border border-white/5 space-y-3 font-bold">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mb-2">Build Summary</p>
                                    <div className="flex justify-between items-center"><span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Main Theme</span><span className="text-xs text-zinc-200">{formData.businessName || 'TBD'}</span></div>
                                    {(formData.layoutToggle === 'double' || formData.layoutToggle === 'triple') && (
                                        <div className="flex justify-between items-center border-t border-white/5 pt-2"><span className="text-[10px] text-amber-500 font-bold uppercase tracking-tighter">Toggle #2</span><span className="text-xs text-zinc-200">{formData.theme2Name || 'Waiting...'}</span></div>
                                    )}
                                    {formData.layoutToggle === 'triple' && (
                                        <div className="flex justify-between items-center border-t border-white/5 pt-2"><span className="text-[10px] text-amber-500 font-bold uppercase tracking-tighter">Toggle #3</span><span className="text-xs text-zinc-200">{formData.theme3Name || 'Waiting...'}</span></div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-64 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl flex items-center justify-center text-zinc-400 text-[10px] uppercase p-10 text-center">Select a design to start</div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
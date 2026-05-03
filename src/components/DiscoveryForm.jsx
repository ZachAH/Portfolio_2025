import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Seo from './Seo';

// Consolidated all steps into one single layout for faster conversion
const ALL_FIELDS = [
  { id: 'fullName', label: 'Your Name', type: 'text', placeholder: 'First & Last', required: true },
  { id: 'email', label: 'Best Email', type: 'email', placeholder: 'you@brand.com', required: true },
  { id: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: 'For follow-up if email bounces' },
  { id: 'businessName', label: 'Business / Project Name', type: 'text', placeholder: 'e.g., Blackline Studio', required: true },
  { id: 'businessType', label: 'Industry / Business Type', type: 'text', placeholder: 'e.g., HVAC, Law Firm, E-commerce', required: true },
  {
    id: 'businessStage',
    label: 'Where is this business today?',
    type: 'select',
    options: [
      { value: '', label: 'Select a stage...' },
      { value: 'idea', label: 'Just an idea — pre-launch' },
      { value: 'early', label: 'Early / first customers' },
      { value: 'established', label: 'Established — replacing an existing site' },
      { value: 'scaling', label: 'Scaling — adding a new product line' },
    ],
    required: true,
  },
  {
    id: 'projectType',
    label: 'What kind of build is this?',
    type: 'select',
    options: [
      { value: '', label: 'Select a type...' },
      { value: 'landing', label: 'High-Conversion Landing Page' },
      { value: 'business', label: 'Custom Business Site' },
      { value: 'cms', label: 'Dynamic Site + CMS / Admin Dashboard' },
      { value: 'webapp', label: 'Full Web Application' },
      { value: 'ecommerce', label: 'Custom E-Commerce' },
      { value: 'unsure', label: "I'm not sure yet — need help scoping" },
    ],
    required: true,
  },
  {
    id: 'visionPitch',
    label: 'Pitch me your vision in a paragraph',
    type: 'textarea',
    placeholder: 'What does this site do, who is it for, and what should it feel like?',
    required: true,
  },
  {
    id: 'budgetRange',
    label: 'Realistic Budget Range',
    type: 'select',
    options: [
      { value: '', label: 'Select a range...' },
      { value: '800-1200', label: '$800 – $1200 (High-Conversion Landing Page)' },
      { value: '1.5-3k', label: '$1,500 – $3,000 (Business Site tier)' },
      { value: '3-6k', label: '$3,000 – $6,000 (Dynamic + CMS tier)' },
      { value: '6k+', label: '$6,000+ (Enterprise / Web App tier)' },
      { value: 'flexible', label: "I'm flexible — recommend a tier" },
    ],
    required: true,
  },
  {
    id: 'timeline',
    label: 'Ideal Launch Timeline',
    type: 'select',
    options: [
      { value: '', label: 'Select a timeline...' },
      { value: 'asap', label: 'ASAP — fire drill' },
      { value: '1m', label: 'Within 1 month' },
      { value: '1-3m', label: '1 – 3 months' },
      { value: '3m+', label: '3+ months / no firm date' },
    ],
    required: true,
  },
  {
    id: 'callPreference',
    label: 'Preferred Call Platform',
    type: 'select',
    options: [
      { value: '', label: 'Select a platform...' },
      { value: 'zoom', label: 'Zoom' },
      { value: 'teams', label: 'Microsoft Teams' },
      { value: 'phone', label: 'Phone call instead' },
      { value: 'either', label: 'Either Zoom or Teams works' },
    ],
    required: true,
  },
  {
    id: 'callAvailability',
    label: 'Best days / times for a 15-min discovery call',
    type: 'textarea',
    placeholder: 'e.g., Weekday afternoons, or Tue/Thu mornings',
  },
];

const DiscoveryForm = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    for (const field of ALL_FIELDS) {
      if (!field.required) continue;
      const val = formData[field.id];
      if (!val || (typeof val === 'string' && !val.trim())) {
        alert(`Please fill out: ${field.label}`);
        return false;
      }
      if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          alert('Please provide a valid email address.');
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (formData.faxNumber) return; // Honeypot

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'Projects'), {
        ...formData,
        emailAddress: formData.email,
        type: 'custom_inquiry',
        submittedAt: serverTimestamp(),
      });
      setIsComplete(true);
    } catch (err) {
      alert(`Submission failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-6 bg-white dark:bg-obsidian-950">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-2xl mx-auto p-12 bg-gray-50 dark:bg-white/5 border border-obsidian-700/10 dark:border-white/10 rounded-3xl text-center shadow-xl">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl bg-accent-orange/10 text-accent-orange">✓</div>
          <h2 className="text-4xl font-bold tracking-tighter mb-4 text-obsidian-950 dark:text-white">Discovery Received.</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Thanks for the detail — I will personally review your vision and call or email you within 24 hours to lock in our sync.</p>
          <Link to="/" className="inline-block px-8 py-4 bg-obsidian-950 dark:bg-white text-white dark:text-obsidian-950 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform">Return Home</Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-white dark:bg-obsidian-950">
      <Seo title="Custom Build Discovery | Zach Howell" description="Kick off the discovery phase for a fully custom website or web app build." path="/custom-discovery" />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">Custom Build · Discovery Phase</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-obsidian-950 dark:text-white mb-6">Tell me about your <span className="text-gradient">vision</span>.</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">Expect a response within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 bg-gray-50 dark:bg-white/5 backdrop-blur-md border border-obsidian-700/10 dark:border-white/10 rounded-3xl shadow-xl space-y-6">
          {/* Honeypot */}
          <div className="absolute -top-96 left-0 opacity-0 pointer-events-none" aria-hidden="true">
            <input type="text" name="faxNumber" autoComplete="off" value={formData.faxNumber || ''} onChange={(e) => handleChange('faxNumber', e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALL_FIELDS.map(field => (
              <div key={field.id} className={`flex flex-col gap-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 dark:text-gray-300">
                  {field.label} {field.required && <span className="text-accent-orange">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea value={formData[field.id] || ''} onChange={(e) => handleChange(field.id, e.target.value)} placeholder={field.placeholder} className="w-full bg-white dark:bg-obsidian-900/50 border border-obsidian-700/10 dark:border-white/10 rounded-xl p-4 text-obsidian-950 dark:text-white h-32 outline-none focus:border-accent-orange transition-colors" />
                ) : field.type === 'select' ? (
                  <select value={formData[field.id] || ''} onChange={(e) => handleChange(field.id, e.target.value)} className="w-full bg-white dark:bg-obsidian-900/50 border border-obsidian-700/10 dark:border-white/10 rounded-xl p-4 text-obsidian-950 dark:text-white outline-none focus:border-accent-orange transition-colors">
                    {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                ) : (
                  <input type={field.type} value={formData[field.id] || ''} onChange={(e) => handleChange(field.id, e.target.value)} placeholder={field.placeholder} className="w-full bg-white dark:bg-obsidian-900/50 border border-obsidian-700/10 dark:border-white/10 rounded-xl p-4 text-obsidian-950 dark:text-white outline-none focus:border-accent-orange transition-colors" />
                )}
              </div>
            ))}
          </div>

          <button disabled={isSubmitting} type="submit" className="w-full px-8 py-4 bg-accent-orange text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-accent-orange/90 active:scale-95 disabled:opacity-50 transition-all">
            {isSubmitting ? 'Sending...' : 'Submit Discovery Inquiry'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default DiscoveryForm;
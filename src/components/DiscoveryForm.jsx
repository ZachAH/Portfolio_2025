import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Seo from './Seo';

// ── DISCOVERY STEPS ───────────────────────────────────────
// This is the *discovery phase* intake for fully custom builds.
// Goal: capture enough vision + business context to make the
// follow-up Zoom / Teams call productive — not to scope the
// entire project up front.
const STEPS = [
  {
    id: 'contact',
    label: 'Introduction',
    fields: [
      { id: 'fullName', label: 'Your Name', type: 'text', placeholder: 'First & Last', required: true },
      { id: 'email', label: 'Best Email', type: 'email', placeholder: 'you@brand.com', required: true },
      { id: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: 'For follow-up if email bounces' },
      { id: 'businessName', label: 'Business / Project Name', type: 'text', placeholder: 'e.g., Blackline Studio', required: true },
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
    ],
  },
  {
    id: 'vision',
    label: 'The Vision',
    fields: [
      {
        id: 'projectType',
        label: 'What kind of build is this?',
        type: 'select',
        options: [
          { value: '', label: 'Select a type...' },
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
        id: 'mustHaves',
        label: 'Must-have features or pages',
        type: 'textarea',
        placeholder: 'e.g., booking calendar, gated member area, custom dashboard, blog, etc.',
      },
      {
        id: 'inspiration',
        label: 'Sites you love (for vibe / functionality)',
        type: 'textarea',
        placeholder: 'Drop 1-3 links and tell me what you love about each.',
      },
      {
        id: 'audience',
        label: 'Who is this built for?',
        type: 'text',
        placeholder: 'Your ideal customer in one sentence.',
      },
    ],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    fields: [
      {
        id: 'budgetRange',
        label: 'Realistic Budget Range',
        type: 'select',
        options: [
          { value: '', label: 'Select a range...' },
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
        id: 'hasAssets',
        label: 'Do you have brand assets ready?',
        type: 'select',
        options: [
          { value: '', label: 'Select...' },
          { value: 'yes', label: 'Yes — logo, colors, copy ready to go' },
          { value: 'partial', label: 'Some — but I need help filling gaps' },
          { value: 'no', label: 'No — starting from scratch' },
        ],
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
        label: 'Best days / times for a 30-min discovery call',
        type: 'textarea',
        placeholder: 'e.g., Weekday afternoons CST, or Tue/Thu mornings',
      },
      {
        id: 'anythingElse',
        label: 'Anything else I should know?',
        type: 'textarea',
        placeholder: 'Constraints, integrations, internal politics, dream features — anything.',
      },
    ],
  },
];

const accent = '#FF6B35'; // accent-orange

const DiscoveryForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const formRef = useRef(null);

  // Restore draft so users don't lose progress if they navigate away.
  useEffect(() => {
    const saved = localStorage.getItem('discovery_draft');
    if (saved) {
      try {
        const { data, step } = JSON.parse(saved);
        setFormData(data || {});
        setCurrentStep(step || 0);
      } catch (e) {
        // ignore corrupt draft
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('discovery_draft', JSON.stringify({ data: formData, step: currentStep }));
    }
  }, [formData, currentStep]);

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateStep = () => {
    const fields = STEPS[currentStep].fields;
    for (const field of fields) {
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

  const handleNext = () => {
    if (!validateStep()) return;
    if (currentStep < STEPS.length - 1) setCurrentStep(s => s + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    // Honeypot check
    if (formData.faxNumber) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'Projects'), {
        ...formData,
        // Mirror the email field name the Cloud Function expects so the
        // confirmation email goes to the right address.
        emailAddress: formData.email,
        type: 'custom_inquiry',
        projectTier: 'custom_discovery',
        status: 'discovery_submitted',
        submittedAt: serverTimestamp(),
      });
      localStorage.removeItem('discovery_draft');
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
        <Seo
          title="Discovery Submitted | Zach Howell"
          description="Your custom build discovery request has been received."
          path="/custom-discovery"
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl mx-auto p-12 bg-gray-50 dark:bg-white/5 border border-obsidian-700/10 dark:border-white/10 rounded-3xl text-center shadow-xl"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl bg-accent-orange/10 text-accent-orange">
            ✓
          </div>
          <h2 className="text-4xl font-bold tracking-tighter mb-4 text-obsidian-950 dark:text-white">
            Discovery Received.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Thanks for the detail — I'll review your vision and email you within 24 hours
            to lock in a Zoom or Teams call so we can dig in together.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-obsidian-950 dark:bg-white text-white dark:text-obsidian-950 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform"
          >
            Return Home
          </Link>
        </motion.div>
      </section>
    );
  }

  const step = STEPS[currentStep];

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-white dark:bg-obsidian-950">
      <Seo
        title="Custom Build Discovery | Zach Howell"
        description="Kick off the discovery phase for a fully custom website or web app build with Zach Howell."
        path="/custom-discovery"
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">
            Custom Build · Discovery Phase
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-obsidian-950 dark:text-white mb-6">
            Tell me about your <span className="text-gradient">vision</span>.
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            This form kicks off the discovery phase. Once submitted, I'll review your
            vision and reach out to schedule a 30-minute Zoom or Teams call so we can
            align on scope, timeline, and the right approach before any contracts.
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 md:p-10 bg-gray-50 dark:bg-white/5 backdrop-blur-md border border-obsidian-700/10 dark:border-white/10 rounded-3xl shadow-xl"
        >
          {/* Honeypot */}
          <div className="absolute -top-96 left-0 h-0 w-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
            <input
              type="text"
              name="faxNumber"
              autoComplete="off"
              tabIndex={-1}
              value={formData.faxNumber || ''}
              onChange={(e) => handleChange('faxNumber', e.target.value)}
            />
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between mb-10">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i <= currentStep
                        ? 'bg-accent-orange text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-white/10 text-gray-500'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 hidden sm:block">
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-px flex-1 mx-2 transition-colors ${i < currentStep ? 'bg-accent-orange' : 'bg-gray-200 dark:bg-white/10'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <h2 className="text-2xl font-bold text-obsidian-950 dark:text-white mb-6">
                {step.label}
              </h2>

              {step.fields.map(field => (
                <div key={field.id} className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 dark:text-gray-300">
                    {field.label}
                    {field.required && <span className="text-accent-orange ml-1">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-white dark:bg-obsidian-900/50 border border-obsidian-700/10 dark:border-white/10 rounded-xl p-4 text-obsidian-950 dark:text-white h-32 outline-none focus:border-accent-orange transition-colors"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="w-full bg-white dark:bg-obsidian-900/50 border border-obsidian-700/10 dark:border-white/10 rounded-xl p-4 text-obsidian-950 dark:text-white outline-none focus:border-accent-orange transition-colors"
                    >
                      {field.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-white dark:bg-obsidian-900/50 border border-obsidian-700/10 dark:border-white/10 rounded-xl p-4 text-obsidian-950 dark:text-white outline-none focus:border-accent-orange transition-colors"
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <div className="flex gap-4 mt-10 pt-8 border-t border-obsidian-700/10 dark:border-white/10">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(s => s - 1)}
                className="px-8 py-4 rounded-full border border-obsidian-700/10 dark:border-white/10 text-obsidian-950 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                Back
              </button>
            )}
            <button
              disabled={isSubmitting}
              onClick={currentStep === STEPS.length - 1 ? handleSubmit : handleNext}
              className="flex-1 px-8 py-4 bg-accent-orange text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-accent-orange/90 active:scale-95 disabled:opacity-50 transition-all"
            >
              {isSubmitting
                ? 'Sending...'
                : currentStep === STEPS.length - 1
                  ? 'Submit Discovery'
                  : 'Continue'}
            </button>
          </div>
        </motion.div>

        {/* Reassurance footer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8 italic max-w-xl mx-auto leading-relaxed">
          No commitments at this stage — discovery is free. Once we hop on a call I'll send
          a tailored proposal with fixed pricing and a clear timeline.
        </p>
      </div>
    </section>
  );
};

export default DiscoveryForm;

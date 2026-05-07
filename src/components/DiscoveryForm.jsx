import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Seo from './Seo';

const ALL_FIELDS = [
  { id: 'fullName', label: 'Your Name', type: 'text', placeholder: 'First and last name', required: true },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@business.com', required: true },
  { id: 'businessName', label: 'Business', type: 'text', placeholder: 'Your business name', required: true },
  {
    id: 'howCanIHelp',
    label: 'How Can I Help?',
    type: 'textarea',
    placeholder: 'What do you need built, fixed, or improved?',
    required: true,
  },
];

const DiscoveryForm = ({ embedded = false, title = 'Tell me what you need.', description = 'Expect a response within 24 hours.' }) => {
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const serviceArea = useMemo(() => {
    const match = location.pathname.match(/^\/locations\/(.+?)-web-design$/);
    if (!match) return '';
    return match[1]
      .split('-')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');
  }, [location.pathname]);

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
        name: formData.fullName,
        emailAddress: formData.email,
        projectSummary: formData.howCanIHelp,
        sourcePage: location.pathname,
        serviceArea,
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
      <section className={`${embedded ? 'py-0' : 'min-h-screen pt-32 pb-20 px-6 bg-white dark:bg-obsidian-950'}`}>
        <div className="max-w-2xl mx-auto p-12 bg-gray-50 dark:bg-white/5 border border-obsidian-700/10 dark:border-white/10 rounded-3xl text-center shadow-xl">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl bg-accent-orange/10 text-accent-orange">✓</div>
          <h2 className="text-4xl font-bold tracking-tighter mb-4 text-obsidian-950 dark:text-white">Discovery Received.</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Thanks for the detail — I will personally review your vision and call or email you within 24 hours to lock in our sync.</p>
          {!embedded && (
            <a href="/" className="inline-block px-8 py-4 bg-obsidian-950 dark:bg-white text-white dark:text-obsidian-950 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform">Return Home</a>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={embedded ? 'py-0' : 'min-h-screen pt-32 pb-20 px-6 bg-white dark:bg-obsidian-950'}>
      {!embedded && (
        <Seo title="Custom Build Discovery | Zach Howell" description="Kick off the discovery phase for a fully custom website or web app build." path="/custom-discovery" />
      )}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">Custom Build · Discovery Phase</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-obsidian-950 dark:text-white mb-6">{title}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 bg-gray-50 dark:bg-white/5 backdrop-blur-md border border-obsidian-700/10 dark:border-white/10 rounded-3xl shadow-xl space-y-6">
          {/* Honeypot */}
          <div className="absolute -top-96 left-0 opacity-0 pointer-events-none" aria-hidden="true">
            <input type="text" name="faxNumber" autoComplete="off" value={formData.faxNumber || ''} onChange={(e) => handleChange('faxNumber', e.target.value)} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {ALL_FIELDS.map(field => (
              <div key={field.id} className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 dark:text-gray-300">
                  {field.label} {field.required && <span className="text-accent-orange">*</span>}
                </label>
                <textarea
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  rows={field.id === 'howCanIHelp' ? 6 : 3}
                  className="w-full bg-white dark:bg-obsidian-900/50 border border-obsidian-700/10 dark:border-white/10 rounded-xl p-4 text-obsidian-950 dark:text-white outline-none focus:border-accent-orange transition-colors resize-y min-h-[110px]"
                />
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

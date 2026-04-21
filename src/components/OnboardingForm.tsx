import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import templates from '../data/templates';

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
    disabled?: boolean;
}

interface Step {
    id: string;
    label: string;
    fields: Field[];
    condition?: (data: any) => boolean;
}

// ── LEGAL CONTENT ─────────────────────────────────────────
const TOS_TEXT = `
1. THE SPRINT CLOCK: The development window (48h for Sprint, 72h for Modern Edge) begins ONLY once this onboarding form is fully completed AND all required high-resolution assets (logos, photos, copy, brand guidelines) have been received and confirmed by Zach Howell via email. Delays in asset delivery pause the clock — the 48/72-hour guarantee applies to active build time, not calendar time from purchase.

2. DNS PROPAGATION: Domain Name System (DNS) changes can take up to 24–72 hours to propagate globally after deployment. This propagation window is controlled entirely by third-party DNS providers and internet service providers — it is outside the scope of the 48-hour delivery guarantee. Your site will be deployed and accessible via the hosting URL within the guaranteed window; worldwide domain resolution may take additional time beyond Zach Howell's control.

3. THIRD-PARTY SERVICES: This engagement relies on third-party platforms including but not limited to Porkbun (domain registrar), Netlify (hosting & deployment), CDN networks, Stripe, Google Search Console, and email providers. Zach Howell is not liable for outages, policy changes, service interruptions, delayed verifications, or account-level restrictions imposed by any third-party platform. Best-effort troubleshooting will be provided, but resolution timelines for third-party issues are not guaranteed.

4. DOMAIN DISCRETION: If your domain choices are unavailable, restricted, or exceed standard registration costs (typically $10–$20/year for .com), Zach Howell will notify you and propose the closest available alternative. If no agreement is reached within 24 hours, Zach Howell reserves the right to proceed with the best available option to prevent project stagnation.

5. ASSET REQUIREMENTS & CLIENT RESPONSIBILITIES: The client is solely responsible for providing all content, media, logos, copy, and brand assets. Zach Howell does not provide copywriting, professional photography, or stock imagery unless explicitly agreed upon in writing. If assets are not delivered within 7 calendar days of purchase, the project may be placed on hold and the sprint clock will not begin until assets are received.

6. REVISION SCOPE: The Sprint package includes one consolidated round of revisions during the Review phase (Hours 24–36). Revision requests must be submitted together, not piecemeal. Requests that materially alter the scope, layout, or functionality beyond the original template foundation may be subject to additional charges quoted before work begins.

7. SECONDARY INVOICING: Add-ons selected during onboarding (e.g., Multi-View Layouts, Google Maps Integration, additional pages) are billed via a secondary Stripe invoice. Work on add-on features begins only after payment is confirmed.

8. HOSTING & ONGOING COSTS: Zach Howell is not responsible for ongoing hosting fees, domain renewal costs, SSL certificate renewals, or any recurring charges from third-party services after the project hand-off. The client will be informed of any expected recurring costs during the onboarding process.

9. SITE PERFORMANCE GUARANTEE: The 90+ score guarantee across all Google Lighthouse audit categories (Performance, Accessibility, Best Practices, and SEO) applies to the site as delivered at launch, tested on a standard mobile connection. Scores may vary based on the client's hosting plan, third-party scripts added post-launch, or media assets that exceed recommended file sizes. The guarantee does not cover performance degradation caused by client modifications after delivery.

10. COMMERCE COMPLIANCE: Commerce Launch includes a 7-day post-launch support window for functional adjustments and compliance checks. After the 7-day window, support is available via Growth Partnership Plans.

11. INTELLECTUAL PROPERTY: Upon full payment and project completion, the client receives 100% ownership of the delivered source code. Zach Howell retains the right to display the project in his portfolio unless the client requests otherwise in writing. The client is responsible for ensuring they hold proper rights/licenses to all assets, content, and media they provide.

12. LIMITATION OF LIABILITY: Zach Howell's total liability for any claim arising from this engagement shall not exceed the total amount paid for the specific package purchased. Zach Howell is not liable for lost revenue, lost data, business interruption, or any indirect, incidental, or consequential damages resulting from the use or inability to use the delivered website.

13. REFUND POLICY: Due to the rapid and labor-intensive nature of these builds, all payments are non-refundable once development has officially commenced (i.e., the sprint clock has started). If the project has not yet begun and no development work has been performed, a full refund may be issued at Zach Howell's discretion.

14. GOVERNING LAW: These terms are governed by the laws of the State of Wisconsin. Any disputes arising from this agreement shall be resolved in the courts of Waukesha County, Wisconsin.
`;

// ── CONFIGURATION ─────────────────────────────────────────
const STEPS: Step[] = [
    {
        id: 'selection',
        label: 'Tier & Foundation',
        fields: [
            {
                id: 'packageType',
                label: 'Confirm Your Selected Package',
                type: 'select',
                disabled: true,
                options: [
                    { value: 'sprint', label: 'The 48h Sprint ($1,400)' },
                    { value: 'modern_edge', label: 'Modern Edge ($2,000)' },
                    { value: 'commerce', label: 'Commerce Launch ($3,200+)' }
                ]
            },
            /* --- TEMPLATES FOR SPRINT & MODERN EDGE --- */
            // --- Inside your STEPS array ---

            {
                id: 'templateId',
                label: 'Choose Your Foundation',
                type: 'select',
                condition: (data: any) => data.packageType !== 'commerce',
                // 🔥 DYNAMIC: Filter for everything EXCEPT ecommerce
                options: templates
                    .filter(t => t.badgeType !== 'conversion')
                    .map(t => ({
                        value: t.id,
                        label: `${t.title} ${t.id === 'saas-obsidian' ? '(+$20 Fee)' : ''}`
                    }))
            },
            {
                id: 'templateId',
                label: 'E-Commerce Foundation',
                type: 'select',
                condition: (data: any) => data.packageType === 'commerce',
                // 🔥 DYNAMIC: Filter for ONLY ecommerce
                options: templates
                    .filter(t => t.badgeType === 'conversion')
                    .map(t => ({ value: t.id, label: `${t.title} (Elite Foundation)` }))
            },
            {
                id: 'layoutToggle',
                label: 'Enable Multi-View Toggle?',
                type: 'select',
                condition: (data: any) => data.templateId === 'saas_template',
                options: [
                    { value: 'single', label: 'Standard (1 Layout)' },
                    { value: 'double', label: 'Dual-View Config (+$100)' },
                    { value: 'triple', label: 'Elite-Tier Config (+$150)' }
                ]
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
            {
                id: 'motionIntensity',
                label: 'Animation & Motion Vibe',
                type: 'select',
                condition: (data: any) => data.packageType === 'modern_edge',
                options: [
                    { value: 'subtle', label: 'Subtle & Smooth (Professional)' },
                    { value: 'high_impact', label: 'Aggressive & Bold (High-End Agency)' }
                ]
            },
            { id: 'targetAudience', label: 'Who is your ideal customer?', placeholder: 'e.g., Tattoo enthusiasts in New Berlin.', type: 'text' },
            { id: 'coreServices', label: 'Top 3 Services/Products', placeholder: 'e.g., Custom Tattoos, Piercings...', type: 'textarea' },
            {
                id: 'colorPreference',
                label: 'Brand Colors (if any)',
                placeholder: 'e.g., Black & gold, Navy & white, or "I trust Zach to pick"',
                type: 'text'
            },
            {
                id: 'themePreference',
                label: 'Overall Vibe',
                type: 'select',
                options: [
                    { value: 'dark', label: 'Dark & Bold' },
                    { value: 'light', label: 'Light & Clean' },
                    { value: 'zach_picks', label: 'I trust Zach to decide based on my brand' }
                ]
            },
            {
                id: 'competitorInspo',
                label: 'Inspiration / Competitor Sites',
                placeholder: 'Links to sites you love the "feel" of...',
                type: 'textarea',
                condition: (data: any) => data.packageType === 'modern_edge'
            },
            { id: 'brandNotes', label: 'Additional Brand Notes (Optional)', placeholder: 'Anything else?', type: 'textarea' }
        ]
    },
    {
        id: 'ecommerce',
        label: 'Store Infrastructure',
        condition: (data: any) => data.packageType === 'commerce',
        fields: [
            {
                id: 'shopHeader',
                label: '🛍️ Store Configuration',
                type: 'header',
                label_text: 'Since I am deploying your full shop, I need the "skeleton" of your inventory to begin the build.'
            },
            { id: 'productCategories', label: 'Product Categories', placeholder: 'e.g., Hoodies, Accessories, Prints', type: 'textarea' },
            { id: 'inventoryCount', label: 'Approx. SKU Count', placeholder: 'How many items are we launching with?', type: 'text' },
            { id: 'shippingLogic', label: 'Shipping Strategy', placeholder: 'Flat rate $5, Free over $100, etc.', type: 'text' },
            {
                id: 'stripeStatus',
                label: 'Stripe Connection',
                type: 'select',
                options: [
                    { value: 'new', label: 'I need a new Stripe account configured' },
                    { value: 'existing', label: 'I have an existing account' }
                ]
            },
        ]
    },
    {
        id: 'technical',
        label: 'Digital Infrastructure',
        fields: [
            {
                id: 'setupExplainer',
                label: '🔒 You Own Everything — Full Ownership Handoff',
                type: 'header',
                label_text: 'I handle the build and deployment, then transfer full ownership to you. Here\'s how it works: (1) Domain — I purchase and configure your domain, then "push" it to your Porkbun account. You\'ll be responsible for the annual renewal (~$10–$15/yr). (2) Hosting — I deploy your site on Netlify, then transfer ownership to your Netlify dashboard. You own the production environment and billing from that point forward. No platform fees to me — you pay the providers directly.'
            },
            {
                id: 'accountSetup',
                label: 'Current Setup Status',
                type: 'select',
                options: [
                    { value: 'create_for_me', label: 'White Glove: I need a new domain & hosting setup (Recommended ⭐)' },
                    { value: 'existing', label: 'I already own a domain' },
                    { value: 'transfer', label: 'I want to move from Wix/Squarespace' }
                ]
            },
            {
                id: 'porkbunHeader',
                label: '🌐 Step 1: Domain Ownership (Porkbun)',
                type: 'header',
                label_text: 'Create a free account at Porkbun.com. After launch, I will "push" your domain to your Porkbun account so you have full ownership. You\'ll then be responsible for the annual renewal (typically $10–$15/year).',
                condition: (data: any) => data.accountSetup === 'create_for_me'
            },
            {
                id: 'porkbunUsername',
                label: 'Your Porkbun Username',
                placeholder: 'e.g., johndoe123',
                type: 'text',
                condition: (data: any) => data.accountSetup === 'create_for_me'
            },
            {
                id: 'netlifyHeader',
                label: '🚀 Step 2: Hosting & Deployment (Netlify)',
                type: 'header',
                label_text: 'Create a free account at Netlify.com. After launch, I will transfer ownership of your website to your Netlify dashboard. This ensures you own the production environment and billing moving forward.',
                condition: (data: any) => data.accountSetup === 'create_for_me'
            },
            {
                id: 'netlifyEmail',
                label: 'Email Used for Your Netlify Account',
                placeholder: 'you@gmail.com',
                type: 'email',
                condition: (data: any) => data.accountSetup === 'create_for_me'
            },
            {
                id: 'ownershipReminder',
                label: '🔑 Ownership Guarantee',
                type: 'header',
                label_text: 'After launch, your domain will be pushed to your Porkbun account and your site will be transferred to your Netlify dashboard. You will have full control of both — no platform fees to me, no retained access. I do not maintain any access after handoff unless you opt into a Growth Plan.',
                condition: (data: any) => data.accountSetup === 'create_for_me'
            },
            /* --- FIELDS FOR: Existing Domain / Transfer --- */
            {
                id: 'hostingProvider',
                label: 'Registrar/Hosting URL',
                placeholder: 'e.g., GoDaddy.com, Namecheap, etc.',
                type: 'text',
                condition: (data: any) => data.accountSetup === 'existing' || data.accountSetup === 'transfer'
            },
            {
                id: 'hostingUser',
                label: 'Login Username / Email',
                placeholder: 'Username for your registrar...',
                type: 'text',
                condition: (data: any) => data.accountSetup === 'existing' || data.accountSetup === 'transfer'
            },
            {
                id: 'hostingPass',
                label: 'Login Password',
                placeholder: '••••••••',
                type: 'password', // Ensure this is password type
                condition: (data: any) => data.accountSetup === 'existing' || data.accountSetup === 'transfer'
            },
            /* --- FIELDS FOR: White Glove (Add 'condition' to your existing domain fields) --- */
            {
                id: 'primaryDomainStrategy',
                label: 'Primary Domain Strategy',
                type: 'select',
                condition: (data: any) => data.accountSetup === 'create_for_me', // Add this
                options: [
                    { value: 'zach_chooses', label: 'I trust Zach to pick' },
                    { value: 'user_chooses', label: 'I want to provide the name' }
                ]
            },
            {
                id: 'domainChoice',
                label: 'Primary Domain Choice',
                placeholder: 'e.g., brand.com',
                type: 'text',
                condition: (data: any) => data.primaryDomainStrategy === 'user_chooses'
            },
            /* --- SECONDARY DOMAIN --- */
            {
                id: 'secondaryDomainStrategy',
                label: 'Secondary Domain (Option 2)',
                type: 'select',
                options: [
                    { value: 'zach_chooses', label: 'Zach chooses a matching backup' },
                    { value: 'user_chooses', label: 'I want to provide the backup name' }
                ]
            },
            {
                id: 'secondaryDomainName',
                label: 'Secondary Domain Choice',
                placeholder: 'e.g., thebrand.com',
                type: 'text',
                condition: (data: any) => data.secondaryDomainStrategy === 'user_chooses'
            },
            /* --- THIRD DOMAIN --- */
            {
                id: 'thirdDomainStrategy',
                label: 'Third Domain (Option 3)',
                type: 'select',
                options: [
                    { value: 'zach_chooses', label: 'Zach chooses a matching backup' },
                    { value: 'user_chooses', label: 'I want to provide the backup name' }
                ]
            },
            {
                id: 'thirdDomainName',
                label: 'Third Domain Choice',
                placeholder: 'e.g., brand-official.com',
                type: 'text',
                condition: (data: any) => data.thirdDomainStrategy === 'user_chooses'
            },
            {
                id: 'domainDiscretionNotice',
                label: '⚖️ Domain Availability Fallback',
                type: 'header',
                label_text: 'In the event that all three choices above are unavailable, you agree to let Zach use his professional discretion to select the best alternative to keep your sprint on track.'
            },
            {
                id: 'accountEmailStrategy',
                label: 'Email for New Accounts (Domain, Hosting, etc.)',
                type: 'select',
                options: [
                    { value: 'existing', label: 'Use my existing email' },
                    { value: 'create_new', label: 'Create a new professional email for me (e.g., admin@mybrand.com)' }
                ]
            },
            {
                id: 'emailAddress',
                label: 'Your Existing Email',
                placeholder: 'you@gmail.com',
                type: 'email',
                condition: (data: any) => data.accountEmailStrategy === 'existing'
            },
            {
                id: 'newEmailPreference',
                label: 'Preferred New Email Address',
                placeholder: 'e.g., admin@yourbrand.com or info@yourbrand.com',
                type: 'text',
                condition: (data: any) => data.accountEmailStrategy === 'create_new'
            },
            {
                id: 'newEmailNotice',
                label: '📧 Professional Email Setup',
                type: 'header',
                label_text: 'I\'ll set up a professional email address tied to your new domain (e.g., admin@yourbrand.com) and register all accounts under it. You\'ll receive the email login credentials in your secure master-list after launch. A personal email is still needed below for 2FA verification and as a recovery address.',
                condition: (data: any) => data.accountEmailStrategy === 'create_new'
            },
            {
                id: 'personalEmail',
                label: 'Personal/Recovery Email (for 2FA & backup)',
                placeholder: 'you@gmail.com',
                type: 'email',
                condition: (data: any) => data.accountEmailStrategy === 'create_new'
            },
            { id: 'phoneForAuth', label: 'Recovery Phone (2FA)', type: 'tel' }
        ]
    },
    {
        id: 'conversion',
        label: 'Business Info',
        fields: [
            {
                id: 'seoExplainer',
                label: '🚀 Local SEO Power-Up',
                type: 'header',
                label_text: 'Providing consistent Name, Address, and Phone (NAP) data helps you appear in the "Google Map Pack" much faster. I will bake this into your metadata from day one.'
            },
            {
                id: 'napHeader',
                label: '🏢 Official Business Identity',
                type: 'header',
                label_text: 'Ensure this matches your Google Business Profile or social media exactly.'
            },
            { id: 'publicEmail', label: 'Public Business Email', placeholder: 'hello@brand.com', type: 'email' },
            { id: 'publicPhone', label: 'Business Phone Number', type: 'tel' },
            { id: 'publicAddress', label: 'Physical Address / Service Area', placeholder: '123 Main St, New Berlin, WI or Service Area', type: 'text' },
            { id: 'businessHours', label: 'Hours of Operation', placeholder: 'e.g., Mon-Fri: 9-5', type: 'text' },
            {
                id: 'socialHeader',
                label: '🔗 Social Media & Online Presence',
                type: 'header',
                label_text: 'I\'ll link these in your site footer/header and use them for Schema markup to boost your local SEO.'
            },
            { id: 'socialFacebook', label: 'Facebook Page URL (Optional)', placeholder: 'https://facebook.com/yourbusiness', type: 'text' },
            { id: 'socialInstagram', label: 'Instagram Handle (Optional)', placeholder: '@yourbusiness', type: 'text' },
            { id: 'socialLinkedin', label: 'LinkedIn URL (Optional)', placeholder: 'https://linkedin.com/in/you', type: 'text' },
            { id: 'socialOther', label: 'Other Socials (Optional)', placeholder: 'TikTok, YouTube, Yelp, etc.', type: 'text' },
            {
                id: 'ctaHeader',
                label: '🎯 Call-to-Action Strategy',
                type: 'header',
                label_text: 'What should visitors DO when they land on your site? This determines button text, form placement, and overall conversion flow.'
            },
            {
                id: 'primaryCTA',
                label: 'Primary Call-to-Action',
                type: 'select',
                options: [
                    { value: 'call', label: 'Call my business phone' },
                    { value: 'form', label: 'Fill out a contact/quote form' },
                    { value: 'book', label: 'Book an appointment (link to booking tool)' },
                    { value: 'email', label: 'Send me an email' },
                    { value: 'visit', label: 'Visit my physical location' },
                    { value: 'zach_decides', label: 'I trust Zach to pick the best strategy' }
                ]
            },
            {
                id: 'bookingUrl',
                label: 'Booking Tool URL',
                placeholder: 'e.g., calendly.com/you or your scheduling link',
                type: 'text',
                condition: (data: any) => data.primaryCTA === 'book'
            },
            {
                id: 'existingWebsite',
                label: 'Existing Website URL (if any)',
                placeholder: 'https://your-current-site.com or leave blank',
                type: 'text'
            },
            {
                id: 'mapToggle',
                label: 'Google Maps Integration',
                type: 'select',
                options: [
                    { value: 'no', label: 'No map needed' },
                    { value: 'yes', label: 'Yes, embed a styled map (+$25)' }
                ]
            },
            {
                id: 'mapNotice',
                label: '💳 Map Integration Fee',
                type: 'header',
                label_text: 'Dynamic Map integration requires custom API configuration. A $25 addon fee will be added to your secondary invoice.',
                condition: (data: any) => data.mapToggle === 'yes'
            }
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
                label_text: 'Please email high-res assets directly to zachary@zachhowell.dev. SMS compression can make your site look blurry. This is the recommended method to ensure your visuals look crisp and professional on launch day.'
            },
            {
                id: 'assetMethod',
                label: 'How will you send assets?',
                type: 'select',
                options: [
                    { value: 'email', label: 'Email (Recommended ⭐)' },
                    { value: 'link', label: 'Google Drive / Dropbox' },
                    { value: 'socials', label: 'Social Media Handle' },
                    { value: 'text', label: 'Text/iMessage (Low Quality)' }
                ]
            },
            { id: 'assetInput', label: 'Link or Handle', type: 'text', condition: (data: any) => data.assetMethod !== 'email' && data.assetMethod !== 'text' },
            {
                id: 'contentHeader',
                label: '📝 Website Copy & Content',
                type: 'header',
                label_text: 'If you have specific text you want on your site (hero headline, about section, service descriptions), provide it here or via email. If not, I\'ll craft professional placeholder copy based on your brand info above.'
            },
            {
                id: 'copyStrategy',
                label: 'Website Copy Strategy',
                type: 'select',
                options: [
                    { value: 'provide', label: 'I will provide my own copy via email' },
                    { value: 'zach_writes', label: 'Zach writes professional placeholder copy' },
                    { value: 'partial', label: 'I\'ll send what I have — Zach fills in the gaps' }
                ]
            },
            { id: 'heroHeadline', label: 'Preferred Hero Headline (Optional)', placeholder: 'e.g., "Precision Plumbing for Southeast Wisconsin" or leave blank', type: 'text' },
            { id: 'aboutContent', label: 'About Section Notes (Optional)', placeholder: 'Key facts about your business, founding story, mission, years in business, etc.', type: 'textarea' },
            {
                id: 'reviewHeader',
                label: '📞 Review Phase Communication',
                type: 'header',
                label_text: 'During Hours 24-36, I\'ll send you a live preview link for feedback. How do you want to communicate revisions?'
            },
            {
                id: 'reviewMethod',
                label: 'Preferred Review Method',
                type: 'select',
                options: [
                    { value: 'email', label: 'Email (zachary@zachhowell.dev)' },
                    { value: 'text', label: 'Text / iMessage' },
                    { value: 'call', label: 'Quick phone call' },
                    { value: 'any', label: 'Whatever is fastest' }
                ]
            }
        ]
    },
    {
        id: 'partnership',
        label: 'Ongoing Partnership',
        fields: [
            {
                id: 'partnershipHeader',
                label: '🤝 Optional: Keep Me on Retainer',
                type: 'header',
                label_text: 'Your site launches in 48 hours — but growth doesn\'t stop there. These plans keep me in your corner for uptime, SEO, feature work, and strategy. 100% optional — skip this if you just want the one-time build.'
            },
            {
                id: 'partnershipPlan',
                label: 'Select a Partnership Plan (Optional)',
                type: 'select',
                options: [
                    { value: 'none', label: 'No thanks — just the one-time build' },
                    { value: 'pilot', label: 'The Pilot — $150/mo (Uptime, Hosting, Security, 1 Expert Hr)' },
                    { value: 'navigator', label: 'The Navigator — $450/mo (4 Expert Hrs, SEO Audit, 24h Support)' },
                    { value: 'copilot', label: 'The Co-Pilot — $950/mo (10 Expert Hrs, Strategy Calls, Slack Access)' }
                ]
            },
            {
                id: 'partnershipNote',
                label: '💳 How Partnership Billing Works',
                type: 'header',
                label_text: 'Partnership plans are billed monthly via a separate Stripe subscription. I\'ll send you a secure subscription link after your site launches — no charge until you\'re live and happy.',
                condition: (data: any) => data.partnershipPlan && data.partnershipPlan !== 'none'
            }
        ]
    },
    {
        id: 'launch',
        label: 'Launch Sequence',
        fields: [
            { id: 'tosBox', label: '📜 Sprint Terms of Service', type: 'tos_box' },
            { id: 'agreement', label: 'Sprint Agreement', type: 'checkbox', label_text: 'I agree to the terms and understand the asset delivery requirements.' },
            { id: 'onboardingFeedback', label: 'Process Feedback', placeholder: 'Help me make this better!', type: 'textarea' },
            { id: 'notes', label: 'Final Notes', type: 'textarea' }
        ]
    }
];

export default function OnboardingForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({ packageType: 'sprint', emailAddress: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const accentColor = "#616B59";

    // ── SYNC & PERSISTENCE ──────────────────────────────────
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlPackage = params.get('package');
        const urlEmail = params.get('email');

        // 1. Load Draft from LocalStorage
        const savedProgress = localStorage.getItem('onboarding_draft');
        let initialData: Record<string, any> = { packageType: 'sprint' };

        if (savedProgress) {
            const { data, step } = JSON.parse(savedProgress);
            initialData = data;
            setCurrentStep(step);
        }

        // 2. Stripe Redirect overwrites everything (High Priority)
        if (urlPackage) initialData = { ...initialData, packageType: urlPackage };
        if (urlEmail) initialData = { ...initialData, emailAddress: urlEmail };

        setFormData(initialData);
    }, [location]);

    useEffect(() => {
        if (Object.keys(formData).length > 1) {
            localStorage.setItem('onboarding_draft', JSON.stringify({ data: formData, step: currentStep }));
        }
    }, [formData, currentStep]);

    // Dynamic Steps filtering based on Package Choice
    const activeSteps = STEPS.filter(step => !step.condition || step.condition(formData));

    useEffect(() => {
        gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
    }, [currentStep, isComplete]);

    const handleInputChange = (id: string, value: any) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const getActiveAddons = (): Addon[] => {
        const list: Addon[] = [];
        if (formData.templateId === 'saas_template') list.push({ name: 'Modern Business Elite Deployment', price: 20 });
        if (formData.layoutToggle === 'double') list.push({ name: 'Dual-View Configuration', price: 100 });
        if (formData.layoutToggle === 'triple') list.push({ name: 'Elite-Tier Triple Layout Configuration', price: 150 });
        if (formData.mapToggle === 'yes') list.push({ name: 'Google Maps API Integration', price: 25 });
        return list;
    };

    const activeAddons = getActiveAddons();

    const validateStep = () => {
        const currentFields = activeSteps[currentStep].fields;
        for (const field of currentFields) {
            // Skip validation if the field isn't being shown
            if (field.condition && !field.condition(formData)) continue;

            const val = formData[field.id];

            // Email Validation
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!val || !emailRegex.test(val)) {
                    alert(`Please provide a valid ${field.label}.`);
                    return false;
                }
            }

            // Phone/Tel Validation
            if (field.type === 'tel') {
                if (!val || val.length < 10) {
                    alert(`Please provide a valid 10-digit ${field.label}.`);
                    return false;
                }
            }

            // Password Validation for Hosting Credentials
            if (field.id === 'hostingPass' && !val) {
                alert("I'll need those credentials to connect your existing domain!");
                return false;
            }
        }
        return true;
    };

    const handleNext = () => {
        if (!validateStep()) return;
        if (currentStep < activeSteps.length - 1) setCurrentStep(s => s + 1);
    };

    const handleSubmit = async () => {
        if (!formData.agreement) return alert("Please agree to the terms.");
        setIsSubmitting(true);
        try {
            const totalDelta = activeAddons.reduce((sum, item) => sum + item.price, 0);
            await addDoc(collection(db, "Projects"), {
                ...formData,
                detected_addons: activeAddons,
                total_addon_delta: totalDelta,
                partnershipPlan: formData.partnershipPlan || 'none',
                status: 'onboarding_complete',
                projectTier: formData.packageType,
                type: `build_${formData.packageType}`,
                submittedAt: serverTimestamp()
            });
            localStorage.removeItem('onboarding_draft');
            setIsComplete(true);
        } catch (error: any) {
            alert(`Submission Failed: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── SUCCESS RENDER ──────────────────────────────────────
    if (isComplete) {
        return (
            <div className="max-w-2xl mx-auto py-20 px-6 text-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl">
                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">⚡</div>
                    <h2 className="text-5xl font-black uppercase tracking-tighter mb-2 bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-600 dark:text-zinc-300 bg-clip-text text-transparent">Clock Started.</h2>
                    <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-8 max-w-md mx-auto">Thank you for your business. I'm officially moving your build into development.</p>

                    {activeAddons.length > 0 && (
                        <div className="bg-amber-500/10 text-amber-600 p-6 rounded-2xl mb-8 border border-amber-500/20 text-left shadow-sm">
                            <p className="text-[10px] uppercase tracking-widest font-black mb-3 text-amber-500">Premium Add-ons Detected</p>
                            <ul className="text-xs space-y-2 opacity-90">
                                {activeAddons.map((addon, i) => (
                                    <li key={i} className="flex justify-between font-bold"><span>• {addon.name}</span><span>+${addon.price}</span></li>
                                ))}
                            </ul>
                            <p className="mt-4 pt-4 border-t border-amber-500/20 text-[10px] italic text-center">I will email a manual Stripe invoice for these shortly.</p>
                        </div>
                    )}

                    {formData.partnershipPlan && formData.partnershipPlan !== 'none' && (
                        <div className="bg-purple-500/10 text-purple-500 p-6 rounded-2xl mb-8 border border-purple-500/20 text-left shadow-sm">
                            <p className="text-[10px] uppercase tracking-widest font-black mb-3 text-purple-400">Partnership Plan Selected</p>
                            <p className="text-sm font-bold text-purple-300">
                                {formData.partnershipPlan === 'pilot' && 'The Pilot — $150/mo'}
                                {formData.partnershipPlan === 'navigator' && 'The Navigator — $450/mo'}
                                {formData.partnershipPlan === 'copilot' && 'The Co-Pilot — $950/mo'}
                            </p>
                            <p className="mt-3 pt-3 border-t border-purple-500/20 text-[10px] italic">I'll send your subscription link once your site is live — no charge until launch day.</p>
                        </div>
                    )}

                    <Link to="/" className="inline-block px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">Return Home</Link>
                </motion.div>
            </div>
        );
    }

    // ── MAIN FORM RENDER ─────────────────────────────────────
    return (
        <div ref={formRef} className="max-w-5xl mx-auto p-6 md:p-10 bg-white dark:bg-zinc-950/50 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl mt-10 mb-10">

            {/* Honeypot */}
            <div className="opacity-0 absolute -top-96 left-0 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <input type="text" name="faxNumber" autoComplete="off" tabIndex={-1} value={formData.faxNumber || ''} onChange={(e) => handleInputChange('faxNumber', e.target.value)} />
            </div>

            {/* Progress Bar */}
            <div className="flex justify-between mb-12 px-4 max-w-3xl mx-auto">
                {activeSteps.map((step, i) => (
                    <div key={step.id} className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all" style={{ backgroundColor: i <= currentStep ? accentColor : 'transparent', color: i <= currentStep ? 'white' : '#71717a', border: i <= currentStep ? 'none' : '1px solid #3f3f46' }}>{i + 1}</div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">{activeSteps[currentStep].label}</h2>

                    {activeSteps[currentStep].fields.map((field: Field) => {
                        if (field.condition && !field.condition(formData)) return null;

                        if (field.type === 'tos_box') return (
                            <div key={field.id} className="mb-6">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 font-bold mb-2 block">{field.label}</label>
                                <div className="h-32 overflow-y-auto p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-[10px] text-zinc-400 leading-relaxed font-medium">
                                    <pre className="whitespace-pre-wrap font-sans">{TOS_TEXT}</pre>
                                </div>
                            </div>
                        );

                        if (field.type === 'header') return (
                            <div key={field.id} className="pt-4 mb-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-2">{field.label}</h3>
                                {field.label_text && <p className="text-[12px] text-white-400 leading-relaxed font-semibold italic border-l-2 border-amber-500/30 pl-3">{field.label_text}</p>}
                            </div>
                        );

                        return (
                            <div key={field.id} className="flex flex-col gap-2 mb-4">
                                {field.type !== 'checkbox' && <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 font-bold ml-1">{field.label}</label>}
                                {field.type === 'textarea' ? (
                                    <textarea value={formData[field.id] || ''} onChange={(e) => handleInputChange(field.id, e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-zinc-900 dark:text-white h-32 outline-none focus:border-zinc-400 transition-colors" placeholder={field.placeholder} />
                                ) : field.type === 'select' ? (
                                    <select
                                        disabled={field.disabled}
                                        value={formData[field.id] || ''}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        className={`w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-zinc-900 dark:text-white outline-none focus:border-zinc-400 transition-colors ${field.disabled ? 'opacity-60 cursor-not-allowed border-dashed' : ''}`}
                                    >
                                        <option value="">Select an option...</option>
                                        {field.options?.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                    </select>
                                ) : field.type === 'checkbox' ? (
                                    <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors" onClick={() => handleInputChange(field.id, !formData[field.id])}>
                                        <input type="checkbox" checked={!!formData[field.id]} readOnly className="w-4 h-4 accent-white" />
                                        <span className="text-xs text-zinc-400 font-medium">{field.label_text}</span>
                                    </div>
                                ) : (
                                    <input
                                        type={field.type} // This will now correctly use 'password', 'tel', or 'email'
                                        value={formData[field.id] || ''}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-zinc-900 dark:text-white outline-none focus:border-zinc-400 transition-colors"
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </div>
                        );
                    })}

                    <div className="flex gap-4 mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800/50">
                        {currentStep > 0 && <button onClick={() => setCurrentStep(s => s - 1)} className="px-8 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold text-xs uppercase hover:bg-zinc-100 dark:hover:bg-zinc-800">Back</button>}
                        <button disabled={isSubmitting} onClick={currentStep === activeSteps.length - 1 ? handleSubmit : handleNext} className="flex-1 px-8 py-4 text-white rounded-xl font-black text-xs uppercase shadow-lg active:scale-95 disabled:opacity-50 transition-all" style={{ backgroundColor: accentColor }}>
                            {isSubmitting ? 'Securing Data...' : currentStep === activeSteps.length - 1 ? 'Start Project' : 'Continue'}
                        </button>
                    </div>
                    {/* PERSISTENT SUPPORT FOOTER */}
                    <div className="mt-12 p-8 bg-zinc-900/40 border border-zinc-800/60 rounded-3xl group transition-all hover:border-zinc-700/60">
                        <div className="flex items-center gap-4 mb-4">
                            {/* Subtle Icon Circle */}
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-300 font-black">Direct Support</p>
                                <h4 className="text-zinc-200 font-bold">Onboarding Questions?</h4>
                            </div>
                        </div>

                        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                            If you run into any issues or have questions about credentials while filling this out, feel free to reach out to my direct line.
                        </p>

                        {/* Clickable Phone Action */}
                        <a
                            href="tel:2623417181"
                            className="inline-flex items-center gap-3 px-5 py-3 bg-zinc-800/50 rounded-xl text-white font-black text-sm tracking-tight hover:bg-zinc-700 transition-all border border-zinc-700/50"
                        >
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }}></span>
                            262-341-7181
                        </a>
                    </div>
                </div>

                {/* Sidebar Preview */}
                <div className="lg:sticky lg:top-10">
                    <AnimatePresence mode="wait">
                        {formData.templateId ? (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-900 aspect-video">
                                    <img
                                        src={templates.find(t => t.id === formData.templateId)?.image || `/${formData.templateId}.webp`}
                                        className="w-full h-full object-cover"
                                        alt="Preview"
                                        onError={(e) => {
                                            // Fallback if the image still fails
                                            e.currentTarget.src = "/placeholder.webp";
                                        }}
                                    />
                                </div>
                                <div className="p-4 bg-zinc-900/40 rounded-xl border border-white/5 space-y-3 font-bold">
                                    <p className="text-[10px] text-zinc-600 dark:text-zinc-300 uppercase tracking-widest font-black mb-2">Build Summary</p>
                                    <div className="flex justify-between items-center"><span className="text-[10px] text-zinc-400 uppercase">Package</span><span className="text-xs text-amber-500 font-black uppercase">{formData.packageType}</span></div>
                                    <div className="flex justify-between items-center border-t border-white/5 pt-2"><span className="text-[10px] text-zinc-400 uppercase">Business</span><span className="text-xs text-zinc-200">{formData.businessName || 'TBD'}</span></div>
                                    {formData.packageType === 'commerce' && <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-[10px] text-purple-400 font-bold italic">Commerce Strategy active.</div>}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-64 border-2 border-dashed border-zinc-800 rounded-3xl flex items-center justify-center text-zinc-400 text-[10px] uppercase p-10 text-center">Select a design to start</div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
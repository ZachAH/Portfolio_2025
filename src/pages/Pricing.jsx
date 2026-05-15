import React from 'react';
import PricingGuides from '../components/PricingGuides';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { breadcrumb } from '../utils/structuredData';

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Custom React & AI Web Development Investment',
      url: 'https://zachhowell.dev/pricing',
      description:
        'Senior-level full-stack React, Tailwind CSS, and AI-integrated web applications for businesses that outgrew WordPress.',
    },
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ]),
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Why don't custom builds have a fixed price listed?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Because scope determines cost. A 3-page marketing site with static content is a fundamentally different engineering problem than a full-stack SaaS app with authentication, payment processing, real-time data, and AI agents. I quote after a discovery call where I understand your actual requirements — not before.'
          }
        },
        {
          '@type': 'Question',
          name: 'What makes one custom build cost more than another?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The biggest drivers are page count, third-party API integrations (Stripe, OpenAI, Airtable, HubSpot), custom animation systems (Framer Motion, GSAP timelines), real-time data syncing (Firebase, WebSockets), admin dashboard complexity, user authentication and role management, and whether content needs a headless CMS. Each one adds measurable engineering time.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do animations and motion design affect the cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simple fade-ins and scroll reveals are lightweight. Complex choreographed sequences — multi-stage GSAP timelines, parallax systems, SVG morphing, scroll-triggered narrative animations — require significantly more engineering and QA. I use motion intentionally: where it supports your brand story and conversion goals, not as decorative bloat.'
          }
        },
        {
          '@type': 'Question',
          name: 'What does AI integration add to a custom build?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AI features — GPT-powered content generation, intelligent search with embeddings, automated workflows, or custom agent logic — add backend infrastructure. The cost depends on prompt chain complexity, whether you need RAG (retrieval-augmented generation) with vector databases, API usage volume, and how tightly the AI logic integrates with your existing business data.'
          }
        },
        {
          '@type': 'Question',
          name: "What's the real difference between a custom build and a template?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Templates restrict your layout, limit performance optimization, and lock you into someone else technology choices. A custom build gives you full control over every pixel, every interaction, and every integration. You own the code, it scales with your business, and any developer can work on it — no proprietary platform lock-in.'
          }
        }
      ]
    }
  ],
};

const Pricing = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-12" // Padding to account for the fixed Navbar
    >
      <Seo
        title="Custom React & AI Web Development Investment | ZH Web Solutions"
        description="Senior-level full-stack React, Tailwind CSS, and AI-integrated web applications for businesses that outgrew WordPress. No templates. No page builders. Enterprise execution."
        path="/pricing"
        keywords="custom React web application cost, enterprise web app investment, React vs WordPress TCO, senior React engineer, AI-integrated web development, custom UI UX design system cost, GSAP animation development, full-stack React consulting, headless CMS ROI, custom web app pricing 2026"
        jsonLd={pricingJsonLd}
      />
      <PricingGuides
      />
    </motion.div>
  );
};

export default Pricing;

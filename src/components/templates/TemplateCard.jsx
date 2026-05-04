import React from 'react';
import { motion } from 'framer-motion';

function hexToRgba(hex, alpha = 1) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 💡 SALES ENGINE: Defined for your two core paths
const BADGE_CONFIGS = {
  sprint: {
    label: '72-Hour Deploy',
    classes: 'border-green-500/30 text-green-700 dark:text-green-400',
    dot: 'bg-green-500',
    cta: '🚀 Deploy My Site in 72h',
  },
  conversion: {
    label: 'Conversion Optimized',
    classes: 'border-rose-500/30 text-rose-700 dark:text-rose-400',
    dot: 'bg-rose-500',
    cta: '📈 Boost Your Sales',
  },
};

export default function TemplateCard({
  template,
  handleMouseEnter,
  handleMouseLeave,
}) {
  const {
    title,
    description,
    image,
    alt,
    accent,
    techs = [],
    templateURL,
    badgeType = 'sprint', // Defaulting to sprint if not specified
    secondaryBadge,
    ctaOverride,
  } = template;

  // Fallback to sprint if the badgeType isn't found in the two options
  const config = BADGE_CONFIGS[badgeType] || BADGE_CONFIGS.sprint;

  const styleVars = {
    '--tpl-accent': accent,
    '--tpl-accent-50': hexToRgba(accent, 0.5),
    '--tpl-accent-30': hexToRgba(accent, 0.3),
  };

  return (
    <div
      className="interactive-element bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-[color:var(--tpl-accent-50)] transition-all duration-500 group shadow-xl dark:shadow-2xl"
      style={styleVars}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        
        {/* Dynamic Value Badge - Positioned Bottom Right */}
        <div className="absolute top-6 right-6 z-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`flex items-center gap-2 px-3 py-1.5 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md border rounded-full shadow-lg ${config.classes}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${config.dot}`} />
              <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                {config.label}
              </span>
            </div>
          </motion.div>
        </div>

        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 dark:opacity-80 group-hover:opacity-100"
        />

        {/* Floating Pricing/Secondary Badges - Kept Top Right */}
        <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
          {secondaryBadge && (
            <div
              className="text-white px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg"
              style={{ backgroundColor: 'var(--tpl-accent)' }}
            >
              {secondaryBadge}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-10">
        <h3 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight group-hover:text-[color:var(--tpl-accent)] transition-colors duration-300">
          {title}
        </h3>

        <p className="text-zinc-600 dark:text-zinc-300 mb-8 text-base leading-relaxed font-medium">
          {description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {techs.map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 group-hover:border-[color:var(--tpl-accent-30)] transition-colors duration-500"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-auto">
          <a
            href="/pricing"
            className="w-full bg-sunset-gradient text-white font-black py-4 px-6 rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 text-center uppercase tracking-widest text-xs shadow-lg shadow-accent-red/20"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {ctaOverride ? ctaOverride : config.cta}
          </a>

          <div className="flex gap-4">
            <a
              href={templateURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-accent-orange/40 dark:border-accent-orange/30 text-accent-orange font-black py-3 rounded-xl hover:bg-accent-orange/10 dark:hover:bg-accent-orange/10 hover:border-accent-orange transition-all text-center uppercase tracking-widest text-[10px]"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Live Preview
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

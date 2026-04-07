import React from 'react';
import { motion } from 'framer-motion';

export default function ECommerceTemplate({ sprintReady, handleMouseEnter, handleMouseLeave }) {
  const templateURL = "https://ecommercetemplatezh.netlify.app/";
  // Updated to point to your Maison E-Commerce Gumroad link
  const gumroadURL = "https://ettaflare.gumroad.com/l/ecommercetemplate?_gl=1*1vp7i7f*_ga*MjQ5MjAwNzAuMTc3NTIzNTczNA..*_ga_6LJN6D94N6*czE3NzUyNDY2NTgkbzQkZzEkdDE3NzUyNDk0NjAkajQwJGwwJGgw";

  return (
    <div
      className="interactive-element bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-[#D19A8E]/50 transition-all duration-500 group shadow-xl dark:shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">

        {!sprintReady && (
          <div className="absolute bottom-6 right-6 z-20"> {/* Swapped top-6 for bottom-6 */}
            <div className="flex items-center gap-2 px-4 py-2 bg-obsidian-950/80 backdrop-blur-md border border-accent-orange/30 rounded-full shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-orange">
                Elite Build (7-Day Scale)
              </span>
            </div>
          </div>
        )}

        <img
          src="/ecommerce_template.png"
          alt="Refined Essentials E-Commerce Template Mockup"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 dark:opacity-80 group-hover:opacity-100"
        />
        {/* Floating Price Tag - Terracotta Accent */}
        <div className="absolute top-6 right-6 bg-[#D19A8E] text-white px-4 py-1.5 text-xs font-black rounded-full uppercase tracking-widest shadow-lg">
          $100 - Source Code
        </div>
      </div>

      {/* Content Section */}
      <div className="p-10">
        <h3 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight group-hover:text-[#D19A8E] transition-colors duration-300">
          Refined Essentials
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-base leading-relaxed font-medium">
          Minimalist commerce for the modern era. Designed for lifestyle brands that value objects of enduring quality, this template features a massive whitespace aesthetic, immersive product grids, and a seamless slide-out cart experience. Every interaction is fueled by smooth Framer Motion transitions.
        </p>

        {/* Tech Tags - Adaptive Zinc/Terracotta */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['React', 'Vite', 'TypeScript', 'Tailwind'].map((tech) => (
            <span key={tech} className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 group-hover:border-[#D19A8E]/30 transition-colors duration-500">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5">
          <a
            href={templateURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border-2 border-[#D19A8E] text-[#D19A8E] font-black py-3 px-6 rounded-xl hover:bg-[#D19A8E] hover:text-white transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Preview
          </a>

          {/* UPDATED: Gumroad Overlay Button */}
          <a
            href={gumroadURL}
            data-gumroad-overlay-checkout="true"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border-2 border-[#D19A8E] text-[#D19A8E] font-black py-3 px-6 rounded-xl hover:bg-[#D19A8E] hover:text-white transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Get Code
          </a>
        </div>
      </div>
    </div>
  );
}
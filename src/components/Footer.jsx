import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebookF, FaReact, FaNodeJs, FaEnvelope, FaLock, FaShieldAlt } from 'react-icons/fa';
import { SiTailwindcss, SiFramer, SiVite, SiStripe } from 'react-icons/si';

const Footer = ({ handleMouseEnter, handleMouseLeave }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/ZachAH", label: "GitHub" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/zach-howell-189118210/", label: "LinkedIn" },
    { icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=61573480569044", label: "Facebook" },
    { icon: <FaEnvelope />, href: "mailto:zachary@zachhowell.dev", label: "Email" }
  ];

  const trustBadges = [
    { icon: <SiStripe className="w-4 h-4" />, label: 'Stripe Checkout' },
    { icon: <FaLock className="w-3.5 h-3.5" />, label: 'SSL Encrypted' },
    { icon: <FaShieldAlt className="w-3.5 h-3.5" />, label: '256-Bit Security' },
    { icon: <FaLock className="w-3.5 h-3.5" />, label: 'Full Ownership' },
  ];

  const techStack = [
    { icon: <FaReact />, label: "React" },
    { icon: <SiTailwindcss />, label: "Tailwind" },
    { icon: <SiFramer />, label: "Framer" },
    { icon: <FaNodeJs />, label: "Node.js" },
    { icon: <SiVite />, label: "Vite" }
  ];

  return (
    <footer className="py-20 px-6 md:px-12 lg:px-24 bg-white dark:bg-obsidian-950 border-t border-obsidian-700/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-2xl font-bold tracking-tighter mb-4 flex items-center group">
            <span className="w-8 h-8 rounded-lg bg-sunset-gradient flex items-center justify-center mr-2 text-white text-xs">ZH</span>
            <span className="text-text-primary">Zach Howell</span>
          </div>
          <p className="text-text-secondary text-sm max-w-xs font-medium leading-relaxed">
            Designing and developing world-class digital experiences for the modern web.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-6">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target={social.label !== 'Email' ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-xl text-text-primary hover:text-accent-orange hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4 py-2 px-6 glass rounded-full border border-obsidian-700/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Powered By</span>
            <div className="flex items-center gap-3 text-text-secondary/60">
              {techStack.map((tech, i) => (
                <div key={i} className="text-lg hover:text-accent-orange transition-colors cursor-help" title={tech.label}>
                  {tech.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center md:text-right">
          <p className="text-text-secondary text-sm font-medium mb-2">Developed with ❤️ and Precision</p>
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary/40">
            &copy; {currentYear} All Rights Reserved
          </p>
        </div>
      </div>

      {/* ── TRUST & SECURITY BADGES ─────────────────────────── */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-obsidian-700/10 dark:border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-zinc-100/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 backdrop-blur-sm"
            >
              <span className="text-green-600 dark:text-green-400">
                {badge.icon}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-600 dark:text-zinc-400">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-[9px] uppercase tracking-[0.2em] text-text-secondary/30 font-bold mt-6">
          All transactions are securely processed through Stripe. Your data is never stored on our servers. You own every account, credential, and line of code.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
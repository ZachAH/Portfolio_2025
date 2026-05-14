import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga4';

const BAR_CONFIG = [
  { label: 'Site Health', final: 98, accent: 'bg-emerald-400' },
  { label: 'Search Visibility', final: 92, accent: 'bg-blue-400' },
  { label: 'Lead Capture', final: 96, accent: 'bg-violet-400' },
];

const TOTAL_LEADS = 124;

const CoinSVG = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
    <circle cx="13" cy="13" r="11.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
    <circle cx="13" cy="13" r="9" fill="#FBBF24" stroke="#F59E0B" strokeWidth="0.5" />
    <text x="13" y="17" textAnchor="middle" fill="#92400E" fontSize={size * 0.5} fontWeight="900" fontFamily="system-ui">$</text>
  </svg>
);

const DollarSVG = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <rect x="1" y="1" width="20" height="20" rx="4" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
    <text x="11" y="16" textAnchor="middle" fill="white" fontSize={size * 0.55} fontWeight="900" fontFamily="system-ui">$</text>
  </svg>
);

function ProgressBar({ label, final, accent, delay, onComplete }) {
  const [width, setWidth] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setWidth(prev => {
          const step = Math.max(1, Math.ceil((final - prev) / 20));
          const next = Math.min(prev + step, final);
          if (next >= final) {
            clearInterval(interval);
            return final;
          }
          return next;
        });
      }, 65);
    }, delay);
    return () => clearTimeout(start);
  }, [delay, final]);

  useEffect(() => {
    if (width >= final && !done.current) {
      done.current = true;
      onComplete?.();
    }
  }, [width, final, onComplete]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-300 font-medium">{label}</span>
        <span className="text-zinc-500 font-mono tabular-nums">{width}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 border border-white/[0.06] overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${accent} transition-all duration-75 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function FullScreenParticle({ id, originX, originY }) {
  const seed = useMemo(() => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 520;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 80 + Math.random() * 120,
      duration: 1.2 + Math.random() * 2.8,
      delay: Math.random() * 1.4,
      rotation: Math.random() * 1080 - 540,
      scaleStart: 0.3 + Math.random() * 1.0,
      isCoin: Math.random() > 0.45,
      size: 16 + Math.random() * 18,
    };
  }, [id]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: originX, top: originY, zIndex: 9999 }}
      initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0.6, 0],
        x: seed.x,
        y: seed.y,
        rotate: seed.rotation,
        scale: [0, seed.scaleStart * 1.3, seed.scaleStart * 0.9, seed.scaleStart * 0.3, 0],
      }}
      transition={{ duration: seed.duration, delay: seed.delay, ease: [0.17, 0.67, 0.29, 0.98] }}
    >
      {seed.isCoin
        ? <CoinSVG size={seed.size} />
        : <DollarSVG size={seed.size * 0.85} />}
    </motion.div>
  );
}

function DashboardInner({ onReplay }) {
  const cardRef = useRef(null);
  const [barsDone, setBarsDone] = useState(0);
  const [phase, setPhase] = useState('loading');
  const [leads, setLeads] = useState(0);
  const [burst, setBurst] = useState(false);
  const [origin, setOrigin] = useState({ x: -9999, y: -9999 });

  const allDone = barsDone >= BAR_CONFIG.length;

  const handleBarDone = useCallback(() => {
    setBarsDone(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (!allDone) return;
    setPhase('payout');
    const leadTimer = setInterval(() => {
      setLeads(prev => {
        if (prev >= TOTAL_LEADS) { clearInterval(leadTimer); return TOTAL_LEADS; }
        const step = Math.max(1, Math.ceil((TOTAL_LEADS - prev) / 20));
        return Math.min(prev + step, TOTAL_LEADS);
      });
    }, 35);
    const burstTimer = setTimeout(() => setBurst(true), 500);
    return () => { clearInterval(leadTimer); clearTimeout(burstTimer); };
  }, [allDone]);

  useEffect(() => {
    if (burst && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setOrigin({
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
      });
    }
  }, [burst]);

  const fullScreenParticles = useMemo(() => Array.from({ length: 72 }, (_, i) => i), []);

  const shakeAmp = useMemo(() => {
    if (phase === 'loading') {
      if (barsDone === 0) return 0.3;
      if (barsDone === 1) return 1.2;
      if (barsDone === 2) return 2.8;
      return 4;
    }
    if (phase === 'payout' && !burst) return 6;
    return 0;
  }, [phase, barsDone, burst]);

  return (
    <>
      <AnimatePresence>
        {burst && origin.x > -9999 && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9999 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {fullScreenParticles.map(id => (
              <FullScreenParticle key={id} id={id} originX={origin.x} originY={origin.y} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {burst && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9998 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.12, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="w-full h-full bg-emerald-400" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={cardRef}
        className="relative rounded-[2.5rem] bg-gradient-to-b from-zinc-900 to-obsidian-950 border border-white/[0.07] p-8 md:p-10 shadow-2xl overflow-visible"
        animate={shakeAmp > 0 ? { x: [0, shakeAmp * 0.5, -shakeAmp * 0.4, shakeAmp * 0.3, -shakeAmp * 0.2, 0] } : {}}
        transition={{ duration: Math.max(0.12, 0.4 - shakeAmp * 0.04), ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
          style={{ zIndex: 0 }}
          animate={
            phase === 'payout'
              ? {
                  boxShadow: [
                    'inset 0 0 30px rgba(16,185,129,0)',
                    'inset 0 0 80px rgba(16,185,129,0.25)',
                    'inset 0 0 30px rgba(16,185,129,0)',
                  ],
                }
              : shakeAmp > 0.5
                ? {
                    boxShadow: [
                      'inset 0 0 20px rgba(251,191,36,0)',
                      `inset 0 0 ${20 + shakeAmp * 8}px rgba(251,191,36,${0.03 + shakeAmp * 0.015})`,
                      'inset 0 0 20px rgba(251,191,36,0)',
                    ],
                  }
                : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        <div className="relative" style={{ zIndex: 1 }}>
          <div className="flex flex-wrap items-start justify-between gap-3 mb-8">
            <div className="min-w-0 shrink">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent-orange mb-2">
                Conversion Dashboard
              </p>
              <h3 className="text-xl font-black text-white tracking-tight">
                Performance Overview
              </h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <motion.button
                onClick={onReplay}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 border border-white/[0.08] flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors shrink-0 cursor-pointer"
                whileHover={{ scale: 1.1, rotate: -30 }}
                whileTap={{ scale: 0.9 }}
                title="Replay animation"
              >
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.button>
              <motion.div
                className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] md:tracking-[0.14em] border shrink-0 whitespace-nowrap ${
                  phase === 'loading'
                    ? 'bg-amber-500/10 border-amber-500/25 text-amber-400'
                    : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                }`}
                animate={phase === 'payout' ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 0.4, ease: 'backOut' }}
              >
                {phase === 'loading' ? 'Optimizing...' : 'Generating Revenue!'}
              </motion.div>
            </div>
          </div>

          <div className="space-y-5 mb-8">
            {BAR_CONFIG.map((bar, i) => (
              <ProgressBar
                key={bar.label}
                label={bar.label}
                final={bar.final}
                accent={bar.accent}
                delay={i * 1300}
                onComplete={handleBarDone}
              />
            ))}
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 mb-1.5">
                  Total Leads Generated
                </p>
                <motion.p
                  className="text-4xl font-black text-white font-mono tabular-nums tracking-tight"
                  animate={phase === 'payout' ? { scale: [1, 1.04, 1] } : {}}
                  transition={{ duration: 0.3, delay: 2 }}
                >
                  {leads}
                </motion.p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function ConversionDashboard() {
  const [key, setKey] = useState(0);

  const handleReplay = useCallback(() => {
    ReactGA.event({
      category: 'Conversion Dashboard',
      action: 'replay_animation',
      label: 'User replayed the conversion dashboard animation',
    });
    setKey(k => k + 1);
  }, []);

  return <DashboardInner key={key} onReplay={handleReplay} />;
}

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import resumePdfUrl from '../assets/ZacharyHowell_Resume.pdf';
import freelancguide from '../assets/freelance_price_guide.pdf';
import userSelfieImage from '../assets/selfie.webp';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const selfieAnimationDelay = 4;
    const bulletRefs = useRef([]);

    useEffect(() => {
        // Bullet stagger animation with glow
        gsap.fromTo(bulletRefs.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".hero-bullets",
                    start: "top 85%",
                },
                onStart: () => {
                    gsap.to(bulletRefs.current, {
                        textShadow: "0 0 20px currentColor, 0 0 40px teal",
                        duration: 0.5,
                        stagger: 0.4,
                        yoyo: true,
                        repeat: 1
                    });
                }
            }
        );
    }, []);

    return (
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-20 md:px-12 lg:px-24 min-h-[calc(100vh-80px)]">
            {/* Left Column (Text Content) */}
            <div className="flex-1 max-w-2xl text-center md:text-left">
                <header>
                    <h1 className="text-5xl lg:text-6xl font-bold text-offWhite mb-6 leading-tight">
                        Modern websites for real businesses.
                    </h1>
                </header>
                <p className="text-lg text-offWhite mb-4" role="doc-subtitle">
                    Hey, I'm Zach. With over 5 years of experience as a Frontend Engineer, I craft high-performance digital experiences. My toolkit focuses on React, TypeScript, and the art of seamless user interaction.                </p>
                <ul className="hero-bullets text-lg text-offWhite mb-8 space-y-3 max-w-xl list-none">
                    {/* 1. The "Performance" Bullet (Reworded) */}
                    <li ref={el => (bulletRefs.current[0] = el)}>
                        • Modernizing legacy codebases into **high-performance applications** that rank and convert.
                    </li>

                    {/* 2. The "Full-Cycle" Bullet (Reworded) */}
                    <li ref={el => (bulletRefs.current[1] = el)}>
                        • **End-to-end delivery:** Architecting everything from initial system design to automated deployment.
                    </li>

                    {/* 3. The "New" Technical Bullet (Engineering Depth) */}
                    <li ref={el => (bulletRefs.current[2] = el)}>
                        • Building **scalable, type-safe architectures** using TypeScript to ensure long-term maintainability.
                    </li>

                    {/* 4. The "New" User Experience Bullet (UX/UI Polish) */}
                    <li ref={el => (bulletRefs.current[3] = el)}>
                        • Crafting **fluid, accessible user interfaces** with a focus on motion, responsiveness, and clean UX.
                    </li>

                    {/* 5. The "Trust" Bullet (Reworded) */}
                    <li ref={el => (bulletRefs.current[4] = el)}>
                        • A **trusted partner** for businesses, providing technical strategy and transparent communication.
                    </li>
                </ul>
                {/* --- BUTTONS CONTAINER --- */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a
                        href={resumePdfUrl}
                        download="Zachary Howell - Resume.pdf"
                        aria-label="Download Zachary Howell's resume as PDF"
                        className="inline-block text-center bg-transparent font-medium py-3 px-6 rounded border-2 
                                   transition-colors duration-300 text-offWhite border-offWhite 
                                   hover:text-tealGreen hover:border-tealGreen
                                   dark:text-offWhite dark:border-purple-500 
                                   dark:hover:text-purple-300 dark:hover:border-purple-400"
                    >
                        Download Resume
                    </a>
                    <a
                        href={freelancguide}
                        download="Zachary Howell - Freelance Price Guide.pdf"
                        aria-label="Download Zachary Howell's resume as PDF"
                        className="inline-block text-center bg-transparent font-medium py-3 px-6 rounded border-2 
                                   transition-colors duration-300 text-offWhite border-offWhite 
                                   hover:text-tealGreen hover:border-tealGreen
                                   dark:text-offWhite dark:border-purple-500 
                                   dark:hover:text-purple-300 dark:hover:border-purple-400"
                    >
                        View Pricing Guide
                    </a>
                </div>
            </div>

            {/* Right Column (Animated Selfie and Optional Quote) */}
            <div className="flex-shrink-0 mt-12 md:mt-0 md:ml-12 lg:ml-20 flex flex-col items-center md:items-start">
                <img
                    src={userSelfieImage}
                    alt="Zachary Howell"
                    className="w-48 h-80 md:w-56 md:h-96 rounded-lg object-cover object-center mb-6 selfie-awaiting-animation animate-selfie-light-up border-2 border-transparent dark:border-offWhite/20 shadow-lg"
                    style={{ animationDelay: `${selfieAnimationDelay}s` }}
                />
                <div className="p-4 rounded-lg max-w-xs w-full text-center md:text-left shadow-md 
                               bg-black/60 backdrop-blur-sm text-offWhite 
                               dark:bg-transparent dark:backdrop-blur-none dark:shadow-none">
                    <p className="text-sm italic">
                        "90% building, 10% Googling — we’ve all been there."
                    </p>
                </div>
            </div>
        </section>
    );
}

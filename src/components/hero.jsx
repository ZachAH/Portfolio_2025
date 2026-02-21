import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import resumePdfUrl from '../assets/ZacharyHowell_Resume.pdf';
import freelancguide from '../assets/freelance_price_guide.pdf';
import userSelfieImage from '../assets/selfie.webp';

gsap.registerPlugin(ScrollTrigger);

/**
 * Helper component for the "Sharpie" effect.
 * Wraps keywords in a span with an animated background stroke.
 */
const Highlight = ({ children }) => (
    <span className="relative inline-block px-1 mx-1 group">
        {/* The Sharpie Stroke - Width is animated via GSAP */}
        <span className="highlight-stroke absolute bottom-1 left-0 w-0 h-[55%] bg-tealGreen/40 dark:bg-purple-500/40 -z-10" />
        <span className="relative font-bold text-offWhite">
            {children}
        </span>
    </span>
);

export default function Hero() {
    const selfieAnimationDelay = 4;
    const bulletRefs = useRef([]);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-bullets",
                start: "top 85%",
            }
        });

        // 1. Bullet line stagger animation
        tl.fromTo(bulletRefs.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power3.out",
                onStart: function() {
                    // Optional: Brief glow effect on the whole line as it appears
                    gsap.to(this.targets(), {
                        textShadow: "0 0 20px currentColor, 0 0 40px teal",
                        duration: 0.5,
                        yoyo: true,
                        repeat: 1
                    });
                }
            }
        );

        // 2. Sharpie "Drawing" animation
        // This targets all .highlight-stroke elements and draws them sequentially
        tl.to(".highlight-stroke", {
            width: "100%",
            duration: 1.75,
            stagger: 0.2,
            ease: "power2.inOut",
        }, "+=3.5"); // Overlap slightly with the bullet animation for smoothness

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
                    Hey, I'm Zach. With over 5 years of experience as a Frontend Engineer, I craft high-performance digital experiences. My toolkit focuses on React, TypeScript, and the art of seamless user interaction.
                </p>
                
                <ul className="hero-bullets text-lg text-offWhite mb-8 space-y-5 max-w-xl list-none">
                    <li ref={el => (bulletRefs.current[0] = el)}>
                        • Modernizing legacy codebases into <Highlight>high-performance applications</Highlight> that rank and convert.
                    </li>

                    <li ref={el => (bulletRefs.current[1] = el)}>
                        • <Highlight>End-to-end delivery:</Highlight> Architecting everything from initial system design to automated deployment.
                    </li>

                    <li ref={el => (bulletRefs.current[2] = el)}>
                        • Building <Highlight>scalable, type-safe architectures</Highlight> using TypeScript to ensure long-term maintainability.
                    </li>

                    <li ref={el => (bulletRefs.current[3] = el)}>
                        • Crafting <Highlight>fluid, accessible user interfaces</Highlight> with a focus on motion and clean UX.
                    </li>

                    <li ref={el => (bulletRefs.current[4] = el)}>
                        • A <Highlight>trusted partner</Highlight> for businesses, providing technical strategy and transparent communication.
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
                        aria-label="Download Zachary Howell's pricing guide as PDF"
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
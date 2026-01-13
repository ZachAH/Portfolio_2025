import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import resumePdfUrl from '../assets/ZacharyHowell_Resume.pdf';
import freelancguide from '../assets/freelance_price_guide.pdf';
import userSelfieImage from '../assets/selfie.jpg';

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
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".hero-bullets",
                    start: "top 80%",
                },
                onStart: () => {
                    gsap.to(bulletRefs.current, {
                        textShadow: "0 0 20px currentColor, 0 0 40px teal",
                        duration: 0.3,
                        stagger: 0.1,
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
                <h1 className="text-5xl lg:text-6xl font-bold text-offWhite mb-6 leading-tight">
                    Modern websites for real businesses.
                </h1>
                <p className="text-lg text-offWhite mb-4">
                    Hey, I'm Zach—a freelance web developer building fast, intuitive sites with React, TypeScript, and clear communication.
                </p>
                <ul className="hero-bullets text-lg text-offWhite mb-8 space-y-2 max-w-xl list-none">
                    <li ref={el => (bulletRefs.current[0] = el)}>• Transform outdated sites into high-performers that drive results.</li>
                    <li ref={el => (bulletRefs.current[1] = el)}>• Full-service: domains to deployment—delivered fast & reliable.</li>
                    <li ref={el => (bulletRefs.current[2] = el)}>• Trusted by local businesses: proven track record, clear communication.</li>
                </ul>
                {/* --- BUTTONS CONTAINER --- */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a
                        href={resumePdfUrl}
                        download="Zachary Howell - Resume.pdf"
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

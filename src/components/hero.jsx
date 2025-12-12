import React from 'react';
import resumePdfUrl from '../assets/ZacharyHowell_Resume.pdf';
import userSelfieImage from '../assets/selfie.jpg';

export default function Hero() {
    // Define a delay for the selfie animation (e.g., 0.5 seconds after page load)
    const selfieAnimationDelay = 4;

    return (
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-20 md:px-12 lg:px-24 min-h-[calc(100vh-80px)]">

            {/* Left Column (Text Content) */}
            <div className="flex-1 max-w-2xl text-center md:text-left">
                <h1 className="text-5xl lg:text-6xl font-bold text-offWhite mb-6 leading-tight">
                Modern websites for real businesses — built with care, coffee, and way too much talking.                </h1>
                <p className="text-lg text-offWhite mb-8">
                    Hey there! I’m Zach — a freelance web developer and technical problem-solver who loves building clean, modern, high-performing websites for real businesses. With a strong foundation in React, TypeScript, and UI/UX design, I help clients transform outdated sites into fast, intuitive experiences that actually drive results.

                    I’m big on communication and clarity — I enjoy breaking down technical ideas in a way that makes sense to clients, teams, and users alike. Whether I’m optimizing a customer journey or redesigning a full brand experience, my goal is always the same: create something polished, reliable, and easy to use.

                    Outside of work, you’ll usually find me behind a drum kit or playing guitar — creativity fuels everything I do, both on screen and off.               </p>
                {/* --- BUTTONS CONTAINER --- */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    {/* Download Resume Link (Styled as Button) */}
                    <a
                        href={resumePdfUrl}
                        download="Zachary Howell - Resume.pdf"
                        className={`
                            inline-block text-center bg-transparent font-medium py-3 px-6 rounded border-2 
                            transition-colors duration-300
                            ${/* Light Mode Styles */''}
                            text-offWhite border-offWhite 
                            hover:text-tealGreen hover:border-tealGreen
                            ${/* Dark Mode Styles */''}
                            dark:text-offWhite dark:border-purple-500 
                            dark:hover:text-purple-300 dark:hover:border-purple-400
                        `}
                    >
                        Download Resume
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
                <div
                    className="p-4 rounded-lg max-w-xs w-full text-center md:text-left shadow-md 
                               bg-black/60 backdrop-blur-sm text-offWhite 
                               dark:bg-transparent dark:backdrop-blur-none dark:shadow-none"
                >
                    <p className="text-sm italic">
                        "90% building, 10% Googling — we’ve all been there."
                    </p>
                </div>
            </div>
        </section>
    );
}
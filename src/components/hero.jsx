import React from 'react';
// Assuming your Hero.jsx is in src/components/, this path is correct for src/assets/joey.webp
import profileImage from '../assets/joey.webp';

export default function Hero() { // Removed handleMouseEnter/Leave props as they weren't in your current version
    return (
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-20 md:px-12 lg:px-24 min-h-[calc(100vh-80px)]">

            {/* Left Column (Text Content) */}
            <div className="flex-1 max-w-2xl text-center md:text-left">
                <h1 className="text-5xl lg:text-6xl font-bold text-offWhite mb-6 leading-tight">
                    The dev-driven launchpad for your business.
                </h1>
                <p className="text-lg text-offWhite mb-8">
                Hey there! I'm Zach — a programmer with a passion for crafting clean, functional, and user-focused web and mobile experiences. I specialize in modern front-end development but also dive deep into full-stack solutions to bring ideas to life with precision and style. When I’m not coding, you’ll find me behind a drum kit or jamming on guitar — because creativity drives everything I do.                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button className="bg-transparent border-2 border-tealGreen text-tealGreen hover:bg-tealGreen hover:text-black font-medium py-3 px-6 rounded transition duration-300">
                        VIEW PROJECTS
                    </button>
                    <button className="bg-transparent text-offWhite hover:text-tealGreen font-medium py-3 px-6 rounded transition duration-300">
                        VIEW RESUME
                    </button>
                </div>
            </div>

            {/* Right Column (Image and Quote) */}
            <div className="flex-shrink-0 mt-12 md:mt-0 md:ml-12 lg:ml-20">
                 {/* --- IMAGE SECTION UPDATED --- */}
                 <img
                    src={profileImage}
                    alt="Joey Jordison" // Consider a more descriptive alt if this image represents you or your brand
                    className="w-64 h-80 object-cover rounded mb-4"
                 />
                 {/* Quote Block - Using your indigo color */}
                 <div className="bg-indigo text-offWhite p-4 rounded max-w-xs">
                    <p className="text-sm italic">
                    "When you have the power of music within your soul and your heart, nothing can stop you." - Joey Jordison
                    </p>
                 </div>
            </div>

        </section>
    );
}
import React from 'react';
// Assuming your Hero.jsx is in src/components/, this path is correct for src/assets/
import resumePdfUrl from '../assets/ZacharyHowell_Resume.pdf'; // Make sure this filename matches your PDF
import userSelfieImage from '../assets/selfie.jpg'; // Your selfie image

export default function Hero() {
    // Define a delay for the selfie animation (e.g., 0.5 seconds after page load)
    // You can adjust this, or set to '0s' for an immediate animation.
    const selfieAnimationDelay = 4;

    return (
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-20 md:px-12 lg:px-24 min-h-[calc(100vh-80px)]">

            {/* Left Column (Text Content) */}
            <div className="flex-1 max-w-2xl text-center md:text-left">
                <h1 className="text-5xl lg:text-6xl font-bold text-offWhite mb-6 leading-tight">
                    The dev-driven launchpad for your business.
                </h1>
                <p className="text-lg text-offWhite mb-8">
                Hey there! I'm Zach — a programmer with a passion for crafting clean, functional, and user-focused web and mobile experiences. I specialize in modern front-end development but also dive deep into full-stack solutions to bring ideas to life with precision and style. When I’m not coding, you’ll find me behind a drum kit or jamming on guitar — because creativity drives everything I do.
                </p>
                {/* --- BUTTONS CONTAINER --- */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    {/* View Projects Button */}
                    <button className="bg-transparent border-2 border-tealGreen text-tealGreen hover:bg-tealGreen hover:text-black font-medium py-3 px-6 rounded transition duration-300">
                        VIEW PROJECTS
                    </button>
                    {/* View Resume Link (Styled as Button) */}
                    <a
                        href={resumePdfUrl}
                        download="Zachary Howell - Resume.pdf" // Suggested download filename
                        className="inline-block text-center bg-transparent text-offWhite hover:text-tealGreen font-medium py-3 px-6 rounded transition duration-300"
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
                    // --- UPDATED CLASSES FOR TALL RECTANGLE --- vvv
                    className="w-48 h-80 md:w-56 md:h-96 rounded-lg object-cover object-center mb-6 selfie-awaiting-animation animate-selfie-light-up border-2 border-transparent dark:border-offWhite/20 shadow-lg"
                    // Example: w-48 (12rem), h-64 (16rem) for mobile
                    //          md:w-56 (14rem), md:h-72 (18rem) for desktop
                    // Change object-center to object-top if your head is at the top of the image
                    // ---                                       ^^^
                    style={{ animationDelay: `${selfieAnimationDelay}s` }}
                 />
                 <div className="bg-indigo text-offWhite p-4 rounded-lg max-w-xs w-full text-center md:text-left shadow-md">
                    <p className="text-sm italic">
                    "When you have the power of music within your soul and your heart, nothing can stop you." - Joey Jordison
                    </p>
                 </div>
            </div>

        </section>
    );
}
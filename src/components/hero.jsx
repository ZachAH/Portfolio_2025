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
                    The dev-driven launchpad for your business.
                </h1>
                <p className="text-lg text-offWhite mb-8">
                Hey there! I’m Zach — a tech-savvy professional passionate about helping customers succeed. With a strong foundation in web development, I understand the challenges teams face when adopting new tools and workflows, and I love turning those challenges into smooth, positive experiences. My goal is to bridge the gap between technology and people — ensuring customers not only get results but feel supported every step of the way. When I’m not working with clients, you’ll find me behind a drum kit or jamming on guitar — because creativity drives everything I do.                </p>
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
                    "When you have the power of music within your soul and your heart, nothing can stop you." - Joey Jordison
                    </p>
                 </div>
            </div>
        </section>
    );
}
import React, { useState, useEffect } from 'react';

// Grid Background Component
const GridBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Get mouse position relative to the viewport
            const { clientX, clientY } = event;
            // Calculate position from the center of the screen
            const x = clientX - window.innerWidth / 2;
            const y = clientY - window.innerHeight / 2;
            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-300 ease-out"
            style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                animation: "moveGrid 20s linear infinite",
                // Apply a subtle transform based on mouse position for a parallax effect
                transform: `translate(${mousePosition.x / 30}px, ${mousePosition.y / 30}px)`,
            }}
        >
            {/* Glow effect with primary colors - reduced opacity */}
            <div className="absolute top-1/2 left-1/2 w-[60vmin] h-[60vmin] bg-primary-300/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
            {/* Keyframes for the animation */}
            <style>
                {`
                    @keyframes moveGrid {
                        0% { background-position: 0 0; }
                        100% { background-position: 80px 80px; }
                    }
                `}
            </style>
        </div>
    );
};

const Hero: React.FC = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-400 text-white text-center relative overflow-hidden">
            {/* Grid Background */}
            <GridBackground />
            
            {/* Original Background Pattern with Gradient - reduced opacity */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-white/3"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/15 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary-300/10 to-secondary-300/10 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl px-8">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg animate-fade-in">
                    Hi, I'm{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-100">
                        Duy Truong
                    </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
                        I'm an Undergraduate Student Developer
                </p>
                <div className="hero-cta animate-scale-in">
                    <a 
                        href="#about" 
                        className="inline-block bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold text-lg shadow-devfolio hover:shadow-devfolio-hover transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Get in touch
                    </a>
                </div>
            </div>
            
            {/* Scroll Down Animation */}
            <a href="#about" className="absolute bottom-8 inset-x-0 flex justify-center text-white animate-bounce-slow">
                <div className="w-8 h-8 border-2 border-white rounded-full relative">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                </div>
            </a>
        </section>
    );
};

export default Hero;
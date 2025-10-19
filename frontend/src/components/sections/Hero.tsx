import React from 'react';
import { Boxes } from '../common/BoxesCore';

const Hero: React.FC = () => {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white text-center relative overflow-hidden">
            {/* Background Pattern with Gradient - cyan/blue theme */}
            <div className="absolute inset-0 opacity-60 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/15 to-purple-500/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl"></div>
            </div>
            
            {/* Interactive Boxes Background */}
            <Boxes />
            
            <div className="relative z-20 max-w-4xl px-8">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg animate-fade-in">
                    Hi, I'm{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
                        Duy Truong
                    </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
                        I'm an Undergraduate Student Developer
                </p>
            </div>
            
            {/* Scroll Down Animation */}
            <button 
                onClick={scrollToAbout}
                className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white z-30 scroll-down-arrow hover:opacity-80 transition-opacity duration-300 cursor-pointer"
            >
                <span className="scroll-down-span"></span>
            </button>
        </section>
    );
};

export default Hero;
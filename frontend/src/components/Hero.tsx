import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-400 text-white text-center relative overflow-hidden">
            {/* Background Pattern with Gradient */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-white/5"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/40 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/30 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary-300/20 to-secondary-300/20 rounded-full blur-2xl"></div>
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
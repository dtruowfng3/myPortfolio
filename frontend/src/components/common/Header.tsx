import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
            isScrolled ? 'bg-slate-950/95 backdrop-blur-md' : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-center py-4">
                    {/* Brand */}
                    <a 
                        href="#hero" 
                        className="text-2xl font-black text-slate-200 hover:text-cyan-600 transition-colors duration-300"
                    >
                        Duy Truong aka dTruong
                    </a>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            {[
                                { href: '#about', label: 'About' },
                                { href: '#projects', label: 'Projects' },
                                { href: '#games', label: 'Games' },
                                { href: '#my-worlds', label: 'My Worlds' },
                                { href: '#contact', label: 'Contact' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href={item.href}
                                        className="text-slate-200 font-bold px-4 py-2 rounded-lg hover:text-cyan-400 hover:bg-slate-800 transition-all duration-300"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    
                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-slate-200 text-2xl">
                        ☰
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
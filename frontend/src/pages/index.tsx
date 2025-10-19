import React from 'react';
import Header from '../components/common/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

const Home: React.FC = () => {
    return (
        <div>
            <Header />
            <Hero />
            <About />
            <Projects />
            <Contact />
        </div>
    );
};

export default Home;
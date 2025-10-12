import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

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
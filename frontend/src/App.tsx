import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import MyWorlds from './components/MyWorlds';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app font-inter">
        <Header />
        <main>
          <div id="hero">
            <Hero />
          </div>
          <About />
          <Projects />
          <MyWorlds />
          <Contact />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
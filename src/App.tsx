import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Process from './components/Process';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-bg text-text-main flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero 
              onCtaClick={() => setCurrentPage('contact')} 
              onSecondaryClick={() => setCurrentPage('contact')} 
            />
            <Problem />
            <Solution />
            <Process />
            <Services />
            <Portfolio />
            <Testimonials />
          </>
        )}

        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

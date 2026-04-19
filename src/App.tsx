import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Process from './components/Process';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top when page changes and handle payment success
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check for payment success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      alert('Payment Successful! Our lead analysts are already running your structural audit. We will be in touch shortly.');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
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
            <Pricing />
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

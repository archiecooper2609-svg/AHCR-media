import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Contact', id: 'contact' },
    { name: 'Text us & Book a Call', id: 'book', href: 'tel:07470587388' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-border py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => setCurrentPage('home')}
          >
            <span className="text-2xl font-display font-bold tracking-tighter">
              ahcr<span className="text-accent group-hover:text-white transition-colors duration-300">agency</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              link.href ? (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-widest transition-all hover:text-accent relative py-2 group text-text-dim"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                </a>
              ) : (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id === 'pricing') {
                      if (currentPage !== 'home') {
                        setCurrentPage('home');
                        setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 100);
                      } else {
                        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      setCurrentPage(link.id);
                    }
                  }}
                  className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-accent relative py-2 group ${
                    currentPage === link.id ? 'text-accent' : 'text-text-dim'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-300 ${
                    currentPage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </button>
              )
            ))}
            <a 
              href="tel:07470587388"
              className="bg-accent text-bg px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-2 group"
            >
              Text us & Book
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-main hover:text-accent transition-colors p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-8 space-y-2">
              {navLinks.map((link) => (
                link.href ? (
                  <a
                    key={link.id}
                    href={link.href}
                    className="block w-full text-left px-4 py-4 text-sm font-bold uppercase tracking-widest rounded-lg transition-colors text-text-dim hover:text-accent hover:bg-surface-light/50"
                  >
                    {link.name}
                  </a>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => {
                      if (link.id === 'pricing') {
                        if (currentPage !== 'home') {
                          setCurrentPage('home');
                          setTimeout(() => {
                            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                            setIsOpen(false);
                          }, 100);
                        } else {
                          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                          setIsOpen(false);
                        }
                      } else {
                        setCurrentPage(link.id);
                        setIsOpen(false);
                      }
                    }}
                    className={`block w-full text-left px-4 py-4 text-sm font-bold uppercase tracking-widest rounded-lg transition-colors ${
                      currentPage === link.id ? 'text-accent bg-surface-light' : 'text-text-dim hover:text-accent hover:bg-surface-light/50'
                    }`}
                  >
                    {link.name}
                  </button>
                )
              ))}
              <div className="pt-4 px-4">
                <a 
                  href="tel:07470587388"
                  className="block w-full bg-accent text-bg px-6 py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-white transition-all text-center shadow-[0_0_209,255,0.3)]"
                >
                  Text us & Book a Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

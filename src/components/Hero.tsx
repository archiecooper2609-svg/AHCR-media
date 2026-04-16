import { motion } from 'motion/react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
  onSecondaryClick: () => void;
}

export default function Hero({ onCtaClick, onSecondaryClick }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 overflow-hidden bg-bg">
      {/* Flashy Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]" />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-light border border-border text-accent text-[10px] uppercase font-black tracking-[3px] mb-8">
                <Sparkles className="w-3 h-3" />
                Premium Local Web Design
              </div>
              
              <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] mb-8 tracking-tighter">
                Stop losing <span className="text-gradient">customers</span> to an outdated site.
              </h1>
              
              <p className="text-xl text-text-dim mb-12 leading-relaxed max-w-xl font-medium">
                We build high-performance websites for local pros that actually generate leads and bookings. No corporate fluff, just results.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a
                  href="tel:074705873388"
                  className="w-full sm:w-auto bg-accent text-bg px-10 py-5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,209,255,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] flex items-center justify-center gap-3 group"
                >
                  Book a Call Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:074705873388"
                  className="w-full sm:w-auto bg-surface text-white border border-border px-10 py-5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-surface-light transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Calendar className="w-5 h-5 text-accent" />
                  Request Mockup
                </a>
              </div>

              <div className="mt-16 flex items-center gap-8 opacity-50">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-bg bg-surface-light overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-dim">
                  Trusted by 50+ local businesses
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="relative rounded-3xl overflow-hidden border border-border bg-surface shadow-[0_40px_100px_rgba(0,0,0,0.8)] group">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src="https://picsum.photos/seed/agency/800/1000" 
                  alt="Modern Web Design" 
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Stats Card */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">Real-time Growth</span>
                    <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  </div>
                  <div className="text-3xl font-black tracking-tighter">+124%</div>
                  <div className="text-[10px] font-bold text-text-dim uppercase tracking-wider">Average Booking Increase</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

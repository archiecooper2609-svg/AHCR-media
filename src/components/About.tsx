import { motion } from 'motion/react';
import { Target, Users, Zap } from 'lucide-react';

export default function About() {
  return (
    <section className="pt-48 pb-32 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-title-tag inline-block px-3 py-1 rounded-full bg-surface-light border border-border text-accent text-[10px] uppercase font-black tracking-[3px] mb-6">
              Our Story
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-8 leading-[0.9]">
              Helping local businesses <span className="text-accent">win</span> in a digital world.
            </h2>
            <p className="text-xl text-text-dim mb-12 leading-relaxed font-medium">
              We started ahcragency because we saw too many hard-working local businesses being left behind by outdated technology and overpriced agencies.
            </p>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0 text-accent">
                  <Target className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-3 tracking-tight">Our Mission</h3>
                  <p className="text-text-dim leading-relaxed">To provide world-class web design and digital growth tools to the local businesses that form the backbone of our communities.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0 text-accent">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-3 tracking-tight">Our Approach</h3>
                  <p className="text-text-dim leading-relaxed">We don't do corporate fluff. We focus on simplicity, results, and reliability. We build tools that actually work for busy business owners.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative rounded-[40px] overflow-hidden border border-border bg-surface shadow-2xl aspect-[4/5]"
            >
              <img 
                src="https://picsum.photos/seed/team/800/1000" 
                alt="Our Team" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-12 left-12 right-12 glass p-8 rounded-3xl">
                <div className="text-4xl font-black tracking-tighter mb-2">100%</div>
                <div className="text-[10px] font-bold text-accent uppercase tracking-widest">Local Focus</div>
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

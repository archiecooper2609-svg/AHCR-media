import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section className="pt-48 pb-32 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-title-tag inline-block px-3 py-1 rounded-full bg-surface-light border border-border text-accent text-[10px] uppercase font-black tracking-[3px] mb-6">
              Contact Us
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-8 leading-[0.9]">
              Let's build your <span className="text-accent">future</span> together.
            </h2>
            <p className="text-xl text-text-dim mb-12 leading-relaxed font-medium">
              Ready for your free homepage mockup? Or just want to have a quick chat about your business? We're here to help.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-xl font-black tracking-tight">AHCR@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-xl font-black tracking-tight">07470587388</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-1">Location</p>
                  <p className="text-xl font-black tracking-tight">Manchester, UK</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-surface p-12 rounded-[40px] border border-border shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-dim ml-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-bg border border-border rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-dim ml-1">Business Name</label>
                  <input 
                    type="text" 
                    placeholder="The Local Shop"
                    className="w-full bg-bg border border-border rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-dim ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="07123 456 789"
                    className="w-full bg-bg border border-border rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-dim ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-bg border border-border rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-dim ml-1">How can we help?</label>
                <textarea 
                  rows={4}
                  placeholder="I'd like a free mockup for my barber shop..."
                  className="w-full bg-bg border border-border rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              
              <a 
                href="tel:07470587388"
                className="w-full bg-accent text-bg py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,209,255,0.3)] flex items-center justify-center gap-3 group"
              >
                Text us & Book a Call Now
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

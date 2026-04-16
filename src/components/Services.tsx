import { motion } from 'motion/react';
import { Layout, Smartphone, Search, MessageSquare, Settings, Globe } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Layout className="w-5 h-5" />,
      title: "Premium Design",
      description: "1–5 pages of custom-built, high-performance design. No templates, just results."
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile First",
      description: "Optimised for the 70% of local customers who find you on their phones."
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: "Local SEO",
      description: "We put you on the map. Literally. Google My Business and local keyword setup."
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Lead Capture",
      description: "Custom booking forms and contact systems that send leads straight to your phone."
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Maintenance",
      description: "We handle the updates, security, and hosting. You focus on your customers."
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Domain & Email",
      description: "Professional business email and domain management included in every build."
    }
  ];

  return (
    <section className="py-32 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="section-title-tag inline-block px-3 py-1 rounded-full bg-surface-light border border-border text-accent text-[10px] uppercase font-black tracking-[3px] mb-6">
            Our Services
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">
            Everything you need to <span className="text-accent">dominate</span> local.
          </h2>
          <p className="text-lg text-text-dim max-w-2xl mx-auto font-medium">
            We don't just build websites. We build growth engines for local businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-surface border border-border hover:border-accent/50 hover:bg-surface-light transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-accent/10 transition-colors" />
              
              <div className="w-12 h-12 rounded-xl bg-bg border border-border text-accent flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{service.title}</h3>
              <p className="text-sm text-text-dim leading-relaxed font-medium">{service.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 p-12 rounded-[40px] bg-gradient-to-r from-accent to-brand-600 text-bg text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-display font-black tracking-tighter mb-6">Ready to start your project?</h3>
            <p className="text-bg/80 text-lg font-bold mb-10 max-w-xl mx-auto">Get a free homepage mockup and see the potential of your business online.</p>
            <a 
              href="tel:074705873388"
              className="inline-block bg-bg text-accent px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-2xl"
            >
              Book Your Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

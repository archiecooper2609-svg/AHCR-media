import { motion } from 'motion/react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      title: "The Barber Shed",
      category: "Barber Shop",
      image: "https://picsum.photos/seed/barber/800/1000",
      outcome: "30% increase in online bookings within 2 months."
    },
    {
      title: "Swift Plumbing",
      category: "Plumbing Services",
      image: "https://picsum.photos/seed/plumbing/800/1000",
      outcome: "Now ranks #1 on Google for 'plumber near me'."
    },
    {
      title: "Forge Fitness",
      category: "Personal Training",
      image: "https://picsum.photos/seed/gym/800/1000",
      outcome: "Generated 50+ new membership leads in the first month."
    }
  ];

  return (
    <section className="py-32 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <div className="section-title-tag inline-block px-3 py-1 rounded-full bg-surface-light border border-border text-accent text-[10px] uppercase font-black tracking-[3px] mb-6">
              Recent Work
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 leading-[0.9]">
              Real results for <span className="text-accent">real</span> businesses.
            </h2>
            <p className="text-lg text-text-dim max-w-xl font-medium">
              We don't just build pretty sites. We build sites that work as hard as you do.
            </p>
          </div>
          <a 
            href="tel:07470587388"
            className="text-accent font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all group"
          >
            Text us & Book a Call
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.a 
              key={i}
              href="tel:07470587388"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative bg-surface rounded-[32px] overflow-hidden border border-border hover:border-accent/50 transition-all duration-700 block"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full bg-accent text-bg flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>
              </div>
              
              <div className="p-10 relative">
                <span className="text-[10px] font-black text-accent uppercase tracking-[3px] mb-4 block">{project.category}</span>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{project.title}</h3>
                <p className="text-sm text-text-dim leading-relaxed font-medium">{project.outcome}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

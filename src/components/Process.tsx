import { motion } from 'motion/react';

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Design",
      description: "We build a custom, high-converting preview of your new home page. You see exactly what you're getting."
    },
    {
      number: "02",
      title: "Review",
      description: "We walk you through the strategy. You approve the design and we polish every single detail."
    },
    {
      number: "03",
      title: "Growth",
      description: "We launch your site and set up the tracking. You start taking more bookings and calls instantly."
    }
  ];

  return (
    <section className="py-32 bg-surface relative overflow-hidden border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="section-title-tag inline-block px-3 py-1 rounded-full bg-surface-light border border-border text-accent text-[10px] uppercase font-black tracking-[3px] mb-6">
            Our Process
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">
            From zero to <span className="text-accent">hero</span> in 3 steps.
          </h2>
          <p className="text-lg text-text-dim max-w-2xl mx-auto font-medium">
            We've streamlined our workflow to get your business online and growing as fast as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-border -z-0" />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative z-10 group"
            >
              <div className="w-20 h-20 rounded-2xl bg-bg border border-border flex items-center justify-center text-3xl font-black text-accent mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(0,209,255,0.2)] transition-all duration-500">
                {step.number}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-accent transition-colors">{step.title}</h3>
              <p className="text-text-dim leading-relaxed font-medium">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-bg via-transparent to-bg pointer-events-none" />
    </section>
  );
}

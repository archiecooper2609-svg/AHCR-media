import { motion } from 'motion/react';
import { CheckCircle2, Zap, Target, BarChart3, ShieldCheck } from 'lucide-react';

export default function Solution() {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-accent" />,
      title: "Lightning Fast Speed",
      description: "We build sites that load in under a second. No more waiting, no more lost customers."
    },
    {
      icon: <Target className="w-5 h-5 text-accent" />,
      title: "Conversion Focused",
      description: "Every pixel is designed to turn visitors into paying customers and booked appointments."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-accent" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime. Your business never sleeps, neither does your site."
    }
  ];

  return (
    <section className="py-32 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-title-tag inline-block px-3 py-1 rounded-full bg-surface-light border border-border text-accent text-[10px] uppercase font-black tracking-[3px] mb-6">
              The Solution
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-8 leading-[0.9]">
              We build the <span className="text-accent">engine</span> that drives your growth.
            </h2>
            <p className="text-lg text-text-dim mb-12 leading-relaxed font-medium">
              You're an expert in your trade. We're experts in digital growth. We handle the tech so you can handle the new customers.
            </p>
            
            <div className="space-y-4">
              {[
                "Custom designs that reflect your quality",
                "Automated booking and lead capture",
                "Local SEO that puts you on the map",
                "Zero-hassle monthly maintenance"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors group">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-accent group-hover:text-bg transition-colors" />
                  </div>
                  <span className="text-sm font-bold tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="grid gap-6"
            >
              {features.map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl bg-surface border border-border hover:bg-surface-light transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-accent/10 transition-colors" />
                  <div className="relative z-10">
                    <div className="mb-6 p-3 rounded-xl bg-accent/10 w-fit group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                    <p className="text-sm text-text-dim leading-relaxed font-medium">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            
            {/* Flashy floating element */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

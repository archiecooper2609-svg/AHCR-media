import { motion } from 'motion/react';
import { XCircle, AlertTriangle, Smartphone, Search } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: "Outdated Design",
      description: "Your site looks like it's from 2010. Customers judge your quality by your website's appearance."
    },
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      title: "Zero Presence",
      description: "If you're not online, you're invisible. You're losing thousands to competitors who are."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-red-500" />,
      title: "Mobile Fail",
      description: "70% of local searches happen on phones. If your site breaks on mobile, you lose the lead."
    },
    {
      icon: <Search className="w-6 h-6 text-red-500" />,
      title: "Hidden on Google",
      description: "You're on page 5. Your competitors are taking all the local traffic from page 1."
    }
  ];

  return (
    <section className="py-32 bg-bg border-y border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="section-title-tag inline-block px-3 py-1 rounded-full bg-surface-light border border-border text-accent text-[10px] uppercase font-black tracking-[3px] mb-6">
            The Reality Check
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">
            Is your website <span className="text-red-500">killing</span> your business?
          </h2>
          <p className="text-lg text-text-dim max-w-2xl mx-auto font-medium">
            Most local businesses are invisible to their ideal customers. We fix the leaks in your digital bucket.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface p-8 rounded-2xl border border-border hover:border-red-500/50 transition-all duration-500 group"
            >
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 w-fit group-hover:scale-110 transition-transform">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">{problem.title}</h3>
              <p className="text-sm text-text-dim leading-relaxed font-medium">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] pointer-events-none select-none uppercase">
        Problem
      </div>
    </section>
  );
}

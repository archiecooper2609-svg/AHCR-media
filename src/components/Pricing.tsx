import { motion } from 'motion/react';
import { Check, CreditCard, Sparkles } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Note: In a real app, you would use import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
// For this demo, we assume the user will provide it.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export default function Pricing() {
  const plans = [
    {
      name: "Analysis Standard",
      price: "300",
      description: "Our lead analysts personally strip down and rebuild your site's logic for peak performance.",
      features: [
        "Full Analyst Structural Review",
        "Performance Logic Audit",
        "1-5 Pages Elite Design",
        "Conversion Flow Optimization",
        "Elite Local SEO Strategy"
      ],
      priceId: "price_standard_placeholder"
    },
    {
      name: "Psychological Elite",
      price: "400",
      description: "A dedicated behavioral team manipulates every pixel to trigger subconscious conversion.",
      features: [
        "Subconscious Trigger Audit",
        "Neuromarketing Color Theory",
        "Behavioral Heatmap Strategy",
        "Unlimited Advanced Pages",
        "Predictive Analytics Integration",
        "24/7 Priority Intelligence Support"
      ],
      featured: true,
      priceId: "price_premium_placeholder"
    }
  ];

  const handlePayment = async (priceId: string) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const session = await response.json();

      if (session.error) {
        alert(session.error);
        return;
      }

      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed to initialize. Check console for details.');
    }
  };

  return (
    <section id="pricing" className="py-32 bg-bg relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="inline-block px-3 py-1 rounded-full bg-surface-light border border-border text-accent text-[10px] uppercase font-black tracking-[3px] mb-6">
            Scientific Strategy
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">
            Design backed by <span className="text-accent">behavioral science</span>.
          </h2>
          <p className="text-lg text-text-dim max-w-2xl mx-auto font-medium">
            We don't just build websites; we build conversion machines. Our dedicated analysts and psychological team review every layout to maximize your business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-12 rounded-[40px] border relative overflow-hidden transition-all duration-500 ${
                plan.featured 
                  ? 'bg-surface border-accent shadow-[0_0_50px_rgba(0,209,255,0.15)]' 
                  : 'bg-surface/50 border-border hover:border-accent/50'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-8 right-8 text-accent">
                  <Sparkles className="w-6 h-6" />
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-2xl font-black mb-2 tracking-tight uppercase">{plan.name}</h3>
                <p className="text-text-dim text-sm font-medium">{plan.description}</p>
              </div>

              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tighter">£{plan.price}</span>
                <span className="text-text-dim text-sm font-bold uppercase tracking-widest">One-time</span>
              </div>

              <div className="space-y-4 mb-12">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium text-text-dim">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePayment(plan.priceId)}
                className={`w-full py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${
                  plan.featured
                    ? 'bg-accent text-bg hover:bg-white shadow-[0_0_30px_rgba(0,209,255,0.3)]'
                    : 'bg-surface-light text-white border border-border hover:bg-surface'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                Get Started Now
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center opacity-50">
          <p className="text-xs font-bold uppercase tracking-widest">
            Secure payments powered by Stripe &bull; 100% Satisfaction Guarantee
          </p>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, CreditCard, Sparkles, Loader2, ShieldCheck } from 'lucide-react';
import { loadStripe, Stripe as StripeType } from '@stripe/stripe-js';

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const [stripePromise, setStripePromise] = useState<Promise<StripeType | null> | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<any>(null);

  useEffect(() => {
    // Version tracker
    console.log("Pricing Component Version: 1.2.0 (Production Clean)");
    
    const fetchConfig = async (retryCount = 0) => {
      try {
        setError(null);
        const apiUrl = `/api/config-v2?v=${Date.now()}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Handshake failed`);
        
        const data = await response.json();
        const { publishableKey, diagnostics: diag } = data;
        setDiagnostics(diag);
        
        if (publishableKey && publishableKey.trim().startsWith('pk_')) {
          setStripePromise(loadStripe(publishableKey.trim()));
          setIsReady(true);
        } else {
          setError("Checkout system configuration incomplete.");
        }
      } catch (err: any) {
        if (retryCount < 1) {
          setTimeout(() => fetchConfig(retryCount + 1), 2000);
        } else {
          setError(`Checkout offline. Refresh to retry.`);
        }
      }
    };
    
    fetchConfig();
  }, []);

  const manualRetry = () => {
    setIsReady(false);
    setError("Re-initializing...");
    // Force a small delay to show state change
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

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
    if (!isReady) {
      alert(`Payment system is not ready. Error: ${error || "Still initializing configuration from server..."}`);
      return;
    }
    
    try {
      setLoading(priceId);
      console.log(`Checking out with PriceId: ${priceId}`);
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const session = await response.json();

      if (session.error) {
        alert(`Server Error: ${session.error}`);
        setLoading(null);
        return;
      }

      if (session.id) {
        const stripe = await stripePromise;
        if (stripe) {
          const { error: redirectError } = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          if (redirectError) {
            console.error('Redirect error:', redirectError);
            alert(`Stripe Redirect Error: ${redirectError.message}`);
          }
        } else if (session.url) {
          window.location.href = session.url;
        }
      } else {
        alert("Server Error: Received no session ID from checkout request.");
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert(`Connection Error: Unable to start checkout. Please check your internet connection.`);
    } finally {
      if (!isReady) setLoading(null);
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

            <div 
              onClick={!isReady ? manualRetry : undefined}
              className={`mb-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[2px] px-4 py-2 rounded-full border transition-all ${
                isReady 
                  ? 'text-accent bg-accent/5 border-accent/10' 
                  : 'text-red-500 bg-red-500/5 border-red-500/10 cursor-pointer hover:bg-red-500/10'
              }`}
            >
              {isReady ? (
                <>
                  <ShieldCheck className="w-3 h-3" />
                  Secure Checkout Ready
                </>
              ) : (
                <>
                  {error?.includes("Network") ? <Loader2 className="w-3 h-3 animate-spin" /> : <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                  {error || "Initializing Secure Checkout..."}
                  {!isReady && <span className="underline ml-1 opacity-50">Click to Retry</span>}
                </>
              )}
            </div>

              <button
                onClick={() => handlePayment(plan.priceId)}
                disabled={loading !== null}
                className={`w-full py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
                  plan.featured
                    ? 'bg-accent text-bg hover:bg-white shadow-[0_0_30px_rgba(0,209,255,0.3)]'
                    : 'bg-surface-light text-white border border-border hover:bg-surface'
                }`}
              >
                {loading === plan.priceId ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <CreditCard className="w-5 h-5" />
                )}
                {loading === plan.priceId ? 'Processing...' : 'Get Started Now'}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center opacity-70">
          <div className="flex flex-col items-center gap-6">
            <div className="flex justify-center gap-4 grayscale opacity-50">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" referrerPolicy="no-referrer" />
            </div>
            
            <div className="text-[9px] text-text-dim/20 font-mono tracking-widest uppercase font-bold text-center">
              Network encrypted &bull; Build v1.2.0
            </div>
            
            {!isReady && error && (
              <div className="max-w-xs mx-auto mt-8 p-4 rounded-2xl bg-red-500/5 border border-red-500/10 text-center">
                <div className="text-[10px] font-bold text-red-400 mb-1">Configuration Error</div>
                <div className="text-[9px] text-text-dim mb-3">{error}</div>
                <button 
                  onClick={manualRetry}
                  className="text-[9px] font-black uppercase text-accent hover:underline tracking-widest"
                >
                  Force Rescan Keys
                </button>
              </div>
            )}
          </div>
          <p className="mt-8 text-[10px] font-black uppercase tracking-[3px] text-text-dim/40 text-center">
            Secured via Stripe SSL encryption
          </p>
        </div>
      </div>
    </section>
  );
}

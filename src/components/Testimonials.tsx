import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Dave",
      business: "Dave's Emergency Plumbing",
      text: "LocalBoost fixed my site in a week. I'm getting twice as many calls as I used to. Best investment I've made this year.",
      rating: 5
    },
    {
      name: "Sarah",
      business: "Velvet Salon",
      text: "The new booking system is a game changer for my salon. Very simple to use and my customers love it. Highly recommend.",
      rating: 5
    },
    {
      name: "Mike",
      business: "Peak Performance Gym",
      text: "I was skeptical about web design, but the results speak for themselves. 50+ new leads in the first month. Incredible.",
      rating: 5
    },
    {
      name: "James",
      business: "The Barber Shed",
      text: "Professional, fast, and they actually understand local business. My site looks amazing and works perfectly on mobile.",
      rating: 5
    },
    {
      name: "Emma",
      business: "Glow Beauty Bar",
      text: "Finally a web agency that doesn't use corporate fluff. They just get the job done and get results. My bookings are up 40%.",
      rating: 5
    },
    {
      name: "Tom",
      business: "Swift Electrical",
      text: "I'm now ranking #1 for my main services. The SEO work they did is top notch. I'm busy every single day now.",
      rating: 5
    }
  ];

  return (
    <section className="py-32 bg-bg relative overflow-hidden border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="section-title-tag inline-block px-3 py-1 rounded-full bg-surface-light border border-border text-accent text-[10px] uppercase font-black tracking-[3px] mb-6">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">
            Trusted by <span className="text-accent">real</span> local pros.
          </h2>
          <p className="text-lg text-text-dim max-w-2xl mx-auto font-medium">
            We don't just build websites. We build long-term partnerships with local business owners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-surface border border-border hover:border-accent/30 transition-all duration-500 group relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-accent/5 group-hover:text-accent/10 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-lg text-text-main leading-relaxed font-medium mb-8 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-light border border-border overflow-hidden">
                  <img src={`https://picsum.photos/seed/${testimonial.name}/100/100`} alt={testimonial.name} referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest">{testimonial.name}</h4>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-wider">{testimonial.business}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

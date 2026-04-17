interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  return (
    <footer className="bg-bg">
      {/* Final CTA */}
      <div className="py-24 border-b border-border-dim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            Ready to grow your <span className="text-accent">local</span> business?
          </h2>
          <p className="text-lg text-text-dim mb-12 max-w-2xl mx-auto">
            Get a free homepage mockup designed specifically for your business. No strings attached.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="tel:074705873388"
              className="w-full sm:w-auto bg-accent text-black px-10 py-5 rounded-lg text-sm font-bold hover:opacity-90 transition-all text-center"
            >
              Book a Call Now
            </a>
            <a 
              href="tel:074705873388"
              className="w-full sm:w-auto bg-surface-light text-text-main px-10 py-5 rounded-lg text-sm font-bold hover:bg-surface transition-all border border-border-dim text-center"
            >
              Request Free Mockup
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border-dim">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-text-dim">
          <div>ahcragency &copy; {new Date().getFullYear()}. Helping UK local businesses grow.</div>
          <div className="flex gap-6">
            <button onClick={() => setCurrentPage('home')} className="hover:text-accent transition-colors">Home</button>
            <button onClick={() => setCurrentPage('about')} className="hover:text-accent transition-colors">About</button>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-accent transition-colors">Contact</button>
            <a href="tel:074705873388" className="hover:text-accent transition-colors">Book a Call</a>
          </div>
          <div className="flex gap-6">
            <span>Email: AHCR@gmail.com</span>
            <span>Call: 07470587 3388</span>
            <span>Web: ahcragency.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

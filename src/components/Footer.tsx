import React, { useState } from 'react';
import { Mail, Instagram, Facebook, Twitter, Shield, Truck, RotateCcw, Award, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, setIsSizeGuideOpen }) => {
  const [email, setEmail] = useState('');
  const [newsletterClaimed, setNewsletterClaimed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setNewsletterClaimed(true);
    }
  };

  return (
    <footer className="bg-[#141212] text-[#E5E0D8] pt-16 pb-12 border-t border-[#2A2624]">
      {/* Trust Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#2A2624]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center p-4 rounded-xl bg-[#1A1817] border border-[#2A2624]">
            <Truck className="w-6 h-6 text-[#C5A880] mb-2" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Global Express Delivery</h4>
            <p className="text-[11px] text-[#A3998E] mt-1">Complimentary shipping over $500</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-[#1A1817] border border-[#2A2624]">
            <Award className="w-6 h-6 text-[#C5A880] mb-2" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">100% Authentic Haute Couture</h4>
            <p className="text-[11px] text-[#A3998E] mt-1">Certified silk & hand-zardozi wire</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-[#1A1817] border border-[#2A2624]">
            <Shield className="w-6 h-6 text-[#C5A880] mb-2" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Bespoke Fit Guarantee</h4>
            <p className="text-[11px] text-[#A3998E] mt-1">Custom fitting sessions with master tailors</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-[#1A1817] border border-[#2A2624]">
            <RotateCcw className="w-6 h-6 text-[#C5A880] mb-2" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Complimentary Returns</h4>
            <p className="text-[11px] text-[#A3998E] mt-1">14-day luxury return service</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Col 1 & 2: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <span className="font-serif text-2xl tracking-[0.2em] uppercase font-light text-white">
            Aria Vance
          </span>
          <p className="text-xs text-[#A3998E] leading-relaxed max-w-sm">
            A luxury fashion house crafting bespoke bridal gowns, handcrafted silk prêt, and haute couture for grand celebrations worldwide.
          </p>
          <div className="pt-2 text-xs text-[#A3998E] space-y-1 font-mono">
            <p>Atelier Studio: 450 Fifth Avenue, Floor 18, New York</p>
            <p>Customer Care: concierge@ariavance.com | +1 (800) 892-COUTURE</p>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <a href="#instagram" className="w-9 h-9 rounded-full bg-[#262220] flex items-center justify-center hover:bg-[#C5A880] hover:text-[#141212] transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#facebook" className="w-9 h-9 rounded-full bg-[#262220] flex items-center justify-center hover:bg-[#C5A880] hover:text-[#141212] transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#twitter" className="w-9 h-9 rounded-full bg-[#262220] flex items-center justify-center hover:bg-[#C5A880] hover:text-[#141212] transition-all">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 3: Navigation */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">Collections</h3>
          <ul className="space-y-2 text-xs text-[#A3998E]">
            <li><button onClick={() => setCurrentTab('shop')} className="hover:text-white transition-colors">Bridal Dresses</button></li>
            <li><button onClick={() => setCurrentTab('shop')} className="hover:text-white transition-colors">Formal Gowns</button></li>
            <li><button onClick={() => setCurrentTab('shop')} className="hover:text-white transition-colors">Luxury Pret</button></li>
            <li><button onClick={() => setCurrentTab('shop')} className="hover:text-white transition-colors">Party Wear</button></li>
            <li><button onClick={() => setCurrentTab('shop')} className="hover:text-white transition-colors">Kids Atelier</button></li>
            <li><button onClick={() => setCurrentTab('shop')} className="hover:text-white transition-colors">Men's Groom Suit</button></li>
          </ul>
        </div>

        {/* Col 4: Customer Care & Policies */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">Client Services</h3>
          <ul className="space-y-2 text-xs text-[#A3998E]">
            <li><button onClick={() => setCurrentTab('track-order')} className="hover:text-white transition-colors">Track Your Order</button></li>
            <li><button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-white transition-colors">Size & Fitting Guide</button></li>
            <li><button onClick={() => setCurrentTab('about')} className="hover:text-white transition-colors">About the Designer</button></li>
            <li><button onClick={() => setCurrentTab('blog')} className="hover:text-white transition-colors">Fashion Journal</button></li>
            <li><button onClick={() => setCurrentTab('contact')} className="hover:text-white transition-colors">Book Atelier Appointment</button></li>
            <li><a href="#privacy" className="hover:text-white transition-colors">Privacy & Refund Policy</a></li>
          </ul>
        </div>

        {/* Col 5: Newsletter */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">The Couture Private Circle</h3>
          <p className="text-xs text-[#A3998E]">
            Subscribe to receive private invitations to runway previews, new arrival drops, and 10% off your first order.
          </p>

          {!newsletterClaimed ? (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#221F1E] border border-[#36322F] rounded-lg px-3 py-2 text-xs text-white placeholder-[#6E665E] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#C5A880] text-[#141212] font-semibold text-xs py-2 rounded-lg hover:bg-[#D5B890] transition-all uppercase tracking-wider"
              >
                Join Private List
              </button>
            </form>
          ) : (
            <div className="p-3 bg-[#222E21] border border-[#3E5C3C] rounded-lg text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-green-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Welcome to the Atelier Circle!
              </div>
              <p className="text-[11px] text-green-200">
                Use code <span className="font-mono font-bold bg-[#141212] px-1.5 py-0.5 rounded text-white">ATELIER15</span> for 15% off at checkout.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Copyright & Accepted Payment Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#2A2624] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#A3998E]">
        <p>© 2026 Aria Vance Atelier Inc. All Rights Reserved.</p>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span>VISA</span>
          <span>MASTERCARD</span>
          <span>STRIPE</span>
          <span>PAYPAL</span>
          <span>APPLE PAY</span>
        </div>
      </div>
    </footer>
  );
};

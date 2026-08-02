import React from 'react';
import { Award, Scissors, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#C5A880] font-semibold">
          The Atelier Journey
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#181616] leading-tight">
          A Legacy of Bespoke Haute Couture
        </h1>
        <p className="text-xs sm:text-sm text-[#5C544E] leading-relaxed">
          Founded by creative director Aria Vance, our fashion house merges 16th-century royal hand-embroidery techniques with modern architectural silhouettes.
        </p>
      </div>

      {/* Main Grid: Image & Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#E8E2D9] shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
            alt="Aria Vance Master Designer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 text-white">
            <div>
              <h4 className="font-serif text-lg font-bold">Aria Vance</h4>
              <p className="text-xs text-[#C5A880] font-mono">Founder & Creative Director</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#5C544E] leading-relaxed">
          <h2 className="font-serif text-2xl font-bold text-[#181616]">Craftsmanship Without Compromise</h2>
          <p>
            Born in Milan and trained in Paris, Aria Vance spent over a decade studying traditional hand-zardozi wire embroidery, French Alençon lace cutting, and internal corsetry construction.
          </p>
          <p>
            In 2018, she launched Aria Vance Atelier with a single mission: to craft dresses that make every client feel like royalty on the most memorable days of their lives.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E8E2D9]">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] space-y-1">
              <h4 className="font-serif text-xl font-bold text-[#181616]">300+ Hours</h4>
              <p className="text-[11px] text-[#8C827A]">Average handwork per bridal gown</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] space-y-1">
              <h4 className="font-serif text-xl font-bold text-[#181616]">100% Pure Silk</h4>
              <p className="text-[11px] text-[#8C827A]">Sourced from Italian & French mills</p>
            </div>
          </div>
        </div>
      </div>

      {/* Studio & Accolades */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#E8E2D9] space-y-8">
        <div className="text-center max-w-md mx-auto space-y-2">
          <h3 className="font-serif text-2xl font-bold text-[#181616]">Recognized Internationally</h3>
          <p className="text-xs text-[#8C827A]">Featured in Vogue, Harper’s Bazaar & Elle Couture</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] text-center space-y-2">
            <Award className="w-8 h-8 text-[#C5A880] mx-auto" />
            <h4 className="font-serif font-bold text-[#181616]">Best Bridal Designer 2025</h4>
            <p className="text-xs text-[#8C827A]">International Fashion Awards Milan</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] text-center space-y-2">
            <Scissors className="w-8 h-8 text-[#C5A880] mx-auto" />
            <h4 className="font-serif font-bold text-[#181616]">Haute Couture Excellence</h4>
            <p className="text-xs text-[#8C827A]">Parisian Guild Certification</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#C5A880] mx-auto" />
            <h4 className="font-serif font-bold text-[#181616]">Ethical Artisan Atelier</h4>
            <p className="text-xs text-[#8C827A]">Fair wages & artisan preservation</p>
          </div>
        </div>
      </div>

    </div>
  );
};

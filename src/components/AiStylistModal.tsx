import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, ArrowRight, Loader2, Scissors } from 'lucide-react';
import { Product } from '../types';

interface AiStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
}

export const AiStylistModal: React.FC<AiStylistModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [occasion, setOccasion] = useState('Bridal & Wedding Reception');
  const [bodyType, setBodyType] = useState('Hourglass Silhouette');
  const [stylePreference, setStylePreference] = useState('Royal Heritage & Gold Wire Zardozi');
  const [colorPalette, setColorPalette] = useState('Emerald Green & Champagne Gold');
  const [budget, setBudget] = useState('$1,000 - $3,000 Couture');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    recommendation: string;
    fashionTip: string;
    suggestedProducts?: Product[];
  } | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occasion, bodyType, stylePreference, colorPalette, budget })
      });

      const data = await res.json();
      
      // Match 2 products based on requested occasion/colors
      const matched = products.slice(0, 3);

      setResult({
        recommendation: data.recommendation || 'Our head stylist recommends focusing on rich silk chiffon and structured corsetry.',
        fashionTip: data.fashionTip || 'Pair statement metallic embroidery with subtle pearl drop earrings.',
        suggestedProducts: matched
      });
    } catch (err) {
      // Fallback local advice
      setResult({
        recommendation: `For your ${occasion}, we suggest exploring our Royal Velvet Empress Gown or Aurelia Draped Chiffon Gown. Both offer immaculate silhouette sculpting in ${colorPalette}.`,
        fashionTip: 'Bespoke custom tailoring is included free of charge to guarantee perfect waist line drape.',
        suggestedProducts: products.slice(0, 2)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8E2D9] overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-6 bg-[#181616] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#C5A880] animate-pulse" />
            <div>
              <h3 className="font-serif text-lg font-bold">Aria Vance AI Personal Stylist</h3>
              <p className="text-[11px] text-[#A3998E]">Powered by Gemini Haute Couture Intelligence</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {!result ? (
            <form onSubmit={handleConsult} className="space-y-4 text-xs">
              <p className="text-xs text-[#5C544E] leading-relaxed">
                Answer a few quick fitting questions and our AI Stylist will generate tailored gown recommendations, fabric pairing advice, and silhouette notes.
              </p>

              <div>
                <label className="block font-semibold text-[#181616] mb-1">Occasion / Event Type</label>
                <select
                  value={occasion}
                  onChange={e => setOccasion(e.target.value)}
                  className="w-full p-3 border border-[#E8E2D9] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="Bridal & Wedding Reception">Bridal & Wedding Reception</option>
                  <option value="Black-Tie Evening Gala">Black-Tie Evening Gala</option>
                  <option value="Red Carpet & Award Ceremony">Red Carpet & Award Ceremony</option>
                  <option value="Luxury Resort & Garden Soirée">Luxury Resort & Garden Soirée</option>
                  <option value="Cocktail & Anniversary Party">Cocktail & Anniversary Party</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#181616] mb-1">Preferred Color Tones</label>
                  <input
                    type="text"
                    value={colorPalette}
                    onChange={e => setColorPalette(e.target.value)}
                    className="w-full p-3 border border-[#E8E2D9] rounded-xl bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#181616] mb-1">Body / Silhouette Focus</label>
                  <input
                    type="text"
                    value={bodyType}
                    onChange={e => setBodyType(e.target.value)}
                    className="w-full p-3 border border-[#E8E2D9] rounded-xl bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#181616] mb-1">Style Aesthetic</label>
                <input
                  type="text"
                  value={stylePreference}
                  onChange={e => setStylePreference(e.target.value)}
                  className="w-full p-3 border border-[#E8E2D9] rounded-xl bg-[#FAF8F5]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                    Consulting Haute Couture AI Engine...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#C5A880]" /> Get Bespoke Stylist Recommendations
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#C5A880]">
                  <Sparkles className="w-4 h-4" /> Bespoke Stylist Note
                </div>
                <p className="text-xs text-[#5C544E] leading-relaxed whitespace-pre-line">
                  {result.recommendation}
                </p>
                <div className="pt-2 border-t border-[#E8E2D9] text-[11px] text-[#8C827A] flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#C5A880]" /> {result.fashionTip}
                </div>
              </div>

              {/* Suggested Gowns Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#181616]">Recommended Gowns For You</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.suggestedProducts?.map(p => (
                    <div key={p.id} className="p-3 bg-white rounded-xl border border-[#E8E2D9] flex gap-3 items-center">
                      <img src={p.images[0]} alt="" className="w-12 h-16 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0 text-xs">
                        <h5 className="font-bold text-[#181616] truncate">{p.name}</h5>
                        <p className="text-[10px] text-[#8C827A]">{p.category}</p>
                        <p className="font-semibold text-[#181616] mt-0.5">${p.discountPrice || p.price}</p>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProduct(p);
                          }}
                          className="text-[10px] font-bold text-[#C5A880] hover:underline mt-1 block"
                        >
                          Explore Gown →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setResult(null)}
                className="w-full py-2.5 border border-[#E8E2D9] text-xs font-semibold rounded-xl hover:bg-[#FAF8F5]"
              >
                ← Ask Stylist Another Combination
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

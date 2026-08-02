import React from 'react';
import { X, Scissors, Check, HelpCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 border border-[#E8E2D9] my-6">
        
        <div className="flex justify-between items-center border-b border-[#E8E2D9] pb-4">
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-[#C5A880]" />
            <h3 className="font-serif text-xl font-bold text-[#181616]">Atelier Size & Measurement Guide</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-black rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#5C544E] leading-relaxed">
          Every gown at Aria Vance is tailored according to luxury European sizing conventions. Use a soft measuring tape fitted snugly over unpadded undergarments.
        </p>

        {/* Measurement Table */}
        <div className="overflow-x-auto rounded-xl border border-[#E8E2D9]">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF8F5] text-[#8C827A] uppercase font-mono">
              <tr>
                <th className="p-3">Size Tag</th>
                <th className="p-3">Bust (in)</th>
                <th className="p-3">Waist (in)</th>
                <th className="p-3">Hips (in)</th>
                <th className="p-3">US Size</th>
                <th className="p-3">UK / EU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EFEA]">
              <tr>
                <td className="p-3 font-bold">XS</td>
                <td className="p-3">31.5" - 33"</td>
                <td className="p-3">24" - 25.5"</td>
                <td className="p-3">34.5" - 36"</td>
                <td className="p-3">0 - 2</td>
                <td className="p-3">UK 6 / EU 34</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">S</td>
                <td className="p-3">33.5" - 35"</td>
                <td className="p-3">26" - 27.5"</td>
                <td className="p-3">36.5" - 38"</td>
                <td className="p-3">4 - 6</td>
                <td className="p-3">UK 8 / EU 36</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">M</td>
                <td className="p-3">35.5" - 37"</td>
                <td className="p-3">28" - 29.5"</td>
                <td className="p-3">38.5" - 40"</td>
                <td className="p-3">8 - 10</td>
                <td className="p-3">UK 10 / EU 38</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">L</td>
                <td className="p-3">37.5" - 39.5"</td>
                <td className="p-3">30" - 32"</td>
                <td className="p-3">40.5" - 42.5"</td>
                <td className="p-3">12 - 14</td>
                <td className="p-3">UK 12 / EU 40</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">XL</td>
                <td className="p-3">40" - 42"</td>
                <td className="p-3">32.5" - 34.5"</td>
                <td className="p-3">43" - 45"</td>
                <td className="p-3">16</td>
                <td className="p-3">UK 14 / EU 42</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bespoke Custom Fitting Note */}
        <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#C5A880]/40 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#181616]">
            <Scissors className="w-4 h-4 text-[#C5A880]" /> Bespoke Custom Fitting Service
          </div>
          <p className="text-[#5C544E] text-[11px] leading-relaxed">
            Need custom proportions? Select <strong>"Custom Stitching"</strong> at product view and provide your exact bust, waist, hips, and total height measurements. Our master tailors will craft your gown to your personal measurements at no extra fee.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase rounded-xl hover:bg-[#C5A880]"
        >
          Close Size Guide
        </button>

      </div>
    </div>
  );
};

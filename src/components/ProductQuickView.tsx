import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Shield, Scissors, Sparkles, Check } from 'lucide-react';
import { Product, SizeType, CustomMeasurements } from '../types';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, size: SizeType, color: string, custom?: CustomMeasurements) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onOpenFullDetail: (p: Product) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenFullDetail,
  setIsSizeGuideOpen
}) => {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<SizeType>(product.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.availableColors[0] || 'Standard');
  const [isCustomStitching, setIsCustomStitching] = useState(false);
  const [measurements, setMeasurements] = useState<CustomMeasurements>({
    bust: '',
    waist: '',
    hips: '',
    height: ''
  });

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  const handleAdd = () => {
    onAddToCart(
      product,
      isCustomStitching ? 'Custom Stitching' : selectedSize,
      selectedColor,
      isCustomStitching ? measurements : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-[#E8E2D9]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Images Gallery */}
          <div className="p-6 bg-[#FAF8F5] flex flex-col justify-between">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white border border-[#E8E2D9]">
              <img
                src={product.images[activeImageIdx]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Options */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-[#8C827A] font-mono uppercase tracking-wider mb-2">
                <span>{product.category}</span>
                <span>SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl font-bold text-[#181616] mb-2">{product.name}</h2>

              {/* Price & Rating */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F3EFEA]">
                <div className="flex items-baseline gap-2">
                  {hasDiscount ? (
                    <>
                      <span className="text-2xl font-bold text-[#181616]">${product.discountPrice}</span>
                      <span className="text-sm text-[#8C827A] line-through">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-[#181616]">${product.price}</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-[#8C827A]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#5C544E] leading-relaxed py-4">
                {product.description}
              </p>

              {/* Fabric Specs */}
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9] mb-5 text-xs space-y-1">
                <p><span className="font-semibold text-[#181616]">Fabric:</span> {product.fabric}</p>
                <p><span className="font-semibold text-[#181616]">Care:</span> {product.washingInstructions}</p>
              </div>

              {/* Color Selection */}
              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#181616] mb-2">
                  Color: <span className="text-[#8C827A] font-normal">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.availableColors.map((color, idx) => {
                    const hex = product.colorHexes[idx] || '#181616';
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                          selectedColor === color 
                            ? 'border-[#181616] bg-[#181616] text-white font-medium shadow-sm' 
                            : 'border-[#E8E2D9] bg-white text-[#181616] hover:border-[#8C827A]'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: hex }} />
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#181616]">
                    Select Size
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#C5A880] underline flex items-center gap-1 hover:text-[#181616]"
                  >
                    <Scissors className="w-3 h-3" /> Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.availableSizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSize(sz);
                        if (sz === 'Custom Stitching') setIsCustomStitching(true);
                        else setIsCustomStitching(false);
                      }}
                      className={`py-2 text-xs rounded-lg border font-medium transition-all ${
                        selectedSize === sz && !isCustomStitching
                          ? 'border-[#181616] bg-[#181616] text-white'
                          : 'border-[#E8E2D9] bg-white text-[#181616] hover:border-[#8C827A]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Stitching Toggle */}
              <div className="mb-6 bg-[#FDFBF7] p-4 rounded-xl border border-[#C5A880]/40">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-xs font-semibold text-[#181616]">Request Bespoke Custom Tailoring</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isCustomStitching}
                    onChange={e => setIsCustomStitching(e.target.checked)}
                    className="w-4 h-4 accent-[#181616]"
                  />
                </label>

                {isCustomStitching && (
                  <div className="mt-3 pt-3 border-t border-[#E8E2D9] grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Bust (inches)"
                      value={measurements.bust}
                      onChange={e => setMeasurements({...measurements, bust: e.target.value})}
                      className="p-2 text-xs border rounded bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Waist (inches)"
                      value={measurements.waist}
                      onChange={e => setMeasurements({...measurements, waist: e.target.value})}
                      className="p-2 text-xs border rounded bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Hips (inches)"
                      value={measurements.hips}
                      onChange={e => setMeasurements({...measurements, hips: e.target.value})}
                      className="p-2 text-xs border rounded bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Total Height (ft/in)"
                      value={measurements.height}
                      onChange={e => setMeasurements({...measurements, height: e.target.value})}
                      className="p-2 text-xs border rounded bg-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#F3EFEA]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 bg-[#181616] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    isWishlisted 
                      ? 'bg-rose-50 border-rose-200 text-rose-600' 
                      : 'border-[#E8E2D9] text-[#181616] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenFullDetail(product);
                }}
                className="w-full text-center text-xs text-[#8C827A] hover:text-[#181616] underline pt-1"
              >
                View Full Product Story & Verified Reviews →
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

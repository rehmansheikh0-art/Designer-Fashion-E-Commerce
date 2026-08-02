import React, { useState } from 'react';
import { 
  X, Star, Heart, ShoppingBag, ShieldCheck, Truck, Scissors, 
  RotateCcw, Sparkles, Check, ChevronRight, MessageSquare, ThumbsUp 
} from 'lucide-react';
import { Product, SizeType, ProductReview, CustomMeasurements } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, size: SizeType, color: string, custom?: CustomMeasurements) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  onAddReview: (productId: string, review: Omit<ProductReview, 'id'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  setIsSizeGuideOpen,
  onAddReview
}) => {
  if (!product) return null;

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<SizeType>(product.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.availableColors[0] || 'Standard');
  const [isCustom, setIsCustom] = useState(false);
  const [measurements, setMeasurements] = useState<CustomMeasurements>({
    bust: '',
    waist: '',
    hips: '',
    height: '',
    specialNotes: ''
  });

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revTitle, setRevTitle] = useState('');
  const [revComment, setRevComment] = useState('');

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revTitle.trim() || !revComment.trim()) return;

    onAddReview(product.id, {
      userName: revName,
      rating: revRating,
      date: new Date().toISOString().split('T')[0],
      title: revTitle,
      comment: revComment,
      verifiedPurchase: true
    });

    setShowReviewForm(false);
    setRevName('');
    setRevTitle('');
    setRevComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-[#E8E2D9] max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-4 bg-[#FAF8F5] border-b border-[#E8E2D9] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-[#8C827A] uppercase font-mono">
            <span>Catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#181616]">{product.name}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-10">
          
          {/* Main Top Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Gallery Left */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-[#F5F2ED] rounded-2xl overflow-hidden border border-[#E8E2D9]">
                <img
                  src={product.images[activeImgIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIdx(i)}
                    className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImgIdx === i ? 'border-[#181616] ring-2 ring-[#C5A880]/40' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details & Specs Right */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880] font-semibold">
                  {product.collection}
                </span>
                <h1 className="font-serif text-3xl font-bold text-[#181616] mt-1">{product.name}</h1>
                <p className="text-xs text-[#8C827A] font-mono mt-1">SKU: {product.sku}</p>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]">
                <div>
                  {hasDiscount ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[#181616]">${product.discountPrice}</span>
                      <span className="text-sm text-[#8C827A] line-through">${product.price}</span>
                      <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                        Save ${product.price - (product.discountPrice || 0)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-[#181616]">${product.price}</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-[#8C827A]">({product.reviewsCount} Reviews)</span>
                </div>
              </div>

              {/* Overview */}
              <p className="text-xs sm:text-sm text-[#5C544E] leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatches */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#181616] mb-2">
                  Select Color: <span className="text-[#8C827A] font-normal">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.availableColors.map((color, idx) => {
                    const hex = product.colorHexes[idx] || '#181616';
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
                          selectedColor === color 
                            ? 'border-[#181616] bg-[#181616] text-white shadow' 
                            : 'border-[#E8E2D9] bg-white text-[#181616] hover:border-[#8C827A]'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-gray-300" style={{ backgroundColor: hex }} />
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#181616]">
                    Select Size
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#C5A880] underline flex items-center gap-1 hover:text-[#181616]"
                  >
                    <Scissors className="w-3.5 h-3.5" /> View Size Measurements Chart
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.availableSizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSize(sz);
                        if (sz === 'Custom Stitching') setIsCustom(true);
                        else setIsCustom(false);
                      }}
                      className={`py-2.5 text-xs rounded-xl border font-semibold transition-all ${
                        selectedSize === sz && !isCustom
                          ? 'border-[#181616] bg-[#181616] text-white shadow-sm'
                          : 'border-[#E8E2D9] bg-white text-[#181616] hover:border-[#8C827A]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bespoke Fitting Box */}
              <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#C5A880]/50 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-xs font-semibold text-[#181616]">Bespoke Custom Tailoring Form</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isCustom}
                    onChange={e => setIsCustom(e.target.checked)}
                    className="w-4 h-4 accent-[#181616]"
                  />
                </label>

                {isCustom && (
                  <div className="pt-3 border-t border-[#E8E2D9] grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Bust (e.g. 36 in)"
                      value={measurements.bust}
                      onChange={e => setMeasurements({...measurements, bust: e.target.value})}
                      className="p-2 text-xs border rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Waist (e.g. 28 in)"
                      value={measurements.waist}
                      onChange={e => setMeasurements({...measurements, waist: e.target.value})}
                      className="p-2 text-xs border rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Hips (e.g. 39 in)"
                      value={measurements.hips}
                      onChange={e => setMeasurements({...measurements, hips: e.target.value})}
                      className="p-2 text-xs border rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Height (e.g. 5 ft 7 in)"
                      value={measurements.height}
                      onChange={e => setMeasurements({...measurements, height: e.target.value})}
                      className="p-2 text-xs border rounded-lg bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    onAddToCart(
                      product,
                      isCustom ? 'Custom Stitching' : selectedSize,
                      selectedColor,
                      isCustom ? measurements : undefined
                    );
                    onClose();
                  }}
                  className="flex-1 py-3.5 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-[#E8E2D9] text-[#181616] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>
          </div>

          {/* Specs Accordions & Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E8E2D9]">
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E2D9] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#181616]">Garment Craft & Details</h3>
              <ul className="space-y-2 text-xs text-[#5C544E]">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E2D9] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#181616]">Fabric & Care Preservation</h3>
              <div className="text-xs text-[#5C544E] space-y-2">
                <p><span className="font-semibold text-[#181616]">Composition:</span> {product.fabric}</p>
                <p><span className="font-semibold text-[#181616]">Care Protocol:</span> {product.washingInstructions}</p>
                <p className="text-[11px] text-[#8C827A] pt-2 border-t border-[#E8E2D9]">
                  Delivered inside an unbleached breathable cotton dust cover with a handcrafted cedarwood hanger.
                </p>
              </div>
            </div>
          </div>

          {/* Verified Customer Reviews Section */}
          <div className="pt-8 border-t border-[#E8E2D9] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#181616]">Client Reviews</h3>
                <p className="text-xs text-[#8C827A]">Real feedback from verified haute couture buyers</p>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 bg-[#181616] text-[#FAF8F5] text-xs font-semibold rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all"
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E2D9] space-y-4">
                <h4 className="text-xs font-bold uppercase text-[#181616]">Share Your Fitting Experience</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={revName}
                    onChange={e => setRevName(e.target.value)}
                    className="p-2.5 text-xs border rounded-xl bg-white focus:outline-none focus:border-[#C5A880]"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#181616]">Rating:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          onClick={() => setRevRating(star)}
                          className={`w-5 h-5 cursor-pointer ${star <= revRating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <input
                  type="text"
                  required
                  placeholder="Review Headline (e.g. Stunning Embroidery & Fit!)"
                  value={revTitle}
                  onChange={e => setRevTitle(e.target.value)}
                  className="w-full p-2.5 text-xs border rounded-xl bg-white focus:outline-none focus:border-[#C5A880]"
                />

                <textarea
                  required
                  rows={3}
                  placeholder="Detailed thoughts on fabric texture, stitching, sizing..."
                  value={revComment}
                  onChange={e => setRevComment(e.target.value)}
                  className="w-full p-2.5 text-xs border rounded-xl bg-white focus:outline-none focus:border-[#C5A880]"
                />

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#181616] text-[#FAF8F5] text-xs font-bold rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all"
                >
                  Submit Verified Review
                </button>
              </form>
            )}

            {/* Existing Reviews List */}
            <div className="space-y-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map(rev => (
                  <div key={rev.id} className="p-4 bg-white rounded-xl border border-[#E8E2D9] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#181616]">{rev.userName}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#8C827A]">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3.5 h-3.5 ${idx < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>

                    <h5 className="text-xs font-bold text-[#181616]">{rev.title}</h5>
                    <p className="text-xs text-[#5C544E] leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-[#8C827A] bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]">
                  No client reviews written yet for this gown. Be the first to share your fitting experience!
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product, SizeType } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, size: SizeType, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<SizeType>(product.availableSizes[0] || 'M');

  const mainImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-xl border border-[#E8E2D9] overflow-hidden hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.isBridal && (
          <span className="bg-[#181616] text-[#FAF8F5] text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
            Bridal Couture
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-[#C5A880] text-[#181616] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
            New Arrival
          </span>
        )}
        {hasDiscount && (
          <span className="bg-[#8B0000] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
            Save ${product.price - (product.discountPrice || 0)}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm ${
          isWishlisted 
            ? 'bg-rose-50 text-rose-600 border border-rose-200' 
            : 'bg-white/80 backdrop-blur-sm text-[#2C2927] hover:bg-white hover:text-rose-600'
        }`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image Area */}
      <div 
        className="relative w-full aspect-[3/4] bg-[#F5F2ED] overflow-hidden cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={isHovered ? secondaryImage : mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover Action Overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 flex items-center justify-center gap-2 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-sm text-[#181616] font-medium text-xs rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-1.5 shadow"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, selectedSize, product.availableColors[0] || 'Standard');
            }}
            className="flex-1 py-2 px-3 bg-[#181616] text-[#FAF8F5] font-medium text-xs rounded-lg hover:bg-[#C5A880] hover:text-[#181616] transition-colors flex items-center justify-center gap-1.5 shadow"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Collection */}
          <div className="flex items-center justify-between text-[11px] text-[#8C827A] font-mono tracking-wide uppercase mb-1">
            <span>{product.category}</span>
            <span>{product.availableSizes.length} Sizes</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-serif text-sm font-semibold text-[#181616] group-hover:text-[#C5A880] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Fabric Line */}
          <p className="text-[11px] text-[#5C544E] line-clamp-1 mt-0.5">
            {product.fabric}
          </p>

          {/* Color Swatches */}
          {product.colorHexes && product.colorHexes.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colorHexes.map((hex, idx) => (
                <span
                  key={idx}
                  style={{ backgroundColor: hex }}
                  className="w-3 h-3 rounded-full border border-gray-300 shadow-inner"
                  title={product.availableColors[idx]}
                />
              ))}
              <span className="text-[10px] text-[#8C827A] ml-1">{product.availableColors[0]}</span>
            </div>
          )}
        </div>

        {/* Rating & Pricing */}
        <div className="pt-3 mt-3 border-t border-[#F3EFEA] flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-[#181616]">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] text-[#8C827A]">({product.reviewsCount})</span>
          </div>

          <div className="text-right">
            {hasDiscount ? (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#8C827A] line-through">${product.price}</span>
                <span className="text-sm font-bold text-[#181616]">${product.discountPrice}</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-[#181616]">${product.price}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Grid3X3, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  Search, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Product, CategoryType, SizeType } from '../types';
import { ProductCard } from './ProductCard';

interface ShopViewProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, size: SizeType, color: string) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  initialCategory?: CategoryType | 'All';
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  initialCategory = 'All',
  searchQuery,
  setSearchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique categories, fabrics, colors, sizes
  const categories = ['All', 'Bridal Dresses', 'Formal Dresses', 'Casual Wear', 'Luxury Pret', 'Party Wear', 'Kids Collection', 'Men\'s Collection'];
  const fabrics = ['All', 'Silk', 'Velvet', 'Organza', 'Chiffon', 'Lace', 'Linen'];
  const colors = ['All', 'Emerald', 'Gold', 'Ivory', 'Red', 'Black', 'Rose', 'Navy'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'Custom Stitching'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesFab = p.fabric.toLowerCase().includes(q);
        const matchesSKU = p.sku.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesFab && !matchesSKU) return false;
      }

      // Price filter
      const effectivePrice = p.discountPrice || p.price;
      if (effectivePrice > priceRange) return false;

      // Size filter
      if (selectedSize !== 'All' && !p.availableSizes.includes(selectedSize as any)) return false;

      // Color filter
      if (selectedColor !== 'All') {
        const hasColor = p.availableColors.some(c => c.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }

      // Fabric filter
      if (selectedFabric !== 'All') {
        if (!p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) return false;
      }

      // Rating filter
      if (p.rating < minRating) return false;

      // In Stock
      if (onlyInStock && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, priceRange, selectedSize, selectedColor, selectedFabric, minRating, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setSelectedFabric('All');
    setPriceRange(5000);
    setMinRating(0);
    setOnlyInStock(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Banner */}
      <div className="bg-[#FAF8F5] p-6 sm:p-10 rounded-2xl border border-[#E8E2D9] text-center space-y-3 relative overflow-hidden">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#C5A880] font-semibold">
          Haute Couture Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#181616]">
          Designer Dresses & Atelier Couture
        </h1>
        <p className="text-xs sm:text-sm text-[#5C544E] max-w-xl mx-auto">
          Hand-stitched Italian velvets, French laces, and Zardozi embroidery crafted for life’s grandest celebrations.
        </p>

        {/* Category Pills Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#181616] text-[#FAF8F5] shadow-md'
                  : 'bg-white text-[#5C544E] border border-[#E8E2D9] hover:border-[#181616]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 space-y-6 flex-shrink-0">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
            <span className="font-serif text-sm font-bold uppercase tracking-wider text-[#181616] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" /> Filter Catalog
            </span>
            <button
              onClick={resetFilters}
              className="text-[11px] text-[#8C827A] hover:text-[#181616] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#181616]">
              <span>Max Price</span>
              <span>${priceRange}</span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#181616]"
            />
          </div>

          {/* Fabric Type */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#181616]">Fabric</label>
            <div className="flex flex-wrap gap-1.5">
              {fabrics.map(fab => (
                <button
                  key={fab}
                  onClick={() => setSelectedFabric(fab)}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                    selectedFabric === fab ? 'border-[#181616] bg-[#181616] text-white' : 'border-[#E8E2D9] text-[#5C544E] hover:border-[#8C827A]'
                  }`}
                >
                  {fab}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#181616]">Color Palette</label>
            <div className="flex flex-wrap gap-1.5">
              {colors.map(col => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                    selectedColor === col ? 'border-[#181616] bg-[#181616] text-white' : 'border-[#E8E2D9] text-[#5C544E] hover:border-[#8C827A]'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#181616]">Size</label>
            <div className="grid grid-cols-3 gap-1.5">
              {sizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-1.5 text-xs rounded-lg border font-medium text-center transition-all ${
                    selectedSize === sz ? 'border-[#181616] bg-[#181616] text-white' : 'border-[#E8E2D9] text-[#5C544E] hover:border-[#8C827A]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#181616]">Min Rating</label>
            <select
              value={minRating}
              onChange={e => setMinRating(Number(e.target.value))}
              className="w-full p-2 text-xs border border-[#E8E2D9] rounded-lg bg-white"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5★ & Above</option>
              <option value={4.8}>4.8★ & Above</option>
              <option value={5.0}>5.0★ Perfect Rating</option>
            </select>
          </div>

          {/* In Stock toggle */}
          <label className="flex items-center gap-2 text-xs text-[#181616] font-medium cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={e => setOnlyInStock(e.target.checked)}
              className="w-4 h-4 accent-[#181616]"
            />
            Show In-Stock Only
          </label>
        </aside>

        {/* Right Main Product Grid Content */}
        <main className="flex-1 space-y-6">
          
          {/* Top Control Bar (Search, Count, Sort, Grid Switch) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]">
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden px-3 py-2 bg-white border border-[#E8E2D9] rounded-lg text-xs font-medium flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5 text-[#C5A880]" /> Filters
              </button>
              <span className="text-xs text-[#5C544E] font-medium">
                Showing <strong className="text-[#181616]">{filteredProducts.length}</strong> Gowns
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#8C827A] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#E8E2D9] text-[#181616] text-xs py-1.5 px-3 rounded-lg focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>

              {/* Grid Layout Switcher */}
              <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-lg border border-[#E8E2D9]">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded ${gridCols === 3 ? 'bg-[#181616] text-white' : 'text-gray-400 hover:text-black'}`}
                  title="3 Columns Grid"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded ${gridCols === 4 ? 'bg-[#181616] text-white' : 'text-gray-400 hover:text-black'}`}
                  title="4 Columns Grid"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridCols} gap-6`}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9]">
              <Search className="w-10 h-10 text-[#8C827A] mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#181616]">No Couture Dresses Match Your Search</h3>
              <p className="text-xs text-[#5C544E] max-w-sm mx-auto">
                Try adjusting your price filter, fabric selection, or category pills to explore our full dress catalog.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#181616] text-[#FAF8F5] text-xs font-semibold rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};

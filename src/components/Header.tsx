import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ChevronDown,
  Compass,
  Scissors
} from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  setIsCartOpen: (open: boolean) => void;
  setIsAiStylistOpen: (open: boolean) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  cartCount,
  wishlistCount,
  setIsCartOpen,
  setIsAiStylistOpen,
  setIsSizeGuideOpen,
  products,
  onSelectProduct,
  isAdmin,
  setIsAdmin,
  searchQuery,
  setSearchQuery
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredSearchResults, setFilteredSearchResults] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matched = products.filter(
        p => p.name.toLowerCase().includes(q) ||
             p.category.toLowerCase().includes(q) ||
             p.fabric.toLowerCase().includes(q) ||
             p.collection.toLowerCase().includes(q)
      ).slice(0, 5);
      setFilteredSearchResults(matched);
    } else {
      setFilteredSearchResults([]);
    }
  }, [searchQuery, products]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Couture' },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'collections', label: 'Collections' },
    { id: 'about', label: 'About Designer' },
    { id: 'blog', label: 'Journal' },
    { id: 'track-order', label: 'Track Order' },
    { id: 'contact', label: 'Contact & Atelier' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#181616] text-[#F3EFEA] text-xs py-2 px-4 flex justify-between items-center overflow-hidden">
        <div className="hidden sm:flex items-center gap-6 text-[11px] uppercase tracking-wider text-[#D5C5B1]">
          <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Worldwide Express Shipping</span>
          <span className="flex items-center gap-1.5"><Scissors className="w-3.5 h-3.5" /> Bespoke Custom Fitting Available</span>
        </div>
        <div className="mx-auto sm:mx-0 font-medium flex items-center gap-2">
          <span>Complimentary Couture Gift Box on Orders Over $500</span>
          <span className="bg-[#C5A880] text-[#181616] px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider">CODE: BRIDAL20</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-[#D5C5B1]">
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="hover:text-white flex items-center gap-1 bg-[#2C2927] px-2 py-0.5 rounded border border-[#3D3936] transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
            {isAdmin ? 'Exit Admin Mode' : 'Admin Panel Switch'}
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Mobile Menu Trigger & Search */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#2C2927] hover:bg-[#EFECE6] rounded-md transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* AI Stylist Button */}
            <button
              onClick={() => setIsAiStylistOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-[#181616] to-[#36322F] text-[#FAF8F5] text-xs rounded-full border border-[#C5A880]/30 hover:border-[#C5A880] transition-all shadow-sm group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
              <span className="font-medium tracking-wide">AI Personal Stylist</span>
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setCurrentTab('home')}>
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-light uppercase text-[#181616]">
              Aria Vance
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#8C827A] uppercase font-mono -mt-1">
              Haute Couture • Atelier
            </span>
          </div>

          {/* Right: Actions (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className="p-2 text-[#2C2927] hover:bg-[#EFECE6] rounded-full transition-colors relative"
                title="Search Collection"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Live Search Popup Overlay */}
              {isSearchOpen && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white border border-[#E8E2D9] rounded-xl shadow-2xl p-3 z-50">
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 text-[#8C827A] absolute left-3" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search dresses, silk, velvet, bridal..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 text-xs bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg focus:outline-none focus:border-[#C5A880]"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-2 text-xs text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Search Autocomplete Results */}
                  {filteredSearchResults.length > 0 && (
                    <div className="mt-3 divide-y divide-[#F3EFEA] max-h-72 overflow-y-auto">
                      <div className="text-[10px] uppercase font-semibold text-[#8C827A] px-2 py-1 tracking-wider">
                        Matched Products ({filteredSearchResults.length})
                      </div>
                      {filteredSearchResults.map(prod => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            onSelectProduct(prod);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 hover:bg-[#FAF8F5] rounded-md cursor-pointer transition-colors"
                        >
                          <img src={prod.images[0]} alt={prod.name} className="w-10 h-12 object-cover rounded" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-[#181616] truncate">{prod.name}</h4>
                            <p className="text-[10px] text-[#8C827A]">{prod.category} • {prod.fabric.split('&')[0]}</p>
                            <span className="text-xs font-semibold text-[#181616]">${prod.discountPrice || prod.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchQuery && filteredSearchResults.length === 0 && (
                    <div className="p-4 text-center text-xs text-[#8C827A]">
                      No dresses found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Size Guide Trigger */}
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="hidden md:flex p-2 text-[#2C2927] hover:bg-[#EFECE6] rounded-full transition-colors text-xs font-medium"
              title="Size Guide & Custom Stitching"
            >
              <Scissors className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setCurrentTab('wishlist')}
              className="p-2 text-[#2C2927] hover:bg-[#EFECE6] rounded-full transition-colors relative"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A880] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Account */}
            <button
              onClick={() => setCurrentTab('account')}
              className="p-2 text-[#2C2927] hover:bg-[#EFECE6] rounded-full transition-colors"
              title="Customer Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#181616] text-[#FAF8F5] px-3.5 py-2 rounded-full hover:bg-[#2C2927] transition-all cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:inline">Bag</span>
              <span className="w-5 h-5 bg-[#C5A880] text-[#181616] text-[11px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links Bar */}
        <nav className="hidden lg:flex items-center justify-center gap-8 py-3 border-t border-[#E8E2D9]">
          {navLinks.map(link => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === 'new-arrivals') {
                    setCurrentTab('shop');
                  } else if (link.id === 'collections') {
                    setCurrentTab('shop');
                  } else {
                    setCurrentTab(link.id);
                  }
                }}
                className={`text-xs uppercase tracking-[0.15em] font-medium transition-all relative py-1 cursor-pointer ${
                  isActive 
                    ? 'text-[#181616] font-semibold' 
                    : 'text-[#5C544E] hover:text-[#181616]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-[2px] bg-[#C5A880]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[112px] bg-[#FAF8F5] z-50 p-6 flex flex-col justify-between border-t border-[#E8E2D9] overflow-y-auto">
          <div className="space-y-4">
            <button
              onClick={() => setIsAiStylistOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#181616] text-[#FAF8F5] rounded-xl text-xs font-medium"
            >
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              Launch AI Personal Stylist
            </button>

            <div className="divide-y divide-[#E8E2D9] pt-2">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentTab(link.id === 'new-arrivals' || link.id === 'collections' ? 'shop' : link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3.5 text-left text-sm uppercase tracking-wider text-[#181616] font-medium flex justify-between items-center"
                >
                  <span>{link.label}</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-[#8C827A]" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#E8E2D9] space-y-3 text-center">
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs bg-[#EFECE6] border border-[#D5C5B1] rounded-lg text-[#181616] font-medium"
            >
              {isAdmin ? 'Exit Admin Mode' : 'Switch to Admin Panel'}
            </button>
            <p className="text-[11px] text-[#8C827A]">Customer Support: concierge@ariavance.com</p>
          </div>
        </div>
      )}
    </header>
  );
};

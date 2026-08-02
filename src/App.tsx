import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  Footer 
} from './components/Footer';
import { 
  ProductCard 
} from './components/ProductCard';
import { 
  ProductQuickView 
} from './components/ProductQuickView';
import { 
  ProductDetailModal 
} from './components/ProductDetailModal';
import { 
  ShopView 
} from './components/ShopView';
import { 
  CartDrawer 
} from './components/CartDrawer';
import { 
  CheckoutView 
} from './components/CheckoutView';
import { 
  OrderTrackingView 
} from './components/OrderTrackingView';
import { 
  CustomerDashboard 
} from './components/CustomerDashboard';
import { 
  AdminPanel 
} from './components/AdminPanel';
import { 
  AiStylistModal 
} from './components/AiStylistModal';
import { 
  SizeGuideModal 
} from './components/SizeGuideModal';
import { 
  AboutView 
} from './components/AboutView';
import { 
  BlogView 
} from './components/BlogView';
import { 
  ContactView 
} from './components/ContactView';

import { 
  Product, 
  Order, 
  Coupon, 
  CartItem, 
  SizeType, 
  CustomMeasurements, 
  OrderStatus, 
  ProductReview, 
  UserProfile 
} from './types';
import { 
  getStoredProducts, 
  saveProducts, 
  getStoredOrders, 
  saveOrders, 
  saveSingleOrder, 
  getStoredCoupons, 
  saveCoupons, 
  getStoredCart, 
  saveCart, 
  getStoredWishlist, 
  saveWishlist, 
  getStoredUser, 
  saveUser 
} from './utils/storage';
import { TESTIMONIALS } from './data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Scissors, 
  Star, 
  Instagram, 
  Heart, 
  Eye, 
  ShoppingBag,
  ChevronRight
} from 'lucide-react';

export default function App() {
  // Navigation Tab
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [trackingOrderId, setTrackingOrderId] = useState<string>('');

  // Persistent States
  const [products, setProducts] = useState<Product[]>(getStoredProducts());
  const [orders, setOrders] = useState<Order[]>(getStoredOrders());
  const [coupons, setCoupons] = useState<Coupon[]>(getStoredCoupons());
  const [cart, setCart] = useState<CartItem[]>(getStoredCart());
  const [wishlist, setWishlist] = useState<string[]>(getStoredWishlist());
  const [user, setUser] = useState<UserProfile | null>(getStoredUser());
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Admin Mode Toggle
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isAiStylistOpen, setIsAiStylistOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [detailModalProduct, setDetailModalProduct] = useState<Product | null>(null);

  // Save changes to storage whenever state updates
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    saveWishlist(wishlist);
  }, [wishlist]);

  // Handle Cart Operations
  const handleAddToCart = (
    product: Product, 
    size: SizeType, 
    color: string, 
    custom?: CustomMeasurements
  ) => {
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id && 
              item.selectedSize === size && 
              item.selectedColor === color
    );

    if (existingIndex >= 0) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: 'cart-item-' + Date.now(),
        product,
        selectedSize: size,
        selectedColor: color,
        quantity: 1,
        customMeasurements: custom
      };
      setCart([...cart, newItem]);
    }
    setIsCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart(cart.filter(item => item.id !== cartItemId));
  };

  // Handle Wishlist Toggle
  const handleToggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Handle Admin Product Changes
  const handleAddProduct = (newP: Product) => {
    const updated = [newP, ...products];
    setProducts(updated);
    saveProducts(updated);
  };

  const handleUpdateProduct = (updatedP: Product) => {
    const updated = products.map(p => p.id === updatedP.id ? updatedP : p);
    setProducts(updated);
    saveProducts(updated);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
  };

  // Handle Order Status Changes (Admin)
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(o => {
      if (o.id === orderId) {
        // Update status and append tracking step
        const updatedSteps = o.trackingHistory.map(step => {
          if (step.status === newStatus) {
            return { ...step, completed: true, timestamp: new Date().toLocaleString() };
          }
          return step;
        });
        return { ...o, status: newStatus, trackingHistory: updatedSteps };
      }
      return o;
    });
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  // Handle New Order Placed
  const handleOrderPlaced = (newOrder: Order) => {
    saveSingleOrder(newOrder);
    setOrders([newOrder, ...orders]);
  };

  // Handle Coupon Toggle / Creation
  const handleAddCoupon = (c: Coupon) => {
    const updated = [...coupons, c];
    setCoupons(updated);
    saveCoupons(updated);
  };

  const handleToggleCoupon = (code: string) => {
    const updated = coupons.map(c => c.code === code ? { ...c, active: !c.active } : c);
    setCoupons(updated);
    saveCoupons(updated);
  };

  // Handle Add Product Review
  const handleAddReview = (productId: string, review: Omit<ProductReview, 'id'>) => {
    const fullReview: ProductReview = { ...review, id: 'rev-' + Date.now() };
    const updatedProds = products.map(p => {
      if (p.id === productId) {
        const newReviews = [fullReview, ...p.reviews];
        const newRating = newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
        return { ...p, reviews: newReviews, rating: newRating, reviewsCount: newReviews.length };
      }
      return p;
    });
    setProducts(updatedProds);
    saveProducts(updatedProds);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181616] flex flex-col font-sans selection:bg-[#C5A880] selection:text-white">
      
      {/* Global Header */}
      <Header
        currentTab={isAdmin ? 'admin' : currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        setIsCartOpen={setIsCartDrawerOpen}
        setIsAiStylistOpen={setIsAiStylistOpen}
        setIsSizeGuideOpen={setIsSizeGuideOpen}
        products={products}
        onSelectProduct={(p) => setDetailModalProduct(p)}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Body Render */}
      <main className="flex-1">
        {isAdmin ? (
          <AdminPanel
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            coupons={coupons}
            onAddCoupon={handleAddCoupon}
            onToggleCoupon={handleToggleCoupon}
          />
        ) : (
          <>
            {/* HOMEPAGE VIEW */}
            {currentTab === 'home' && (
              <div className="space-y-16 pb-16">
                
                {/* 1. Full Screen Fashion Hero Banner */}
                <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-[#141212] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=2000&q=90"
                    alt="Royal Couture Gowns"
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-50 scale-105 transform hover:scale-100 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141212] via-[#141212]/30 to-transparent" />

                  <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-6 pt-12">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-mono uppercase tracking-[0.25em] text-[#E5D2BA]">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> The 2026 Royal Heritage Collection
                    </span>

                    <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-[0.1em] leading-tight">
                      Haute Couture <br />
                      <span className="font-semibold text-[#C5A880] italic font-serif">Redefined.</span>
                    </h1>

                    <p className="text-xs sm:text-sm text-[#D5C5B1] max-w-xl mx-auto font-light leading-relaxed">
                      Italian micro velvet, French lace, and hand-zardozi wire embroidery tailored for life’s grandest moments.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                      <button
                        onClick={() => setCurrentTab('shop')}
                        className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] text-[#141212] font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Explore Couture Catalog <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setIsAiStylistOpen(true)}
                        className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-[#141212] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#C5A880]" /> Ask AI Stylist
                      </button>
                    </div>
                  </div>
                </section>

                {/* 2. Featured Categories Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <div className="text-center space-y-2">
                    <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C5A880] font-semibold">
                      Curated Collections
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-[#181616]">Explore By Category</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      { title: 'Bridal Dresses', img: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80', cat: 'Bridal Dresses' },
                      { title: 'Formal Dresses', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80', cat: 'Formal Dresses' },
                      { title: 'Luxury Pret', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80', cat: 'Luxury Pret' },
                      { title: 'Party Wear', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80', cat: 'Party Wear' }
                    ].map(item => (
                      <div
                        key={item.title}
                        onClick={() => setCurrentTab('shop')}
                        className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md border border-[#E8E2D9]"
                      >
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end text-white">
                          <h3 className="font-serif text-lg font-bold">{item.title}</h3>
                          <span className="text-[11px] text-[#C5A880] flex items-center gap-1 font-mono uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            View Collection <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Featured 20+ Products Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E2D9] pb-4">
                    <div>
                      <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C5A880] font-semibold">
                        Atelier Showcase
                      </span>
                      <h2 className="font-serif text-3xl font-bold text-[#181616]">Featured Designer Dresses</h2>
                    </div>
                    <button
                      onClick={() => setCurrentTab('shop')}
                      className="text-xs uppercase tracking-widest font-bold text-[#181616] hover:text-[#C5A880] flex items-center gap-1"
                    >
                      View All 20+ Dresses <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.slice(0, 8).map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelectProduct={(p) => setDetailModalProduct(p)}
                        onQuickView={(p) => setQuickViewProduct(p)}
                        onAddToCart={handleAddToCart}
                        isWishlisted={wishlist.includes(product.id)}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    ))}
                  </div>
                </section>

                {/* 4. AI Stylist Banner Callout */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-gradient-to-r from-[#181616] via-[#2C2927] to-[#181616] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-[#3D3936]">
                    <div className="space-y-3 max-w-xl text-center md:text-left">
                      <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                        <Sparkles className="w-4 h-4" /> Gemini Powered Advice
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold">Unsure Which Gown Fits Your Event?</h2>
                      <p className="text-xs sm:text-sm text-[#A3998E] leading-relaxed">
                        Consult our AI Personal Stylist for bespoke recommendations tailored to your silhouette, wedding dress code, and color palette.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAiStylistOpen(true)}
                      className="px-8 py-4 bg-[#C5A880] text-[#181616] font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all shadow-xl flex items-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                      Launch AI Stylist <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </section>

                {/* 5. Client Testimonials */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <div className="text-center space-y-2">
                    <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C5A880] font-semibold">
                      Client Words
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-[#181616]">Voices of Royalty</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map(t => (
                      <div key={t.id} className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-500" />
                            ))}
                          </div>
                          <p className="text-xs text-[#5C544E] italic leading-relaxed">"{t.quote}"</p>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-[#F3EFEA]">
                          <img src={t.avatar} alt="" className="w-10 h-10 rounded-full object-cover border" />
                          <div>
                            <h4 className="text-xs font-bold text-[#181616]">{t.name}</h4>
                            <p className="text-[10px] text-[#8C827A]">{t.role} • {t.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            )}

            {/* SHOP CATALOG TAB */}
            {currentTab === 'shop' && (
              <ShopView
                products={products}
                onSelectProduct={(p) => setDetailModalProduct(p)}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}

            {/* CHECKOUT TAB */}
            {currentTab === 'checkout' && (
              <CheckoutView
                cart={cart}
                appliedCoupon={appliedCoupon}
                onClearCart={() => setCart([])}
                onOrderPlaced={handleOrderPlaced}
                onNavigateToTracking={(id) => {
                  setTrackingOrderId(id);
                  setCurrentTab('track-order');
                }}
                onBackToShop={() => setCurrentTab('shop')}
              />
            )}

            {/* TRACK ORDER TAB */}
            {currentTab === 'track-order' && (
              <OrderTrackingView
                orders={orders}
                initialOrderId={trackingOrderId}
              />
            )}

            {/* CUSTOMER ACCOUNT DASHBOARD */}
            {currentTab === 'account' && (
              <CustomerDashboard
                user={user}
                orders={orders}
                products={products}
                wishlist={wishlist}
                onNavigateToTracking={(id) => {
                  setTrackingOrderId(id);
                  setCurrentTab('track-order');
                }}
                onSelectProduct={(p) => setDetailModalProduct(p)}
                onLogout={() => setUser(null)}
              />
            )}

            {/* WISHLIST TAB */}
            {currentTab === 'wishlist' && (
              <CustomerDashboard
                user={user}
                orders={orders}
                products={products}
                wishlist={wishlist}
                onNavigateToTracking={(id) => {
                  setTrackingOrderId(id);
                  setCurrentTab('track-order');
                }}
                onSelectProduct={(p) => setDetailModalProduct(p)}
                onLogout={() => setUser(null)}
              />
            )}

            {/* ABOUT DESIGNER TAB */}
            {currentTab === 'about' && <AboutView />}

            {/* JOURNAL / BLOG TAB */}
            {currentTab === 'blog' && <BlogView />}

            {/* CONTACT & ATELIER TAB */}
            {currentTab === 'contact' && <ContactView />}
          </>
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setCurrentTab('checkout')}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={(code) => {
          const c = coupons.find(item => item.code.toUpperCase() === code.toUpperCase());
          if (c) setAppliedCoupon(c);
        }}
        onRemoveCoupon={() => setAppliedCoupon(null)}
        coupons={coupons}
      />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenFullDetail={(p) => setDetailModalProduct(p)}
        setIsSizeGuideOpen={setIsSizeGuideOpen}
      />

      {/* Full Detail Modal */}
      <ProductDetailModal
        product={detailModalProduct}
        onClose={() => setDetailModalProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={detailModalProduct ? wishlist.includes(detailModalProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        setIsSizeGuideOpen={setIsSizeGuideOpen}
        onAddReview={handleAddReview}
      />

      {/* AI Stylist Modal */}
      <AiStylistModal
        isOpen={isAiStylistOpen}
        onClose={() => setIsAiStylistOpen(false)}
        products={products}
        onSelectProduct={(p) => setDetailModalProduct(p)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        setIsSizeGuideOpen={setIsSizeGuideOpen}
      />
    </div>
  );
}

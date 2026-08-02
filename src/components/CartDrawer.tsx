import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Scissors } from 'lucide-react';
import { CartItem, Coupon } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  coupons: Coupon[];
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  coupons
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = (subtotal * appliedCoupon.discountValue) / 100;
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const estimatedTax = subtotal > 0 ? (subtotal - discount) * 0.08 : 0;
  const estimatedShipping = subtotal > 500 || subtotal === 0 ? 0 : 25;
  const grandTotal = Math.max(0, subtotal - discount + estimatedTax + estimatedShipping);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const found = coupons.find(c => c.code.toUpperCase() === couponInput.trim().toUpperCase() && c.active);
    if (found) {
      onApplyCoupon(found.code);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try BRIDAL20 or FIRST10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#E8E2D9]">
          
          {/* Header */}
          <div className="p-5 bg-[#FAF8F5] border-b border-[#E8E2D9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#181616]" />
              <h2 className="font-serif text-lg font-bold text-[#181616]">Your Shopping Bag</h2>
              <span className="text-xs bg-[#181616] text-white px-2 py-0.5 rounded-full font-mono">
                {cart.length}
              </span>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#F3EFEA]">
            {cart.length > 0 ? (
              cart.map(item => {
                const itemPrice = item.product.discountPrice || item.product.price;
                return (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-xl border border-[#E8E2D9]"
                    />

                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-xs font-bold text-[#181616] line-clamp-1">{item.product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#8C827A]">
                        Size: <strong className="text-[#181616]">{item.selectedSize}</strong> • Color: <strong className="text-[#181616]">{item.selectedColor}</strong>
                      </p>

                      {item.customMeasurements && (
                        <div className="text-[10px] bg-[#FAF8F5] p-1.5 rounded border border-[#E8E2D9] text-[#5C544E] flex items-center gap-1">
                          <Scissors className="w-3 h-3 text-[#C5A880]" />
                          <span>Custom Fit: {item.customMeasurements.bust || 'Standard'}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#E8E2D9] rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#181616]">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#8C827A] mx-auto opacity-50" />
                <h3 className="font-serif text-base font-semibold text-[#181616]">Your Shopping Bag is Empty</h3>
                <p className="text-xs text-[#8C827A]">Explore our designer gowns and add your favorites.</p>
              </div>
            )}
          </div>

          {/* Bottom Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#FAF8F5] border-t border-[#E8E2D9] space-y-4">
              
              {/* Coupon Form */}
              <div>
                {!appliedCoupon ? (
                  <form onSubmit={handleCouponSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. BRIDAL20)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs border border-[#E8E2D9] rounded-lg bg-white uppercase focus:outline-none focus:border-[#C5A880]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#181616] text-white text-xs font-semibold rounded-lg hover:bg-[#C5A880] transition-all"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Tag className="w-3.5 h-3.5" /> Code {appliedCoupon.code} Applied (-${discount.toFixed(2)})
                    </div>
                    <button onClick={onRemoveCoupon} className="text-xs text-rose-600 hover:underline">
                      Remove
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[10px] text-rose-600 mt-1">{couponError}</p>}
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-[#5C544E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#181616]">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>{estimatedShipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${estimatedShipping}`}</span>
                </div>
                <div className="pt-2 border-t border-[#E8E2D9] flex justify-between text-sm font-bold text-[#181616]">
                  <span>Total</span>
                  <span className="text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

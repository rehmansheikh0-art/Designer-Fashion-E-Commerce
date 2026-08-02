import React, { useState } from 'react';
import { 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  ArrowLeft, 
  ShoppingBag, 
  Sparkles, 
  Lock,
  Scissors
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Coupon, Order, ShippingAddress, OrderStatus } from '../types';

interface CheckoutViewProps {
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  onClearCart: () => void;
  onOrderPlaced: (newOrder: Order) => void;
  onNavigateToTracking: (orderId: string) => void;
  onBackToShop: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  appliedCoupon,
  onClearCart,
  onOrderPlaced,
  onNavigateToTracking,
  onBackToShop
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Address State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Victoria Vance',
    email: 'victoria@example.com',
    phone: '+1 (555) 948-2041',
    address: '450 Fifth Avenue, Floor 18',
    city: 'New York',
    state: 'NY',
    zipCode: '10018',
    country: 'United States'
  });

  // Delivery Method State
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'bespoke'>('standard');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay' | 'cod' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Created Order state after placement
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Totals Calculation
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

  const shippingFee = deliveryMethod === 'standard' ? 0 : deliveryMethod === 'express' ? 25 : 50;
  const tax = (subtotal - discount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee + tax);

  const handleCompleteOrder = () => {
    const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const today = new Date().toISOString().split('T')[0];

    const newOrder: Order = {
      id: orderId,
      date: today,
      customerInfo: address,
      items: [...cart],
      subtotal,
      discount,
      shippingFee,
      tax,
      total: grandTotal,
      couponCode: appliedCoupon?.code,
      paymentMethod: paymentMethod === 'card' ? 'Credit Card (Visa)' : paymentMethod === 'paypal' ? 'PayPal' : paymentMethod === 'applepay' ? 'Apple Pay' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Direct Bank Transfer',
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      status: 'Order Received',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      courierName: 'DHL Express Couture',
      trackingNumber: 'DHL-' + Math.floor(1000000 + Math.random() * 9000000),
      trackingHistory: [
        { status: 'Order Received', timestamp: new Date().toLocaleString(), description: 'Order successfully received & verified.', completed: true },
        { status: 'Payment Confirmed', timestamp: new Date().toLocaleString(), description: 'Payment verified.', completed: true },
        { status: 'Processing', timestamp: 'Pending', description: 'Assigned to Atelier Master Tailors.', completed: false },
        { status: 'Stitching', timestamp: 'Pending', description: 'Handmade embroidery in progress.', completed: false },
        { status: 'Quality Check', timestamp: 'Pending', description: 'Passed luxury finish inspection.', completed: false },
        { status: 'Packed', timestamp: 'Pending', description: 'Packed in wooden couture box.', completed: false },
        { status: 'Shipped', timestamp: 'Pending', description: 'Handed to DHL Express.', completed: false },
        { status: 'Out for Delivery', timestamp: 'Pending', description: 'Local driver out for delivery.', completed: false },
        { status: 'Delivered', timestamp: 'Pending', description: 'Signed and delivered.', completed: false }
      ]
    };

    onOrderPlaced(newOrder);
    setPlacedOrder(newOrder);
    onClearCart();
    setStep(5);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore if missing canvas
    }
  };

  if (cart.length === 0 && step !== 5) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-[#8C827A] mx-auto opacity-50" />
        <h2 className="font-serif text-2xl font-bold text-[#181616]">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#5C544E]">Add dresses to your cart before proceeding to checkout.</p>
        <button
          onClick={onBackToShop}
          className="px-6 py-3 bg-[#181616] text-[#FAF8F5] text-xs font-semibold rounded-xl hover:bg-[#C5A880] transition-all"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Checkout Stepper Progress Header */}
      <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E2D9]">
        <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-semibold">
          {[
            { num: 1, label: 'Address' },
            { num: 2, label: 'Delivery' },
            { num: 3, label: 'Payment' },
            { num: 4, label: 'Review' },
            { num: 5, label: 'Confirmed' }
          ].map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step === s.num
                    ? 'bg-[#181616] text-white ring-4 ring-[#C5A880]/30'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-400 border border-[#E8E2D9]'
                }`}>
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[11px] uppercase tracking-wider ${step === s.num ? 'text-[#181616] font-bold' : 'text-[#8C827A]'}`}>
                  {s.label}
                </span>
              </div>
              {idx < 4 && (
                <div className={`flex-1 h-[2px] mx-2 ${step > s.num ? 'bg-emerald-600' : 'bg-[#E8E2D9]'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {step !== 5 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Area (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D9] space-y-6 shadow-sm">
                <div className="flex items-center gap-2 border-b border-[#E8E2D9] pb-4">
                  <MapPin className="w-5 h-5 text-[#C5A880]" />
                  <h3 className="font-serif text-lg font-bold text-[#181616]">Step 1: Shipping Address</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181616] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={e => setAddress({...address, fullName: e.target.value})}
                      className="w-full p-3 text-xs border border-[#E8E2D9] rounded-xl bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#181616] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={address.email}
                      onChange={e => setAddress({...address, email: e.target.value})}
                      className="w-full p-3 text-xs border border-[#E8E2D9] rounded-xl bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#181616] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={e => setAddress({...address, phone: e.target.value})}
                      className="w-full p-3 text-xs border border-[#E8E2D9] rounded-xl bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#181616] mb-1">Country</label>
                    <input
                      type="text"
                      required
                      value={address.country}
                      onChange={e => setAddress({...address, country: e.target.value})}
                      className="w-full p-3 text-xs border border-[#E8E2D9] rounded-xl bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#181616] mb-1">Street Address / Suite</label>
                    <input
                      type="text"
                      required
                      value={address.address}
                      onChange={e => setAddress({...address, address: e.target.value})}
                      className="w-full p-3 text-xs border border-[#E8E2D9] rounded-xl bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#181616] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={e => setAddress({...address, city: e.target.value})}
                      className="w-full p-3 text-xs border border-[#E8E2D9] rounded-xl bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#181616] mb-1">State / Province</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={e => setAddress({...address, state: e.target.value})}
                      className="w-full p-3 text-xs border border-[#E8E2D9] rounded-xl bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#181616] mb-1">Zip / Postal Code</label>
                    <input
                      type="text"
                      required
                      value={address.zipCode}
                      onChange={e => setAddress({...address, zipCode: e.target.value})}
                      className="w-full p-3 text-xs border border-[#E8E2D9] rounded-xl bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all"
                  >
                    Continue to Delivery →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Delivery Method */}
            {step === 2 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D9] space-y-6 shadow-sm">
                <div className="flex items-center gap-2 border-b border-[#E8E2D9] pb-4">
                  <Truck className="w-5 h-5 text-[#C5A880]" />
                  <h3 className="font-serif text-lg font-bold text-[#181616]">Step 2: Select Delivery Method</h3>
                </div>

                <div className="space-y-3">
                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === 'standard' ? 'border-[#181616] bg-[#FAF8F5] shadow-sm' : 'border-[#E8E2D9] bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'standard'}
                        onChange={() => setDeliveryMethod('standard')}
                        className="accent-[#181616]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#181616]">Complimentary Express Air Shipment</h4>
                        <p className="text-[11px] text-[#8C827A]">Estimated Delivery: 5–7 Business Days</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">FREE</span>
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === 'express' ? 'border-[#181616] bg-[#FAF8F5] shadow-sm' : 'border-[#E8E2D9] bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'express'}
                        onChange={() => setDeliveryMethod('express')}
                        className="accent-[#181616]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#181616]">Priority DHL International Courier</h4>
                        <p className="text-[11px] text-[#8C827A]">Estimated Delivery: 2–3 Business Days (Signature Required)</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#181616]">$25.00</span>
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === 'bespoke' ? 'border-[#181616] bg-[#FAF8F5] shadow-sm' : 'border-[#E8E2D9] bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'bespoke'}
                        onChange={() => setDeliveryMethod('bespoke')}
                        className="accent-[#181616]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#181616]">White-Glove Atelier White Box Delivery</h4>
                        <p className="text-[11px] text-[#8C827A]">Personal courier delivery with wooden garment trunk</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#181616]">$50.00</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-[#E8E2D9] text-xs font-semibold rounded-xl hover:bg-gray-50"
                  >
                    ← Back to Address
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-3 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D9] space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#C5A880]" />
                    <h3 className="font-serif text-lg font-bold text-[#181616]">Step 3: Secure Payment</h3>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3" /> 256-Bit SSL Encrypted
                  </span>
                </div>

                {/* Payment Type Selection */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card' },
                    { id: 'paypal', label: 'PayPal' },
                    { id: 'applepay', label: 'Apple Pay' },
                    { id: 'cod', label: 'Cash on Delivery' }
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                        paymentMethod === p.id 
                          ? 'border-[#181616] bg-[#181616] text-white shadow' 
                          : 'border-[#E8E2D9] bg-[#FAF8F5] text-[#181616] hover:border-[#8C827A]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Credit Card Details Form */}
                {paymentMethod === 'card' && (
                  <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8E2D9] space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#181616] mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full p-2.5 text-xs border border-[#E8E2D9] rounded-lg bg-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#181616] mb-1">Expiration</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 text-xs border border-[#E8E2D9] rounded-lg bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#181616] mb-1">CVC / CVV</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={e => setCardCvc(e.target.value)}
                          className="w-full p-2.5 text-xs border border-[#E8E2D9] rounded-lg bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                    <p className="font-semibold">Cash on Delivery selected.</p>
                    <p className="text-[11px] mt-1">Please prepare exact total in cash at time of courier delivery.</p>
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-[#E8E2D9] text-xs font-semibold rounded-xl hover:bg-gray-50"
                  >
                    ← Back to Delivery
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-8 py-3 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all"
                  >
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Order Review */}
            {step === 4 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D9] space-y-6 shadow-sm">
                <div className="flex items-center gap-2 border-b border-[#E8E2D9] pb-4">
                  <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
                  <h3 className="font-serif text-lg font-bold text-[#181616]">Step 4: Final Order Review</h3>
                </div>

                {/* Items Summary */}
                <div className="space-y-3 divide-y divide-[#F3EFEA]">
                  {cart.map(item => (
                    <div key={item.id} className="pt-3 first:pt-0 flex gap-4">
                      <img src={item.product.images[0]} alt="" className="w-14 h-18 object-cover rounded-lg border" />
                      <div className="flex-1 text-xs space-y-1">
                        <h4 className="font-serif font-bold text-[#181616]">{item.product.name}</h4>
                        <p className="text-[#8C827A]">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                        {item.customMeasurements && (
                          <p className="text-[10px] text-[#C5A880]">Custom Fitting Requested</p>
                        )}
                      </div>
                      <span className="text-xs font-bold">${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Address & Delivery recap */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs">
                  <div>
                    <h5 className="font-bold text-[#181616] uppercase tracking-wider mb-1">Shipping To</h5>
                    <p className="text-[#5C544E]">{address.fullName}</p>
                    <p className="text-[#5C544E]">{address.address}, {address.city}, {address.state} {address.zipCode}</p>
                    <p className="text-[#5C544E]">{address.phone}</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#181616] uppercase tracking-wider mb-1">Payment Method</h5>
                    <p className="text-[#5C544E] font-medium">{paymentMethod.toUpperCase()}</p>
                    <p className="text-[#5C544E] mt-2">Delivery: {deliveryMethod.toUpperCase()} courier</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 border border-[#E8E2D9] text-xs font-semibold rounded-xl hover:bg-gray-50"
                  >
                    ← Back to Payment
                  </button>

                  <button
                    onClick={handleCompleteOrder}
                    className="px-10 py-4 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all flex items-center gap-2 shadow-xl cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A880]" /> Place Order (${grandTotal.toFixed(2)})
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Summary Card Sidebar (Steps 1 to 4) */}
          <div className="space-y-6">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E2D9] space-y-4 sticky top-28">
              <h3 className="font-serif text-base font-bold text-[#181616] pb-3 border-b border-[#E8E2D9]">
                Order Summary ({cart.length} Gowns)
              </h3>

              <div className="space-y-2 text-xs text-[#5C544E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#181616]">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-[#E8E2D9] flex justify-between text-base font-bold text-[#181616]">
                  <span>Total Amount</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E2D9] text-[11px] text-[#8C827A] space-y-1">
                <p className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /> Insured Global Express Courier</p>
                <p className="flex items-center gap-1.5"><Scissors className="w-3.5 h-3.5 text-[#C5A880]" /> Handcrafted Tailoring Quality</p>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Step 5: Order Confirmation Screen */
        <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E2D9] shadow-2xl text-center space-y-8">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880] font-semibold">
              Payment Confirmed & Verified
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#181616]">Thank You For Your Order!</h2>
            <p className="text-xs sm:text-sm text-[#5C544E] max-w-md mx-auto">
              Your haute couture dress order has been received by our Atelier studio team.
            </p>
          </div>

          {/* Placed Order Specs Card */}
          {placedOrder && (
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E2D9] text-left space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D9] pb-4">
                <div>
                  <span className="text-[10px] text-[#8C827A] uppercase font-mono">Order Reference</span>
                  <h4 className="text-lg font-mono font-bold text-[#181616]">{placedOrder.id}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#8C827A] uppercase font-mono">Estimated Delivery</span>
                  <p className="text-xs font-bold text-emerald-700">{placedOrder.estimatedDelivery}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#181616]">Ordered Items</h5>
                {placedOrder.items.map(i => (
                  <div key={i.id} className="flex items-center justify-between text-xs py-1 border-b border-[#F3EFEA] last:border-0">
                    <span className="font-medium text-[#181616]">{i.product.name} ({i.selectedSize})</span>
                    <span className="font-bold">${((i.product.discountPrice || i.product.price) * i.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between text-xs font-bold text-[#181616]">
                <span>Total Paid:</span>
                <span>${placedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => placedOrder && onNavigateToTracking(placedOrder.id)}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all shadow-md cursor-pointer"
            >
              Track Order Real-Time →
            </button>
            <button
              onClick={onBackToShop}
              className="w-full sm:w-auto px-6 py-3.5 border border-[#E8E2D9] text-xs font-semibold rounded-xl hover:bg-[#FAF8F5]"
            >
              Return to Catalog
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

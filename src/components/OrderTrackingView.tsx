import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Scissors, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackingViewProps {
  orders: Order[];
  initialOrderId?: string;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({ orders, initialOrderId = '' }) => {
  const [searchOrderId, setSearchOrderId] = useState(initialOrderId || 'ORD-88291');
  const [searchEmail, setSearchEmail] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      const match = orders.find(o => o.id.toUpperCase() === initialOrderId.toUpperCase());
      if (match) {
        setFoundOrder(match);
        setSearchOrderId(initialOrderId);
      }
    } else {
      // Default to demo order ORD-88291
      const defaultMatch = orders.find(o => o.id === 'ORD-88291') || orders[0];
      if (defaultMatch) {
        setFoundOrder(defaultMatch);
        setSearchOrderId(defaultMatch.id);
      }
    }
  }, [initialOrderId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const match = orders.find(o => 
      o.id.trim().toUpperCase() === searchOrderId.trim().toUpperCase() ||
      (searchEmail.trim() && o.customerInfo.email.toLowerCase() === searchEmail.trim().toLowerCase())
    );
    setFoundOrder(match || null);
  };

  const allStatusSteps: OrderStatus[] = [
    'Order Received',
    'Payment Confirmed',
    'Processing',
    'Stitching',
    'Quality Check',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const getCurrentStepIndex = (status: OrderStatus) => {
    return allStatusSteps.indexOf(status);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Search Bar Header */}
      <div className="bg-[#FAF8F5] p-6 sm:p-10 rounded-2xl border border-[#E8E2D9] text-center space-y-4">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C5A880] font-semibold">
          Live Atelier Tracking System
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#181616]">
          Track Your Haute Couture Order
        </h1>
        <p className="text-xs sm:text-sm text-[#5C544E] max-w-lg mx-auto">
          Enter your Order Reference Number (e.g. <strong className="font-mono">ORD-88291</strong>) or your registration email to trace stitching and delivery.
        </p>

        {/* Quick Demo Order Chips */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="text-[11px] text-[#8C827A]">Try Demo Order:</span>
          {orders.slice(0, 3).map(o => (
            <button
              key={o.id}
              onClick={() => {
                setSearchOrderId(o.id);
                setFoundOrder(o);
                setHasSearched(true);
              }}
              className="px-2.5 py-1 text-xs font-mono font-semibold bg-white border border-[#E8E2D9] rounded-lg hover:border-[#181616] transition-all"
            >
              {o.id} ({o.status})
            </button>
          ))}
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 pt-3">
          <input
            type="text"
            required
            placeholder="Order Number (e.g. ORD-88291)"
            value={searchOrderId}
            onChange={e => setSearchOrderId(e.target.value)}
            className="flex-1 p-3 text-xs border border-[#E8E2D9] rounded-xl bg-white font-mono uppercase focus:outline-none focus:border-[#C5A880]"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Search className="w-4 h-4" /> Track Gown
          </button>
        </form>
      </div>

      {/* Found Order Card & Visual Timeline */}
      {foundOrder ? (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E2D9] shadow-xl space-y-8">
          
          {/* Top Order Metadata */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono text-[#8C827A]">Order ID</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  {foundOrder.status}
                </span>
              </div>
              <h2 className="font-mono text-2xl font-bold text-[#181616] mt-0.5">{foundOrder.id}</h2>
              <p className="text-xs text-[#5C544E]">Placed on {foundOrder.date} by {foundOrder.customerInfo.fullName}</p>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E2D9] text-right space-y-1">
              <span className="text-[10px] uppercase font-mono text-[#8C827A]">Estimated Arrival</span>
              <p className="text-sm font-bold text-emerald-700">{foundOrder.estimatedDelivery}</p>
              <p className="text-[11px] text-[#8C827A]">{foundOrder.courierName} ({foundOrder.trackingNumber})</p>
            </div>
          </div>

          {/* Visual Timeline Progress Bar */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-[#181616]">Stitching & Delivery Progress</h3>
            
            <div className="relative py-4">
              {/* Desktop Stepper Horizontal */}
              <div className="hidden lg:grid grid-cols-9 gap-2 relative z-10">
                {allStatusSteps.map((stepStatus, idx) => {
                  const currentIdx = getCurrentStepIndex(foundOrder.status);
                  const isPassed = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={stepStatus} className="flex flex-col items-center text-center space-y-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-[#181616] text-white ring-4 ring-[#C5A880]/40 scale-110'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-400 border border-gray-300'
                      }`}>
                        {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span className={`text-[10px] font-semibold tracking-tight ${isCurrent ? 'text-[#181616] font-bold' : isPassed ? 'text-emerald-700' : 'text-gray-400'}`}>
                        {stepStatus}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-8 left-6 right-6 h-[3px] bg-gray-200 z-0">
                <div 
                  className="h-full bg-emerald-600 transition-all duration-500" 
                  style={{ width: `${(getCurrentStepIndex(foundOrder.status) / 8) * 100}%` }}
                />
              </div>

              {/* Mobile Timeline Vertical List */}
              <div className="lg:hidden space-y-3 pt-2">
                {foundOrder.trackingHistory.map((stepItem, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      stepItem.completed ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {stepItem.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#181616]">{stepItem.status}</h4>
                      <p className="text-[11px] text-[#5C544E]">{stepItem.description}</p>
                      <span className="text-[10px] font-mono text-[#8C827A]">{stepItem.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ordered Dresses Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E8E2D9]">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#181616]">Garments in this Order</h4>
              <div className="space-y-3">
                {foundOrder.items.map(item => (
                  <div key={item.id} className="flex gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]">
                    <img src={item.product.images[0]} alt="" className="w-12 h-16 object-cover rounded-lg" />
                    <div className="text-xs space-y-1">
                      <h5 className="font-bold text-[#181616]">{item.product.name}</h5>
                      <p className="text-[#8C827A]">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                      {item.customMeasurements && (
                        <span className="text-[10px] text-[#C5A880] flex items-center gap-1 font-semibold">
                          <Scissors className="w-3 h-3" /> Bespoke Measurements Applied
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#181616]">Shipping Destination</h4>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs space-y-1.5">
                <p className="font-bold text-[#181616]">{foundOrder.customerInfo.fullName}</p>
                <p className="text-[#5C544E]">{foundOrder.customerInfo.address}</p>
                <p className="text-[#5C544E]">{foundOrder.customerInfo.city}, {foundOrder.customerInfo.state} {foundOrder.customerInfo.zipCode}</p>
                <p className="text-[#5C544E]">{foundOrder.customerInfo.country}</p>
                <p className="text-[#8C827A] pt-2 font-mono">Contact: {foundOrder.customerInfo.phone}</p>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/?text=Inquiry%20regarding%20Order%20${foundOrder.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-[#25D366] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1EBE57] transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Atelier Concierge for Order Updates
                </a>
              </div>
            </div>
          </div>

        </div>
      ) : hasSearched ? (
        <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-[#E8E2D9] p-8">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-[#181616]">Order Not Found</h3>
          <p className="text-xs text-[#5C544E] max-w-sm mx-auto">
            We couldn't locate order "{searchOrderId}". Please check your order confirmation email or try sample demo order <strong className="font-mono">ORD-88291</strong>.
          </p>
        </div>
      ) : null}

    </div>
  );
};

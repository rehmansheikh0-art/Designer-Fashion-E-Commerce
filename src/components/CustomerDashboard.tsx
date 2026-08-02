import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Lock, 
  Printer, 
  ExternalLink, 
  Tag, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Order, Product, UserProfile } from '../types';

interface CustomerDashboardProps {
  user: UserProfile | null;
  orders: Order[];
  products: Product[];
  wishlist: string[];
  onNavigateToTracking: (orderId: string) => void;
  onSelectProduct: (p: Product) => void;
  onLogout: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  user,
  orders,
  products,
  wishlist,
  onNavigateToTracking,
  onSelectProduct,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'wishlist' | 'coupons'>('orders');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Info Banner */}
      <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#181616] text-[#C5A880] flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#C5A880]">
            {user?.name ? user.name.charAt(0) : 'V'}
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880] font-bold">
              Haute Couture Member
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#181616]">{user?.name || 'Victoria Vance'}</h1>
            <p className="text-xs text-[#8C827A]">{user?.email || 'victoria@example.com'}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 border border-[#E8E2D9] text-xs font-semibold rounded-xl hover:bg-white text-rose-600 transition-all"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 space-y-2 flex-shrink-0">
          {[
            { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
            { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, count: wishlistedProducts.length },
            { id: 'profile', label: 'Profile Settings', icon: User },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'coupons', label: 'Atelier Coupons', icon: Tag }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#181616] text-white shadow' 
                    : 'bg-white text-[#5C544E] hover:bg-[#FAF8F5] border border-[#E8E2D9]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A880]' : 'text-[#8C827A]'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-[#C5A880] text-[#181616]' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Main Tab Content */}
        <main className="flex-1">
          
          {/* TAB: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#181616]">Your Purchase History</h2>

              {orders.length > 0 ? (
                orders.map(order => (
                  <div key={order.id} className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8E2D9]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#181616]">{order.id}</span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#8C827A] mt-0.5">Placed on {order.date} • {order.items.length} item(s)</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onNavigateToTracking(order.id)}
                          className="px-3 py-1.5 bg-[#181616] text-white text-xs font-semibold rounded-lg hover:bg-[#C5A880] hover:text-[#181616] transition-all flex items-center gap-1"
                        >
                          <Clock className="w-3.5 h-3.5 text-[#C5A880]" /> Live Track
                        </button>
                        <button
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className="px-3 py-1.5 border border-[#E8E2D9] text-xs font-semibold rounded-lg hover:bg-[#FAF8F5] flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#8C827A]" /> Invoice
                        </button>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-3">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img src={item.product.images[0]} alt="" className="w-10 h-12 object-cover rounded" />
                            <div>
                              <h4 className="font-semibold text-[#181616]">{item.product.name}</h4>
                              <p className="text-[11px] text-[#8C827A]">Size: {item.selectedSize} • Color: {item.selectedColor}</p>
                            </div>
                          </div>
                          <span className="font-bold">${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#F3EFEA] flex justify-between items-center text-xs">
                      <span className="text-[#8C827A]">Total Paid:</span>
                      <span className="font-serif text-sm font-bold text-[#181616]">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-xs text-[#8C827A] bg-white rounded-2xl border border-[#E8E2D9]">
                  No past orders found.
                </div>
              )}
            </div>
          )}

          {/* TAB: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#181616]">Your Saved Couture Wishlist</h2>
              
              {wishlistedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistedProducts.map(prod => (
                    <div key={prod.id} className="bg-white p-4 rounded-xl border border-[#E8E2D9] flex gap-4">
                      <img src={prod.images[0]} alt="" className="w-20 h-24 object-cover rounded-lg" />
                      <div className="flex-1 text-xs space-y-1">
                        <h4 className="font-serif font-bold text-[#181616]">{prod.name}</h4>
                        <p className="text-[#8C827A]">{prod.category}</p>
                        <p className="font-bold text-[#181616]">${prod.discountPrice || prod.price}</p>
                        <button
                          onClick={() => onSelectProduct(prod)}
                          className="pt-2 text-xs font-semibold text-[#C5A880] hover:underline"
                        >
                          View & Add to Bag →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-xs text-[#8C827A] bg-white rounded-2xl border border-[#E8E2D9]">
                  No saved dresses in your wishlist.
                </div>
              )}
            </div>
          )}

          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#181616]">Account Details</h2>
              <div className="space-y-3 text-xs max-w-md">
                <div>
                  <label className="block text-[#8C827A] mb-1">Full Name</label>
                  <input type="text" readOnly value={user?.name || 'Victoria Vance'} className="w-full p-2.5 border rounded-lg bg-[#FAF8F5]" />
                </div>
                <div>
                  <label className="block text-[#8C827A] mb-1">Email</label>
                  <input type="email" readOnly value={user?.email || 'victoria@example.com'} className="w-full p-2.5 border rounded-lg bg-[#FAF8F5]" />
                </div>
              </div>
            </div>
          )}

          {/* TAB: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#181616]">Primary Shipping Address</h2>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs space-y-1">
                <p className="font-bold text-[#181616]">Victoria Vance</p>
                <p className="text-[#5C544E]">450 Fifth Avenue, Floor 18</p>
                <p className="text-[#5C544E]">New York, NY 10018, United States</p>
              </div>
            </div>
          )}

          {/* TAB: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#181616]">Your Active Promo Codes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-[#181616] to-[#2C2927] p-5 rounded-2xl text-white space-y-2">
                  <span className="text-[10px] font-mono uppercase bg-[#C5A880] text-[#181616] px-2 py-0.5 rounded font-bold">BRIDAL20</span>
                  <h4 className="text-lg font-bold">20% Off Bridal Couture</h4>
                  <p className="text-xs text-[#A3998E]">Valid on all bridal dresses over $1000</p>
                </div>
                <div className="bg-gradient-to-r from-[#181616] to-[#2C2927] p-5 rounded-2xl text-white space-y-2">
                  <span className="text-[10px] font-mono uppercase bg-[#C5A880] text-[#181616] px-2 py-0.5 rounded font-bold">FIRST10</span>
                  <h4 className="text-lg font-bold">$50 Off First Order</h4>
                  <p className="text-xs text-[#A3998E]">Valid for new atelier subscribers</p>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* Printable Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-8 rounded-2xl shadow-2xl space-y-6 border border-[#E8E2D9]">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <span className="font-serif text-xl font-bold text-[#181616]">Aria Vance Atelier</span>
                <p className="text-xs text-[#8C827A]">Tax Invoice #{selectedInvoiceOrder.id}</p>
              </div>
              <button onClick={() => setSelectedInvoiceOrder(null)} className="text-gray-400 hover:text-black">
                Close
              </button>
            </div>

            <div className="text-xs space-y-2">
              <p><strong>Billed To:</strong> {selectedInvoiceOrder.customerInfo.fullName}</p>
              <p><strong>Address:</strong> {selectedInvoiceOrder.customerInfo.address}, {selectedInvoiceOrder.customerInfo.city}</p>
              <p><strong>Payment Method:</strong> {selectedInvoiceOrder.paymentMethod}</p>
            </div>

            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b bg-[#FAF8F5]">
                  <th className="p-2">Item</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoiceOrder.items.map(i => (
                  <tr key={i.id} className="border-b">
                    <td className="p-2">{i.product.name} ({i.selectedSize})</td>
                    <td className="p-2">{i.quantity}</td>
                    <td className="p-2">${((i.product.discountPrice || i.product.price) * i.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between font-bold text-sm pt-2">
              <span>Total Paid:</span>
              <span>${selectedInvoiceOrder.total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 bg-[#181616] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print PDF Invoice
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

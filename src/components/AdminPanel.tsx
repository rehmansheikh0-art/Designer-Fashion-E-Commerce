import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line 
} from 'recharts';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Tag, 
  TrendingUp, 
  Eye, 
  SlidersHorizontal,
  RefreshCw,
  Search,
  X
} from 'lucide-react';
import { Product, Order, Coupon, CategoryType, SizeType, OrderStatus } from '../types';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (newP: Product) => void;
  onUpdateProduct: (updatedP: Product) => void;
  onDeleteProduct: (id: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  coupons: Coupon[];
  onAddCoupon: (c: Coupon) => void;
  onToggleCoupon: (code: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  coupons,
  onAddCoupon,
  onToggleCoupon
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'coupons' | 'reports'>('dashboard');

  // New Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Add/Edit Product
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryType>('Bridal Dresses');
  const [formCollection, setFormCollection] = useState('Opulence 2026');
  const [formPrice, setFormPrice] = useState(1200);
  const [formDiscount, setFormDiscount] = useState(0);
  const [formStock, setFormStock] = useState(10);
  const [formFabric, setFormFabric] = useState('Pure Silk & Velvet');
  const [formWashing, setFormWashing] = useState('Dry Clean Only');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80');
  const [formDescription, setFormDescription] = useState('Hand-embroidered luxury gown.');

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponVal, setNewCouponVal] = useState(20);

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  // Chart Data
  const salesData = [
    { month: 'Jan', sales: 12400 },
    { month: 'Feb', sales: 18900 },
    { month: 'Mar', sales: 24500 },
    { month: 'Apr', sales: 31200 },
    { month: 'May', sales: 28400 },
    { month: 'Jun', sales: 42000 },
    { month: 'Jul', sales: 58900 }
  ];

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormPrice(1200);
    setFormDiscount(0);
    setFormStock(10);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormCollection(p.collection);
    setFormPrice(p.price);
    setFormDiscount(p.discountPrice || 0);
    setFormStock(p.stock);
    setFormFabric(p.fabric);
    setFormWashing(p.washingInstructions);
    setFormImage(p.images[0]);
    setFormDescription(p.description);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: formName,
        category: formCategory,
        collection: formCollection,
        price: Number(formPrice),
        discountPrice: Number(formDiscount) > 0 ? Number(formDiscount) : undefined,
        stock: Number(formStock),
        fabric: formFabric,
        washingInstructions: formWashing,
        description: formDescription,
        images: [formImage, ...editingProduct.images.slice(1)]
      };
      onUpdateProduct(updated);
    } else {
      const newProd: Product = {
        id: 'prod-' + Date.now(),
        sku: 'AV-NEW-' + Math.floor(100 + Math.random() * 900),
        name: formName,
        category: formCategory,
        collection: formCollection,
        price: Number(formPrice),
        discountPrice: Number(formDiscount) > 0 ? Number(formDiscount) : undefined,
        rating: 5.0,
        reviewsCount: 1,
        images: [formImage],
        fabric: formFabric,
        washingInstructions: formWashing,
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Stitching'],
        availableColors: ['Royal Emerald', 'Champagne Gold'],
        colorHexes: ['#0B6623', '#D4AF37'],
        stock: Number(formStock),
        description: formDescription,
        details: ['Handmade luxury finish', 'Silk lined'],
        isNewArrival: true,
        reviews: []
      };
      onAddProduct(newProd);
    }
    setIsAddModalOpen(false);
  };

  const handleCreateCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    onAddCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountType: 'percentage',
      discountValue: Number(newCouponVal),
      expiryDate: '2026-12-31',
      active: true
    });
    setNewCouponCode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Bar */}
      <div className="bg-[#181616] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#C5A880] font-semibold">
            Administrative Operations Suite
          </span>
          <h1 className="font-serif text-3xl font-bold mt-1">Atelier Control Panel</h1>
          <p className="text-xs text-[#A3998E]">Manage dresses, customer orders, live tracking status, coupons & sales analytics.</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-[#C5A880] text-[#181616] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Designer Dress
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E8E2D9]">
        {[
          { id: 'dashboard', label: 'Dashboard Overview', icon: TrendingUp },
          { id: 'products', label: `Products (${products.length})`, icon: Package },
          { id: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
          { id: 'reports', label: 'Analytics & Revenue', icon: BarChart }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                isActive 
                  ? 'bg-[#181616] text-white shadow' 
                  : 'bg-[#FAF8F5] text-[#5C544E] hover:bg-[#EFECE6] border border-[#E8E2D9]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A880]' : 'text-[#8C827A]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8C827A] uppercase font-mono">Gross Sales Revenue</span>
                <DollarSign className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#181616]">${totalRevenue.toFixed(2)}</h3>
              <p className="text-[11px] text-emerald-600 font-medium">↑ 18.4% growth this month</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8C827A] uppercase font-mono">Total Orders</span>
                <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#181616]">{totalOrders} Orders</h3>
              <p className="text-[11px] text-[#8C827A]">Active couture fulfillment</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8C827A] uppercase font-mono">Active Inventory</span>
                <Package className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#181616]">{totalStock} Units</h3>
              <p className="text-[11px] text-[#8C827A]">{products.length} distinct dress styles</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8C827A] uppercase font-mono">Active Promos</span>
                <Tag className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#181616]">{coupons.filter(c => c.active).length} Coupons</h3>
              <p className="text-[11px] text-emerald-600 font-medium">BRIDAL20 & FIRST10 active</p>
            </div>
          </div>

          {/* Sales Revenue Chart */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#181616]">Monthly Couture Revenue Trend ($)</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3EFEA" />
                  <XAxis dataKey="month" stroke="#8C827A" />
                  <YAxis stroke="#8C827A" />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#181616" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-[#181616]">Dress Catalog & Inventory</h2>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-[#181616] text-[#FAF8F5] text-xs font-semibold rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Dress
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#8C827A] uppercase font-mono">
                  <tr>
                    <th className="p-4">Dress</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Badges</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EFEA]">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded" />
                          <div>
                            <h4 className="font-bold text-[#181616]">{p.name}</h4>
                            <p className="text-[10px] text-[#8C827A]">{p.fabric}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-semibold">{p.sku}</td>
                      <td className="p-4">{p.category}</td>
                      <td className="p-4 font-bold">
                        {p.discountPrice ? (
                          <span>${p.discountPrice} <span className="line-through text-gray-400 text-[10px]">${p.price}</span></span>
                        ) : (
                          `$${p.price}`
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                          p.stock > 5 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {p.isBridal && <span className="bg-[#181616] text-white text-[9px] px-1.5 py-0.5 rounded">Bridal</span>}
                          {p.isNewArrival && <span className="bg-[#C5A880] text-black text-[9px] px-1.5 py-0.5 rounded">New</span>}
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER MANAGEMENT & LIVE STATUS UPDATER */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#181616]">Customer Orders & Live Tracking Updater</h2>
              <p className="text-xs text-[#8C827A]">Update order tracking status here to test live progress bar changes in real time!</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#8C827A] uppercase font-mono">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Tracking Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EFEA]">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="p-4 font-mono font-bold text-[#181616]">{order.id}</td>
                      <td className="p-4">
                        <p className="font-semibold text-[#181616]">{order.customerInfo.fullName}</p>
                        <p className="text-[10px] text-[#8C827A]">{order.customerInfo.email}</p>
                      </td>
                      <td className="p-4 text-[#8C827A]">{order.date}</td>
                      <td className="p-4 font-bold text-[#181616]">${order.total.toFixed(2)}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full">
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        {/* Interactive Status Selector */}
                        <select
                          value={order.status}
                          onChange={e => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="p-2 bg-[#FAF8F5] border border-[#E8E2D9] font-semibold text-xs rounded-xl focus:outline-none focus:border-[#C5A880]"
                        >
                          <option value="Order Received">Order Received</option>
                          <option value="Payment Confirmed">Payment Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Stitching">Stitching (Atelier)</option>
                          <option value="Quality Check">Quality Check</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#181616]">Promo Coupon Management</h2>

          {/* Add Coupon Form */}
          <form onSubmit={handleCreateCouponSubmit} className="bg-white p-6 rounded-2xl border border-[#E8E2D9] flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-[#181616] mb-1">Coupon Code</label>
              <input
                type="text"
                required
                placeholder="e.g. SUMMER25"
                value={newCouponCode}
                onChange={e => setNewCouponCode(e.target.value)}
                className="w-full p-2.5 text-xs border border-[#E8E2D9] rounded-xl font-mono uppercase"
              />
            </div>
            <div className="w-full sm:w-40">
              <label className="block text-xs font-semibold text-[#181616] mb-1">Discount %</label>
              <input
                type="number"
                required
                value={newCouponVal}
                onChange={e => setNewCouponVal(Number(e.target.value))}
                className="w-full p-2.5 text-xs border border-[#E8E2D9] rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#C5A880]"
            >
              Create Promo Code
            </button>
          </form>

          {/* Coupons List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {coupons.map(c => (
              <div key={c.code} className="bg-white p-5 rounded-2xl border border-[#E8E2D9] space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-sm bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#E8E2D9]">
                    {c.code}
                  </span>
                  <button
                    onClick={() => onToggleCoupon(c.code)}
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      c.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {c.active ? 'Active' : 'Disabled'}
                  </button>
                </div>
                <p className="text-xs text-[#5C544E]">
                  {c.discountType === 'percentage' ? `${c.discountValue}% Off Total` : `$${c.discountValue} Fixed Discount`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-[#E8E2D9]">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-lg font-bold text-[#181616]">
                {editingProduct ? 'Edit Designer Dress' : 'Add New Designer Dress'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Dress Title</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as CategoryType)}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    <option value="Bridal Dresses">Bridal Dresses</option>
                    <option value="Formal Dresses">Formal Dresses</option>
                    <option value="Casual Wear">Casual Wear</option>
                    <option value="Luxury Pret">Luxury Pret</option>
                    <option value="Party Wear">Party Wear</option>
                    <option value="Kids Collection">Kids Collection</option>
                    <option value="Men's Collection">Men's Collection</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Collection</label>
                  <input
                    type="text"
                    value={formCollection}
                    onChange={e => setFormCollection(e.target.value)}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={e => setFormPrice(Number(e.target.value))}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Discount Price ($)</label>
                  <input
                    type="number"
                    value={formDiscount}
                    onChange={e => setFormDiscount(Number(e.target.value))}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={e => setFormStock(Number(e.target.value))}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  className="w-full p-2.5 border rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Fabric Details</label>
                <input
                  type="text"
                  value={formFabric}
                  onChange={e => setFormFabric(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#181616] text-[#FAF8F5] font-bold uppercase rounded-xl hover:bg-[#C5A880]"
              >
                Save Dress to Catalog
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

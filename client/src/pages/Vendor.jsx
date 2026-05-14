import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Store, Package, Star, TrendingUp, Plus, Eye, Edit, Trash2, ArrowRight, X, Upload, Tag, IndianRupee,
} from 'lucide-react';

const stats = [
  { icon: Package,    label: 'Products Listed', value: '12',   bg: '#eef2ff', color: '#4f46e5' },
  { icon: Star,       label: 'Avg. Rating',      value: '4.7',  bg: '#fffbeb', color: '#d97706' },
  { icon: TrendingUp, label: 'Monthly Sales',    value: '₹42K', bg: '#f0fdf4', color: '#16a34a' },
  { icon: Eye,        label: 'Profile Views',    value: '1.2K', bg: '#fdf4ff', color: '#9333ea' },
];

const initialProducts = [
  { id: 1, name: 'Blue Pottery Vase',   price: '₹850',  status: 'Active',   img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&q=80', category: 'Handicrafts' },
  { id: 2, name: 'Pashmina Shawl',      price: '₹3200', status: 'Active',   img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200&q=80', category: 'Textiles' },
  { id: 3, name: 'Sandalwood Figurine', price: '₹1400', status: 'Inactive', img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&q=80', category: 'Art' },
];

const statusStyle = {
  Active:   { background: '#f0fdf4', color: '#16a34a' },
  Inactive: { background: '#fef2f2', color: '#dc2626' },
};

const categories = ['Handicrafts', 'Textiles', 'Art', 'Local Foods', 'Homestays', 'Cultural Events'];

const EMPTY_FORM = { name: '', price: '', category: 'Handicrafts', description: '', state: '', tag: '' };

/* ── Add Product Modal ────────────────────────────────────────── */
const AddProductModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setSubmitting(true);
    setTimeout(() => {
      onAdd({ ...form, id: Date.now(), status: 'Active', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&q=80' });
      setSubmitting(false);
      onClose();
    }, 800);
  };

  const inputStyle = {
    width: '100%', padding: '.875rem 1rem', borderRadius: '.875rem',
    border: '1.5px solid var(--border)', background: 'var(--bg-section)',
    color: 'var(--text-heading)', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none',
    transition: 'border-color .2s',
  };
  const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '0.5rem' };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ background: 'var(--bg-card)', borderRadius: '2rem', border: '1px solid var(--border)', boxShadow: '0 25px 60px rgba(0,0,0,.25)', maxWidth: '540px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>

        {/* Modal header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.75rem 1.75rem 0' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '0.75rem', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={18} color="#fff" />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)' }}>Add New Product</h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '3rem' }}>List your product on the Trails of Bharat Marketplace</p>
          </div>
          <button onClick={onClose}
            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.5rem 1.75rem 1.75rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Product name */}
            <div>
              <label style={labelStyle}>Product Name *</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="e.g., Handwoven Silk Saree" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>

            {/* Price + Category row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Price (₹) *</label>
                <div style={{ position: 'relative' }}>
                  <IndianRupee size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                  <input required type="number" value={form.price} onChange={e => set('price', e.target.value)}
                    placeholder="850" style={{ ...inputStyle, paddingLeft: '2.5rem' }}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)} style={inputStyle}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* State + Tag row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>State / Region</label>
                <input value={form.state} onChange={e => set('state', e.target.value)}
                  placeholder="e.g., Rajasthan" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              <div>
                <label style={labelStyle}>Product Tag</label>
                <div style={{ position: 'relative' }}>
                  <Tag size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                  <input value={form.tag} onChange={e => set('tag', e.target.value)}
                    placeholder="GI Tagged / Organic" style={{ ...inputStyle, paddingLeft: '2.5rem' }}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>Description</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)}
                placeholder="Describe your product — materials, technique, cultural significance…"
                rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>

            {/* Image upload (visual placeholder) */}
            <div>
              <label style={labelStyle}>Product Image</label>
              <div style={{ border: '2px dashed var(--border)', borderRadius: '1rem', padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'border-color .2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <Upload size={28} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem' }} />
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Click to upload or drag & drop</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>PNG, JPG up to 5MB</div>
              </div>
            </div>

            {/* Submit buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
              <motion.button type="submit" disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }} whileTap={{ scale: submitting ? 1 : 0.97 }}
                style={{ flex: 1, padding: '1rem', borderRadius: '1rem', background: submitting ? 'rgba(99,102,241,.5)' : 'var(--primary)', color: '#fff', fontWeight: 800, fontSize: '0.9375rem', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(99,102,241,.3)', transition: 'background .2s' }}>
                {submitting ? '⏳ Adding Product…' : <><Plus size={18} /> Add to Marketplace</>}
              </motion.button>
              <button type="button" onClick={onClose}
                style={{ padding: '1rem 1.25rem', borderRadius: '1rem', background: 'var(--bg-section)', border: '1.5px solid var(--border)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

/* ── Vendor Page ──────────────────────────────────────────────── */
const Vendor = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (product) => {
    setProducts(p => [...p, product]);
    toast(`"${product.name}" added to marketplace! 🎉`, 'success');
  };

  const handleDelete = (id, name) => {
    setProducts(p => p.filter(p => p.id !== id));
    toast(`"${name}" removed.`, 'info');
  };

  const toggleStatus = (id) => {
    setProducts(p => p.map(prod => prod.id === id
      ? { ...prod, status: prod.status === 'Active' ? 'Inactive' : 'Active' }
      : prod));
  };

  return (
    <div className="page">
      <AnimatePresence>
        {showModal && <AddProductModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
      </AnimatePresence>

      <div className="container">
        {/* Header */}
        <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Store size={18} color="#fff" />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Vendor Portal</span>
            </div>
            <h1 className="page-title">Welcome, {user?.name || 'Vendor'} 🛍️</h1>
            <p className="page-desc">Manage your products, track sales, and grow your business.</p>
          </div>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => setShowModal(true)}
            className="btn btn-primary" style={{ gap: '0.5rem', boxShadow: '0 4px 14px rgba(99,102,241,.3)' }}>
            <Plus size={16} /> Add Product
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: '3.5rem' }}>
          {[
            { icon: Package,    label: 'Products Listed', value: products.length.toString(), bg: '#eef2ff', color: '#4f46e5' },
            { icon: Star,       label: 'Avg. Rating',     value: '4.7',  bg: '#fffbeb', color: '#d97706' },
            { icon: TrendingUp, label: 'Monthly Sales',   value: '₹42K', bg: '#f0fdf4', color: '#16a34a' },
            { icon: Eye,        label: 'Profile Views',   value: '1.2K', bg: '#fdf4ff', color: '#9333ea' },
          ].map((s, i) => {
            const I = s.icon;
            return (
              <motion.div key={s.label} className="stat-card"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="icon-box icon-box-md" style={{ background: s.bg, marginBottom: '1.25rem' }}>
                  <I size={20} color={s.color} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.375rem' }}>{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Products table */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Your Products <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>({products.length})</span></h2>
            <button onClick={() => setShowModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
              Add More <ArrowRight size={15} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AnimatePresence>
              {products.map((p) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <div className="trip-row">
                    <img src={p.img} alt={p.name} className="trip-thumb" />
                    <div className="trip-info">
                      <div className="trip-name">{p.name}</div>
                      <div className="trip-date" style={{ color: 'var(--primary)', fontWeight: 700 }}>{p.price}</div>
                      {p.category && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{p.category}</div>}
                    </div>
                    <button onClick={() => toggleStatus(p.id)}
                      className="badge" style={{ ...statusStyle[p.status], cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                      {p.status}
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                      <button style={{ padding: '0.375rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)}
                        style={{ padding: '0.375rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {products.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3 style={{ color: 'var(--text-heading)', marginBottom: '0.5rem' }}>No products yet</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Add your first product to start selling on the marketplace.</p>
              <button onClick={() => setShowModal(true)} className="btn btn-primary">
                <Plus size={16} /> Add Your First Product
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Vendor;

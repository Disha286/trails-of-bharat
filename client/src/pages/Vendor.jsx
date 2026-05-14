import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Store, Package, Star, TrendingUp, Plus, Eye, Edit, Trash2, ArrowRight,
} from 'lucide-react';

const stats = [
  { icon: Package,    label: 'Products Listed', value: '12',   bg: '#eef2ff', color: '#4f46e5' },
  { icon: Star,       label: 'Avg. Rating',      value: '4.7',  bg: '#fffbeb', color: '#d97706' },
  { icon: TrendingUp, label: 'Monthly Sales',    value: '₹42K', bg: '#f0fdf4', color: '#16a34a' },
  { icon: Eye,        label: 'Profile Views',    value: '1.2K', bg: '#fdf4ff', color: '#9333ea' },
];

const products = [
  { name: 'Blue Pottery Vase',    price: '₹850',  status: 'Active',   img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&q=80' },
  { name: 'Pashmina Shawl',       price: '₹3200', status: 'Active',   img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200&q=80' },
  { name: 'Sandalwood Figurine',  price: '₹1400', status: 'Inactive', img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&q=80' },
];

const statusStyle = {
  Active:   { background: '#f0fdf4', color: '#16a34a' },
  Inactive: { background: '#fef2f2', color: '#dc2626' },
};

const Vendor = () => {
  const { user } = useAuth();

  return (
    <div className="page">
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
          <button className="btn btn-primary" style={{ gap: '0.5rem' }}>
            <Plus size={16} /> Add Product
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: '3.5rem' }}>
          {stats.map((s, i) => {
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
            <h2 style={{ fontSize: '1.25rem' }}>Your Products</h2>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
              View All <ArrowRight size={15} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {products.map((p) => (
              <div key={p.name} className="trip-row">
                <img src={p.img} alt={p.name} className="trip-thumb" />
                <div className="trip-info">
                  <div className="trip-name">{p.name}</div>
                  <div className="trip-date" style={{ color: 'var(--primary)', fontWeight: 700 }}>{p.price}</div>
                </div>
                <span className="badge" style={statusStyle[p.status]}>{p.status}</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button style={{ padding: '0.375rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                    <Edit size={14} />
                  </button>
                  <button style={{ padding: '0.375rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Vendor;

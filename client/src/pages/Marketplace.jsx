import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, MapPin, Search, Filter } from 'lucide-react';
import { products, productCategories } from '../data/products';
import { useToast } from '../context/ToastContext';

const Marketplace = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery]       = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart]         = useState([]);

  const filtered = products.filter(p => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.state.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const toggleWishlist = (id, name) => {
    setWishlist(w => w.includes(id) ? w.filter(i => i !== id) : [...w, id]);
    toast(wishlist.includes(id) ? `Removed from wishlist` : `${name} added to wishlist ❤️`, wishlist.includes(id) ? 'info' : 'success');
  };

  const addToCart = (id, name) => {
    setCart(c => c.includes(id) ? c : [...c, id]);
    toast(`${name} added to cart 🛒`, 'success');
  };

  const discount = (orig, price) => Math.round(((orig - price) / orig) * 100);

  return (
    <div className="page">
      <div className="container">

        {/* Header */}
        <motion.div className="page-header" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--accent)', textTransform:'uppercase', letterSpacing:'.1em' }}>Local Marketplace</span>
          <h1 className="page-title" style={{ marginTop:'0.5rem' }}>Shop Authentic India</h1>
          <p className="page-desc">Handcrafted goods, homestays, and cultural experiences — directly from artisans.</p>
          {cart.length > 0 && (
            <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', marginTop:'0.75rem', padding:'.4rem 1rem', borderRadius:'999px', background:'rgba(249,115,22,.1)', border:'1.5px solid rgba(249,115,22,.25)', fontSize:'0.8rem', fontWeight:700, color:'var(--accent)' }}>
              <ShoppingCart size={14}/> {cart.length} item{cart.length>1?'s':''} in cart
            </div>
          )}
        </motion.div>

        {/* Search */}
        <div style={{ position:'relative', maxWidth:'480px', marginBottom:'2rem' }}>
          <Search size={17} style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', pointerEvents:'none' }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products, states…"
            style={{ width:'100%', padding:'.875rem 1rem .875rem 2.75rem', borderRadius:'.875rem', background:'var(--bg-section)', border:'1.5px solid var(--border)', fontSize:'0.9rem', fontFamily:'inherit', color:'var(--text-heading)', outline:'none' }} />
        </div>

        {/* Category chips */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.625rem', marginBottom:'2.5rem' }}>
          {productCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding:'.5rem 1.125rem', borderRadius:'999px', border:`1.5px solid ${activeCategory===cat ? 'var(--primary)' : 'var(--border)'}`, background:activeCategory===cat ? 'var(--primary)' : 'var(--bg-card)', color:activeCategory===cat ? '#fff' : 'var(--text-body)', fontWeight:700, fontSize:'0.8125rem', cursor:'pointer', fontFamily:'inherit', transition:'all .15s', boxShadow:activeCategory===cat ? '0 4px 12px rgba(99,102,241,.25)' : 'none' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ fontSize:'0.875rem', color:'var(--text-muted)', fontWeight:600, marginBottom:'1.5rem' }}>
          Showing <strong style={{ color:'var(--text-heading)' }}>{filtered.length}</strong> products
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1.75rem' }}>
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:.95 }} transition={{ delay:i*.05 }}
                style={{ borderRadius:'1.5rem', overflow:'hidden', background:'var(--bg-card)', border:'1px solid var(--border)', boxShadow:'var(--shadow)', transition:'box-shadow .3s,transform .3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='var(--shadow-xl)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow)'; }}>

                <div style={{ position:'relative', height:'200px', overflow:'hidden' }}>
                  <img src={p.img} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .5s' }}
                    onMouseEnter={e => e.currentTarget.style.transform='scale(1.07)'}
                    onMouseLeave={e => e.currentTarget.style.transform='scale(1)'} />
                  {/* Tag badge */}
                  <div style={{ position:'absolute', top:'.875rem', left:'.875rem', padding:'.25rem .7rem', borderRadius:'999px', background:'var(--primary)', fontSize:'0.7rem', fontWeight:700, color:'#fff' }}>{p.tag}</div>
                  {/* Discount */}
                  {p.originalPrice > p.price && (
                    <div style={{ position:'absolute', top:'.875rem', right:'2.75rem', padding:'.25rem .6rem', borderRadius:'999px', background:'#ef4444', fontSize:'0.68rem', fontWeight:700, color:'#fff' }}>
                      -{discount(p.originalPrice, p.price)}%
                    </div>
                  )}
                  {/* Wishlist btn */}
                  <motion.button whileTap={{ scale:.85 }} onClick={() => toggleWishlist(p.id, p.name)}
                    style={{ position:'absolute', top:'.875rem', right:'.875rem', width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,255,255,.92)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Heart size={15} color={wishlist.includes(p.id) ? '#ef4444' : '#94a3b8'} fill={wishlist.includes(p.id) ? '#ef4444' : 'none'} />
                  </motion.button>
                </div>

                <div style={{ padding:'1.25rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'.375rem', fontSize:'0.72rem', color:'var(--text-muted)', fontWeight:600, marginBottom:'0.5rem' }}>
                    <MapPin size={11}/> {p.state} · {p.category}
                  </div>
                  <h3 style={{ fontSize:'0.9375rem', fontWeight:700, color:'var(--text-heading)', marginBottom:'0.5rem', lineHeight:1.4 }}>{p.name}</h3>
                  <p style={{ fontSize:'0.8rem', color:'var(--text-muted)', lineHeight:1.5, marginBottom:'0.875rem' }}>{p.description.slice(0,70)}…</p>

                  {/* Rating */}
                  <div style={{ display:'flex', alignItems:'center', gap:'0.375rem', marginBottom:'1rem' }}>
                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--text-heading)' }}>{p.rating}</span>
                    <span style={{ fontSize:'0.75rem', color:'var(--text-muted)' }}>({p.reviews})</span>
                  </div>

                  {/* Price + cart */}
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div>
                      <div style={{ fontSize:'1.125rem', fontWeight:800, color:'var(--primary)' }}>₹{p.price.toLocaleString()}</div>
                      {p.originalPrice > p.price && <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', textDecoration:'line-through' }}>₹{p.originalPrice.toLocaleString()}</div>}
                    </div>
                    <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:.95 }} onClick={() => addToCart(p.id, p.name)}
                      style={{ display:'flex', alignItems:'center', gap:'0.4rem', padding:'.625rem 1.1rem', borderRadius:'.75rem', background:cart.includes(p.id) ? 'var(--bg-section)' : 'var(--primary)', color:cart.includes(p.id) ? 'var(--text-muted)' : '#fff', fontWeight:700, fontSize:'0.8rem', border:'none', cursor:'pointer', fontFamily:'inherit', transition:'all .2s' }}>
                      <ShoppingCart size={14}/> {cart.includes(p.id) ? 'Added' : 'Add'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'5rem 2rem', background:'var(--bg-card)', borderRadius:'1.5rem', border:'1px solid var(--border)' }}>
            <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🛍️</div>
            <h3 style={{ color:'var(--text-heading)', marginBottom:'0.5rem' }}>No products found</h3>
            <p style={{ color:'var(--text-muted)' }}>Try a different category or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;

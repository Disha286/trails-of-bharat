import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, MapPin, Search, X, Plus, Minus, Trash2, ArrowRight, Package, Loader2 } from 'lucide-react';
import { getListings } from '../services/listingService.js';
import { createOrder } from '../services/orderService.js';
import { useToast } from '../context/ToastContext';

const productCategories = ['All', 'handicrafts', 'homestays', 'events', 'ecotourism'];

/* ── Cart Sidebar ──────────────────────────────────────────────── */
const CartSidebar = ({ cart, onClose, onUpdateQty, onRemove, onCheckout }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cart.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: '420px', background: 'var(--bg-card)', boxShadow: '-10px 0 40px rgba(0,0,0,.2)', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 1.5rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '0.75rem', background: 'rgba(249,115,22,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingCart size={18} color="var(--accent)" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-heading)' }}>Your Cart</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cart.length} item{cart.length !== 1 ? 's' : ''}</div>
            </div>
          </div>
          <button onClick={onClose}
            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <Package size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ color: 'var(--text-heading)', marginBottom: '0.5rem' }}>Cart is empty</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Add some authentic Indian crafts!</p>
              <button onClick={onClose} style={{ marginTop: '1.25rem', padding: '.625rem 1.5rem', borderRadius: '.875rem', background: 'var(--primary)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <AnimatePresence>
                {cart.map(item => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
                    style={{ display: 'flex', gap: '0.875rem', padding: '1rem', borderRadius: '1rem', background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                    <img src={item.img} alt={item.name} style={{ width: '72px', height: '72px', borderRadius: '0.75rem', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-heading)', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.625rem' }}>{item.state} · {item.category}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Qty control */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <button onClick={() => onUpdateQty(item.id, item.qty - 1)}
                            style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1.5px solid var(--border)', background: 'var(--bg-card)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all .15s' }}>
                            <Minus size={11} />
                          </button>
                          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                          <button onClick={() => onUpdateQty(item.id, item.qty + 1)}
                            style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1.5px solid var(--primary)', background: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all .15s' }}>
                            <Plus size={11} />
                          </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.9375rem' }}>₹{(item.price * item.qty).toLocaleString()}</span>
                          <button onClick={() => onRemove(item.id)}
                            style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #fecaca', background: '#fff1f2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer summary */}
        {cart.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            {/* Promo note */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 0.875rem', borderRadius: '0.75rem', background: 'rgba(16,185,129,.07)', border: '1px solid rgba(16,185,129,.2)', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669' }}>✅ 100% of proceeds go directly to local artisans</span>
            </div>
            {/* Price breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Subtotal', val: `₹${subtotal.toLocaleString()}` },
                { label: 'Shipping', val: `₹${shipping}` },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{r.label}</span>
                  <span style={{ color: 'var(--text-heading)', fontWeight: 600 }}>{r.val}</span>
                </div>
              ))}
              <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 800, color: 'var(--text-heading)' }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--primary)' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={onCheckout}
              style={{ width: '100%', padding: '1rem', borderRadius: '1rem', background: 'var(--primary)', color: '#fff', fontWeight: 800, fontSize: '0.9375rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(99,102,241,.35)' }}>
              Proceed to Checkout <ArrowRight size={16} />
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ── Marketplace ───────────────────────────────────────────────── */
const Marketplace = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery]       = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart]         = useState([]); // [{ id, name, price, img, state, category, qty }]
  const [cartOpen, setCartOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const data = await getListings(activeCategory);
        setListings(data);
      } catch (err) {
        toast('Failed to load listings', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [activeCategory, toast]);

  const filtered = listings.filter(p => {
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.state.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const toggleWishlist = (id, name) => {
    setWishlist(w => w.includes(id) ? w.filter(i => i !== id) : [...w, id]);
    toast(wishlist.includes(id) ? 'Removed from wishlist' : `${name} added to wishlist ❤️`, wishlist.includes(id) ? 'info' : 'success');
  };

  const addToCart = (product) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id);
      if (existing) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { id: product.id, name: product.name, price: product.price, img: product.img, state: product.state, category: product.category, qty: 1 }];
    });
    toast(`${product.name} added to cart 🛒`, 'success');
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(c => c.map(i => i.id === id ? { ...i, qty } : i));
  };

  const removeFromCart = (id) => {
    setCart(c => c.filter(i => i.id !== id));
    toast('Item removed from cart', 'info');
  };

  const discount = (orig, price) => Math.round(((orig - price) / orig) * 100);
  const inCart = (id) => cart.some(i => i.id === id);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = 99;
    const total = subtotal + shipping;
    
    try {
      await createOrder(cart, total);
      toast('Order placed successfully! 🇮🇳', 'success');
      setCart([]);
      setCartOpen(false);
    } catch (err) {
      toast('Failed to place order. Please try again.', 'error');
    }
  };

  return (
    <div className="page">
      <AnimatePresence>
        {cartOpen && <CartSidebar cart={cart} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={handleCheckout} />}
      </AnimatePresence>

      {/* ── Hero Banner ── */}
      <div style={{ position: 'relative', borderRadius: '2rem', overflow: 'hidden', marginBottom: '3rem', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 35%, #4c1d95 65%, #7c3aed 100%)', padding: '3.5rem 2.5rem' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(249,115,22,.15)' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '40%', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(139,92,246,.2)' }} />
        <div style={{ position: 'absolute', top: '20px', left: '60%', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '.3rem .875rem', borderRadius: '999px', background: 'rgba(249,115,22,.2)', border: '1px solid rgba(249,115,22,.4)', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '.1em' }}>🛍️ Local Marketplace</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '0.75rem' }}>
              Shop <span style={{ background: 'linear-gradient(90deg,#fb923c,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Authentic</span> India
            </h1>
            <p style={{ color: 'rgba(255,255,255,.72)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '480px', marginBottom: '1.75rem' }}>
              Handcrafted goods, homestays &amp; cultural experiences — every rupee goes directly to the artisan.
            </p>
            {/* Hero stats */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              {[{ val: '32+', label: 'Products' }, { val: '2,400+', label: 'Artisans' }, { val: '4.8★', label: 'Avg Rating' }].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>{s.val}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,.55)', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cart button in hero */}
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCartOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', padding: '1.25rem 2rem', borderRadius: '1.5rem', background: cartCount > 0 ? 'rgba(249,115,22,1)' : 'rgba(255,255,255,.12)', backdropFilter: 'blur(12px)', color: '#fff', border: `1.5px solid ${cartCount > 0 ? 'rgba(249,115,22,.6)' : 'rgba(255,255,255,.2)'}`, fontFamily: 'inherit', cursor: 'pointer', boxShadow: cartCount > 0 ? '0 8px 32px rgba(249,115,22,.4)' : '0 4px 16px rgba(0,0,0,.2)', minWidth: '140px', transition: 'all .2s' }}>
            <ShoppingCart size={28} color="#fff" />
            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>View Cart</span>
            {cartCount > 0
              ? <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,.85)' }}>{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
              : <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,.5)' }}>Empty</span>}
            {cartCount > 0 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{ position: 'absolute', top: '-8px', right: '-8px', width: '24px', height: '24px', borderRadius: '50%', background: '#ef4444', color: '#fff', fontSize: '0.72rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #1e1b4b' }}>
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>

      <div className="container">

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '480px', marginBottom: '2rem' }}>
          <Search size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products, states…"
            style={{ width: '100%', padding: '.875rem 1rem .875rem 2.75rem', borderRadius: '.875rem', background: 'var(--bg-section)', border: '1.5px solid var(--border)', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--text-heading)', outline: 'none' }} />
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '2.5rem' }}>
          {productCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: '.5rem 1.125rem', borderRadius: '999px', border: `1.5px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border)'}`, background: activeCategory === cat ? 'var(--primary)' : 'var(--bg-card)', color: activeCategory === cat ? '#fff' : 'var(--text-body)', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', boxShadow: activeCategory === cat ? '0 4px 12px rgba(99,102,241,.25)' : 'none' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1.5rem' }}>
          Showing <strong style={{ color: 'var(--text-heading)' }}>{filtered.length}</strong> products
        </div>

        {/* Product grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.75rem' }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
              <Loader2 size={32} className="spin" style={{ color: 'var(--primary)', margin: '0 auto' }} />
            </div>
          ) : (
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .95 }} transition={{ delay: i * .04 }}
                style={{ borderRadius: '1.5rem', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', transition: 'box-shadow .3s,transform .3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>

                <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  {/* gradient overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 55%)' }} />
                  {/* tag badge */}
                  <div style={{ position: 'absolute', top: '.875rem', left: '.875rem', padding: '.25rem .75rem', borderRadius: '999px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', fontSize: '0.68rem', fontWeight: 800, color: '#fff', letterSpacing: '.04em', boxShadow: '0 2px 8px rgba(99,102,241,.4)' }}>{p.tag}</div>
                  {/* discount + wishlist row */}
                  <div style={{ position: 'absolute', top: '.875rem', right: '.875rem', display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                    {p.originalPrice > p.price && (
                      <div style={{ padding: '.22rem .6rem', borderRadius: '999px', background: '#ef4444', fontSize: '0.68rem', fontWeight: 800, color: '#fff' }}>-{discount(p.originalPrice, p.price)}%</div>
                    )}
                    <motion.button whileTap={{ scale: .85 }} onClick={() => toggleWishlist(p.id, p.name)}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.15)' }}>
                      <Heart size={15} color={wishlist.includes(p.id) ? '#ef4444' : '#94a3b8'} fill={wishlist.includes(p.id) ? '#ef4444' : 'none'} />
                    </motion.button>
                  </div>
                  {/* seller label bottom */}
                  <div style={{ position: 'absolute', bottom: '.75rem', left: '.875rem', fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,.85)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={10} /> {p.state}
                  </div>
                </div>

                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.375rem' }}>
                    <span style={{ padding: '.18rem .6rem', borderRadius: '999px', background: 'rgba(99,102,241,.08)', border: '1px solid rgba(99,102,241,.15)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary)' }}>{p.category}</span>
                  </div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.5rem', lineHeight: 1.4 }}>{p.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.875rem' }}>{p.description.slice(0, 70)}…</p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1rem' }}>
                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)' }}>{p.rating}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({p.reviews})</span>
                  </div>

                  <div style={{ height: '1px', background: 'var(--border)', margin: '0.75rem 0' }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--primary)' }}>₹{p.price.toLocaleString()}</div>
                      {p.originalPrice > p.price && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{p.originalPrice.toLocaleString()}</div>}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {inCart(p.id) && (
                        <button onClick={() => setCartOpen(true)}
                          style={{ padding: '.6rem .9rem', borderRadius: '.75rem', background: 'rgba(249,115,22,.1)', color: 'var(--accent)', fontWeight: 700, fontSize: '0.78rem', border: '1.5px solid rgba(249,115,22,.3)', cursor: 'pointer', fontFamily: 'inherit' }}>
                          View Cart
                        </button>
                      )}
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} onClick={() => addToCart(p)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '.625rem 1.1rem', borderRadius: '.75rem', background: inCart(p.id) ? 'var(--bg-section)' : 'var(--primary)', color: inCart(p.id) ? 'var(--text-muted)' : '#fff', fontWeight: 700, fontSize: '0.8rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}>
                        <ShoppingCart size={14} /> {inCart(p.id) ? '+1' : 'Add'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          )}
        </div>

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
            <h3 style={{ color: 'var(--text-heading)', marginBottom: '0.5rem' }}>No products found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try a different category or search term.</p>
          </div>
        )}
      </div>

      {/* Floating cart button (bottom-right) when cart has items */}
      <AnimatePresence>
        {cartCount > 0 && !cartOpen && (
          <motion.button initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
            onClick={() => setCartOpen(true)}
            style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '.875rem 1.5rem', borderRadius: '999px', background: 'var(--accent)', color: '#fff', fontWeight: 800, fontSize: '0.9rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 24px rgba(249,115,22,.45)' }}>
            <ShoppingCart size={18} /> View Cart · {cartCount} item{cartCount !== 1 ? 's' : ''}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;

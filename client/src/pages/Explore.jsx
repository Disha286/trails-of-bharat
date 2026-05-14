import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Filter, X } from 'lucide-react';
import { destinations, categories, states } from '../data/destinations';

const budgetOptions = [
  { value: 'all', label: 'All Budgets' },
  { value: 'budget', label: '💚 Budget' },
  { value: 'moderate', label: '💛 Moderate' },
  { value: 'high', label: '❤️ Premium' },
];

const Explore = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery]         = useState(searchParams.get('q') || '');
  const [activeCat, setActiveCat] = useState(searchParams.get('cat') || 'all');
  const [activeState, setActiveState] = useState('All States');
  const [activeBudget, setActiveBudget] = useState('all');
  const [minRating, setMinRating]  = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    return destinations.filter(d => {
      if (query && !d.name.toLowerCase().includes(query.toLowerCase()) && !d.state.toLowerCase().includes(query.toLowerCase()) && !d.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))) return false;
      if (activeCat !== 'all' && d.category.toLowerCase() !== categories.find(c => c.id === activeCat)?.label.toLowerCase()) return false;
      if (activeState !== 'All States' && d.state !== activeState) return false;
      if (activeBudget !== 'all' && d.budget !== activeBudget) return false;
      if (d.rating < minRating) return false;
      return true;
    });
  }, [query, activeCat, activeState, activeBudget, minRating]);

  const Sidebar = () => (
    <div style={{ width: '260px', flexShrink: 0 }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: '1.25rem', border: '1px solid var(--border)', padding: '1.5rem', position: 'sticky', top: 'calc(var(--navbar-h) + 1.5rem)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)' }}>Filters</h3>
          <button onClick={() => { setActiveCat('all'); setActiveState('All States'); setActiveBudget('all'); setMinRating(0); }}
            style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>Reset</button>
        </div>

        {/* Category */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '0.75rem' }}>Category</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {[{ id:'all', label:'All Categories', emoji:'🗺️' }, ...categories].map(c => (
              <button key={c.id} onClick={() => setActiveCat(c.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 0.875rem', borderRadius: '0.75rem', background: activeCat === c.id ? 'var(--primary)' : 'transparent', color: activeCat === c.id ? '#fff' : 'var(--text-body)', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}>
                <span>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '0.75rem' }}>Budget</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {budgetOptions.map(b => (
              <button key={b.value} onClick={() => setActiveBudget(b.value)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 0.875rem', borderRadius: '0.75rem', background: activeBudget === b.value ? 'var(--primary)' : 'transparent', color: activeBudget === b.value ? '#fff' : 'var(--text-body)', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}>
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* State */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '0.75rem' }}>State</div>
          <select value={activeState} onChange={e => setActiveState(e.target.value)}
            style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.75rem', border: '1.5px solid var(--border)', background: 'var(--bg-section)', color: 'var(--text-body)', fontFamily: 'inherit', fontSize: '0.875rem', outline: 'none' }}>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Rating */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '0.75rem' }}>Min Rating: {minRating > 0 ? minRating + '+' : 'Any'}</div>
          <input type="range" min={0} max={4.5} step={0.5} value={minRating} onChange={e => setMinRating(+e.target.value)}
            style={{ width: '100%', accentColor: 'var(--primary)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            <span>Any</span><span>4.5+</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="container">

        {/* Header */}
        <div className="page-header">
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Explore</span>
          <h1 className="page-title" style={{ marginTop: '0.5rem' }}>Discover Destinations</h1>
          <p className="page-desc">Find your perfect Indian adventure across 29 states.</p>
        </div>

        {/* Search + filter toggle */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative', minWidth: '240px' }}>
            <Search size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search destinations, states, tags…"
              style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', borderRadius: '0.875rem', background: 'var(--bg-section)', border: '1.5px solid var(--border)', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--text-heading)', outline: 'none' }} />
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1.25rem', borderRadius: '0.875rem', background: sidebarOpen ? 'var(--primary)' : 'var(--bg-card)', color: sidebarOpen ? '#fff' : 'var(--text-body)', border: '1.5px solid var(--border)', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}
            className="hamburger-btn">
            {sidebarOpen ? <X size={16} /> : <Filter size={16} />} Filters
          </button>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Sidebar desktop */}
          <div className="desktop-nav" style={{ display: 'flex' }}>
            <Sidebar />
          </div>
          {/* Mobile sidebar */}
          {sidebarOpen && (
            <div className="hamburger-btn" style={{ width: '100%', marginBottom: '1.5rem', position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(0,0,0,.5)' }} onClick={() => setSidebarOpen(false)}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '280px', background: 'var(--bg-card)', padding: '1.5rem', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                <Sidebar />
              </div>
            </div>
          )}

          {/* Results */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 600 }}>
              Showing <strong style={{ color: 'var(--text-heading)' }}>{filtered.length}</strong> destination{filtered.length !== 1 ? 's' : ''}
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
                <h3 style={{ color: 'var(--text-heading)', marginBottom: '0.5rem' }}>No destinations found</h3>
                <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search term.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: '1.75rem' }}>
                {filtered.map((d, i) => (
                  <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                    <Link to={`/destination/${d.id}`} style={{ display: 'block', textDecoration: 'none', borderRadius: '1.5rem', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', transition: 'all .3s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
                      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                        <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 60%)' }} />
                        <div style={{ position: 'absolute', top: '0.875rem', left: '0.875rem', padding: '.25rem .7rem', borderRadius: '999px', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.25)', fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>{d.category}</div>
                        <div style={{ position: 'absolute', top: '0.875rem', right: '0.875rem', display: 'flex', alignItems: 'center', gap: '3px', padding: '.25rem .65rem', borderRadius: '999px', background: 'rgba(255,255,255,.92)', fontSize: '0.7rem', fontWeight: 700, color: '#0f172a' }}>
                          <Star size={10} fill="#f59e0b" color="#f59e0b" /> {d.rating}
                        </div>
                        <div style={{ position: 'absolute', bottom: '0.875rem', left: '1rem' }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{d.name}</div>
                        </div>
                      </div>
                      <div style={{ padding: '1.25rem' }}>
                        <p style={{ fontSize: '0.83rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem' }}>{d.desc.slice(0, 85)}…</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}><MapPin size={12}/> {d.state}</span>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)' }}>View Details →</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;

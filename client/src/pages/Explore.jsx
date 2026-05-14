import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, MapPin, Filter, X, Map, LayoutGrid, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { destinations, categories, states } from '../data/destinations';

// Fix Leaflet default icon paths broken by Vite bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Category colour → custom SVG pin
const catColors = {
  Heritage: '#d97706', 'Eco Tourism': '#16a34a', Adventure: '#0284c7',
  Spiritual: '#9333ea', Tribal: '#e11d48', Beaches: '#0891b2',
};
const makeIcon = (color) => L.divIcon({
  className: '',
  html: `<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;background:${color};border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);transform:rotate(-45deg)"></div>`,
  iconSize: [28, 28], iconAnchor: [14, 28], popupAnchor: [0, -30],
});

// Fly map to a location
const FlyTo = ({ center }) => { const map = useMap(); useEffect(() => { if (center) map.flyTo(center, 6, { duration: 1.4 }); }, [center, map]); return null; };

const budgetOpts = [
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
  const [viewMode, setViewMode]    = useState('grid'); // 'grid' | 'map'
  const [flyCenter, setFlyCenter]  = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError]    = useState('');

  const filtered = useMemo(() => destinations.filter(d => {
    if (query && !d.name.toLowerCase().includes(query.toLowerCase()) && !d.state.toLowerCase().includes(query.toLowerCase()) && !d.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))) return false;
    if (activeCat !== 'all' && d.category.toLowerCase() !== categories.find(c => c.id === activeCat)?.label.toLowerCase()) return false;
    if (activeState !== 'All States' && d.state !== activeState) return false;
    if (activeBudget !== 'all' && d.budget !== activeBudget) return false;
    if (d.rating < minRating) return false;
    return true;
  }), [query, activeCat, activeState, activeBudget, minRating]);

  const handleNearMe = () => {
    if (!navigator.geolocation) { setGeoError('Geolocation not supported by your browser.'); return; }
    setGeoLoading(true); setGeoError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFlyCenter([latitude, longitude]);
        setViewMode('map');
        setGeoLoading(false);
      },
      () => { setGeoError('Location access denied.'); setGeoLoading(false); }
    );
  };

  const resetFilters = () => { setActiveCat('all'); setActiveState('All States'); setActiveBudget('all'); setMinRating(0); setQuery(''); };

  const Sidebar = () => (
    <div style={{ width: '240px', flexShrink: 0 }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: '1.25rem', border: '1px solid var(--border)', padding: '1.25rem', position: 'sticky', top: 'calc(var(--navbar-h) + 1.5rem)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)' }}>Filters</h3>
          <button onClick={resetFilters} style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>Reset</button>
        </div>
        {/* Budget */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '0.625rem' }}>Budget</div>
          {budgetOpts.map(b => (
            <button key={b.value} onClick={() => setActiveBudget(b.value)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: '0.625rem', background: activeBudget === b.value ? 'var(--primary)' : 'transparent', color: activeBudget === b.value ? '#fff' : 'var(--text-body)', fontWeight: 600, fontSize: '0.85rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '2px', transition: 'all .15s' }}>
              {b.label}
            </button>
          ))}
        </div>
        {/* State */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '0.625rem' }}>State</div>
          <select value={activeState} onChange={e => setActiveState(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.625rem', border: '1.5px solid var(--border)', background: 'var(--bg-section)', color: 'var(--text-body)', fontFamily: 'inherit', fontSize: '0.85rem', outline: 'none' }}>
            {states.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {/* Rating */}
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '0.625rem' }}>Min Rating: {minRating > 0 ? `${minRating}+` : 'Any'}</div>
          <input type="range" min={0} max={4.5} step={0.5} value={minRating} onChange={e => setMinRating(+e.target.value)} style={{ width: '100%', accentColor: 'var(--primary)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}><span>Any</span><span>4.5+</span></div>
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
          <p className="page-desc">Find your perfect Indian adventure across 29 states and territories.</p>
        </div>

        {/* Category tab pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          <button onClick={() => setActiveCat('all')}
            style={{ padding: '.45rem 1rem', borderRadius: '999px', border: `1.5px solid ${activeCat === 'all' ? 'var(--primary)' : 'var(--border)'}`, background: activeCat === 'all' ? 'var(--primary)' : 'var(--bg-card)', color: activeCat === 'all' ? '#fff' : 'var(--text-body)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}>
            🗺️ All
          </button>
          {categories.map(c => (
            <button key={c.id} onClick={() => setActiveCat(c.id)}
              style={{ padding: '.45rem 1rem', borderRadius: '999px', border: `1.5px solid ${activeCat === c.id ? c.color : 'var(--border)'}`, background: activeCat === c.id ? c.color : 'var(--bg-card)', color: activeCat === c.id ? '#fff' : 'var(--text-body)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}>
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        {/* Search + controls row */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative', minWidth: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search destinations, states, tags…"
              style={{ width: '100%', padding: '.8rem 1rem .8rem 2.5rem', borderRadius: '.875rem', background: 'var(--bg-section)', border: '1.5px solid var(--border)', fontSize: '0.875rem', fontFamily: 'inherit', color: 'var(--text-heading)', outline: 'none' }} />
          </div>

          {/* Near Me button */}
          <button onClick={handleNearMe} disabled={geoLoading}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0 1.1rem', borderRadius: '.875rem', background: 'var(--bg-card)', color: 'var(--primary)', border: '1.5px solid var(--primary)', fontWeight: 700, fontSize: '0.85rem', cursor: geoLoading ? 'wait' : 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--primary)'; }}>
            <Navigation size={15} /> {geoLoading ? 'Locating…' : 'Near Me'}
          </button>

          {/* Grid / Map toggle */}
          <div style={{ display: 'flex', borderRadius: '.875rem', overflow: 'hidden', border: '1.5px solid var(--border)' }}>
            {[{ mode: 'grid', Icon: LayoutGrid }, { mode: 'map', Icon: Map }].map(({ mode, Icon }) => (
              <button key={mode} onClick={() => setViewMode(mode)}
                style={{ padding: '.6rem .9rem', background: viewMode === mode ? 'var(--primary)' : 'var(--bg-card)', color: viewMode === mode ? '#fff' : 'var(--text-muted)', border: 'none', cursor: 'pointer', transition: 'all .15s' }}>
                <Icon size={16} />
              </button>
            ))}
          </div>

          {/* Filter button (mobile) */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hamburger-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0 1rem', borderRadius: '.875rem', background: sidebarOpen ? 'var(--primary)' : 'var(--bg-card)', color: sidebarOpen ? '#fff' : 'var(--text-body)', border: '1.5px solid var(--border)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            {sidebarOpen ? <X size={15} /> : <Filter size={15} />} Filters
          </button>
        </div>

        {geoError && <div style={{ marginBottom: '1rem', padding: '.625rem 1rem', borderRadius: '.75rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.85rem', fontWeight: 600 }}>{geoError}</div>}

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Desktop sidebar */}
          <div className="desktop-nav" style={{ display: 'flex' }}><Sidebar /></div>

          {/* Mobile sidebar overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div className="hamburger-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(0,0,0,.5)' }} onClick={() => setSidebarOpen(false)}>
                <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'spring', damping: 25 }}
                  style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '280px', background: 'var(--bg-card)', padding: '1.5rem', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                  <Sidebar />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', fontWeight: 600 }}>
              Showing <strong style={{ color: 'var(--text-heading)' }}>{filtered.length}</strong> destination{filtered.length !== 1 ? 's' : ''}
              {viewMode === 'map' && <span style={{ marginLeft: '0.5rem', color: 'var(--primary)' }}>· Map View</span>}
            </div>

            {/* ── MAP VIEW ── */}
            {viewMode === 'map' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ borderRadius: '1.5rem', overflow: 'hidden', height: '520px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                <MapContainer center={[20.5937, 78.9629]} zoom={4.5} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                  />
                  {flyCenter && <FlyTo center={flyCenter} />}
                  {filtered.map(dest => dest.lat && (
                    <Marker key={dest.id} position={[dest.lat, dest.lng]} icon={makeIcon(catColors[dest.category] || '#6366f1')}>
                      <Popup>
                        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', minWidth: '180px' }}>
                          <img src={dest.img} alt={dest.name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '0.75rem 0.75rem 0 0', display: 'block' }} />
                          <div style={{ padding: '0.75rem' }}>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '2px' }}>{dest.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '6px' }}>{dest.state} · {dest.category}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                              ⭐ {dest.rating} · {dest.bestTime}
                            </div>
                            <a href={`/destination/${dest.id}`} style={{ display: 'block', textAlign: 'center', padding: '0.4rem', borderRadius: '0.5rem', background: '#6366f1', color: '#fff', fontWeight: 700, fontSize: '0.78rem', textDecoration: 'none' }}>
                              View Details →
                            </a>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </motion.div>
            )}

            {/* ── GRID VIEW ── */}
            {viewMode === 'grid' && (
              <>
                {filtered.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
                    <h3 style={{ color: 'var(--text-heading)', marginBottom: '0.5rem' }}>No destinations found</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Try adjusting your filters or search term.</p>
                    <button onClick={resetFilters} className="btn btn-primary">Clear Filters</button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(265px,1fr))', gap: '1.75rem' }}>
                    {filtered.map((d, i) => (
                      <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <Link to={`/destination/${d.id}`} style={{ display: 'block', textDecoration: 'none', borderRadius: '1.5rem', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', transition: 'all .3s' }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
                          <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                            <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 60%)' }} />
                            <div style={{ position: 'absolute', top: '0.875rem', left: '0.875rem', padding: '.22rem .65rem', borderRadius: '999px', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.25)', fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>{d.category}</div>
                            <div style={{ position: 'absolute', top: '0.875rem', right: '0.875rem', display: 'flex', alignItems: 'center', gap: '3px', padding: '.22rem .6rem', borderRadius: '999px', background: 'rgba(255,255,255,.92)', fontSize: '0.7rem', fontWeight: 700, color: '#0f172a' }}>
                              <Star size={10} fill="#f59e0b" color="#f59e0b" /> {d.rating}
                            </div>
                            <div style={{ position: 'absolute', bottom: '0.875rem', left: '1rem' }}>
                              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>{d.name}</div>
                            </div>
                          </div>
                          <div style={{ padding: '1.1rem 1.25rem' }}>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '0.875rem' }}>{d.desc.slice(0, 80)}…</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}><MapPin size={12} /> {d.state}</span>
                              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)' }}>View Details →</span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;

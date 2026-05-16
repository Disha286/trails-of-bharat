import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Search, Phone, Clock, Shield, ChevronDown, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getGuides } from '../services/guideService.js';
import { Loader2 } from 'lucide-react';


const guideTypes = ['All', 'Cultural', 'Adventure', 'Wildlife', 'Spiritual'];
const regions = ['All Regions', 'Rajasthan', 'Ladakh', 'Tamil Nadu', 'Uttarakhand', 'Assam', 'Delhi', 'Gujarat', 'Kerala'];

const typeColors = {
  Cultural:  { color: '#4f46e5', bg: '#eef2ff' },
  Adventure: { color: '#0284c7', bg: '#f0f9ff' },
  Wildlife:  { color: '#16a34a', bg: '#f0fdf4' },
  Spiritual: { color: '#9333ea', bg: '#fdf4ff' },
};

const AvailBadge = ({ status }) => {
  const color = status === 'Available' ? '#16a34a' : '#d97706';
  const bg    = status === 'Available' ? '#f0fdf4' : '#fffbeb';
  return (
    <span style={{ padding: '.2rem .65rem', borderRadius: '999px', background: bg, color, fontSize: '0.7rem', fontWeight: 700 }}>
      ● {status}
    </span>
  );
};

const Guides = () => {
  const [activeType, setActiveType]     = useState('All');
  const [activeRegion, setActiveRegion] = useState('All Regions');
  const [query, setQuery]               = useState('');
  const [selected, setSelected]         = useState(null);

  const filtered = guides.filter(g => {
    if (activeType !== 'All' && g.type !== activeType) return false;
    if (activeRegion !== 'All Regions' && g.region !== activeRegion) return false;
    if (query) {
      const q = query.toLowerCase();
      return g.name.toLowerCase().includes(q) || g.region.toLowerCase().includes(q) || g.specialty.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: 'var(--bg-card)', borderRadius: '2rem', border: '1px solid var(--border)', boxShadow: '0 25px 60px rgba(0,0,0,.3)', maxWidth: '600px', width: '100%', overflow: 'hidden', maxHeight: '90vh', overflowY: 'auto' }}>
              {/* Cover */}
              <div style={{ position: 'relative', height: '200px' }}>
                <img src={selected.cover} alt={selected.region} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 60%)' }} />
                <button onClick={() => setSelected(null)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.25)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
                <img src={selected.avatar} alt={selected.name}
                  style={{ position: 'absolute', bottom: '-2rem', left: '1.5rem', width: '72px', height: '72px', borderRadius: '1.25rem', objectFit: 'cover', border: '3px solid var(--bg-card)' }} />
              </div>
              <div style={{ padding: '3rem 1.75rem 1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.25rem' }}>{selected.name}</h2>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} /> {selected.city}, {selected.region}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', textAlign: 'right' }}>{selected.price}</div>
                    <AvailBadge status={selected.availability} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  {[
                    { icon: Star, val: `${selected.rating} (${selected.reviews} reviews)` },
                    { icon: Clock, val: `${selected.experience} experience` },
                    { icon: Shield, val: selected.verified ? 'Verified by Trails of Bharat' : 'Pending Verification' },
                  ].map((item, i) => {
                    const I = item.icon;
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-body)', fontWeight: 600 }}>
                        <I size={14} color="var(--primary)" /> {item.val}
                      </div>
                    );
                  })}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{selected.bio}</p>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Specialties</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selected.highlights.map(h => (
                      <span key={h} style={{ padding: '.35rem .85rem', borderRadius: '999px', background: 'var(--bg-section)', border: '1px solid var(--border)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-body)' }}>{h}</span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1.5rem' }}>
                  🗣 Languages: {selected.languages.join(' · ')}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Link to="/contact"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', borderRadius: '1rem', background: 'var(--primary)', color: '#fff', fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(99,102,241,.3)' }}>
                    <Phone size={16} /> Book This Guide
                  </Link>
                  <button onClick={() => setSelected(null)}
                    style={{ padding: '1rem 1.5rem', borderRadius: '1rem', background: 'var(--bg-section)', border: '1.5px solid var(--border)', color: 'var(--text-body)', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', background: 'linear-gradient(135deg,#0f0c29 0%,#24243e 50%,#0f2027 100%)', padding: 'clamp(3.5rem,8vw,6rem) 1.5rem', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(99,102,241,.15)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(16,185,129,.1)', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '.3rem 1rem', borderRadius: '999px', background: 'rgba(99,102,241,.2)', border: '1px solid rgba(99,102,241,.35)', marginBottom: '1.5rem' }}>
            <Compass size={13} color="#818cf8" />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '.1em' }}>Expert Guides</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5.5vw,3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Find Your <span style={{ background: 'linear-gradient(90deg,#818cf8,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Guide</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 2.5rem' }}>
            Handpicked, verified local experts across India — for cultural tours, treks, wildlife safaris, and spiritual journeys.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            {[{ val: '180+', label: 'Verified Experts' }, { val: '29', label: 'States' }, { val: '4.8★', label: 'Avg Rating' }, { val: '10k+', label: 'Tours Led' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,.5)', fontWeight: 600, marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="page">
      <div className="container">


        {/* Search & Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ position: 'relative', flex: '1 1 260px', minWidth: '200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search guide name, region or specialty…"
              style={{ width: '100%', padding: '.875rem 1rem .875rem 2.75rem', borderRadius: '.875rem', background: 'var(--bg-section)', border: '1.5px solid var(--border)', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--text-heading)', outline: 'none' }} />
          </div>

          {/* Type filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {guideTypes.map(t => (
              <button key={t} onClick={() => setActiveType(t)}
                style={{ padding: '.5rem 1rem', borderRadius: '999px', border: `1.5px solid ${activeType === t ? 'var(--primary)' : 'var(--border)'}`, background: activeType === t ? 'var(--primary)' : 'var(--bg-card)', color: activeType === t ? '#fff' : 'var(--text-body)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}>
                {t}
              </button>
            ))}
          </div>

          {/* Region dropdown */}
          <div style={{ position: 'relative' }}>
            <select value={activeRegion} onChange={e => setActiveRegion(e.target.value)}
              style={{ padding: '.6rem 2.5rem .6rem 1rem', borderRadius: '.875rem', border: '1.5px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-body)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', outline: 'none', appearance: 'none' }}>
              {regions.map(r => <option key={r}>{r}</option>)}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          </div>
        </div>

        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1.5rem' }}>
          Showing <strong style={{ color: 'var(--text-heading)' }}>{filtered.length}</strong> guides
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: '1.75rem', marginBottom: '4rem' }}>
          <AnimatePresence>
            {filtered.map((g, i) => (
              <motion.div key={g.id} layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                style={{ borderRadius: '1.5rem', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'box-shadow .3s, transform .3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                onClick={() => setSelected(g)}>

                {/* Cover photo */}
                <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                  <img src={g.cover} alt={g.region}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 60%)' }} />
                  <div style={{ position: 'absolute', top: '.75rem', left: '.75rem', padding: '.2rem .65rem', borderRadius: '999px', background: typeColors[g.type]?.bg || '#eef2ff', fontSize: '0.7rem', fontWeight: 700, color: typeColors[g.type]?.color || '#4f46e5' }}>
                    {g.type}
                  </div>
                  <div style={{ position: 'absolute', top: '.75rem', right: '.75rem', fontSize: '0.72rem', fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(6px)', padding: '.25rem .6rem', borderRadius: '999px' }}>
                    {g.badge}
                  </div>
                  {/* Avatar */}
                  <img src={g.avatar} alt={g.name}
                    style={{ position: 'absolute', bottom: '-1.25rem', left: '1.25rem', width: '52px', height: '52px', borderRadius: '.875rem', objectFit: 'cover', border: '3px solid var(--bg-card)' }} />
                </div>

                <div style={{ padding: '1.75rem 1.25rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.375rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)' }}>{g.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-heading)', flexShrink: 0 }}>
                      <Star size={13} fill="#f59e0b" color="#f59e0b" /> {g.rating}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.5rem' }}>
                    <MapPin size={12} /> {g.city}, {g.region}
                  </div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.875rem' }}>{g.specialty}</div>

                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {g.bio.slice(0, 90)}…
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)' }}>{g.price}</div>
                      <AvailBadge status={g.availability} />
                    </div>
                    <button
                      style={{ padding: '.625rem 1.25rem', borderRadius: '.875rem', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.8rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background .2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-hover)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'var(--primary)'}>
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧭</div>
            <h3 style={{ color: 'var(--text-heading)', marginBottom: '0.5rem' }}>No guides found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search term.</p>
          </div>
        )}

        {/* Register CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ borderRadius: '2rem', background: 'linear-gradient(135deg,#0f0c29 0%,#302b63 60%,#24243e 100%)', padding: '3rem 2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: '#fff', marginBottom: '1rem' }}>Are You a Local Guide?</h2>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1rem', maxWidth: '32rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Join 180+ verified guides earning sustainable income through Trails of Bharat. Apply for free in under 5 minutes.
          </p>
          <Link to="/register"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', borderRadius: '1rem', background: 'var(--primary)', color: '#fff', fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 18px rgba(99,102,241,.4)' }}>
            Register as a Guide →
          </Link>
        </motion.div>

      </div>
      </div>
    </div>
  );
};

export default Guides;

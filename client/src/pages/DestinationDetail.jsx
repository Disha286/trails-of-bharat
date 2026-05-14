import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Utensils, Lightbulb, ChevronLeft, Calendar, ArrowRight, MessageSquare, ThumbsUp, Wallet, IndianRupee } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getDestinationById, destinations } from '../data/destinations';

// Fix Vite/Leaflet icon path issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const pinIcon = L.divIcon({
  className: '',
  html: `<div style="width:32px;height:32px;border-radius:50% 50% 50% 0;background:#6366f1;border:3px solid #fff;box-shadow:0 3px 10px rgba(99,102,241,.5);transform:rotate(-45deg)"></div>`,
  iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -36],
});

// Mock reviews data
const REVIEWS = [
  { id: 1, name: 'Ananya Sharma',   avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&q=80', rating: 5, date: 'March 2026',   text: 'Absolutely breathtaking! The local guide made all the difference — insider spots no tourist usually finds.', helpful: 24 },
  { id: 2, name: 'Rahul Verma',     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80', rating: 4, date: 'February 2026', text: 'Wonderful experience overall. Plan well in advance — peak season gets crowded but the scenery is worth it.', helpful: 18 },
  { id: 3, name: 'Priya Nair',      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80', rating: 5, date: 'January 2026',  text: 'One of the best trips of my life. The food recommendations from this platform were spot-on!', helpful: 31 },
];

const StarRow = ({ rating, size = 14 }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={size} fill={i <= rating ? '#f59e0b' : 'none'} color={i <= rating ? '#f59e0b' : 'var(--border)'} />
    ))}
  </div>
);

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const d = getDestinationById(id);

  if (!d) return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <div style={{ fontSize: '4rem' }}>🗺️</div>
      <h2 style={{ color: 'var(--text-heading)' }}>Destination not found</h2>
      <Link to="/explore" className="btn btn-primary">Back to Explore</Link>
    </div>
  );

  return (
    <div>
      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: '65vh', minHeight: '420px', overflow: 'hidden' }}>
        <img src={d.heroImg} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.78) 0%,rgba(0,0,0,.15) 55%,transparent 100%)' }} />
        <button onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: 'calc(var(--navbar-h) + 1rem)', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1rem', borderRadius: '999px', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.25)', color: '#fff', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
          <ChevronLeft size={16} /> Back
        </button>
        <div style={{ position: 'absolute', bottom: '2rem', left: 0, right: 0 }}>
          <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.875rem' }}>
                  <span style={{ padding: '.25rem .75rem', borderRadius: '999px', background: 'rgba(99,102,241,.8)', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>{d.category}</span>
                  {d.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{ padding: '.25rem .75rem', borderRadius: '999px', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.2)', fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>{tag}</span>
                  ))}
                </div>
                <h1 style={{ fontSize: 'clamp(2.25rem,5vw,3.75rem)', fontWeight: 900, color: '#fff', lineHeight: 1.05 }}>{d.name}</h1>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.72)', marginTop: '0.375rem' }}>{d.tagline}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.875rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                    <Star size={15} fill="#f59e0b" color="#f59e0b" /> {d.rating} <span style={{ opacity: .65, fontWeight: 400 }}>({d.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,.75)', fontWeight: 600, fontSize: '0.875rem' }}>
                    <MapPin size={14} /> {d.state}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,.75)', fontWeight: 600, fontSize: '0.875rem' }}>
                    <Calendar size={14} /> {d.bestTime}
                  </div>
                </div>
              </div>
              <Link to="/planner" className="btn btn-primary btn-lg">
                Plan This Trip <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container" style={{ paddingBlock: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3rem' }}>

          {/* ── Left col ── */}
          <div>
            {/* About */}
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}>About {d.name}</h2>
              <p style={{ color: 'var(--text-body)', lineHeight: 1.85, fontSize: '0.975rem' }}>{d.desc}</p>
            </section>

            {/* Highlights */}
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}>✨ Top Highlights</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {d.highlights.map(h => (
                  <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.875rem', background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)' }}>{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Local Food */}
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}>
                <Utensils size={18} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />Local Food
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {d.localFood.map(f => (
                  <span key={f} style={{ padding: '.45rem .9rem', borderRadius: '999px', background: 'rgba(249,115,22,.07)', border: '1.5px solid rgba(249,115,22,.2)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>{f}</span>
                ))}
              </div>
            </section>

            {/* Travel Tips */}
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}>
                <Lightbulb size={18} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />Travel Tips
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {d.tips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.875rem 1rem', borderRadius: '0.875rem', background: 'rgba(99,102,241,.05)', border: '1px solid rgba(99,102,241,.15)' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>0{i + 1}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Reviews ── */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                  <MessageSquare size={18} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                  Traveler Reviews
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ fontWeight: 800, color: 'var(--text-heading)' }}>{d.rating}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>· {d.reviews.toLocaleString()} reviews</span>
                </div>
              </div>

              {/* Rating breakdown bar */}
              <div style={{ background: 'var(--bg-card)', borderRadius: '1.25rem', border: '1px solid var(--border)', padding: '1.25rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow)' }}>
                {[5, 4, 3, 2, 1].map(n => {
                  const pct = n === 5 ? 68 : n === 4 ? 22 : n === 3 ? 7 : n === 2 ? 2 : 1;
                  return (
                    <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', width: '12px', textAlign: 'right' }}>{n}</span>
                      <Star size={11} fill="#f59e0b" color="#f59e0b" />
                      <div style={{ flex: 1, height: '6px', borderRadius: '999px', background: 'var(--bg-section)', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: .8, delay: (5 - n) * .05 }}
                          style={{ height: '100%', borderRadius: '999px', background: n >= 4 ? '#10b981' : n === 3 ? '#f59e0b' : '#ef4444' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', width: '28px' }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>

              {/* Review cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {REVIEWS.map((r, i) => (
                  <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}
                    style={{ background: 'var(--bg-card)', borderRadius: '1.25rem', border: '1px solid var(--border)', padding: '1.25rem', boxShadow: 'var(--shadow)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.875rem' }}>
                      <img src={r.avatar} alt={r.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)' }}>{r.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.date}</div>
                      </div>
                      <StarRow rating={r.rating} size={13} />
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '0.875rem' }}>{r.text}</p>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                      <ThumbsUp size={13} /> Helpful ({r.helpful})
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Write review CTA */}
              <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', borderRadius: '1rem', background: 'var(--bg-section)', border: '1.5px dashed var(--border)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                ✏️ Write a Review — Login to contribute
              </Link>
            </section>
          </div>

          {/* ── Right col ── */}
          <div>
            {/* Quick Info card */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '1.25rem', border: '1px solid var(--border)', padding: '1.5rem', marginBottom: '1.75rem', boxShadow: 'var(--shadow-md)', position: 'sticky', top: 'calc(var(--navbar-h) + 1.5rem)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1.25rem' }}>Quick Info</h3>
              {[
                { icon: Clock,         label: 'Best Time', val: d.bestTime },
                { icon: Calendar,      label: 'Duration',  val: d.duration },
                { icon: MapPin,        label: 'State',     val: d.state },
                { icon: Wallet,        label: 'Budget',    val: d.budget?.charAt(0).toUpperCase() + d.budget?.slice(1) },
                { icon: IndianRupee,   label: 'Est. Cost', val: `₹${d.price?.toLocaleString()}/person` },
              ].map(item => {
                const I = item.icon;
                return item.val ? (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingBlock: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '0.625rem', background: 'rgba(99,102,241,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <I size={16} color="var(--primary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>{item.label}</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>{item.val}</div>
                    </div>
                  </div>
                ) : null;
              })}
              <Link to="/planner" className="btn btn-primary btn-full" style={{ marginTop: '1.25rem' }}>Plan This Trip →</Link>
            </div>

            {/* Gallery */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}>Gallery</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                {d.gallery.map((img, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.04 }} style={{ borderRadius: '0.875rem', overflow: 'hidden', height: i === 0 ? '180px' : '120px' }}>
                    <img src={img} alt={`${d.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Leaflet Map ── */}
            {d.lat && d.lng && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}>📍 Location Map</h3>
                <div style={{ borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--border)', height: '240px', boxShadow: 'var(--shadow)' }}>
                  <MapContainer center={[d.lat, d.lng]} zoom={7} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                      attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    />
                    <Marker position={[d.lat, d.lng]} icon={pinIcon}>
                      <Popup>
                        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: '#0f172a', padding: '4px' }}>
                          📍 {d.name}, {d.state}
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Nearby Destinations ── */}
      {(() => {
        const nearby = destinations
          .filter(x => x.id !== d.id && (x.category === d.category || x.state === d.state))
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        if (!nearby.length) return null;
        return (
          <section style={{ background: 'var(--bg-section)', borderTop: '1px solid var(--border)', paddingBlock: '3.5rem' }}>
            <div className="container">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '0.375rem' }}>Explore More</div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-heading)' }}>You Might Also Like</h2>
                </div>
                <Link to="/explore" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>View All <ArrowRight size={15} /></Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.5rem' }}>
                {nearby.map((nd, i) => (
                  <motion.div key={nd.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}>
                    <Link to={`/destination/${nd.id}`} style={{ display: 'block', textDecoration: 'none', borderRadius: '1.25rem', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', transition: 'all .3s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
                      <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                        <img src={nd.img} alt={nd.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 60%)' }} />
                        <div style={{ position: 'absolute', top: '.75rem', left: '.75rem', padding: '.2rem .65rem', borderRadius: '999px', background: 'rgba(99,102,241,.8)', fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>{nd.category}</div>
                        <div style={{ position: 'absolute', top: '.75rem', right: '.75rem', display: 'flex', alignItems: 'center', gap: '3px', padding: '.2rem .6rem', borderRadius: '999px', background: 'rgba(255,255,255,.9)', fontSize: '0.72rem', fontWeight: 700, color: '#0f172a' }}>
                          <Star size={10} fill="#f59e0b" color="#f59e0b" /> {nd.rating}
                        </div>
                        <div style={{ position: 'absolute', bottom: '.75rem', left: '.875rem', fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{nd.name}</div>
                      </div>
                      <div style={{ padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}><MapPin size={12} />{nd.state}</span>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)' }}>Explore →</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}
    </div>
  );
};

export default DestinationDetail;

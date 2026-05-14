import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Utensils, Lightbulb, ChevronLeft, Calendar, ArrowRight } from 'lucide-react';
import { getDestinationById } from '../data/destinations';

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
      {/* Hero */}
      <div style={{ position: 'relative', height: '65vh', minHeight: '420px', overflow: 'hidden' }}>
        <img src={d.heroImg} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.2) 50%, transparent 100%)' }} />
        <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 'calc(var(--navbar-h) + 1rem)', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', borderRadius: '999px', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.25)', color: '#fff', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
          <ChevronLeft size={16} /> Back
        </button>
        <div style={{ position: 'absolute', bottom: '2rem', left: 0, right: 0 }}>
          <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {d.tags.map(tag => (
                    <span key={tag} style={{ padding: '.25rem .75rem', borderRadius: '999px', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.25)', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>{tag}</span>
                  ))}
                </div>
                <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.05 }}>{d.name}</h1>
                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,.75)', marginTop: '0.5rem' }}>{d.tagline}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fff', fontWeight: 700 }}>
                    <Star size={16} fill="#f59e0b" color="#f59e0b" /> {d.rating} ({d.reviews.toLocaleString()} reviews)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,.8)', fontWeight: 600, fontSize: '0.9rem' }}>
                    <MapPin size={15} /> {d.state}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,.8)', fontWeight: 600, fontSize: '0.9rem' }}>
                    <Calendar size={15} /> {d.bestTime}
                  </div>
                </div>
              </div>
              <Link to="/planner" className="btn btn-primary btn-lg">Plan This Trip <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container" style={{ paddingBlock: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3rem' }}>

          {/* Left col */}
          <div>
            {/* Overview */}
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}>About {d.name}</h2>
              <p style={{ color: 'var(--text-body)', lineHeight: 1.8, fontSize: '0.9875rem' }}>{d.desc}</p>
            </section>

            {/* Highlights */}
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}>✨ Top Highlights</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
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
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}><Utensils size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Local Food</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {d.localFood.map(f => (
                  <span key={f} style={{ padding: '.5rem 1rem', borderRadius: '999px', background: 'rgba(249,115,22,.07)', border: '1.5px solid rgba(249,115,22,.2)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>{f}</span>
                ))}
              </div>
            </section>

            {/* Travel Tips */}
            <section>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}><Lightbulb size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Travel Tips</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {d.tips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.875rem 1rem', borderRadius: '0.875rem', background: 'rgba(99,102,241,.05)', border: '1px solid rgba(99,102,241,.15)' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', flexShrink: 0, marginTop: '1px' }}>0{i+1}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.6 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right col */}
          <div>
            {/* Quick Info */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '1.25rem', border: '1px solid var(--border)', padding: '1.5rem', marginBottom: '2rem', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1.25rem' }}>Quick Info</h3>
              {[
                { icon: Clock, label: 'Best Time', val: d.bestTime },
                { icon: Calendar, label: 'Duration', val: d.duration },
                { icon: MapPin, label: 'State', val: d.state },
              ].map(item => {
                const I = item.icon;
                return (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingBlock: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '0.625rem', background: 'rgba(99,102,241,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <I size={16} color="var(--primary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>{item.label}</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>{item.val}</div>
                    </div>
                  </div>
                );
              })}
              <Link to="/planner" className="btn btn-primary btn-full" style={{ marginTop: '1.25rem' }}>Plan This Trip →</Link>
            </div>

            {/* Nearby Attractions */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}>Nearby Attractions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {d.attractions.map(a => (
                  <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem', borderRadius: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <img src={a.img} alt={a.name} style={{ width: '56px', height: '56px', borderRadius: '0.75rem', objectFit: 'cover', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>{a.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}><MapPin size={11} style={{ display: 'inline' }} /> {a.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1rem' }}>Gallery</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                {d.gallery.map((img, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.03 }} style={{ borderRadius: '0.875rem', overflow: 'hidden', height: i === 0 ? '180px' : '120px' }}>
                    <img src={img} alt={`${d.name} ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{ marginTop: '1.5rem', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--border)', height: '200px', background: 'var(--bg-section)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <MapPin size={32} color="var(--primary)" />
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>{d.name} on Map</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Interactive map — connect backend for live maps</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;

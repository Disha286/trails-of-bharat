import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Home, Compass, Map } from 'lucide-react';

const quickLinks = [
  { icon: Compass,  label: 'Explore Destinations', path: '/explore',     color: '#6366f1', bg: '#eef2ff' },
  { icon: Map,      label: 'Plan a Trip with AI',   path: '/planner',     color: '#8b5cf6', bg: '#fdf4ff' },
  { icon: Home,     label: 'Go Back Home',           path: '/',            color: '#0284c7', bg: '#f0f9ff' },
];

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)',
      padding: '2rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-100px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}
        style={{ textAlign: 'center', maxWidth: '540px', position: 'relative', zIndex: 1 }}>

        {/* 404 big number */}
        <motion.div initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .1, type: 'spring', stiffness: 200 }}
          style={{ fontSize: 'clamp(6rem,18vw,10rem)', fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg,#818cf8,#fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>
          404
        </motion.div>

        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🗺️</div>

        <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
          Oops! This trail doesn't exist
        </h1>
        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
          Looks like you've wandered off the beaten path. Let's get you back to exploring incredible India.
        </p>

        {/* Quick links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {quickLinks.map((l, i) => {
            const Icon = l.icon;
            return (
              <motion.div key={l.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .2 + i * .1 }}>
                <Link to={l.path} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderRadius: '1rem', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', textDecoration: 'none', transition: 'all .2s', backdropFilter: 'blur(10px)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.22)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: l.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color={l.color} />
                  </div>
                  <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: 700, color: '#fff', textAlign: 'left' }}>{l.label}</span>
                  <ArrowRight size={16} color="rgba(255,255,255,.4)" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Back button */}
        <button onClick={() => navigate(-1)}
          style={{ background: 'none', border: '1px solid rgba(255,255,255,.2)', borderRadius: '999px', padding: '.5rem 1.25rem', color: 'rgba(255,255,255,.5)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)'; }}>
          ← Go Back
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;

import { Link } from 'react-router-dom';
import { Compass, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useState } from 'react';

// Inline social SVGs (lucide-version-safe)
const IgIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const TwIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const YtIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>;

const cols = [
  {
    title: 'Discover',
    items: [
      { label: '🗺️ Explore India',    path: '/explore' },
      { label: '🤖 AI Trip Planner',  path: '/planner' },
      { label: '💬 AI Chatbot',       path: '/chatbot' },
      { label: '🗺️ Leaflet Map',      path: '/explore' },
    ],
  },
  {
    title: 'Marketplace',
    items: [
      { label: '🛍️ Shop Authentic',   path: '/marketplace' },
      { label: '🤝 Local Guides',     path: '/guides' },
      { label: '🏡 Community',        path: '/community' },
      { label: '🏪 Vendor Portal',    path: '/vendor' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: '💡 About Us',         path: '/about' },
      { label: '📞 Contact',          path: '/contact' },
      { label: '📊 Dashboard',        path: '/dashboard' },
      { label: '🔒 Privacy Policy',   path: '/' },
    ],
  },
];

const socials = [
  { Icon: IgIcon, label: 'Instagram', href: '#' },
  { Icon: TwIcon, label: 'Twitter',   href: '#' },
  { Icon: YtIcon, label: 'YouTube',   href: '#' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer style={{ background: '#0a0a12', borderTop: '1px solid rgba(255,255,255,.07)' }}>

      {/* ── Newsletter bar ── */}
      <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.25rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>✈️ Get India Travel Inspiration</div>
            <div style={{ fontSize: '0.825rem', color: 'rgba(255,255,255,.5)' }}>Hidden gems, seasonal guides, and artisan spotlights — weekly.</div>
          </div>
          {subscribed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '.75rem 1.25rem', borderRadius: '0.875rem', background: 'rgba(22,163,74,.15)', border: '1px solid rgba(22,163,74,.3)', color: '#4ade80', fontWeight: 700, fontSize: '0.875rem' }}>
              ✅ You're subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '.75rem 1rem', borderRadius: '0.875rem', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)', flex: 1, minWidth: '220px' }}>
                <Mail size={15} color="rgba(255,255,255,.4)" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
                  style={{ background: 'none', border: 'none', outline: 'none', fontSize: '0.875rem', color: '#fff', fontFamily: 'inherit', width: '100%' }} />
              </div>
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '.75rem 1.25rem', borderRadius: '0.875rem', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '0.875rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Main footer ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(99,102,241,.4)' }}>
                <Compass size={18} color="#fff" />
              </div>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Trails of Bharat</span>
            </Link>
            <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              India's AI-powered travel platform — discovering authentic experiences across all 29 states and UTs.
            </p>
            {/* Contact mini */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { Icon: Mail,    text: 'hello@trailsofbharat.in' },
                { Icon: Phone,   text: '+91 98765 43210' },
                { Icon: MapPin,  text: 'Bengaluru, India' },
              ].map(c => (
                <div key={c.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <c.Icon size={13} color="#4b5563" />
                  <span style={{ fontSize: '0.78rem', color: '#4b5563' }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 style={{ color: '#9ca3af', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.path} style={{ fontSize: '0.85rem', color: '#4b5563', transition: 'color 0.15s', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: '1.75rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#374151' }}>
            © {new Date().getFullYear()} Trails of Bharat. Made with ❤️ for India's 1.4 billion stories.
          </div>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.625rem' }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} aria-label={s.label}
                style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563', transition: 'all .2s', cursor: 'pointer', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,.2)'; e.currentTarget.style.color = '#818cf8'; e.currentTarget.style.borderColor = 'rgba(99,102,241,.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'; }}>
                <s.Icon />
              </a>
            ))}
          </div>
          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            {['🌱 Carbon Neutral', '🤝 Zero Middlemen', '🔒 Secure Payments'].map(b => (
              <span key={b} style={{ fontSize: '0.72rem', fontWeight: 700, color: '#374151', padding: '.2rem .625rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,.07)' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

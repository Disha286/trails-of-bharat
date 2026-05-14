import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const cols = [
  { title: 'Explore',  items: [{ label: 'Destinations', path: '/explore' }, { label: 'Trip Planner', path: '/planner' }, { label: 'Marketplace', path: '/marketplace' }, { label: 'AI Chatbot', path: '/chatbot' }] },
  { title: 'Company',  items: [{ label: 'About Us', path: '/about' }, { label: 'Dashboard', path: '/dashboard' }, { label: 'Contact', path: '/contact' }] },
  { title: 'Legal',    items: [{ label: 'Privacy', path: '/' }, { label: 'Terms', path: '/' }, { label: 'Cookies', path: '/' }] },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="grid-footer" style={{ marginBottom: '3rem' }}>

        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Compass size={16} color="#fff" />
            </div>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>Trails of Bharat</span>
          </Link>
          <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.65, maxWidth: '18rem' }}>
            AI-powered travel platform for discovering the very best of India.
          </p>
        </div>

        {/* Link columns */}
        {cols.map((c) => (
          <div key={c.title}>
            <h4 style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>{c.title}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {c.items.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} style={{ fontSize: '0.875rem', color: '#64748b', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Trails of Bharat. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

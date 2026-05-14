import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X, Compass, LayoutDashboard, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ── Nav data ──────────────────────────────────────────────────── */
const navItems = [
  {
    label: 'Destinations',
    dropdown: [
      { label: 'Rajasthan',        path: '/explore' },
      { label: 'Kerala',           path: '/explore' },
      { label: 'Himachal Pradesh', path: '/explore' },
      { label: 'Goa',              path: '/explore' },
      { label: 'Ladakh',           path: '/explore' },
      { label: 'Tamil Nadu',       path: '/explore' },
    ],
  },
  {
    label: 'Travel Resources',
    dropdown: [
      { label: 'Trip Planner',  path: '/planner' },
      { label: 'Local Guides',  path: '/guides' },
      { label: 'Marketplace',   path: '/marketplace' },
      { label: 'AI Chatbot',    path: '/chatbot' },
    ],
  },
  {
    label: 'Community',
    dropdown: [
      { label: 'Meet the Locals',   path: '/community' },
      { label: 'Local Guides',      path: '/guides' },
      { label: 'Artisans & Crafts', path: '/marketplace' },
      { label: 'Vendor Portal',     path: '/vendor' },
    ],
  },
  {
    label: 'About',
    dropdown: [
      { label: 'Our Story', path: '/about' },
      { label: 'Team',      path: '/about' },
      { label: 'Contact',   path: '/contact' },
    ],
  },
  {
    label: 'Group Tours',
    dropdown: [
      { label: 'Upcoming Tours', path: '/explore' },
      { label: 'Custom Groups',  path: '/planner' },
      { label: 'School Trips',   path: '/explore' },
    ],
  },
  { label: 'Contact Us', path: '/contact' },
];

/* ── Dropdown animation ─────────────────────────────────────────── */
const dropVariants = {
  hidden:  { opacity: 0, y: 6, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1,   transition: { duration: 0.16, ease: 'easeOut' } },
  exit:    { opacity: 0, y: 4, scale: 0.97, transition: { duration: 0.11 } },
};

/* ── Desktop NavItem ────────────────────────────────────────────── */
const DesktopNavItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const loc = useLocation();

  const isActive = item.path
    ? loc.pathname === item.path
    : item.dropdown?.some((d) => loc.pathname.startsWith(d.path.split('?')[0]));

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const labelColor = isActive ? 'var(--primary)' : 'var(--text-heading)';

  return (
    <div
      ref={ref}
      style={{ position: 'relative' }}
      onMouseEnter={() => item.dropdown && setOpen(true)}
      onMouseLeave={() => item.dropdown && setOpen(false)}
    >
      {item.dropdown ? (
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '8px 14px', borderRadius: '8px',
            fontSize: '14.5px', fontWeight: 600, whiteSpace: 'nowrap',
            color: labelColor, background: 'transparent', border: 'none',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
          onMouseLeave={e => e.currentTarget.style.color = labelColor}
        >
          {item.label}
          <ChevronDown
            size={14}
            color="var(--text-muted)"
            style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>
      ) : (
        <Link
          to={item.path}
          style={{
            display: 'flex', alignItems: 'center',
            padding: '8px 14px', borderRadius: '8px',
            fontSize: '14.5px', fontWeight: 600, whiteSpace: 'nowrap',
            color: labelColor, transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
          onMouseLeave={e => e.currentTarget.style.color = labelColor}
        >
          {item.label}
        </Link>
      )}

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && item.dropdown && (
          <motion.div
            variants={dropVariants}
            initial="hidden" animate="visible" exit="exit"
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: '50%',
              transform: 'translateX(-50%)',
              minWidth: '200px',
              background: 'var(--bg-card)',
              borderRadius: '14px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid var(--border)',
              paddingBlock: '8px',
              zIndex: 200,
              overflow: 'visible',
            }}
          >
            {/* Arrow tip */}
            <div style={{ position: 'absolute', top: '-7px', left: '50%', transform: 'translateX(-50%)', width: '14px', height: '7px', overflow: 'hidden' }}>
              <div style={{ width: '10px', height: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)', transform: 'rotate(45deg)', margin: '3px auto 0', borderBottom: 'none', borderRight: 'none' }} />
            </div>
            {item.dropdown.map((d) => (
              <Link
                key={d.label}
                to={d.path}
                onClick={() => setOpen(false)}
                style={{ display: 'block', padding: '9px 20px', fontSize: '13.5px', fontWeight: 500, color: 'var(--text-body)', whiteSpace: 'nowrap', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.background = 'rgba(99,102,241,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-body)'; e.currentTarget.style.background = 'transparent'; }}
              >
                {d.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Mobile NavItem ─────────────────────────────────────────────── */
const MobileNavItem = ({ item, onClose }) => {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const isActive = item.path
    ? loc.pathname === item.path
    : item.dropdown?.some((d) => loc.pathname.startsWith(d.path.split('?')[0]));

  if (!item.dropdown) {
    return (
      <Link
        to={item.path}
        onClick={onClose}
        style={{
          display: 'block', padding: '12px 16px', borderRadius: '10px',
          fontSize: '15px', fontWeight: 600,
          color: isActive ? 'var(--primary)' : 'var(--text-heading)',
          background: isActive ? 'rgba(99,102,241,0.06)' : 'transparent',
          transition: 'all 0.15s',
        }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', borderRadius: '10px',
          fontSize: '15px', fontWeight: 600,
          color: isActive ? 'var(--primary)' : 'var(--text-heading)',
          background: isActive ? 'rgba(99,102,241,0.06)' : 'transparent',
          border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
        }}
      >
        {item.label}
        <ChevronDown size={15} color="var(--text-muted)" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden', paddingLeft: '16px' }}
          >
            {item.dropdown.map((d) => (
              <Link
                key={d.label}
                to={d.path}
                onClick={onClose}
                style={{ display: 'block', padding: '10px 16px', fontSize: '14px', fontWeight: 500, color: 'var(--text-body)', borderRadius: '8px', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.background = 'rgba(99,102,241,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-body)'; e.currentTarget.style.background = 'transparent'; }}
              >
                {d.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── User avatar ────────────────────────────────────────────────── */
const UserAvatar = ({ name }) => {
  const initials = name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '?';
  return (
    <div style={{
      width: '32px', height: '32px', borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--primary), #8b5cf6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '12px', fontWeight: 800, color: '#fff',
      boxShadow: '0 2px 8px rgba(99,102,241,0.35)',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
};

/* ── Navbar ─────────────────────────────────────────────────────── */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 'var(--navbar-h)',
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.07)' : 'none',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      transition: 'box-shadow 0.3s, backdrop-filter 0.3s, background 0.3s',
    }}>
      {/* Inner */}
      <div style={{
        height: '100%', maxWidth: '1280px', margin: '0 auto',
        padding: '0 1.5rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '1.5rem',
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(99,102,241,0.3)' }}>
            <Compass size={18} color="#fff" />
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            Trails of Bharat
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="desktop-nav" style={{ alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }}>
          {navItems.map((item) => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
        </div>

        {/* CTA area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>

          {isAuthenticated ? (
            /* ── Logged in ─────────────────────────── */
            <>
              {/* User info */}
              <div className="desktop-nav" style={{ alignItems: 'center', gap: '8px' }}>
                <UserAvatar name={user?.name} />
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-heading)', whiteSpace: 'nowrap', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name?.split(' ')[0]}
                </span>
              </div>

              {/* Dashboard */}
              <Link
                to="/dashboard"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '10px',
                  background: 'rgba(99,102,241,0.08)', color: 'var(--primary)',
                  fontSize: '13.5px', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap',
                  border: '1.5px solid rgba(99,102,241,0.2)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.color = 'var(--primary)'; }}
              >
                <LayoutDashboard size={15} /> Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={logout}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '10px',
                  background: 'transparent', color: 'var(--text-muted)',
                  fontSize: '13.5px', fontWeight: 600, border: '1.5px solid var(--border)',
                  cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            /* ── Logged out ────────────────────────── */
            <>
              <Link
                to="/login"
                className="desktop-nav"
                style={{
                  padding: '8px 16px', borderRadius: '10px',
                  fontSize: '13.5px', fontWeight: 700,
                  color: 'var(--text-heading)', textDecoration: 'none',
                  border: '1.5px solid var(--border)', whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-heading)'; }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '9px 20px', borderRadius: '10px',
                  background: 'var(--primary)', color: '#fff',
                  fontSize: '13.5px', fontWeight: 700,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                  boxShadow: '0 2px 10px rgba(99,102,241,0.3)',
                  transition: 'background 0.2s, transform 0.15s',
                  border: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Register
              </Link>
            </>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hamburger-btn"
            aria-label="Toggle menu"
            style={{
              padding: '8px', borderRadius: '8px', background: 'transparent',
              border: 'none', cursor: 'pointer', color: 'var(--text-body)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-section)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 1.5rem 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map((item) => (
                <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
              ))}

              {/* Mobile auth section */}
              <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border)', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {isAuthenticated ? (
                  <>
                    {/* User info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '8px 16px' }}>
                      <UserAvatar name={user?.name} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-heading)' }}>{user?.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user?.email}</div>
                      </div>
                    </div>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '12px 16px', borderRadius: '10px', background: 'rgba(99,102,241,0.07)', color: 'var(--primary)', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '12px 16px', borderRadius: '10px', background: 'transparent', border: '1.5px solid var(--border)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
                      <LogOut size={16} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: '10px', border: '1.5px solid var(--border)', color: 'var(--text-heading)', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)}
                      style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: '10px', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

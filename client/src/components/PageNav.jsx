import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

/* Ordered list of top-level pages (dynamic routes like /destination/:id are excluded) */
const pages = [
  { path: '/',            label: 'Home' },
  { path: '/explore',     label: 'Explore' },
  { path: '/planner',     label: 'Planner' },
  { path: '/marketplace', label: 'Marketplace' },
  { path: '/chatbot',     label: 'AI Chatbot' },
  { path: '/about',       label: 'About' },
  { path: '/contact',     label: 'Contact' },
];

const iconBtn = {
  width: '46px',
  height: '46px',
  borderRadius: '50%',
  border: '1.5px solid rgba(99,102,241,0.25)',
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-heading)',
  transition: 'all 0.2s ease',
  fontFamily: 'inherit',
  textDecoration: 'none',
};

const corner = (side) => ({
  position: 'fixed',
  bottom: '32px',
  [side]: '28px',
  zIndex: 90,
});

const PageNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = pages.findIndex((p) => p.path === location.pathname);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const next = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;
  const isHome = location.pathname === '/';

  return (
    <>
      {/* ← Prev — bottom-left corner */}
      <AnimatePresence>
        {prev && (
          <motion.div
            key={`prev-${location.pathname}`}
            style={corner('left')}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <motion.button
              whileHover={{ scale: 1.12, borderColor: 'var(--primary)', color: 'var(--primary)', boxShadow: '0 6px 20px rgba(99,102,241,0.25)' }}
              whileTap={{ scale: 0.93 }}
              onClick={() => navigate(prev.path)}
              style={iconBtn}
              title={prev.label}
            >
              <ChevronLeft size={20} strokeWidth={2.2} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏠 Home — bottom-left, above prev (only when not on home) */}
      <AnimatePresence>
        {!isHome && (
          <motion.div
            key={`home-${location.pathname}`}
            style={{ ...corner('left'), bottom: prev ? '90px' : '32px' }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut', delay: 0.04 }}
          >
            <motion.div
              whileHover={{ scale: 1.12, boxShadow: '0 6px 20px rgba(99,102,241,0.4)' }}
              whileTap={{ scale: 0.93 }}
            >
              <Link
                to="/"
                style={{
                  ...iconBtn,
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
                }}
                title="Home"
              >
                <Home size={18} strokeWidth={2.2} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* → Next — bottom-right corner */}
      <AnimatePresence>
        {next && (
          <motion.div
            key={`next-${location.pathname}`}
            style={corner('right')}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <motion.button
              whileHover={{ scale: 1.12, borderColor: 'var(--primary)', color: 'var(--primary)', boxShadow: '0 6px 20px rgba(99,102,241,0.25)' }}
              whileTap={{ scale: 0.93 }}
              onClick={() => navigate(next.path)}
              style={iconBtn}
              title={next.label}
            >
              <ChevronRight size={20} strokeWidth={2.2} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageNav;

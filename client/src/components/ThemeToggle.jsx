import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { dark, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        border: '1.5px solid var(--border)',
        background: 'var(--bg-card)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: dark ? '#FBBF24' : '#6366F1',
        transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
        flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(99,102,241,.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'; }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'moon' : 'sun'}
          initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          exit={{    rotate:  30, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {dark ? <Sun size={16} strokeWidth={2.2} /> : <Moon size={16} strokeWidth={2.2} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;

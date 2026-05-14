import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { dark, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 200,
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        border: '1.5px solid var(--border)',
        background: 'var(--bg-card)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: dark ? '#FBBF24' : '#6366F1',
        transition: 'background 0.3s, border-color 0.3s, color 0.3s',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'moon' : 'sun'}
          initial={{ rotate: -45, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          exit={{    rotate:  45, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {dark ? <Sun size={18} strokeWidth={2.2} /> : <Moon size={18} strokeWidth={2.2} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;

import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const icons = {
  success: <CheckCircle size={18} color="#16a34a" />,
  error:   <XCircle    size={18} color="#dc2626" />,
  warning: <AlertCircle size={18} color="#d97706" />,
  info:    <Info        size={18} color="#0284c7" />,
};

const colors = {
  success: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' },
  error:   { bg: '#fef2f2', border: '#fecaca', text: '#991b1b' },
  warning: { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
  info:    { bg: '#f0f9ff', border: '#bae6fd', text: '#075985' },
};

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {/* Toast container — fixed top-right */}
      <div style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px', width: '100%' }}>
        <AnimatePresence>
          {toasts.map((t) => {
            const c = colors[t.type] || colors.info;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.95 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  padding: '14px 16px', borderRadius: '14px',
                  background: c.bg, border: `1.5px solid ${c.border}`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                }}
              >
                <span style={{ flexShrink: 0, marginTop: '1px' }}>{icons[t.type]}</span>
                <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: 600, color: c.text, lineHeight: 1.5 }}>{t.message}</span>
                <button onClick={() => removeToast(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.text, opacity: 0.6, padding: '2px', flexShrink: 0 }}>
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
};

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Compass, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ── Reusable input ───────────────────────────────────────────────── */
const FormInput = ({ id, label, type = 'text', value, onChange, placeholder, icon: Icon, right }) => (
  <div style={{ marginBottom: '1.25rem' }}>
    <label htmlFor={id} style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-body)', marginBottom: '0.5rem' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      {Icon && (
        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
          <Icon size={16} />
        </div>
      )}
      <input
        id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          width: '100%', padding: `0.875rem ${right ? '3rem' : '1rem'} 0.875rem ${Icon ? '2.75rem' : '1rem'}`,
          borderRadius: '0.875rem', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)',
          fontSize: '0.9rem', fontFamily: 'inherit', color: '#fff', outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }}
      />
      {right}
    </div>
  </div>
);

/* ── Login Page ───────────────────────────────────────────────────── */
const Login = () => {
  const { login, loading, error, clearError } = useAuth();
  const [email,      setEmail]      = useState('');
  const [password,   setPassword]   = useState('');
  const [showPass,   setShowPass]   = useState(false);
  const [remember,   setRemember]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    login({ email, password });
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      padding: '1.5rem', position: 'relative', overflow: 'hidden',
    }}>

      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-10rem', right: '-8rem', width: '36rem', height: '36rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-8rem', left: '-6rem', width: '28rem', height: '28rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: '100%', maxWidth: '460px',
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.75rem',
          border: '1.5px solid rgba(255,255,255,0.12)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
          padding: '2.75rem 2.5rem',
          position: 'relative', zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(99,102,241,0.5)' }}>
            <Compass size={18} color="#fff" />
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Trails of Bharat</span>
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Welcome back</h1>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', marginBottom: '2rem' }}>
          Sign in to continue your India adventure.
        </p>

        {/* Error */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.875rem 1rem', borderRadius: '0.75rem', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: '1.5rem' }}>
            <AlertCircle size={16} color="#f87171" />
            <span style={{ fontSize: '0.8625rem', color: '#f87171' }}>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput id="email" label="Email address" type="email" value={email}
            onChange={e => setEmail(e.target.value)} placeholder="you@example.com" icon={Mail} />

          <FormInput id="password" label="Password" type={showPass ? 'text' : 'password'} value={password}
            onChange={e => setPassword(e.target.value)} placeholder="••••••••" icon={Lock}
            right={
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', padding: '0.25rem' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {/* Remember + Forgot */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8375rem', color: 'rgba(255,255,255,0.6)' }}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                style={{ accentColor: 'var(--primary)', width: '1rem', height: '1rem', cursor: 'pointer' }} />
              Remember me
            </label>
            <Link to="#" style={{ fontSize: '0.8375rem', color: 'rgba(99,102,241,0.9)', fontWeight: 600, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#818cf8'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(99,102,241,0.9)'}>
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.97 }}
            style={{
              width: '100%', padding: '0.9375rem', borderRadius: '0.875rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              background: loading ? 'rgba(99,102,241,0.5)' : 'var(--primary)',
              color: '#fff', fontWeight: 700, fontSize: '0.9375rem', fontFamily: 'inherit',
              boxShadow: loading ? 'none' : '0 4px 18px rgba(99,102,241,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}>
            {loading ? <><Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> Signing in…</> : 'Sign In'}
          </motion.button>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } } input::placeholder { color: rgba(255,255,255,0.3); }`}</style>
        </form>

        {/* Footer */}
        <p style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#818cf8', fontWeight: 700, transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
            onMouseLeave={e => e.currentTarget.style.color = '#818cf8'}>
            Create one
          </Link>
        </p>

        {/* Back to home */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

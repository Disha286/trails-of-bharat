import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Compass, AlertCircle, Loader2, Backpack, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ── Reusable input ───────────────────────────────────────────────── */
const FormInput = ({ id, label, type = 'text', value, onChange, placeholder, icon: Icon, right }) => (
  <div style={{ marginBottom: '1.1rem' }}>
    <label htmlFor={id} style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: '0.4rem' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      {Icon && (
        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', pointerEvents: 'none' }}>
          <Icon size={16} />
        </div>
      )}
      <input
        id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          width: '100%', padding: `0.8rem ${right ? '3rem' : '1rem'} 0.8rem ${Icon ? '2.75rem' : '1rem'}`,
          borderRadius: '0.875rem', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)',
          fontSize: '0.875rem', fontFamily: 'inherit', color: '#fff', outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }}
      />
      {right}
    </div>
  </div>
);

/* ── Role chip ────────────────────────────────────────────────────── */
const RoleChip = ({ value, label, icon: Icon, selected, onClick }) => (
  <button type="button" onClick={onClick}
    style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      padding: '1rem 0.75rem', borderRadius: '1rem', border: `1.5px solid ${selected ? 'var(--primary)' : 'rgba(255,255,255,0.15)'}`,
      background: selected ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
      cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
      boxShadow: selected ? '0 0 0 3px rgba(99,102,241,0.2)' : 'none',
    }}>
    <Icon size={22} color={selected ? '#818cf8' : 'rgba(255,255,255,0.4)'} />
    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: selected ? '#818cf8' : 'rgba(255,255,255,0.5)' }}>{label}</span>
  </button>
);

/* ── Register Page ────────────────────────────────────────────────── */
const Register = () => {
  const { register, loading, error, clearError } = useAuth();
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [confirm,     setConfirm]     = useState('');
  const [role,        setRole]        = useState('tourist');
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError,  setLocalError]  = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    setLocalError('');
    if (password !== confirm) {
      setLocalError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }
    register({ name, email, password, role });
  };

  const displayError = localError || error;

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      padding: '1.5rem', position: 'relative', overflow: 'hidden',
    }}>

      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-8rem', left: '-6rem', width: '32rem', height: '32rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-6rem', right: '-4rem', width: '26rem', height: '26rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: '100%', maxWidth: '480px',
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.75rem',
          border: '1.5px solid rgba(255,255,255,0.12)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
          padding: '2.5rem 2.25rem',
          position: 'relative', zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.75rem', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(99,102,241,0.5)' }}>
            <Compass size={16} color="#fff" />
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Trails of Bharat</span>
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>Create an account</h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.75rem' }}>
          Join thousands exploring incredible India.
        </p>

        {/* Error */}
        {displayError && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.875rem 1rem', borderRadius: '0.75rem', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: '1.25rem' }}>
            <AlertCircle size={16} color="#f87171" />
            <span style={{ fontSize: '0.8625rem', color: '#f87171' }}>{displayError}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput id="name" label="Full name" value={name}
            onChange={e => setName(e.target.value)} placeholder="Arjun Mehta" icon={User} />

          <FormInput id="email" label="Email address" type="email" value={email}
            onChange={e => setEmail(e.target.value)} placeholder="you@example.com" icon={Mail} />

          {/* 2-col passwords */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <FormInput id="password" label="Password" type={showPass ? 'text' : 'password'} value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••" icon={Lock}
              right={<button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', padding: '0.2rem' }}>
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>} />

            <FormInput id="confirm" label="Confirm password" type={showConfirm ? 'text' : 'password'} value={confirm}
              onChange={e => setConfirm(e.target.value)} placeholder="••••••" icon={Lock}
              right={<button type="button" onClick={() => setShowConfirm(!showConfirm)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', padding: '0.2rem' }}>
                {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>} />
          </div>

          {/* Role selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: '0.6rem' }}>I am a…</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <RoleChip value="tourist" label="Tourist" icon={Backpack} selected={role === 'tourist'} onClick={() => setRole('tourist')} />
              <RoleChip value="vendor"  label="Vendor"  icon={Store}    selected={role === 'vendor'}  onClick={() => setRole('vendor')} />
            </div>
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
            {loading ? <><Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> Creating account…</> : 'Create Account'}
          </motion.button>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } } input::placeholder { color: rgba(255,255,255,0.3); }`}</style>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#818cf8', fontWeight: 700 }}
            onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
            onMouseLeave={e => e.currentTarget.style.color = '#818cf8'}>
            Sign in
          </Link>
        </p>
        <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
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

export default Register;

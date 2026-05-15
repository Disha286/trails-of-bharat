import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';
import {
  saveToken, getToken, removeToken,
  saveUser, getUser, removeUser,
} from '../utils/tokenManager';

/* ── Context ─────────────────────────────────────────────────────── */
const AuthContext = createContext(null);

/* ── Provider ────────────────────────────────────────────────────── */
export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(() => getUser());
  const [token,   setToken]   = useState(() => getToken());
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const navigate = useNavigate();

  /* Derived */
  const isAuthenticated = !!token && !!user;

  /* ── Login ──────────────────────────────────────────────────────── */
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(credentials);
      saveToken(data.token);
      saveUser(data.user);
      setToken(data.token);
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.detail || err?.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /* ── Register ───────────────────────────────────────────────────── */
  const register = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(formData);
      saveToken(data.token);
      saveUser(data.user);
      setToken(data.token);
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.detail || err?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /* ── Logout ─────────────────────────────────────────────────────── */
  const logout = useCallback(() => {
    removeToken();
    removeUser();
    setToken(null);
    setUser(null);
    navigate('/login');
  }, [navigate]);

  /* ── Clear error helper ─────────────────────────────────────────── */
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, token, loading, error, isAuthenticated, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ── Hook ────────────────────────────────────────────────────────── */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

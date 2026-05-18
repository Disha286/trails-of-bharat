import axios from 'axios';
import { getToken } from '../utils/tokenManager';

/* ── Base API instance ──────────────────────────────────────────── */
// Set VITE_API_URL in your .env file when backend is ready.
// Example: VITE_API_URL=http://localhost:8000/api
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

/* ── Request interceptor — attach JWT on every call ─────────────── */
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ── Auth API calls (placeholders for backend) ───────────────────── */

/**
 * Login a user.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ user: object, token: string }>}
 */
export const loginUser = (credentials) =>
  api.post('/auth/login', credentials).then((r) => r.data);

/**
 * Register a new user.
 * @param {{ name: string, email: string, password: string, role: string }} data
 * @returns {Promise<{ user: object, token: string }>}
 */
export const registerUser = (data) =>
  api.post('/auth/register', data).then((r) => r.data);

/**
 * Get the currently authenticated user profile.
 * @returns {Promise<object>}
 */
export const fetchProfile = () =>
  api.get('/auth/me').then((r) => r.data);

/**
 * Trigger forgot password email.
 * @param {string} email
 */
export const forgotPassword = (email) =>
  api.post('/auth/forgot-password', { email }).then((r) => r.data);

/**
 * Reset password using token.
 * @param {string} token
 * @param {string} newPassword
 */
export const resetPassword = (token, newPassword) =>
  api.post('/auth/reset-password', { token, new_password: newPassword }).then((r) => r.data);

export default api;

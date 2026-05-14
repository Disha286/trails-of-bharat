import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps protected routes.
 * - Unauthenticated users are redirected to /login.
 * - Optionally restrict by role: <ProtectedRoute role="vendor" />
 */
const ProtectedRoute = ({ role }) => {
  const { isAuthenticated, user, loading } = useAuth();

  /* Show a minimal spinner while auth state is being restored */
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)',
      }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          border: '3px solid var(--border)',
          borderTopColor: 'var(--primary)',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  /* Role guard — e.g. only vendors can access /vendor */
  if (role && user?.role !== role) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default ProtectedRoute;

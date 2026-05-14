import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageNav from '../components/PageNav';
import ThemeToggle from '../components/ThemeToggle';

const MainLayout = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar />
    <ThemeToggle />
    <main style={{ flex: 1, paddingTop: 'var(--navbar-h)' }}>
      <Outlet />
    </main>
    <Footer />
    <PageNav />
  </div>
);

export default MainLayout;

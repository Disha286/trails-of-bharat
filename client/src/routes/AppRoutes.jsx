import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';

const Home              = lazy(() => import('../pages/Home'));
const Explore           = lazy(() => import('../pages/Explore'));
const DestinationDetail = lazy(() => import('../pages/DestinationDetail'));
const Planner           = lazy(() => import('../pages/Planner'));
const Marketplace       = lazy(() => import('../pages/Marketplace'));
const Community         = lazy(() => import('../pages/Community'));
const Guides            = lazy(() => import('../pages/Guides'));
const Chatbot           = lazy(() => import('../pages/Chatbot'));
const About             = lazy(() => import('../pages/About'));
const Contact           = lazy(() => import('../pages/Contact'));
const Dashboard         = lazy(() => import('../pages/Dashboard'));
const Vendor            = lazy(() => import('../pages/Vendor'));
const Login             = lazy(() => import('../pages/Login'));
const Register          = lazy(() => import('../pages/Register'));

const Spinner = () => (
  <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)' }}>
    <div style={{ width:'44px', height:'44px', borderRadius:'50%', border:'3px solid var(--border)', borderTopColor:'var(--primary)', animation:'spin .8s linear infinite' }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const AppRoutes = () => (
  <Suspense fallback={<Spinner />}>
    <Routes>

      {/* Public — inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/"                    element={<Home />} />
        <Route path="/explore"             element={<Explore />} />
        <Route path="/destination/:id"     element={<DestinationDetail />} />
        <Route path="/planner"             element={<Planner />} />
        <Route path="/marketplace"         element={<Marketplace />} />
        <Route path="/community"           element={<Community />} />
        <Route path="/guides"              element={<Guides />} />
        <Route path="/chatbot"             element={<Chatbot />} />
        <Route path="/about"               element={<About />} />
        <Route path="/contact"             element={<Contact />} />
      </Route>

      {/* Protected — inside MainLayout + auth guard */}
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard"         element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute role="vendor" />}>
          <Route path="/vendor"            element={<Vendor />} />
        </Route>
      </Route>

      {/* Auth — full page, no layout */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  </Suspense>
);

export default AppRoutes;

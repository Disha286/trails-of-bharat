import { motion } from 'framer-motion';
import { MapPin, Calendar, TrendingUp, Heart, Clock, Star, ArrowRight, Compass, Bot, ShoppingBag, Map, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts';

const stats = [
  { icon: MapPin,     label: 'Places Visited', value: '24',   bg: '#eef2ff', color: '#4f46e5' },
  { icon: Calendar,   label: 'Trips Planned',  value: '8',    bg: '#fffbeb', color: '#d97706' },
  { icon: Heart,      label: 'Saved Places',   value: '47',   bg: '#fff1f2', color: '#e11d48' },
  { icon: TrendingUp, label: 'Travel Score',   value: '92',   bg: '#f0fdf4', color: '#16a34a' },
];

const activityData = [
  { month: 'Jan', trips: 1, places: 3 },
  { month: 'Feb', trips: 0, places: 2 },
  { month: 'Mar', trips: 2, places: 7 },
  { month: 'Apr', trips: 1, places: 4 },
  { month: 'May', trips: 3, places: 9 },
  { month: 'Jun', trips: 0, places: 1 },
];

const trips = [
  { dest: 'Jaipur – Pink City', date: 'Jan 15 – 20, 2026', status: 'Completed', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=200&q=80', id: 'jaipur' },
  { dest: 'Alleppey Backwaters', date: 'Mar 5 – 10, 2026',  status: 'Upcoming',  img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=200&q=80', id: 'alleppey' },
  { dest: 'Leh-Ladakh Adventure', date: 'Jun 12 – 20, 2026', status: 'Planning', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=200&q=80', id: 'ladakh' },
];

const recommendations = [
  { name: 'Goa Beaches',   tag: 'Beaches',   rating: 4.7, img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&q=80',  id: 'goa' },
  { name: 'Varanasi',      tag: 'Spiritual', rating: 4.8, img: 'https://images.unsplash.com/photo-1561361058-c24e36b4e33a?w=300&q=80', id: 'varanasi' },
  { name: 'Manali',        tag: 'Adventure', rating: 4.8, img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=300&q=80', id: 'manali' },
];

const statusStyle = {
  Completed: { background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' },
  Upcoming:  { background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd' },
  Planning:  { background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' },
};

const quickActions = [
  { icon: Compass,    label: 'Explore',    sub: '96+ Destinations', path: '/explore',     color: '#6366f1', bg: '#eef2ff' },
  { icon: Bot,        label: 'AI Planner', sub: 'Plan your trip',   path: '/planner',     color: '#8b5cf6', bg: '#fdf4ff' },
  { icon: Map,        label: 'Chatbot',    sub: 'Get answers',      path: '/chatbot',     color: '#0284c7', bg: '#f0f9ff' },
  { icon: ShoppingBag,label: 'Marketplace',sub: 'Shop authentic',   path: '/marketplace', color: '#f97316', bg: '#fff7ed' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="page">
      <div className="container">

        {/* ── Personalized Hero Banner ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ borderRadius: '1.75rem', overflow: 'hidden', marginBottom: '2.5rem', position: 'relative', background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4c1d95 100%)', padding: 'clamp(1.75rem,4vw,2.5rem)' }}>
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(249,115,22,.12)' }} />
          <div style={{ position: 'absolute', bottom: '-30px', left: '30%', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(139,92,246,.18)' }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '.28rem .875rem', borderRadius: '999px', background: 'rgba(249,115,22,.2)', border: '1px solid rgba(249,115,22,.35)', marginBottom: '0.875rem' }}>
                <Zap size={12} color="#fb923c" />
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '.1em' }}>Traveler Dashboard</span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                {greeting}, {user?.name?.split(' ')[0] || 'Traveler'} 👋
              </h1>
              <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '0.975rem', lineHeight: 1.6, maxWidth: '420px' }}>
                Your travel overview, upcoming adventures, and AI-powered recommendations.
              </p>
            </div>
            <Link to="/planner" className="btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '.875rem 1.75rem', borderRadius: '1rem', background: '#f97316', color: '#fff', fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 6px 20px rgba(249,115,22,.4)', flexShrink: 0 }}>
              Plan Next Trip <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* ── Quick Actions ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {quickActions.map((a, i) => {
            const I = a.icon;
            return (
              <motion.div key={a.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .07 }}>
                <Link to={a.path} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1rem 1.125rem', borderRadius: '1rem', background: 'var(--bg-card)', border: '1.5px solid var(--border)', textDecoration: 'none', transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 20px ${a.color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <I size={18} color={a.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-heading)' }}>{a.label}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{a.sub}</div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── Stats ── */}
        <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
          {stats.map((s, i) => {
            const I = s.icon;
            return (
              <motion.div key={s.label} className="stat-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }}>
                <div className="icon-box icon-box-md" style={{ background: s.bg, marginBottom: '1.25rem' }}>
                  <I size={20} color={s.color} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.375rem' }}>{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Charts ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.75rem', marginBottom: '2.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}
            style={{ background: 'var(--bg-card)', borderRadius: '1.25rem', border: '1px solid var(--border)', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '1.25rem' }}>Travel Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tripGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="trips" stroke="#6366f1" strokeWidth={2} fill="url(#tripGrad)" name="Trips" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4 }}
            style={{ background: 'var(--bg-card)', borderRadius: '1.25rem', border: '1px solid var(--border)', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '1.25rem' }}>Places Explored</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '12px' }} />
                <Bar dataKey="places" fill="#f97316" radius={[6, 6, 0, 0]} name="Places" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* ── Trips + Recommendations ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '2rem' }}>

          {/* Recent Trips */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-heading)' }}>Your Trips</h2>
              <Link to="/planner" style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
                New Trip <ArrowRight size={15} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {trips.map(t => (
                <Link key={t.dest} to={`/destination/${t.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '.875rem', borderRadius: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none', transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                  <img src={t.img} alt={t.dest} style={{ width: '56px', height: '56px', borderRadius: '.75rem', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '3px' }}>{t.dest}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      <Clock size={11} /> {t.date}
                    </div>
                  </div>
                  <span style={{ padding: '.25rem .75rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 800, flexShrink: 0, ...statusStyle[t.status] }}>
                    {t.status}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-heading)' }}>🤖 AI Picks for You</h2>
              <Link to="/explore" style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
                See All <ArrowRight size={15} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {recommendations.map(r => (
                <Link key={r.name} to={`/destination/${r.id}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '.875rem', borderRadius: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none', transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                  <img src={r.img} alt={r.name} style={{ width: '56px', height: '56px', borderRadius: '.75rem', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>{r.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{r.tag}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', flexShrink: 0 }}>
                    <Star size={13} fill="#f59e0b" color="#f59e0b" /> {r.rating}
                  </div>
                </Link>
              ))}
            </div>

            {/* Chatbot CTA */}
            <Link to="/chatbot" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', padding: '1rem 1.25rem', borderRadius: '1rem', background: 'linear-gradient(135deg,#eef2ff,#fdf4ff)', border: '1.5px solid #c7d2fe', textDecoration: 'none', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(99,102,241,.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(99,102,241,.3)' }}>
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary)' }}>Ask the AI Travel Assistant</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Get personalized destination advice</div>
              </div>
              <ArrowRight size={16} color="var(--primary)" style={{ marginLeft: 'auto' }} />
            </Link>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

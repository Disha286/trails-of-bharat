import { motion } from 'framer-motion';
import { MapPin, Calendar, TrendingUp, Heart, Clock, Star, ArrowRight, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
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
  { dest:'Rajasthan Explorer', date:'Jan 15 – 20, 2026', status:'Completed', img:'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=200&q=80' },
  { dest:'Kerala Backwaters',  date:'Mar 5 – 10, 2026',  status:'Upcoming',  img:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=200&q=80' },
  { dest:'Ladakh Adventure',   date:'Jun 12 – 20, 2026', status:'Planning',  img:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=200&q=80' },
];

const recommendations = [
  { name:'Goa', tag:'Beaches', rating:4.6, img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&q=80' },
  { name:'Varanasi', tag:'Spiritual', rating:4.7, img:'https://images.unsplash.com/photo-1561361058-c24e36b4e33a?w=300&q=80' },
  { name:'Himachal', tag:'Adventure', rating:4.8, img:'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=300&q=80' },
];

const statusStyle = {
  Completed: { background:'#f0fdf4', color:'#16a34a' },
  Upcoming:  { background:'#f0f9ff', color:'#0284c7' },
  Planning:  { background:'#fffbeb', color:'#d97706' },
};

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="container">

        {/* Header */}
        <motion.div className="page-header" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <h1 className="page-title">Welcome back, {user?.name?.split(' ')[0] || 'Traveler'} 👋</h1>
          <p className="page-desc">Your travel overview, upcoming adventures, and AI recommendations.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom:'3rem' }}>
          {stats.map((s, i) => {
            const I = s.icon;
            return (
              <motion.div key={s.label} className="stat-card" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*.08 }}>
                <div className="icon-box icon-box-md" style={{ background:s.bg, marginBottom:'1.25rem' }}>
                  <I size={20} color={s.color} />
                </div>
                <div style={{ fontSize:'2rem', fontWeight:800, color:'var(--text-heading)', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', fontWeight:600, marginTop:'0.375rem' }}>{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.75rem', marginBottom:'3rem' }}>
          {/* Area chart */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.3 }}
            style={{ background:'var(--bg-card)', borderRadius:'1.25rem', border:'1px solid var(--border)', padding:'1.5rem', boxShadow:'var(--shadow)' }}>
            <h3 style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-heading)', marginBottom:'1.25rem' }}>Travel Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={activityData} margin={{ top:0, right:0, left:-20, bottom:0 }}>
                <defs>
                  <linearGradient id="tripGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize:12, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:12, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'10px', fontSize:'12px' }} />
                <Area type="monotone" dataKey="trips" stroke="#6366f1" strokeWidth={2} fill="url(#tripGrad)" name="Trips" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar chart */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.4 }}
            style={{ background:'var(--bg-card)', borderRadius:'1.25rem', border:'1px solid var(--border)', padding:'1.5rem', boxShadow:'var(--shadow)' }}>
            <h3 style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-heading)', marginBottom:'1.25rem' }}>Places Explored</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData} margin={{ top:0, right:0, left:-20, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize:12, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:12, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'10px', fontSize:'12px' }} />
                <Bar dataKey="places" fill="#f97316" radius={[6,6,0,0]} name="Places" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Trips + Recommendations */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'2rem' }}>

          {/* Recent Trips */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.5 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem' }}>
              <h2 style={{ fontSize:'1.125rem', fontWeight:800, color:'var(--text-heading)' }}>Your Trips</h2>
              <Link to="/planner" style={{ display:'flex', alignItems:'center', gap:'.375rem', fontSize:'0.875rem', color:'var(--primary)', fontWeight:700, textDecoration:'none' }}>
                New Trip <ArrowRight size={15}/>
              </Link>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
              {trips.map(t => (
                <div key={t.dest} className="trip-row">
                  <img src={t.img} alt={t.dest} className="trip-thumb" />
                  <div className="trip-info">
                    <div className="trip-name">{t.dest}</div>
                    <div className="trip-date"><Clock size={12}/> {t.date}</div>
                  </div>
                  <span className="badge" style={statusStyle[t.status]}>{t.status}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.6 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem' }}>
              <h2 style={{ fontSize:'1.125rem', fontWeight:800, color:'var(--text-heading)' }}>🤖 AI Picks for You</h2>
              <Link to="/explore" style={{ display:'flex', alignItems:'center', gap:'.375rem', fontSize:'0.875rem', color:'var(--primary)', fontWeight:700, textDecoration:'none' }}>
                See All <ArrowRight size={15}/>
              </Link>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
              {recommendations.map(r => (
                <Link key={r.name} to={`/destination/${r.name.toLowerCase()}`} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'.875rem', borderRadius:'1rem', background:'var(--bg-card)', border:'1px solid var(--border)', textDecoration:'none', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary)'; e.currentTarget.style.transform='translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateX(0)'; }}>
                  <img src={r.img} alt={r.name} style={{ width:'56px', height:'56px', borderRadius:'.75rem', objectFit:'cover', flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--text-heading)' }}>{r.name}</div>
                    <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', fontWeight:600 }}>{r.tag}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'3px', fontSize:'0.8rem', fontWeight:700, color:'var(--text-heading)', flexShrink:0 }}>
                    <Star size={13} fill="#f59e0b" color="#f59e0b"/> {r.rating}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

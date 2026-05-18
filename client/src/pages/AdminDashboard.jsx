import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, ShoppingBag, Heart, BarChart3, TrendingUp, ArrowUpRight, 
  MapPin, Settings, AlertCircle, RefreshCw, Layers 
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, AreaChart, Area,
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend 
} from 'recharts';

/* ── Mock Data ─────────────────────────────────────────────────── */
const visitorData = [
  { name: 'Mon', Visitors: 1200, Bookings: 180 },
  { name: 'Tue', Visitors: 1500, Bookings: 240 },
  { name: 'Wed', Visitors: 1800, Bookings: 290 },
  { name: 'Thu', Visitors: 2400, Bookings: 410 },
  { name: 'Fri', Visitors: 2100, Bookings: 350 },
  { name: 'Sat', Visitors: 2900, Bookings: 480 },
  { name: 'Sun', Visitors: 3400, Bookings: 590 },
];

const destinationData = [
  { name: 'Kerala', Interest: 4200 },
  { name: 'Rajasthan', Interest: 3800 },
  { name: 'Goa', Interest: 3500 },
  { name: 'Ladakh', Interest: 2900 },
  { name: 'Varanasi', Interest: 2400 },
];

const sentimentData = [
  { name: 'Positive', value: 72, color: '#10b981' },
  { name: 'Neutral', value: 18, color: '#f59e0b' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

const categoryData = [
  { name: 'Handicrafts', Listings: 18 },
  { name: 'Homestays', Listings: 12 },
  { name: 'Events', Listings: 8 },
  { name: 'Ecotourism', Listings: 14 },
];

const recentLogs = [
  { id: 1, user: 'Priya Nair', action: 'Left a 5★ review on Alleppey Backwaters', time: '5m ago', type: 'review' },
  { id: 2, user: 'Amit Patel', action: 'Placed an order for "Jaipur Blue Pottery"', time: '14m ago', type: 'order' },
  { id: 3, user: 'Rajesh Kumar', action: 'Listed new package: "Spiritual Varanasi Experience"', time: '1h ago', type: 'listing' },
  { id: 4, user: 'Sneha Rao', action: 'Created new Vendor account', time: '2h ago', type: 'auth' },
];

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [refreshing, setRefreshing] = useState(false);

  const triggerRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="page" style={{ paddingBottom: '4rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '0.5rem', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                <Layers size={16} color="#fff" />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>System Administration</span>
            </div>
            <h1 className="page-title" style={{ margin: 0 }}>Admin Portal Dashboard ⚙️</h1>
            <p className="page-desc" style={{ margin: '4px 0 0' }}>Real-time statistics, marketplace volume, and sentiment tracking.</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <select 
              value={timeRange} 
              onChange={e => setTimeRange(e.target.value)}
              style={{ padding: '0.625rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-body)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', outline: 'none' }}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button onClick={triggerRefresh} disabled={refreshing}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-heading)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', outline: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-heading)'; }}>
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
          {[
            { icon: Users, label: 'Total Visitors', value: '12,840', pct: '+14.2%', color: '#4f46e5', bg: '#eef2ff' },
            { icon: ShoppingBag, label: 'Marketplace Volume', value: '₹1.2M', pct: '+24.8%', color: '#16a34a', bg: '#f0fdf4' },
            { icon: Heart, label: 'Positive Sentiment', value: '72%', pct: '+3.5%', color: '#fb923c', bg: '#fffbeb' },
            { icon: BarChart3, label: 'Active Listings', value: '52', pct: '+8.3%', color: '#9333ea', bg: '#fdf4ff' }
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                style={{ background: 'var(--bg-card)', borderRadius: '1.25rem', border: '1px solid var(--border)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', boxShadow: 'var(--shadow)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '0.75rem', background: s.bg }}>
                    <Icon size={18} color={s.color} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>
                    <ArrowUpRight size={12} /> {s.pct}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-heading)', marginTop: '2px', lineHeight: 1 }}>{s.value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          
          {/* Chart 1: Visitors Over Time */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>📈 Visitors &amp; Bookings Over Time</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorData}>
                  <defs>
                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorBook" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '0.5rem', color: 'var(--text-body)' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area type="monotone" dataKey="Visitors" stroke="#4f46e5" fillOpacity={1} fill="url(#colorVis)" strokeWidth={2} />
                  <Area type="monotone" dataKey="Bookings" stroke="#10b981" fillOpacity={1} fill="url(#colorBook)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Chart 2: Top Destinations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>🗺️ Top Destinations (User Views/Interests)</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={destinationData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '0.5rem', color: 'var(--text-body)' }} />
                  <Bar dataKey="Interest" fill="#fb923c" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Chart 3: Sentiment Analysis */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>❤️ Reviews &amp; Chat Sentiment Analysis</h3>
            <div style={{ width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '50%', height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '0.5rem', color: 'var(--text-body)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '0.875rem', paddingLeft: '1rem' }}>
                {sentimentData.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.color }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.value}% of total reviews</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chart 4: Listings by Category */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>🛍️ Marketplace Listings by Category</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickDecimals={0} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '0.5rem', color: 'var(--text-body)' }} />
                  <Bar dataKey="Listings" fill="#9333ea" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>

        {/* Recent logs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '1.25rem' }}>📋 Live Activity Feed</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {recentLogs.map((log) => (
              <div key={log.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', borderRadius: '1rem', background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: log.type === 'order' ? '#10b981' : log.type === 'review' ? '#fb923c' : log.type === 'listing' ? '#9333ea' : '#4f46e5' }} />
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-heading)' }}>{log.user}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-body)', marginLeft: '0.375rem' }}>{log.action}</span>
                  </div>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{log.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminDashboard;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, MessageCircle, Heart, Users, Globe, Award, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const members = [
  {
    id: 1, type: 'Guide', name: 'Ramesh Choudhary', region: 'Rajasthan', city: 'Jaipur',
    specialty: 'Heritage & Forts', languages: ['Hindi', 'English', 'French'],
    rating: 4.9, trips: 312, experience: '14 yrs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    bio: 'Born and raised in Jaipur, Ramesh brings Rajasthani forts to life with stories passed down through generations.',
    tags: ['Heritage', 'Forts', 'Desert Safari'],
    verified: true,
  },
  {
    id: 2, type: 'Artisan', name: 'Meera Devi', region: 'Bihar', city: 'Madhubani',
    specialty: 'Madhubani Painting', languages: ['Hindi', 'Maithili'],
    rating: 4.8, trips: 0, experience: '22 yrs',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200&q=80',
    bio: 'National Award winner Meera teaches Madhubani art passed through her family for 4 generations. Offers workshops.',
    tags: ['Folk Art', 'Workshops', 'Textile Painting'],
    verified: true,
  },
  {
    id: 3, type: 'Homestay', name: 'Suresh & Latha Nair', region: 'Kerala', city: 'Alleppey',
    specialty: 'Backwater Homestay', languages: ['Malayalam', 'English', 'Hindi'],
    rating: 4.9, trips: 0, experience: '11 yrs',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    bio: 'Traditional tharavad home beside the Alleppey backwaters. Home-cooked Kerala meals, canoe rides included.',
    tags: ['Backwaters', 'Veg Food', 'Family Friendly'],
    verified: true,
  },
  {
    id: 4, type: 'Guide', name: 'Tashi Wangchuk', region: 'Ladakh', city: 'Leh',
    specialty: 'High-Altitude Trekking', languages: ['Ladakhi', 'Hindi', 'English'],
    rating: 4.9, trips: 189, experience: '16 yrs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    bio: 'Ex-army mountaineer, Tashi knows every trail in Ladakh — from Pangong to Nubra, safely and sustainably.',
    tags: ['Trekking', 'High Altitude', 'Photography'],
    verified: true,
  },
  {
    id: 5, type: 'Artisan', name: 'Ganga Ram Kumhar', region: 'Rajasthan', city: 'Jaipur',
    specialty: 'Blue Pottery', languages: ['Hindi', 'Rajasthani'],
    rating: 4.7, trips: 0, experience: '28 yrs',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    bio: 'Ganga Ram is one of Jaipur\'s last master blue pottery artisans. His workshop offers hands-on pottery sessions.',
    tags: ['Blue Pottery', 'Workshop', 'Handicrafts'],
    verified: true,
  },
  {
    id: 6, type: 'Guide', name: 'Priya Krishnamurthy', region: 'Tamil Nadu', city: 'Madurai',
    specialty: 'Temple Architecture & Culture', languages: ['Tamil', 'English', 'Telugu'],
    rating: 4.8, trips: 267, experience: '9 yrs',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    bio: 'Archaeology graduate turned guide, Priya decodes the iconography of Dravidian temples like no one else can.',
    tags: ['Temples', 'Archaeology', 'Food Walks'],
    verified: true,
  },
  {
    id: 7, type: 'Homestay', name: 'Karma Dorje Family', region: 'Sikkim', city: 'Pelling',
    specialty: 'Mountain Homestay', languages: ['Nepali', 'English', 'Sikkimese'],
    rating: 4.8, trips: 0, experience: '7 yrs',
    avatar: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=200&q=80',
    bio: 'Organic farm homestay with Kanchenjunga views. Karma grows his own vegetables and brews traditional Chhang.',
    tags: ['Mountain Views', 'Organic Food', 'Monastery Visits'],
    verified: false,
  },
  {
    id: 8, type: 'Artisan', name: 'Jyoti Bai Marawi', region: 'Chhattisgarh', city: 'Bastar',
    specialty: 'Dhokra Metal Craft', languages: ['Gondi', 'Hindi'],
    rating: 4.9, trips: 0, experience: '19 yrs',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    bio: 'Tribal Dhokra artisan from Bastar, Jyoti practices the 4,000-year-old lost-wax casting technique of her ancestors.',
    tags: ['Tribal Art', 'Metal Craft', 'Cultural Heritage'],
    verified: true,
  },
  {
    id: 9, type: 'Guide', name: 'Arjun Singh Rathore', region: 'Uttarakhand', city: 'Rishikesh',
    specialty: 'Adventure & Yoga', languages: ['Hindi', 'English'],
    rating: 4.7, trips: 430, experience: '12 yrs',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80',
    bio: 'Certified river guide and yoga instructor. Combines white-water rafting days with meditative Ganges evenings.',
    tags: ['Rafting', 'Yoga', 'Camping', 'Bungee'],
    verified: true,
  },
];

const types = ['All', 'Guide', 'Artisan', 'Homestay'];

const typeMeta = {
  Guide:    { color: '#4f46e5', bg: '#eef2ff', emoji: '🧭' },
  Artisan:  { color: '#d97706', bg: '#fffbeb', emoji: '🎨' },
  Homestay: { color: '#16a34a', bg: '#f0fdf4', emoji: '🏡' },
};

const stats = [
  { icon: Users, val: '2,400+', label: 'Local Members', color: '#4f46e5', bg: '#eef2ff' },
  { icon: Globe, val: '29', label: 'States Covered', color: '#0284c7', bg: '#f0f9ff' },
  { icon: Award, val: '180+', label: 'Verified Experts', color: '#d97706', bg: '#fffbeb' },
  { icon: Heart, val: '48K+', label: 'Traveler Reviews', color: '#e11d48', bg: '#fff1f2' },
];

const Community = () => {
  const [activeType, setActiveType] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = members.filter(m => {
    if (activeType !== 'All' && m.type !== activeType) return false;
    if (query) {
      const q = query.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.region.toLowerCase().includes(q) ||
        m.specialty.toLowerCase().includes(q) || m.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="page">
      <div className="container">

        {/* Header */}
        <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
            🌏 Local Community
          </span>
          <h1 className="page-title" style={{ marginTop: '0.5rem' }}>Meet the Locals</h1>
          <p className="page-desc">
            Connect directly with verified guides, tribal artisans, and homestay hosts across India —
            the heartbeat of sustainable tourism.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: '3.5rem' }}>
          {stats.map((s, i) => {
            const I = s.icon;
            return (
              <motion.div key={s.label} className="stat-card"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="icon-box icon-box-md" style={{ background: s.bg, marginBottom: '1.25rem' }}>
                  <I size={20} color={s.color} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.375rem' }}>{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Search & Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div style={{ position: 'relative', flex: '1 1 260px', minWidth: '200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, region, specialty…"
              style={{ width: '100%', padding: '.875rem 1rem .875rem 2.75rem', borderRadius: '.875rem', background: 'var(--bg-section)', border: '1.5px solid var(--border)', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--text-heading)', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
            {types.map(t => (
              <button key={t} onClick={() => setActiveType(t)}
                style={{ padding: '.5rem 1.125rem', borderRadius: '999px', border: `1.5px solid ${activeType === t ? 'var(--primary)' : 'var(--border)'}`, background: activeType === t ? 'var(--primary)' : 'var(--bg-card)', color: activeType === t ? '#fff' : 'var(--text-body)', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}>
                {t !== 'All' && typeMeta[t]?.emoji + ' '}{t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1.5rem' }}>
          Showing <strong style={{ color: 'var(--text-heading)' }}>{filtered.length}</strong> local members
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.75rem', marginBottom: '4rem' }}>
          <AnimatePresence>
            {filtered.map((m, i) => (
              <motion.div key={m.id} layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                style={{ borderRadius: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden', transition: 'box-shadow .3s, transform .3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>

                {/* Cover strip */}
                <div style={{ height: '6px', background: `linear-gradient(90deg, ${typeMeta[m.type]?.color}, ${m.type === 'Guide' ? '#818cf8' : m.type === 'Artisan' ? '#fbbf24' : '#4ade80'})` }} />

                <div style={{ padding: '1.5rem' }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img src={m.avatar} alt={m.name}
                        style={{ width: '64px', height: '64px', borderRadius: '1rem', objectFit: 'cover', border: '3px solid var(--border)' }} />
                      {m.verified && (
                        <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: '#10b981', border: '2px solid var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)' }}>{m.name}</h3>
                      </div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '.2rem .65rem', borderRadius: '999px', background: typeMeta[m.type]?.bg, fontSize: '0.72rem', fontWeight: 700, color: typeMeta[m.type]?.color, marginBottom: '0.375rem' }}>
                        {typeMeta[m.type]?.emoji} {m.type}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        <MapPin size={12} /> {m.city}, {m.region}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-heading)', flexShrink: 0 }}>
                      <Star size={14} fill="#f59e0b" color="#f59e0b" /> {m.rating}
                    </div>
                  </div>

                  {/* Specialty */}
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                    {m.specialty}
                  </div>

                  {/* Bio */}
                  <p style={{ fontSize: '0.8375rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {m.bio}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.25rem' }}>
                    {m.tags.map(tag => (
                      <span key={tag} style={{ padding: '.2rem .65rem', borderRadius: '999px', background: 'var(--bg-section)', border: '1px solid var(--border)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-heading)' }}>{m.experience}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>Experience</div>
                    </div>
                    {m.trips > 0 && (
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-heading)' }}>{m.trips}+</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>Trips Led</div>
                      </div>
                    )}
                    <div style={{ flex: 1, textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      🗣 {m.languages.join(' · ')}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '0.625rem' }}>
                    <Link to="/contact"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '.7rem', borderRadius: '.875rem', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.8375rem', textDecoration: 'none', transition: 'background .2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-hover)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'var(--primary)'}>
                      <MessageCircle size={15} /> Contact
                    </Link>
                    <Link to="/marketplace"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '.7rem 1rem', borderRadius: '.875rem', background: 'var(--bg-section)', border: '1.5px solid var(--border)', color: 'var(--text-body)', fontWeight: 700, fontSize: '0.8375rem', textDecoration: 'none', transition: 'all .2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-body)'; }}>
                      View Shop
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
            <h3 style={{ color: 'var(--text-heading)', marginBottom: '0.5rem' }}>No members found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try a different search or filter.</p>
          </div>
        )}

        {/* Join CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ borderRadius: '2rem', background: 'linear-gradient(135deg,#0f0c29 0%,#302b63 60%,#24243e 100%)', padding: '3rem 2.5rem', textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤝</div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: '#fff', marginBottom: '1rem' }}>Are You a Local Expert?</h2>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1rem', maxWidth: '32rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Join 2,400+ guides, artisans, and homestay hosts already earning from tourism. Register as a vendor and start reaching thousands of travelers.
          </p>
          <Link to="/register"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', borderRadius: '1rem', background: 'var(--primary)', color: '#fff', fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 18px rgba(99,102,241,.4)' }}>
            Join the Community →
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Community;

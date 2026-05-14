import { motion } from 'framer-motion';
import { Heart, Globe, Users, Award, Leaf, Zap, MapPin, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const team = [
  { name: 'Priya Sharma',  role: 'Co-Founder & CEO',   bio: 'Former IITian who left a VC job to build sustainable tourism tech.',  img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80', tag: 'Bengaluru' },
  { name: 'Arjun Mehta',   role: 'Co-Founder & CTO',   bio: 'Ex-Google engineer passionate about AI and grassroots development.',   img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', tag: 'Delhi' },
  { name: 'Sneha Iyer',    role: 'Head of Design',      bio: 'Award-winning UX designer who believes travel should feel like poetry.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', tag: 'Kochi' },
  { name: 'Rohan Verma',   role: 'AI/ML Lead',          bio: 'PhD dropout turned travel-AI pioneer, building India\'s first travel LLM.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80', tag: 'Hyderabad' },
  { name: 'Meera Nair',    role: 'Community Manager',   bio: 'Connects 2,400+ artisans and local guides to the digital world.',       img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80', tag: 'Jaipur' },
  { name: 'Karthik Raja',  role: 'Partnerships Lead',   bio: 'Negotiates directly with tribal communities and homestay owners.',       img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80', tag: 'Chennai' },
];

const values = [
  { icon: Heart, title: 'Passion for India',  desc: 'Every feature is inspired by real journeys across all 29 states and 8 union territories.', color: '#e11d48', bg: '#fff1f2' },
  { icon: Zap,   title: 'AI-First Approach',  desc: 'Cutting-edge AI powers every itinerary, recommendation, and chatbot interaction.', color: '#6366f1', bg: '#eef2ff' },
  { icon: Users, title: 'Community Driven',   desc: 'Built with feedback from 50,000+ travellers who trust us to plan their perfect adventure.', color: '#0284c7', bg: '#f0f9ff' },
  { icon: Leaf,  title: 'Sustainable Tourism',desc: '100% of all bookings go directly to local providers — zero middlemen, zero exploitation.', color: '#16a34a', bg: '#f0fdf4' },
  { icon: Award, title: 'Verified Quality',   desc: 'Every destination, artisan, and guide is verified for authenticity and safety.', color: '#d97706', bg: '#fffbeb' },
  { icon: Globe, title: 'Inclusive India',    desc: 'Covering all 29 states — from Leh to Kanyakumari, Aizawl to Dwarka.', color: '#7c3aed', bg: '#fdf4ff' },
];

const timeline = [
  { year: '2022', title: 'The Spark',       desc: 'Priya and Arjun met at a Spiti Valley trek and realized how broken travel planning in India was.' },
  { year: '2023', title: 'First Build',     desc: 'We launched a simple AI trip planner with just 50 destinations and 200 beta users from Bengaluru.' },
  { year: '2024', title: 'Community Grows', desc: 'Hit 10,000 users. Launched the Marketplace, onboarded 500 artisans, and expanded to Northeast India.' },
  { year: '2025', title: 'AI Leap',         desc: 'Deployed our travel LLM chatbot and Leaflet map with geolocation. Reached 50,000 active travelers.' },
  { year: '2026', title: 'All of India',    desc: 'Coverage across all 29 states, 96+ destinations, 2,400+ local providers. The journey continues.' },
];

const stats = [
  { val: '96+',    label: 'Destinations',    color: '#6366f1' },
  { val: '2,400+', label: 'Local Providers', color: '#16a34a' },
  { val: '50K+',   label: 'Happy Travelers', color: '#0284c7' },
  { val: '₹2.4Cr+',label: 'To Artisans',    color: '#f97316' },
];

const press = [
  { name: 'The Hindu',    quote: '"A game-changer for sustainable Indian tourism"' },
  { name: 'YourStory',   quote: '"Democratising travel for Bharat"' },
  { name: 'Inc42',        quote: '"The most inclusive travel platform India has seen"' },
];

const About = () => (
  <div>

    {/* ── Hero ── */}
    <section style={{ position: 'relative', background: 'linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)', padding: 'clamp(4rem,9vw,7rem) 1.5rem', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(99,102,241,.18)' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(249,115,22,.12)' }} />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '.3rem 1rem', borderRadius: '999px', background: 'rgba(249,115,22,.2)', border: '1px solid rgba(249,115,22,.35)', marginBottom: '1.5rem' }}>
          <Heart size={13} color="#fb923c" fill="#fb923c" />
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '.1em' }}>Our Story</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.25rem,6vw,4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.08, marginBottom: '1.25rem' }}>
          We Are <span style={{ background: 'linear-gradient(90deg,#818cf8,#fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Trails of Bharat</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,.68)', fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto 2.5rem' }}>
          Born from a shared love of India's incredible diversity, we built an AI-powered platform to make discovering India easier, richer, and more personal for every traveller.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.875rem', fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,.5)', fontWeight: 600, marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>

    <div className="container">

      {/* ── Mission Quote ── */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '1.75rem', padding: 'clamp(2rem,5vw,3.5rem)', textAlign: 'center', margin: '4rem 0' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🇮🇳</div>
        <p style={{ color: 'rgba(255,255,255,.92)', fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', fontWeight: 700, maxWidth: '48rem', margin: '0 auto', lineHeight: 1.65, fontStyle: 'italic' }}>
          "Our mission is to connect every traveller with the real soul of India — its people, places, food, and stories — while empowering the communities that make it magical."
        </p>
        <div style={{ marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,.55)' }}>— Priya Sharma, Co-Founder & CEO</div>
      </motion.div>

      {/* ── Timeline ── */}
      <div style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Our Journey</span>
          <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', marginTop: '0.5rem', color: 'var(--text-heading)' }}>How We Got Here</h2>
        </div>
        <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: '80px', top: 0, bottom: 0, width: '2px', background: 'var(--border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {timeline.map((t, i) => (
              <motion.div key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}
                style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ width: '80px', textAlign: 'right', flexShrink: 0, paddingTop: '0.125rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary)' }}>{t.year}</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-2.125rem', top: '0.375rem', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', border: '3px solid var(--bg)', boxShadow: '0 0 0 3px var(--primary)' }} />
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.125rem 1.25rem', boxShadow: 'var(--shadow)' }}>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.375rem' }}>{t.title}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.6 }}>{t.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.1em' }}>What We Stand For</span>
          <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', marginTop: '0.5rem', color: 'var(--text-heading)' }}>Our Values</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.5rem' }}>
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
                style={{ padding: '1.75rem', borderRadius: '1.25rem', background: 'var(--bg-card)', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow)', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = v.color; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${v.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '0.875rem', background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.125rem' }}>
                  <Icon size={22} color={v.color} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Team ── */}
      <div id="team" style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em' }}>The People</span>
          <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', marginTop: '0.5rem', color: 'var(--text-heading)' }}>Meet the Team</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Passionate travelers, engineers, and community builders</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.5rem' }}>
          {team.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: 'var(--shadow)', transition: 'all .25s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.5) 0%,transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '.75rem', left: '.875rem', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,.85)' }}>
                  <MapPin size={10} /> {m.tag}
                </div>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.25rem' }}>{m.name}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>{m.role}</div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-body)', lineHeight: 1.55 }}>{m.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Press ── */}
      <div style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.1em' }}>As Seen In</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.25rem' }}>
          {press.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}
              style={{ padding: '1.5rem', borderRadius: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginBottom: '0.875rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '0.75rem' }}>{p.quote}</p>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{p.name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ textAlign: 'center', padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: 'var(--bg-section)', borderRadius: '2rem', marginBottom: '4rem', border: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '1rem' }}>Ready to Explore India? 🇮🇳</h2>
        <p style={{ color: 'var(--text-body)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2rem' }}>
          Join 50,000+ travelers discovering the real Bharat — one destination at a time.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/explore" className="btn btn-primary btn-lg">Start Exploring <ArrowRight size={16} /></Link>
          <Link to="/contact" className="btn btn-outline btn-lg">Get in Touch</Link>
        </div>
      </motion.div>

    </div>
  </div>
);

export default About;

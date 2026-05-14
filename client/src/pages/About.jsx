import { motion } from 'framer-motion';
import { Heart, Globe, Users, Award } from 'lucide-react';

const team = [
  { name: 'Priya Sharma',   role: 'Co-Founder & CEO',     img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'Arjun Mehta',    role: 'Co-Founder & CTO',     img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Sneha Iyer',     role: 'Head of Design',       img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { name: 'Rohan Verma',    role: 'AI/ML Lead',           img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
];

const values = [
  { icon: Heart,  title: 'Passion for India',  desc: 'We live and breathe Indian travel. Every feature is inspired by real journeys across all 29 states.' },
  { icon: Globe,  title: 'AI-First Approach',  desc: 'Cutting-edge AI models power every recommendation, making travel planning smarter than ever.' },
  { icon: Users,  title: 'Community Driven',   desc: 'Built with feedback from 50,000+ travellers who trust us to plan their perfect adventure.' },
  { icon: Award,  title: 'Verified Quality',   desc: 'Every destination, artisan, and guide on our platform is verified for authenticity and quality.' },
];

const About = () => (
  <div className="page">
    <div className="container">

      {/* Hero */}
      <motion.div className="page-header" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="page-label" style={{ color: 'var(--primary)' }}>Our Story</span>
        <h1 className="page-title" style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)' }}>
          We Are Trails of Bharat
        </h1>
        <p style={{ color: 'var(--text-body)', fontSize: '1.0625rem', lineHeight: 1.75, marginTop: '0.75rem' }}>
          Born from a shared love of India's incredible diversity, we built an AI-powered platform to make discovering India easier, richer, and more personal for every traveller.
        </p>
      </motion.div>

      {/* Mission banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        style={{ background: 'linear-gradient(135deg,var(--primary),#818cf8)', borderRadius: '1.5rem', padding: '3rem 2.5rem', textAlign: 'center', marginBottom: '5rem' }}>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.3rem', fontWeight: 700, maxWidth: '48rem', margin: '0 auto', lineHeight: 1.65 }}>
          "Our mission is to connect every traveller with the real soul of India — its people, places, food, and stories."
        </p>
      </motion.div>

      {/* Values */}
      <div style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="page-label" style={{ color: 'var(--accent)' }}>What We Stand For</span>
          <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', marginTop: '0.5rem' }}>Our Values</h2>
        </div>
        <div className="grid-cards">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} className="card" style={{ padding: '2rem' }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="icon-box icon-box-lg" style={{ background: 'rgba(99,102,241,0.07)', marginBottom: '1.25rem' }}>
                  <Icon size={24} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Team */}
      <div id="team" style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="page-label" style={{ color: 'var(--primary)' }}>The People</span>
          <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', marginTop: '0.5rem' }}>Meet the Team</h2>
        </div>
        <div className="grid-4">
          {team.map((m, i) => (
            <motion.div key={m.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ textAlign: 'center' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem', border: '3px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
                <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.25rem' }}>{m.name}</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

export default About;

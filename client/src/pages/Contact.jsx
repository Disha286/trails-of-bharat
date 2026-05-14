import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// Inline social SVGs (version-safe replacements)
const IgIcon = ({size=15,color='currentColor'}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const TwIcon = ({size=15,color='currentColor'}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const YtIcon = ({size=15,color='currentColor'}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={color} stroke="none"/></svg>;

const info = [
  { icon: Mail,   label: 'Email',   value: 'hello@trailsofbharat.in', sub: 'Reply within 24 hours', color: '#6366f1', bg: '#eef2ff' },
  { icon: Phone,  label: 'Phone',   value: '+91 98765 43210',          sub: 'Mon–Sat, 9 AM – 7 PM IST', color: '#16a34a', bg: '#f0fdf4' },
  { icon: MapPin, label: 'Office',  value: 'Bengaluru, Karnataka',     sub: 'India 🇮🇳', color: '#0284c7', bg: '#f0f9ff' },
  { icon: Clock,  label: 'Hours',   value: 'Mon – Sat',                sub: '9:00 AM – 7:00 PM IST', color: '#d97706', bg: '#fffbeb' },
];

const topics = [
  'Trip Planning Help', 'Guide Booking', 'Marketplace Order', 'Partnership/Vendor',
  'Press & Media', 'Bug Report', 'General Feedback', 'Other',
];

const faqs = [
  { q: 'How does the AI trip planner work?', a: 'Our AI analyzes your budget, interests, duration, and travel style to generate a personalized day-by-day itinerary. You can tweak it instantly.' },
  { q: 'Are the local guides verified?', a: 'Yes — every guide on our platform goes through a community verification process including background checks, local knowledge assessments, and identity verification.' },
  { q: 'Can I book a homestay through Trails of Bharat?', a: 'Absolutely! Visit the Marketplace section where you can browse and book community homestays directly from local hosts.' },
  { q: 'How do I become a vendor or guide?', a: 'Visit the Vendor Portal from the Community menu and fill in your profile. Our team will review and onboard you within 48 hours.' },
];

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="page">

      {/* ── Hero Banner ── */}
      <section style={{ position: 'relative', background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 45%,#4c1d95 100%)', padding: 'clamp(3rem,7vw,5rem) 1.5rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '10%', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(249,115,22,.1)' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '20%', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(139,92,246,.15)' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '.3rem .875rem', borderRadius: '999px', background: 'rgba(249,115,22,.2)', border: '1px solid rgba(249,115,22,.35)', marginBottom: '1.25rem' }}>
            <MessageCircle size={13} color="#fb923c" />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '.1em' }}>Contact Us</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
            We'd Love to <span style={{ background: 'linear-gradient(90deg,#fb923c,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hear from You</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.68)', fontSize: '1rem', lineHeight: 1.7 }}>
            Have a question, custom trip request, or partnership idea? Our team of travel experts is here to help.
          </p>
        </motion.div>
      </section>

      <div className="container" style={{ paddingTop: '3rem' }}>

        {/* ── Info Cards ── */}
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          {info.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }}
                style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', boxShadow: 'var(--shadow)', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '0.875rem', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={item.color} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-heading)' }}>{item.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{item.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Form + FAQ two-col ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '2.5rem', maxWidth: '1100px', margin: '0 auto', marginBottom: '4rem' }}>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.5rem', padding: '2.25rem', boxShadow: 'var(--shadow-md)' }}>
            {sent ? (
              <motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'linear-gradient(135deg,#bbf7d0,#86efac)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 8px 24px rgba(22,163,74,.2)' }}>
                  <MessageCircle size={28} color="#15803d" />
                </div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-heading)', fontWeight: 800 }}>Message Sent! 🎉</h2>
                <p style={{ color: 'var(--text-body)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button className="btn btn-primary" onClick={() => setSent(false)}>Send Another Message</button>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1.75rem' }}>Send a Message</h2>

                {/* Name + Email */}
                <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
                  <div>
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" style={{ paddingLeft: '1rem' }} placeholder="e.g. Priya Sharma" required />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" style={{ paddingLeft: '1rem' }} placeholder="you@example.com" required />
                  </div>
                </div>

                {/* Topic */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">Topic</label>
                  <select value={topic} onChange={e => setTopic(e.target.value)} required
                    style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.875rem', background: 'var(--bg-section)', border: '1px solid var(--border)', fontSize: '0.9rem', fontFamily: 'inherit', color: topic ? 'var(--text-heading)' : 'var(--text-muted)', outline: 'none', transition: 'border-color .2s, box-shadow .2s', appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,.1)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}>
                    <option value="" disabled>Select a topic…</option>
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label className="form-label">Message</label>
                  <textarea rows={5} placeholder="Tell us more…" required
                    style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.875rem', background: 'var(--bg-section)', border: '1px solid var(--border)', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--text-heading)', outline: 'none', resize: 'vertical', transition: 'border-color .2s, box-shadow .2s' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,.1)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ gap: '0.5rem', width: '100%', justifyContent: 'center' }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1rem', overflow: 'hidden', transition: 'border-color .2s' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.125rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.4 }}>{faq.q}</span>
                    <ChevronDown size={16} color="var(--text-muted)" style={{ flexShrink: 0, transition: 'transform .2s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 1.25rem 1.125rem', fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.7, borderTop: '1px solid var(--border)' }}>
                      <div style={{ paddingTop: '0.875rem' }}>{faq.a}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '1rem' }}>Follow us on Social</p>
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                {[
                  { Icon: IgIcon, label: '@trailsofbharat',  color: '#e11d48', bg: '#fff1f2' },
                  { Icon: TwIcon, label: '@trails_bharat',   color: '#0284c7', bg: '#f0f9ff' },
                  { Icon: YtIcon, label: 'Trails of Bharat', color: '#dc2626', bg: '#fef2f2' },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '.5rem .875rem', borderRadius: '999px', background: s.bg, cursor: 'pointer', transition: 'all .2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                    <s.Icon size={15} color={s.color} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: s.color }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Contact;

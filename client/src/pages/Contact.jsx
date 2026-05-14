import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import { useState } from 'react';

const info = [
  { icon: Mail,    label: 'Email',    value: 'hello@trailsofbharat.in',  sub: 'We reply within 24 hours' },
  { icon: Phone,   label: 'Phone',    value: '+91 98765 43210',           sub: 'Mon–Sat, 9 AM – 7 PM IST' },
  { icon: MapPin,  label: 'Office',   value: 'Bengaluru, Karnataka',      sub: 'India' },
  { icon: Clock,   label: 'Hours',    value: 'Mon – Sat',                 sub: '9:00 AM – 7:00 PM IST' },
];

const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="page">
      <div className="container">

        {/* Header */}
        <motion.div className="page-header" style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="page-label" style={{ color: 'var(--primary)' }}>Get In Touch</span>
          <h1 className="page-title">Contact Us</h1>
          <p className="page-desc" style={{ margin: '0 auto' }}>
            Have a question, feedback, or want to plan a custom trip? We'd love to hear from you.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', maxWidth: '1100px', margin: '0 auto' }}>

          {/* Info cards row */}
          <div className="grid-4" style={{ marginBottom: '0.5rem' }}>
            {info.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="icon-box icon-box-md" style={{ background: 'rgba(99,102,241,0.07)' }}>
                    <Icon size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.25rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-heading)' }}>{item.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{item.sub}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '50%', background: 'rgba(22,163,74,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <MessageCircle size={28} color="#16a34a" />
                </div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>Message Sent!</h2>
                <p style={{ color: 'var(--text-body)', marginBottom: '1.75rem', fontSize: '0.9375rem' }}>
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button className="btn btn-primary" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.75rem' }}>Send a Message</h2>

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

                {/* Subject */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">Subject</label>
                  <input type="text" className="form-input" style={{ paddingLeft: '1rem' }} placeholder="How can we help?" required />
                </div>

                {/* Message */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label className="form-label">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more..."
                    required
                    style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.875rem', background: 'var(--bg-section)', border: '1px solid var(--border)', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--text-heading)', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ gap: '0.5rem' }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;

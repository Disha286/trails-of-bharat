import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, MapPin, Map, ShoppingBag, Heart, Zap, Globe, Users } from 'lucide-react';
import { destinations, categories } from '../data/destinations';

// Curated featured picks — diverse categories & regions
const FEATURED_IDS = ['rajasthan','kerala','ladakh','meghalaya','tamilnadu','uttarakhand'];
const featured = FEATURED_IDS.map(id => destinations.find(d => d.id === id)).filter(Boolean);

const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: 'calc(100vh - var(--navbar-h))', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1800&q=80" alt="India" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(15,12,41,.85) 0%,rgba(48,43,99,.75) 50%,rgba(36,36,62,.7) 100%)' }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingBlock: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ maxWidth: '680px' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.4rem 1rem', borderRadius:'999px', background:'rgba(99,102,241,.25)', border:'1px solid rgba(99,102,241,.4)', color:'#a5b4fc', fontSize:'0.8rem', fontWeight:700, marginBottom:'1.75rem' }}>
              <Zap size={13} /> AI-Powered Travel Platform
            </span>
            <h1 style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:900, color:'#fff', lineHeight:1.08, marginBottom:'1.25rem' }}>
              Discover Incredible<br />
              <span style={{ background:'linear-gradient(135deg,#818cf8,#fb923c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>India with AI</span>
            </h1>
            <p style={{ fontSize:'1.1rem', color:'rgba(255,255,255,.7)', lineHeight:1.7, maxWidth:'32rem', marginBottom:'2.25rem' }}>
              Personalized itineraries, hidden gems, and smart recommendations for your perfect Indian adventure.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} style={{ display:'flex', background:'rgba(255,255,255,.1)', backdropFilter:'blur(16px)', borderRadius:'1rem', border:'1.5px solid rgba(255,255,255,.2)', overflow:'hidden', maxWidth:'520px', marginBottom:'2rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', flex:1, padding:'0 1.25rem' }}>
                <Search size={18} color="rgba(255,255,255,.5)" />
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search destinations, experiences…"
                  style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'0.9375rem', color:'#fff', fontFamily:'inherit', padding:'0.95rem 0' }} />
              </div>
              <button type="submit" style={{ padding:'0 1.5rem', background:'var(--primary)', border:'none', color:'#fff', fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'background .2s' }}>
                Search
              </button>
            </form>

            <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem' }}>
              <Link to="/explore" className="btn btn-primary btn-lg">Start Exploring <ArrowRight size={16} /></Link>
              <Link to="/planner" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.9rem 1.75rem', borderRadius:'0.875rem', background:'rgba(255,255,255,.1)', backdropFilter:'blur(10px)', color:'#fff', fontWeight:700, fontSize:'0.9375rem', textDecoration:'none', border:'1.5px solid rgba(255,255,255,.25)' }}>
                <Map size={16} /> Plan with AI
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:1, background:'rgba(0,0,0,.3)', backdropFilter:'blur(12px)', borderTop:'1px solid rgba(255,255,255,.08)' }}>
          <div className="container">
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-around', gap:'0.5rem', paddingBlock:'1.25rem' }}>
              {[{icon:Globe,val:'29+',label:'States'},{icon:MapPin,val:'10K+',label:'Places'},{icon:Star,val:'4.9',label:'Rating'},{icon:Users,val:'50K+',label:'Travelers'}].map(s => {
                const I = s.icon;
                return (
                  <div key={s.label} style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                    <I size={20} color="#818cf8" />
                    <div>
                      <div style={{ fontSize:'1.2rem', fontWeight:800, color:'#fff', lineHeight:1 }}>{s.val}</div>
                      <div style={{ fontSize:'0.7rem', color:'rgba(255,255,255,.5)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em' }}>{s.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section" style={{ background:'var(--bg)' }}>
        <div className="container">
          <motion.div style={{ textAlign:'center', marginBottom:'3rem' }} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--primary)', textTransform:'uppercase', letterSpacing:'.1em' }}>Browse by Category</span>
            <h2 style={{ fontSize:'clamp(1.75rem,3.5vw,2.5rem)', marginTop:'0.75rem', color:'var(--text-heading)' }}>What's Your Travel Style?</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:'1rem' }}>
            {categories.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.07 }}>
                <Link to={`/explore?cat=${cat.id}`}
                  style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.75rem', padding:'1.5rem 1rem', borderRadius:'1.25rem', background:'var(--bg-card)', border:'1.5px solid var(--border)', textDecoration:'none', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=cat.color; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${cat.color}33`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
                  <span style={{ fontSize:'2rem' }}>{cat.emoji}</span>
                  <span style={{ fontSize:'0.85rem', fontWeight:700, color:'var(--text-heading)', textAlign:'center' }}>{cat.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING DESTINATIONS */}
      <section className="section" style={{ background:'var(--bg-section)' }}>
        <div className="container">
          <motion.div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:'1.5rem', marginBottom:'3rem' }} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <div>
              <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--accent)', textTransform:'uppercase', letterSpacing:'.1em' }}>✈️ Trending Now</span>
              <h2 style={{ fontSize:'clamp(1.75rem,3.5vw,2.5rem)', marginTop:'0.75rem', color:'var(--text-heading)' }}>Top Destinations</h2>
              <p style={{ color:'var(--text-muted)', fontSize:'0.875rem', marginTop:'0.375rem' }}>{destinations.length} places across all Indian states</p>
            </div>
            <Link to="/explore" style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'var(--primary)', fontWeight:700, fontSize:'0.9375rem', textDecoration:'none' }}>View All {destinations.length} <ArrowRight size={16} /></Link>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:'2rem' }}>
            {featured.map((d, i) => (
              <motion.div key={d.id} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.12 }}>
                <Link to={`/destination/${d.id}`} style={{ display:'block', textDecoration:'none', borderRadius:'1.5rem', overflow:'hidden', background:'var(--bg-card)', border:'1px solid var(--border)', boxShadow:'var(--shadow-md)', transition:'transform .3s,box-shadow .3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='var(--shadow-xl)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}>
                  <div style={{ position:'relative', height:'220px', overflow:'hidden' }}>
                    <img src={d.img} alt={d.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,.6) 0%,transparent 60%)' }} />
                    <div style={{ position:'absolute', top:'1rem', left:'1rem', padding:'.3rem .8rem', borderRadius:'999px', background:'rgba(255,255,255,.15)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.25)', fontSize:'0.75rem', fontWeight:700, color:'#fff' }}>{d.category}</div>
                    <div style={{ position:'absolute', top:'1rem', right:'1rem', display:'flex', alignItems:'center', gap:'4px', padding:'.3rem .7rem', borderRadius:'999px', background:'rgba(255,255,255,.9)', fontSize:'0.75rem', fontWeight:700, color:'#0f172a' }}>
                      <Star size={11} fill="#f59e0b" color="#f59e0b" /> {d.rating}
                    </div>
                    <div style={{ position:'absolute', bottom:'1rem', left:'1.25rem' }}>
                      <div style={{ fontSize:'1.3rem', fontWeight:800, color:'#fff' }}>{d.name}</div>
                      <div style={{ fontSize:'0.8rem', color:'rgba(255,255,255,.75)' }}>{d.tagline}</div>
                    </div>
                  </div>
                  <div style={{ padding:'1.25rem' }}>
                    <p style={{ fontSize:'0.85rem', color:'var(--text-body)', lineHeight:1.6, marginBottom:'1rem' }}>{d.desc.slice(0,90)}…</p>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ display:'flex', alignItems:'center', gap:'.375rem', fontSize:'0.8rem', color:'var(--text-muted)', fontWeight:600 }}><MapPin size={13}/>{d.state}</span>
                      <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--primary)' }}>View Details →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI PLANNER PREVIEW */}
      <section className="section" style={{ background:'linear-gradient(135deg,#0f0c29 0%,#302b63 60%,#24243e 100%)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'4rem', alignItems:'center' }}>
            <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
              <span style={{ fontSize:'0.8rem', fontWeight:700, color:'#818cf8', textTransform:'uppercase', letterSpacing:'.1em' }}>🤖 AI Trip Planner</span>
              <h2 style={{ fontSize:'clamp(1.75rem,3.5vw,2.75rem)', marginTop:'0.75rem', color:'#fff', marginBottom:'1.25rem' }}>Let AI Design Your Perfect Itinerary</h2>
              <p style={{ color:'rgba(255,255,255,.65)', fontSize:'1rem', lineHeight:1.7, marginBottom:'2rem' }}>Tell us your budget and interests — our AI builds a full day-by-day itinerary for you.</p>
              <Link to="/planner" className="btn btn-primary btn-lg">Generate Itinerary <ArrowRight size={16} /></Link>
            </motion.div>
            <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {[
                { day:'Day 1', place:'Arrive Jaipur — Amber Fort & City Palace', icon:'🏯' },
                { day:'Day 2', place:'Hawa Mahal · Bazaars · Jantar Mantar', icon:'🛍️' },
                { day:'Day 3', place:'Drive to Udaipur — Lake Palace Sunset', icon:'🌅' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*.15 }}
                  style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem 1.25rem', borderRadius:'1rem', background:'rgba(255,255,255,.08)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,.12)' }}>
                  <span style={{ fontSize:'1.5rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize:'0.75rem', fontWeight:700, color:'#818cf8', marginBottom:'0.25rem' }}>{item.day}</div>
                    <div style={{ fontSize:'0.9rem', fontWeight:600, color:'#fff' }}>{item.place}</div>
                  </div>
                </motion.div>
              ))}
              <div style={{ textAlign:'center', fontSize:'0.8rem', color:'rgba(255,255,255,.3)', fontWeight:600 }}>✦ AI-generated personalized plan</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARKETPLACE PREVIEW */}
      <section className="section" style={{ background:'var(--bg)' }}>
        <div className="container">
          <motion.div style={{ textAlign:'center', marginBottom:'3rem' }} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--accent)', textTransform:'uppercase', letterSpacing:'.1em' }}>🛍️ Marketplace</span>
            <h2 style={{ fontSize:'clamp(1.75rem,3.5vw,2.5rem)', marginTop:'0.75rem', color:'var(--text-heading)' }}>Shop Authentic India</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:'1.5rem', marginBottom:'2.5rem' }}>
            {[
              { name:'Rajasthani Blue Pottery', price:'₹850', img:'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80', tag:'Handicraft' },
              { name:'Pashmina Shawl', price:'₹3,200', img:'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80', tag:'Textile' },
              { name:'Kerala Homestay', price:'₹5,500', img:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80', tag:'Homestay' },
              { name:'Chettinad Spice Kit', price:'₹650', img:'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80', tag:'Food' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.1 }}
                style={{ borderRadius:'1.25rem', overflow:'hidden', background:'var(--bg-card)', border:'1px solid var(--border)', transition:'all .3s', cursor:'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-xl)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ height:'160px', overflow:'hidden', position:'relative' }}>
                  <img src={item.img} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', top:'.75rem', left:'.75rem', padding:'.2rem .65rem', borderRadius:'999px', background:'rgba(255,255,255,.9)', fontSize:'0.7rem', fontWeight:700, color:'#0f172a' }}>{item.tag}</div>
                  <button style={{ position:'absolute', top:'.75rem', right:'.75rem', width:'30px', height:'30px', borderRadius:'50%', background:'rgba(255,255,255,.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Heart size={14} color="#e11d48" />
                  </button>
                </div>
                <div style={{ padding:'1rem' }}>
                  <div style={{ fontSize:'0.875rem', fontWeight:700, color:'var(--text-heading)', marginBottom:'0.5rem' }}>{item.name}</div>
                  <div style={{ fontSize:'1rem', fontWeight:800, color:'var(--primary)' }}>{item.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign:'center' }}>
            <Link to="/marketplace" className="btn btn-primary btn-lg"><ShoppingBag size={16}/> Explore Marketplace</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background:'var(--bg-section)' }}>
        <div style={{ maxWidth:'44rem', margin:'0 auto', padding:'0 1.5rem', textAlign:'center' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', color:'var(--text-heading)', marginBottom:'1rem' }}>Ready to Explore India? 🇮🇳</h2>
            <p style={{ color:'var(--text-body)', fontSize:'1.0625rem', marginBottom:'2.5rem', lineHeight:1.7 }}>Join 50,000+ travelers who've discovered incredible India with AI.</p>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'1rem' }}>
              <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
              <Link to="/explore" className="btn btn-outline btn-lg">Browse Destinations</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;

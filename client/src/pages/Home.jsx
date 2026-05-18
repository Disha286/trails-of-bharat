import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, MapPin, Map, ShoppingBag, Heart, Zap, Globe, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { destinations, categories } from '../data/destinations';

// Curated featured picks — diverse categories & regions
const FEATURED_IDS = ['agra','alleppey','ladakh','hampi','goa','tawang'];
const featured = FEATURED_IDS.map(id => destinations.find(d => d.id === id)).filter(Boolean);

const Home = () => {
  const { t } = useTranslation();
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
              <Zap size={13} /> {t('hero.aiPowered')}
            </span>
            <h1 style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:900, color:'#fff', lineHeight:1.08, marginBottom:'1.25rem' }}>
              {t('hero.discoverIncredible')}<br />
              <span style={{ background:'linear-gradient(135deg,#818cf8,#fb923c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{t('hero.indiaWithAi')}</span>
            </h1>
            <p style={{ fontSize:'1.1rem', color:'rgba(255,255,255,.7)', lineHeight:1.7, maxWidth:'32rem', marginBottom:'2.25rem' }}>
              {t('hero.subtitle')}
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} style={{ display:'flex', background:'rgba(255,255,255,.1)', backdropFilter:'blur(16px)', borderRadius:'1rem', border:'1.5px solid rgba(255,255,255,.2)', overflow:'hidden', maxWidth:'520px', marginBottom:'2rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', flex:1, padding:'0 1.25rem' }}>
                <Search size={18} color="rgba(255,255,255,.5)" />
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t('hero.searchPlaceholder')}
                  style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'0.9375rem', color:'#fff', fontFamily:'inherit', padding:'0.95rem 0' }} />
              </div>
              <button type="submit" style={{ padding:'0 1.5rem', background:'var(--primary)', border:'none', color:'#fff', fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'background .2s' }}>
                {t('hero.searchBtn')}
              </button>
            </form>

            <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem' }}>
              <Link to="/explore" className="btn btn-primary btn-lg">{t('hero.startExploring')} <ArrowRight size={16} /></Link>
              <Link to="/planner" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.9rem 1.75rem', borderRadius:'0.875rem', background:'rgba(255,255,255,.1)', backdropFilter:'blur(10px)', color:'#fff', fontWeight:700, fontSize:'0.9375rem', textDecoration:'none', border:'1.5px solid rgba(255,255,255,.25)' }}>
                <Map size={16} /> {t('hero.planWithAi')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:1, background:'rgba(0,0,0,.3)', backdropFilter:'blur(12px)', borderTop:'1px solid rgba(255,255,255,.08)' }}>
          <div className="container">
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-around', gap:'0.5rem', paddingBlock:'1.25rem' }}>
              {[{icon:Globe,val:'29+',label:'States'},{icon:MapPin,val:'96+',label:'Destinations'},{icon:Star,val:'4.8',label:'Avg Rating'},{icon:Users,val:'50K+',label:'Travelers'}].map(s => {
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

      {/* REGION QUICK-ACCESS STRIP */}
      <section style={{ background: 'var(--bg)', paddingBlock: '2rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
            {[
              { label: 'Taj Mahal',        id: 'agra',          emoji: '🕌' },
              { label: 'Goa Beaches',      id: 'goa',           emoji: '🏖️' },
              { label: 'Ladakh',           id: 'ladakh',        emoji: '🏔️' },
              { label: 'Kerala Backwaters',id: 'alleppey',      emoji: '🚤' },
              { label: 'Rajasthan',        id: 'jaipur',        emoji: '🏯' },
              { label: 'Hampi Ruins',      id: 'hampi',         emoji: '🗿' },
              { label: 'Darjeeling',       id: 'darjeeling',    emoji: '🍵' },
              { label: 'Varanasi',         id: 'varanasi',      emoji: '🪔' },
              { label: 'Kaziranga',        id: 'kaziranga',     emoji: '🦏' },
              { label: 'Meghalaya',        id: 'cherrapunji',   emoji: '🌧️' },
              { label: 'Tawang',           id: 'tawang',        emoji: '🏳️' },
              { label: 'Golden Temple',    id: 'amritsar',      emoji: '✨' },
            ].map(r => (
              <Link key={r.id} to={`/destination/${r.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', padding: '0.875rem 1.25rem', borderRadius: '1rem', background: 'var(--bg-card)', border: '1.5px solid var(--border)', textDecoration: 'none', flexShrink: 0, transition: 'all .2s', minWidth: '90px' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(99,102,241,.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <span style={{ fontSize: '1.6rem' }}>{r.emoji}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-heading)', textAlign: 'center', lineHeight: 1.3 }}>{r.label}</span>
              </Link>
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

      {/* HOW IT WORKS */}
      <section className="section" style={{ background:'var(--bg-section)' }}>
        <div className="container">
          <motion.div style={{ textAlign:'center', marginBottom:'3.5rem' }} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--primary)', textTransform:'uppercase', letterSpacing:'.1em' }}>Simple Steps</span>
            <h2 style={{ fontSize:'clamp(1.75rem,3.5vw,2.5rem)', marginTop:'0.75rem', color:'var(--text-heading)' }}>How It Works</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'2rem' }}>
            {[
              { step:'01', emoji:'🔍', title:'Discover',    desc:'Browse 96+ destinations across every Indian state — filtered by category, budget, and season.' },
              { step:'02', emoji:'🤖', title:'Plan with AI',desc:'Tell us your style. Our AI generates a personalized day-by-day itinerary in seconds.' },
              { step:'03', emoji:'🤝', title:'Connect',     desc:'Book verified local guides, artisans, and homestay hosts directly — no middlemen.' },
              { step:'04', emoji:'🛍️', title:'Shop Local',  desc:'Buy authentic handicrafts, textiles, and food directly from the source community.' },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.1 }}
                style={{ textAlign:'center', padding:'2rem 1.5rem', borderRadius:'1.5rem', background:'var(--bg-card)', border:'1px solid var(--border)', boxShadow:'var(--shadow)' }}>
                <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>{item.emoji}</div>
                <div style={{ fontSize:'0.7rem', fontWeight:800, color:'var(--primary)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:'0.5rem' }}>Step {item.step}</div>
                <h3 style={{ fontSize:'1.1rem', fontWeight:800, color:'var(--text-heading)', marginBottom:'0.75rem' }}>{item.title}</h3>
                <p style={{ fontSize:'0.875rem', color:'var(--text-body)', lineHeight:1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRAILS OF BHARAT */}
      <section className="section" style={{ background:'var(--bg)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'4rem', alignItems:'center' }}>
            <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
              <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--accent)', textTransform:'uppercase', letterSpacing:'.1em' }}>🌱 Our Mission</span>
              <h2 style={{ fontSize:'clamp(1.75rem,3.5vw,2.75rem)', marginTop:'0.75rem', color:'var(--text-heading)', marginBottom:'1.25rem' }}>
                Tourism That <span style={{ background:'linear-gradient(135deg,#6366f1,#f97316)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Empowers</span> Communities
              </h2>
              <p style={{ color:'var(--text-body)', lineHeight:1.8, marginBottom:'2rem', fontSize:'1rem' }}>
                India's 5 million artisans and local guides deserve direct access to travelers. Trails of Bharat is the bridge — cutting out exploitation, building sustainable livelihoods, and giving tourists deeply authentic experiences.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                {[
                  { emoji:'💚', text:'100% of bookings go directly to local providers' },
                  { emoji:'🏆', text:'Every guide and vendor is community-verified' },
                  { emoji:'🌍', text:'Travel data is transparent and community-owned' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*.15 }}
                    style={{ display:'flex', alignItems:'center', gap:'0.875rem' }}>
                    <span style={{ fontSize:'1.25rem' }}>{item.emoji}</span>
                    <span style={{ fontSize:'0.9rem', fontWeight:600, color:'var(--text-body)' }}>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }}
              style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              {[
                { val:'₹2.4Cr+', label:'Earnings to Locals',      color:'#4f46e5', bg:'#eef2ff' },
                { val:'2,400+',  label:'Local Providers',          color:'#16a34a', bg:'#f0fdf4' },
                { val:'50K+',    label:'Happy Travelers',          color:'#0284c7', bg:'#f0f9ff' },
                { val:'0',       label:'Middlemen in Our Chain',   color:'#e11d48', bg:'#fff1f2' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity:0, scale:.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*.1 }}
                  style={{ padding:'1.5rem', borderRadius:'1.25rem', background:item.bg, textAlign:'center', border:`1px solid ${item.color}22` }}>
                  <div style={{ fontSize:'1.75rem', fontWeight:900, color:item.color, lineHeight:1 }}>{item.val}</div>
                  <div style={{ fontSize:'0.75rem', fontWeight:700, color:item.color, marginTop:'0.5rem', lineHeight:1.4 }}>{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background:'var(--bg-section)' }}>
        <div style={{ maxWidth:'44rem', margin:'0 auto', padding:'0 1.5rem', textAlign:'center' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', color:'var(--text-heading)', marginBottom:'1rem' }}>{t('cta.ready')}</h2>
            <p style={{ color:'var(--text-body)', fontSize:'1.0625rem', marginBottom:'2.5rem', lineHeight:1.7 }}>{t('cta.joinText')}</p>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'1rem' }}>
              <Link to="/register" className="btn btn-primary btn-lg">{t('cta.getStarted')}</Link>
              <Link to="/explore" className="btn btn-outline btn-lg">{t('cta.browse')}</Link>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Home;

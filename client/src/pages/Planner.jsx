import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Calendar, Wallet, User, ChevronRight, Loader2 } from 'lucide-react';
import { states } from '../data/destinations';

const interests = ['Heritage','Adventure','Nature','Food','Spiritual','Beaches','Wildlife','Culture','Shopping'];
const budgets   = [{ val:'budget', label:'Budget (< ₹15K)', emoji:'💚' }, { val:'moderate', label:'Moderate (₹15–40K)', emoji:'💛' }, { val:'premium', label:'Premium (₹40K+)', emoji:'❤️' }];
const styles    = ['Solo','Couple','Family','Friends','Group Tour'];
const durations = [3,5,7,10,14];

const mockItinerary = {
  rajasthan: [
    { day:1, title:'Jaipur Arrival',            activities:['Heritage hotel check-in','Amber Fort at sunset','Dinner at Chokhi Dhani'] },
    { day:2, title:'Pink City Exploration',      activities:['Hawa Mahal & City Palace','Jantar Mantar','Johari Bazaar'] },
    { day:3, title:'Jodhpur Blue City',          activities:['Mehrangarh Fort','Blue City walk','Rooftop fort-view dinner'] },
    { day:4, title:'Udaipur Lake City',          activities:['Lake Pichola boat ride','City Palace museum','Bagore Ki Haveli show'] },
    { day:5, title:'Jaisalmer Desert',           activities:['Golden Fort','Sam Sand Dunes camel ride','Desert stargazing'] },
  ],
  kerala: [
    { day:1, title:'Arrive Kochi',               activities:['Fort Kochi walk','Chinese fishing nets','Kathakali dance show'] },
    { day:2, title:'Alleppey Backwaters',        activities:['Houseboat check-in','Village canoe ride','Lagoon sunset'] },
    { day:3, title:'Munnar Hills',               activities:['Tea garden tour','Eravikulam National Park','Top Station viewpoint'] },
    { day:4, title:'Wayanad Wildlife',           activities:['Edakkal Caves','Chembra Peak trek','Tribal village visit'] },
    { day:5, title:'Varkala Beach',              activities:['Cliff beach walk','Ayurvedic massage','Fresh seafood dinner'] },
  ],
  ladakh: [
    { day:1, title:'Leh — Acclimatize',          activities:['Rest & hydrate','Leh Market walk','Shanti Stupa sunset'] },
    { day:2, title:'Monastery Circuit',          activities:['Hemis Monastery','Thiksey Monastery','Rancho School visit'] },
    { day:3, title:'Khardung La & Nubra',        activities:['World highest motorable road','Nubra Valley','Bactrian camel ride'] },
    { day:4, title:'Pangong Lake',               activities:['Sunrise at Pangong Tso','3-Idiots filming spot','Wild donkeys sighting'] },
    { day:5, title:'Departure Day',              activities:['Magnetic Hill','Gurudwara Pathar Sahib','Depart from Leh'] },
  ],
  meghalaya: [
    { day:1, title:'Shillong Arrival',           activities:["Ward's Lake","Police Bazaar shopping",'Don Bosco Museum'] },
    { day:2, title:'Cherrapunji',                activities:['Nohkalikai Falls','Seven Sisters Falls','Mawsmai Caves'] },
    { day:3, title:'Living Root Bridges',        activities:['Double-decker root bridge trek','Nongriat village','Natural pool swim'] },
    { day:4, title:'Dawki Crystal River',        activities:['Umngot River boat ride','Border viewpoint','Shnongpdeng zipline'] },
  ],
  'tamil nadu': [
    { day:1, title:'Chennai Arrival',            activities:['Marina Beach walk','Kapaleeshwarar Temple','Filter coffee ritual'] },
    { day:2, title:'Mahabalipuram',              activities:['Shore Temple','Pancha Rathas',"Arjuna's Penance"] },
    { day:3, title:'Madurai',                    activities:['Meenakshi Temple','Thirumalai Nayakkar Palace','Street food trail'] },
    { day:4, title:'Ooty Nilgiris',              activities:['Toy Train ride','Ooty Lake boating','Tea Museum'] },
    { day:5, title:'Thanjavur Heritage',         activities:['Brihadeeswara Temple (UNESCO)','Tanjore art gallery','Royal Palace'] },
  ],
  'jammu & kashmir': [
    { day:1, title:'Arrive Srinagar',            activities:['Dal Lake Shikara ride','Floating Market','Nishat Bagh garden'] },
    { day:2, title:'Gulmarg',                    activities:['Gondola to Apharwat Peak','Snow activities','Alpine meadow walk'] },
    { day:3, title:'Pahalgam Valley',            activities:['Betaab Valley','Aru Valley','Lidder River stroll'] },
    { day:4, title:'Sonamarg',                   activities:['Thajiwas Glacier','Sindh River picnic','Ponies on snow'] },
    { day:5, title:'Srinagar Farewell',          activities:['Shalimar Bagh','Hazratbal Shrine','Handicraft shopping'] },
  ],
  uttarakhand: [
    { day:1, title:'Arrive Rishikesh',           activities:['Laxman Jhula walk','Triveni Ghat Aarti','Ashram yoga session'] },
    { day:2, title:'Rafting & Adventure',        activities:['White water rafting','Bungee jumping','Camping by Ganga'] },
    { day:3, title:'Haridwar Pilgrimage',        activities:['Har Ki Pauri Ganga Aarti','Mansa Devi Temple','Holy Ganga dip'] },
    { day:4, title:'Mussoorie Hills',            activities:['Kempty Falls','Mall Road walk','Gun Hill ropeway'] },
  ],
  gujarat: [
    { day:1, title:'Ahmedabad Arrival',          activities:['Sabarmati Ashram','Kankaria Lake','Local gujarati thali'] },
    { day:2, title:'Rann of Kutch',              activities:['White Rann sunset','Rann Utsav folk performances','Bhujia market'] },
    { day:3, title:'Gir National Park',          activities:['Asiatic lion jeep safari','Kamleshwar Dam','Somnath Temple'] },
    { day:4, title:'Dwarka & Beaches',           activities:['Dwarkadhish Temple','Beyt Dwarka island','Okha beach'] },
  ],
  maharashtra: [
    { day:1, title:'Mumbai Arrival',             activities:['Gateway of India','Marine Drive','Street food at Juhu'] },
    { day:2, title:'Ajanta Caves',               activities:['Buddhist cave paintings (UNESCO)','Jalgaon lunch','Travel to Ellora'] },
    { day:3, title:'Ellora Caves',               activities:['Kailasa Temple rock-cut architecture','Aurangabad bibi ka maqbara'] },
    { day:4, title:'Lonavala Hills',             activities:['Bhushi Dam','Tiger Point','Sunset at Khandala'] },
  ],
  default: [
    { day:1, title:'Arrival & Orientation',      activities:['Check-in','Local area walk','Welcome dinner at local restaurant'] },
    { day:2, title:'Key Landmarks',              activities:['Morning sightseeing','Lunch at local dhaba','Sunset viewpoint'] },
    { day:3, title:'Hidden Gems',                activities:['Off-beat village tour','Cultural workshop','Street food trail'] },
    { day:4, title:'Nature & Adventure',         activities:['Nature walk / trek','Picnic lunch','Evening cultural show'] },
    { day:5, title:'Departure Day',              activities:['Local market shopping','Farewell breakfast','Transfer to airport'] },
  ],
};


const Planner = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ state:'Rajasthan', duration:5, budget:'moderate', style:'Couple', interests:[] });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const toggleInterest = (val) => setForm(f => ({
    ...f, interests: f.interests.includes(val) ? f.interests.filter(i => i !== val) : [...f.interests, val],
  }));

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const key = form.state.toLowerCase();
      const plan = mockItinerary[key] || mockItinerary.default;
      const days = form.duration <= 3 ? 3 : form.duration <= 5 ? 5 : Math.min(form.duration, plan.length);
      setItinerary(plan.slice(0, days));
      setLoading(false);
    }, 2000);
  };

  const Field = ({ label, children }) => (
    <div style={{ marginBottom:'1.5rem' }}>
      <label style={{ display:'block', fontSize:'0.8125rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:'0.75rem' }}>{label}</label>
      {children}
    </div>
  );

  return (
    <div className="page">
      <div className="container" style={{ maxWidth:'860px' }}>

        {/* Header */}
        <motion.div className="page-header" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--primary)', textTransform:'uppercase', letterSpacing:'.1em' }}>🤖 AI Powered</span>
          <h1 className="page-title" style={{ marginTop:'0.5rem' }}>Trip Planner</h1>
          <p className="page-desc">Answer a few questions and our AI creates your perfect Indian itinerary.</p>
        </motion.div>

        {!itinerary ? (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.1 }}>
            {/* Form Card */}
            <div style={{ background:'var(--bg-card)', borderRadius:'1.5rem', border:'1px solid var(--border)', padding:'2.5rem', boxShadow:'var(--shadow-lg)', marginBottom:'2rem' }}>

              <Field label="📍 Destination State">
                <select value={form.state} onChange={e => setForm(f => ({...f, state:e.target.value}))}
                  style={{ width:'100%', padding:'.875rem 1rem', borderRadius:'.875rem', border:'1.5px solid var(--border)', background:'var(--bg-section)', color:'var(--text-heading)', fontFamily:'inherit', fontSize:'0.9rem', outline:'none' }}>
                  {states.filter(s => s !== 'All States').map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="📅 Trip Duration">
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.625rem' }}>
                  {durations.map(d => (
                    <button key={d} onClick={() => setForm(f => ({...f, duration:d}))}
                      style={{ padding:'.625rem 1.25rem', borderRadius:'999px', border:`1.5px solid ${form.duration===d ? 'var(--primary)' : 'var(--border)'}`, background:form.duration===d ? 'var(--primary)' : 'transparent', color:form.duration===d ? '#fff' : 'var(--text-body)', fontWeight:700, fontSize:'0.875rem', cursor:'pointer', fontFamily:'inherit', transition:'all .15s' }}>
                      {d} Days
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="💰 Budget">
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'0.875rem' }}>
                  {budgets.map(b => (
                    <button key={b.val} onClick={() => setForm(f => ({...f, budget:b.val}))}
                      style={{ padding:'1rem', borderRadius:'1rem', border:`1.5px solid ${form.budget===b.val ? 'var(--primary)' : 'var(--border)'}`, background:form.budget===b.val ? 'rgba(99,102,241,.08)' : 'transparent', color:form.budget===b.val ? 'var(--primary)' : 'var(--text-body)', fontWeight:700, fontSize:'0.875rem', cursor:'pointer', fontFamily:'inherit', transition:'all .15s', textAlign:'center' }}>
                      <div style={{ fontSize:'1.5rem', marginBottom:'0.375rem' }}>{b.emoji}</div>
                      {b.label}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="👥 Travel Style">
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.625rem' }}>
                  {styles.map(s => (
                    <button key={s} onClick={() => setForm(f => ({...f, style:s}))}
                      style={{ padding:'.625rem 1.25rem', borderRadius:'999px', border:`1.5px solid ${form.style===s ? 'var(--primary)' : 'var(--border)'}`, background:form.style===s ? 'var(--primary)' : 'transparent', color:form.style===s ? '#fff' : 'var(--text-body)', fontWeight:700, fontSize:'0.875rem', cursor:'pointer', fontFamily:'inherit', transition:'all .15s' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="🎯 Interests (pick any)">
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.625rem' }}>
                  {interests.map(i => (
                    <button key={i} onClick={() => toggleInterest(i)}
                      style={{ padding:'.5rem 1.1rem', borderRadius:'999px', border:`1.5px solid ${form.interests.includes(i) ? 'var(--primary)' : 'var(--border)'}`, background:form.interests.includes(i) ? 'rgba(99,102,241,.1)' : 'transparent', color:form.interests.includes(i) ? 'var(--primary)' : 'var(--text-body)', fontWeight:600, fontSize:'0.8rem', cursor:'pointer', fontFamily:'inherit', transition:'all .15s' }}>
                      {i}
                    </button>
                  ))}
                </div>
              </Field>

              <motion.button onClick={generate} disabled={loading} whileHover={{ scale:loading?1:1.02 }} whileTap={{ scale:loading?1:0.97 }}
                style={{ width:'100%', padding:'1rem', borderRadius:'1rem', border:'none', background:loading ? 'rgba(99,102,241,.5)' : 'var(--primary)', color:'#fff', fontWeight:800, fontSize:'1rem', cursor:loading?'not-allowed':'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.625rem', boxShadow:'0 4px 18px rgba(99,102,241,.35)', transition:'background .2s' }}>
                {loading ? <><Loader2 size={20} style={{ animation:'spin .8s linear infinite' }} /> Generating your itinerary…</> : <><Sparkles size={20} /> Generate AI Itinerary</>}
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Itinerary Timeline */
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5 }}>
            {/* Summary */}
            <div style={{ background:'linear-gradient(135deg,#0f0c29,#302b63)', borderRadius:'1.5rem', padding:'1.75rem 2rem', marginBottom:'2.5rem', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'1rem' }}>
              <div>
                <div style={{ fontSize:'0.8rem', fontWeight:700, color:'#818cf8', marginBottom:'0.5rem' }}>🤖 AI Generated Itinerary</div>
                <h2 style={{ fontSize:'1.5rem', fontWeight:800, color:'#fff' }}>{form.duration} Days in {form.state}</h2>
                <div style={{ display:'flex', gap:'1.25rem', marginTop:'0.75rem', flexWrap:'wrap' }}>
                  {[{icon:User,val:form.style},{icon:Wallet,val:budgets.find(b=>b.val===form.budget)?.label.split(' ')[0]},{icon:MapPin,val:form.state}].map((item,i) => {
                    const I=item.icon; return (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.4rem', color:'rgba(255,255,255,.7)', fontSize:'0.85rem', fontWeight:600 }}>
                        <I size={14} /> {item.val}
                      </div>
                    );
                  })}
                </div>
              </div>
              <button onClick={() => setItinerary(null)} style={{ padding:'.75rem 1.5rem', borderRadius:'.875rem', background:'rgba(255,255,255,.12)', border:'1px solid rgba(255,255,255,.2)', color:'#fff', fontWeight:700, fontSize:'0.875rem', cursor:'pointer', fontFamily:'inherit' }}>
                ← Regenerate
              </button>
            </div>

            {/* Timeline */}
            <div style={{ position:'relative', paddingLeft:'2rem' }}>
              <div style={{ position:'absolute', left:'11px', top:0, bottom:0, width:'2px', background:'linear-gradient(to bottom,var(--primary),rgba(99,102,241,.1))' }} />
              {itinerary.map((day, i) => (
                <motion.div key={day.day} initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*.12 }}
                  style={{ position:'relative', marginBottom:'2rem' }}>
                  <div style={{ position:'absolute', left:'-2rem', top:'0.375rem', width:'22px', height:'22px', borderRadius:'50%', background:'var(--primary)', border:'3px solid var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.6rem', fontWeight:800, color:'#fff', boxShadow:'0 0 0 3px rgba(99,102,241,.2)' }}>
                    {day.day}
                  </div>
                  <div style={{ background:'var(--bg-card)', borderRadius:'1.25rem', border:'1px solid var(--border)', padding:'1.5rem', boxShadow:'var(--shadow)' }}>
                    <div style={{ fontSize:'0.75rem', fontWeight:700, color:'var(--primary)', marginBottom:'0.375rem', textTransform:'uppercase', letterSpacing:'.08em' }}>Day {day.day}</div>
                    <h3 style={{ fontSize:'1.1rem', fontWeight:800, color:'var(--text-heading)', marginBottom:'1rem' }}>{day.title}</h3>
                    <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                      {day.activities.map((act, j) => (
                        <div key={j} style={{ display:'flex', alignItems:'center', gap:'0.625rem', padding:'.5rem .875rem', borderRadius:'.75rem', background:'var(--bg-section)' }}>
                          <ChevronRight size={14} color="var(--primary)" />
                          <span style={{ fontSize:'0.875rem', color:'var(--text-body)', fontWeight:500 }}>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ textAlign:'center', paddingTop:'1rem' }}>
              <Link to="/marketplace" className="btn btn-primary btn-lg"><Calendar size={16}/> Book Experiences</Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Planner;

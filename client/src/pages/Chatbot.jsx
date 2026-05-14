import { motion } from 'framer-motion';
import { Send, Bot, User, Lightbulb, RefreshCw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const suggestions = [
  'Best time to visit Ladakh?',
  'Plan a 5-day Kerala trip',
  'Hidden gems in Rajasthan',
  'Budget tips for Goa',
  'Wildlife safaris in India',
  'Best beaches in India',
  'Tamil Nadu temples tour',
  'Northeast India tips',
  'Things to do in Hampi',
  'Uttarakhand adventure trip',
];

/* ── Smart mock response engine ─────────────────────────────────── */
const smartResponse = (msg) => {
  const m = msg.toLowerCase();

  if (m.includes('ladakh') || m.includes('leh')) {
    return `🏔️ **Ladakh** is best visited from **June to September** when roads are open and the weather is pleasant.\n\n✅ Top tips:\n• Spend at least 2 days in Leh to acclimatize before heading higher\n• Must-visit: Pangong Lake, Nubra Valley, Khardung La Pass\n• Budget: ₹2,500–4,000/day including food, stay, and transport\n• Carry altitude sickness medicine (Diamox)\n• Inner Line Permit is required for restricted areas`;
  }

  if (m.includes('kerala') || m.includes('backwater') || m.includes('houseboat')) {
    return `🌴 **Kerala** is magical year-round, but best from **September to March**.\n\n✅ 5-day suggested plan:\n• Day 1: Fort Kochi — Chinese fishing nets, Kathakali show\n• Day 2: Alleppey — board a houseboat, cruise the backwaters\n• Day 3: Munnar — tea gardens, Eravikulam National Park\n• Day 4: Wayanad — Edakkal Caves, tribal village visit\n• Day 5: Varkala — cliff beach, fresh seafood\n\n💰 Budget: ₹4,000–7,000/day for moderate travel`;
  }

  if (m.includes('goa') && (m.includes('budget') || m.includes('cheap') || m.includes('affordable'))) {
    return `🏖️ **Budget Tips for Goa:**\n\n• Visit during **shoulder season** (Oct–Nov or Feb–Mar) — 30–40% cheaper\n• Stay in **South Goa** — less crowded and cheaper than North Goa\n• Rent a **scooter** (₹350–500/day) instead of taxis\n• Eat at **beach shacks** for great fish curry rice at ₹150–250\n• Local buses connect major beaches for ₹15–30\n• Avoid Christmas and New Year — prices triple\n\n💰 Daily budget: ₹1,200–1,800 (budget) | ₹3,000–5,000 (moderate)`;
  }

  if (m.includes('rajasthan') || m.includes('jaipur') || m.includes('jodhpur') || m.includes('udaipur') || m.includes('jaisalmer')) {
    return `🏯 **Rajasthan** is best visited from **October to March** when the weather is cool.\n\n🗺️ Suggested circuit (7 days):\n• Jaipur → Pushkar → Jodhpur → Jaisalmer → Udaipur\n\n🌟 Hidden gems:\n• **Bundi** — step-wells, frescoed palaces, no crowds\n• **Mandawa** — open-air Shekhawati fresco museum\n• **Osian** — desert temples and sand dunes near Jodhpur\n\n💡 Tips: Book heritage hotels early, bargain at bazaars, avoid April–June heat`;
  }

  if (m.includes('wildlife') || m.includes('safari') || m.includes('tiger') || m.includes('national park')) {
    return `🐅 **Top Wildlife Destinations in India:**\n\n1. **Ranthambore, Rajasthan** — Best for Bengal tigers; Oct–Jun\n2. **Bandhavgarh, MP** — Highest tiger density; Nov–May\n3. **Kaziranga, Assam** — One-horned rhinos; Nov–Apr\n4. **Corbett, Uttarakhand** — First national park; Nov–Jun\n5. **Gir, Gujarat** — Only Asiatic lions; Dec–Apr\n6. **Sundarbans, WB** — Royal Bengal tigers in mangroves\n\n📅 Book safari permits **3–4 months in advance** for popular reserves!`;
  }

  if (m.includes('varanasi') || m.includes('kashi') || m.includes('benares') || m.includes('spiritual') || m.includes('pilgrimage')) {
    return `🕯️ **Varanasi** — The Spiritual Heart of India:\n\n• Wake up at **5 AM** for the unforgettable Ganga Aarti boat ride\n• Visit **Dashashwamedh Ghat** for the grand evening aarti at 7 PM\n• Day trip to **Sarnath** (12 km) — where Buddha gave his first sermon\n• Wander through **Vishwanath Gali** — ancient bylanes of the old city\n• Try **Kachori Sabzi** at Kachori Gali for breakfast\n\n🙏 Spiritual circuit nearby: Allahabad (Prayagraj), Ayodhya, Bodhgaya`;
  }

  if (m.includes('himachal') || m.includes('manali') || m.includes('shimla') || m.includes('spiti') || m.includes('dharamshala')) {
    return `⛰️ **Himachal Pradesh** highlights:\n\n• **Shimla** (Oct–Jun): Mall Road, colonial heritage, toy train\n• **Manali** (Mar–Jun, Sep–Nov): Rohtang Pass, Solang Valley, paragliding\n• **Spiti Valley** (Jun–Sep): Remote desert mountain, monasteries — one of India's most dramatic routes\n• **Dharamshala/McLeod Ganj** (year-round): Tibetan culture, Dalai Lama temple, trek to Triund\n• **Bir Billing** (Apr–Jun, Sep–Nov): Paragliding capital of Asia!\n\n💡 Tip: Spiti Circuit (Manali–Kaza–Shimla) needs 7–10 days minimum`;
  }

  if (m.includes('food') || m.includes('cuisine') || m.includes('eat') || m.includes('dish')) {
    return `🍽️ **India's Must-Try Regional Foods:**\n\n• **Delhi**: Chole Bhature, Butter Chicken, Daulat ki Chaat\n• **Mumbai**: Vada Pav, Pav Bhaji, Misal Pav\n• **Kolkata**: Kathi Roll, Rasgulla, Kosha Mangsho\n• **Chennai**: Chettinad Biryani, Idli-Sambar, Filter Coffee\n• **Hyderabad**: Dum Biryani, Haleem, Irani Chai\n• **Lucknow**: Galouti Kebab, Nihari, Sheermal\n• **Rajasthan**: Dal Baati Churma, Laal Maas, Ghewar\n\n🌶️ Pro tip: Join a **local food walk** in any city for the most authentic experience!`;
  }

  if (m.includes('budget') || m.includes('cheap') || m.includes('affordable') || m.includes('₹')) {
    return `💰 **Budget Travel Tips for India:**\n\n• **Trains** are the cheapest and most scenic way to travel — book on IRCTC app\n• **Sleeper class** (SL) for overnight journeys saves a hotel night\n• **Dhabas** (roadside eateries) serve authentic food for ₹50–100 per meal\n• **Guesthouses and hostels** start at ₹400–800/night\n• **Government museums** have INR ₹10–50 entry fees\n• Travel **shoulder seasons** (Sep–Oct or Feb–Mar) for 20–40% lower prices\n\n📊 Daily budget levels:\n• Backpacker: ₹1,000–1,500/day\n• Moderate: ₹2,500–4,000/day\n• Premium: ₹7,000+/day`;
  }

  if (m.includes('best time') || m.includes('when to visit') || m.includes('season') || m.includes('weather') || m.includes('monsoon')) {
    return `📅 **Best Time to Visit India — By Region:**\n\n• **North India** (Rajasthan, Delhi, Agra): Oct–Mar (cool and pleasant)\n• **Kerala & South India**: Sep–Mar (post-monsoon, lush)\n• **Ladakh & Spiti**: Jun–Sep (roads open)\n• **Northeast India**: Oct–May (avoid monsoon)\n• **Goa & Beaches**: Nov–Feb (dry season)\n• **Himachal & Uttarakhand**: Mar–Jun and Sep–Nov\n\n☔ **Monsoon (Jul–Sep)**: Beautiful in Kerala, Meghalaya, and Coorg — but avoid Ladakh and desert regions`;
  }

  if (m.includes('northeast') || m.includes('meghalaya') || m.includes('assam') || m.includes('nagaland') || m.includes('arunachal') || m.includes('manipur') || m.includes('mizoram')) {
    return `🌿 **Northeast India** — India's best kept secret:\n\n• **Meghalaya**: Living root bridges, Dawki crystal river, Mawlynnong cleanest village, Nohkalikai Falls\n• **Assam**: Kaziranga (one-horned rhinos), Majuli river island, Kamakhya Temple\n• **Nagaland**: Hornbill Festival (Dec 1–10), Dzükou Valley trek\n• **Arunachal**: Tawang Monastery, Ziro Valley, Sela Pass\n\n📋 Important: Inner Line Permit (ILP) required for most Northeast states\n💡 Best time: Oct–May (avoid heavy monsoons)`;
  }

  if (m.includes('hello') || m.includes('hi') || m.includes('namaste') || m.includes('hey')) {
    return `🙏 Namaste! I'm your AI travel companion for **Trails of Bharat**.\n\nI can help you with:\n• 🗺️ **Destination recommendations**\n• 📅 **Best time to visit**\n• 💰 **Budget planning**\n• 🍽️ **Local food suggestions**\n• 🏕️ **Itinerary planning**\n• 🦁 **Wildlife safaris**\n\nWhat would you like to explore today?`;
  }

  if (m.includes('thank') || m.includes('thanks') || m.includes('awesome') || m.includes('great')) {
    return `😊 You're welcome! Happy to help you plan the perfect Indian adventure. Is there anything else you'd like to know?\n\n🌟 You can also:\n• Use our **AI Trip Planner** to get a full day-by-day itinerary\n• Browse **destinations** across all 29 states\n• Check out the **Marketplace** for authentic local products`;
  }

  if (m.includes('beach') || m.includes('coastal') || m.includes('sea') || m.includes('ocean')) {
    return `🏖️ **India's Best Beaches:**\n\n• **Goa** — Calangute, Anjuna, Palolem; best Nov–Feb\n• **Varkala, Kerala** — Dramatic red cliffs, sunset cafes\n• **Gokarna, Karnataka** — Om Beach, Half Moon Beach; quieter than Goa\n• **Andaman & Nicobar** — Radhanagar Beach (Asia's best); crystal waters\n• **Pondicherry** — French Riviera vibes, Auroville nearby\n• **Murudeshwar, Karnataka** — Beach + giant Shiva statue\n• **Vizag (Visakhapatnam)** — Rushikonda Beach + Araku Valley day trip\n\n🌊 **Best beach season:** Nov–Mar for all Indian coasts\n💡 Tip: South Goa and Gokarna are quieter and more budget-friendly than North Goa`;
  }

  if (m.includes('tamil') || m.includes('madurai') || m.includes('mahabalipuram') || m.includes('rameshwaram') || m.includes('kanyakumari') || m.includes('ooty') || m.includes('kodaikanal')) {
    return `🕌 **Tamil Nadu — Temple Trails & Hill Stations:**\n\n**Temples (Oct–Mar):**\n• **Madurai** — Meenakshi Amman Temple; 8 towering gopurams\n• **Mahabalipuram** — UNESCO shore temples on the Bay of Bengal\n• **Rameshwaram** — Sacred island; one of the four Hindu dhams\n• **Kanyakumari** — Land's end where 3 seas meet; sunrise/sunset spectacular\n\n**Hill Stations:**\n• **Ooty** — Nilgiri toy train, Botanical Garden, tea estates\n• **Kodaikanal** — Star-shaped lake, Pillar Rocks, silent valley\n\n🍽️ Must eat: Chettinad Biryani, Idli-Sambar, Filter Coffee, Jigarthanda\n📅 Best time: Oct–Mar (avoid Apr–Jun heat)`;
  }

  if (m.includes('hampi') || m.includes('karnataka') || m.includes('coorg') || m.includes('mysore') || m.includes('mysuru') || m.includes('chikmagalur')) {
    return `🗿 **Karnataka — Heritage & Nature:**\n\n• **Hampi** (Oct–Mar) — UNESCO ruins of Vijayanagara Empire; explore by bicycle\n• **Coorg/Kodagu** (Oct–Mar) — Scotland of India; coffee estates, Abbey Falls\n• **Mysuru** (Oct–Mar) — Illuminated Mysore Palace; best during Dasara festival\n• **Chikmagalur** (Sep–Mar) — Coffee country; Mullayanagiri peak (Karnataka's highest)\n• **Gokarna** (Oct–Mar) — Sacred temple town + pristine cliff beaches\n• **Hampi to Goa route** — One of India's most scenic road trips!\n\n🍽️ Must try: Bisi Bele Bath, Mysore Pak, Ragi Mudde, Filter Coffee\n💡 Hampi tip: Stay in Virupapur Gadde (across the river) for stunning views`;
  }

  if (m.includes('odisha') || m.includes('puri') || m.includes('konark') || m.includes('bhubaneswar') || m.includes('chilika')) {
    return `🏛️ **Odisha — India's Undiscovered Gem:**\n\n• **Bhubaneswar** — Temple city with 700+ ancient temples; Lingaraj Temple\n• **Puri** — Jagannath Temple (one of four Hindu dhams) + golden beach\n• **Konark Sun Temple** — UNESCO masterpiece shaped like the Sun God's chariot\n• **Chilika Lake** — Asia's largest lagoon; spot Irrawaddy dolphins and 1M+ migratory birds\n• **Raghurajpur** — Entire village of Pattachitra artists\n\n📅 Best time: Oct–Mar\n🎭 Rath Yatra festival (Jun–Jul) in Puri draws millions — spectacular but very crowded\n💡 Golden Triangle: Bhubaneswar + Puri + Konark in 3 days`;
  }

  if (m.includes('gujarat') || m.includes('rann') || m.includes('kutch') || m.includes('dwarka') || m.includes('somnath') || m.includes('ahmedabad')) {
    return `🏜️ **Gujarat — Land of Diversity:**\n\n• **Rann of Kutch** (Nov–Feb) — White salt desert; magical during Rann Utsav festival with folk music & crafts\n• **Statue of Unity** — World's tallest statue (182m) at Narmada River\n• **Dwarka & Somnath** — Two of India's most sacred pilgrimage sites on the Arabian Sea\n• **Ahmedabad** — India's first UNESCO Heritage City; Sabarmati Ashram; street food\n• **Gir National Park** — Earth's only Asiatic lions; Dec–Apr\n\n🍽️ Must eat: Dhokla, Thepla, Undhiyu, Fafda Jalebi, Gujarati Thali\n📅 Best time: Oct–Mar; Rann Utsav runs Nov–Feb\n💡 Combine Dwarka + Somnath + Gir in a 4-day pilgrimage-wildlife circuit`;
  }

  if (m.includes('uttarakhand') || m.includes('rishikesh') || m.includes('haridwar') || m.includes('nainital') || m.includes('mussoorie') || m.includes('auli') || m.includes('valley of flowers')) {
    return `⛰️ **Uttarakhand — Devbhoomi (Land of Gods):**\n\n**Adventure & Trekking:**\n• **Rishikesh** — White-water rafting Grade 3–5; bungee, zip-line; yoga capital\n• **Auli** — India's best ski resort; Jan–Mar for snow; Nanda Devi views\n• **Valley of Flowers** — UNESCO alpine meadow; open Jul–Sep only\n\n**Spiritual:**\n• **Haridwar** — Ganga Aarti at Har Ki Pauri; gateway to Char Dham\n• **Kedarnath & Badrinath** — Open May–Nov only\n\n**Hill Stations:**\n• **Mussoorie** — Mall Road, Kempty Falls; 290km from Delhi\n• **Nainital** — Naini Lake, Snow View; 310km from Delhi\n\n📅 Best time: Mar–Jun and Sep–Nov`;
  }

  if (m.includes('bihar') || m.includes('bodh gaya') || m.includes('bodhgaya') || m.includes('patna') || m.includes('nalanda')) {
    return `☸️ **Bihar — Buddhist & Ancient Heritage:**\n\n• **Bodh Gaya** — World's holiest Buddhist site; Mahabodhi Temple (UNESCO); Bodhi Tree where Buddha attained enlightenment\n• **Nalanda** (25km from Bodh Gaya) — Ancient university ruins; UNESCO World Heritage Site\n• **Patna** — Golghar granary; Patna Museum with 3rd-century Yakshi statue; gateway to all of Bihar\n• **Rajgir** — Hot springs + Vishwa Shanti Stupa; cable car ride\n• **Vaishali** — Where Buddha gave his last sermon\n\n📅 Best time: Oct–Mar\n🍽️ Must try: Litti Chokha, Sattu Paratha, Balushahi\n💡 Buddhist Circuit: Bodh Gaya → Nalanda → Rajgir → Vaishali`;
  }

  if (m.includes('book') || m.includes('train') || m.includes('irctc') || m.includes('flight') || m.includes('hotel') || m.includes('permit')) {
    return `📋 **Booking Tips for India Travel:**\n\n**Trains (IRCTC):**\n• Book 60–120 days in advance for popular routes\n• Tatkal quota opens 1 day before — costs extra but always available\n• Sleeper class (SL) is the most authentic and affordable overnight option\n\n**Flights:**\n• IndiGo, Air India, SpiceJet — book 3–6 weeks ahead for best fares\n• Avoid booking within 1 week of travel (prices spike 2–3x)\n\n**Permits Required:**\n• Ladakh restricted areas: Inner Line Permit\n• Sikkim & Northeast states: Inner Line Permit from state capital\n• Andaman: Port Blair permit on arrival for most nationalities\n\n**Hotels:**\n• Use MakeMyTrip or Booking.com for verified stays\n• Book heritage havelis in Rajasthan 2–3 months early for peak season\n\n📞 Our platform connects you directly with local guides — no middlemen!`;
  }

  // Default response
  return `I'm your AI travel guide for **Incredible India** 🇮🇳\n\nI can answer questions about:\n• Specific destinations (Rajasthan, Kerala, Ladakh, etc.)\n• Best time to visit and weather\n• Budget and travel tips\n• Food and cuisine recommendations\n• Wildlife safaris and national parks\n• Spiritual and cultural experiences\n\nTry asking: *"Best time to visit Kerala"* or *"Plan a 5-day trip to Rajasthan"* ✈️`;
};

/* ── Format bot text with bold and newlines ─────────────────────── */
const formatText = (text) => {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1
            ? <strong key={j} style={{ color: 'var(--text-heading)', fontWeight: 800 }}>{part}</strong>
            : <span key={j}>{part}</span>
        )}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! I am your AI travel companion for India 🇮🇳 Ask me about destinations, itineraries, local cuisine, best travel times, or budget tips.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput('');
    setMessages(p => [...p, { role: 'user', text: msg }]);
    setTyping(true);
    // Simulate AI thinking delay
    setTimeout(() => {
      setTyping(false);
      setMessages(p => [...p, { role: 'bot', text: smartResponse(msg) }]);
    }, 800 + Math.random() * 600);
  };

  const handleSuggestion = (s) => {
    setInput(s);
    send(s);
  };

  const clearChat = () => {
    setMessages([{ role: 'bot', text: 'Chat cleared! Ask me anything about traveling in India. 🇮🇳' }]);
  };

  return (
    <div className="chat-page">
      <div className="chat-container">

        {/* Header */}
        <motion.div style={{ textAlign: 'center', marginBottom: '2rem' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '1.25rem', background: 'linear-gradient(135deg,var(--primary),#8b5cf6)', boxShadow: '0 4px 16px rgba(99,102,241,.3)', marginBottom: '1rem' }}>
            <Bot size={28} color="#fff" />
          </div>
          <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.375rem' }}>AI Assistant</span>
          <h1 style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)', marginBottom: '0.5rem' }}>Travel Chatbot</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Powered by Trails of Bharat AI — Ask anything about Indian travel</p>
        </motion.div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((m, i) => (
            <motion.div key={i} className={`chat-bubble-wrap ${m.role === 'user' ? 'user' : ''}`}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="chat-avatar"
                style={{ background: m.role === 'bot' ? 'rgba(99,102,241,0.08)' : 'var(--text-heading)' }}>
                {m.role === 'bot'
                  ? <Bot size={18} color="var(--primary)" />
                  : <User size={18} color="#fff" />}
              </div>
              <div className={`chat-bubble ${m.role}`}>
                {m.role === 'bot' ? formatText(m.text) : m.text}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <motion.div className="chat-bubble-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="chat-avatar" style={{ background: 'rgba(99,102,241,0.08)' }}>
                <Bot size={18} color="var(--primary)" />
              </div>
              <div className="chat-bubble bot" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '5px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }}
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions (shown at start) */}
        {messages.length <= 1 && (
          <div className="chip-row" style={{ marginBottom: '1.25rem' }}>
            {suggestions.map((s) => (
              <button key={s} className="suggestion-chip" onClick={() => handleSuggestion(s)}>
                <Lightbulb size={13} /> {s}
              </button>
            ))}
          </div>
        )}

        {/* Input row */}
        <div className="chat-input-row">
          <button title="Clear chat" onClick={clearChat}
            style={{ padding: '1rem', borderRadius: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', transition: 'all .2s', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
            <RefreshCw size={16} />
          </button>
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !typing && send()}
            placeholder="Ask about Indian travel…"
            disabled={typing}
          />
          <button className="chat-send" onClick={() => send()} disabled={typing || !input.trim()}>
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;

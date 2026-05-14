import { motion } from 'framer-motion';
import { Send, Bot, User, Lightbulb } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const suggestions = [
  'Best time to visit Ladakh?',
  'Plan a 5-day Kerala trip',
  'Hidden gems in Rajasthan',
  'Budget tips for Goa',
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! I am your AI travel companion for India. Ask me anything about destinations, itineraries, local cuisine, or cultural tips.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((p) => [
      ...p,
      { role: 'user', text: input },
      { role: 'bot', text: 'Thanks for your question! I am currently in demo mode. Once connected to the backend, I will provide detailed travel recommendations and insights.' },
    ]);
    setInput('');
  };

  return (
    <div className="chat-page">
      <div className="chat-container">

        {/* Header */}
        <motion.div style={{ textAlign: 'center', marginBottom: '2rem' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Assistant</span>
          <h1 style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)', marginTop: '0.5rem' }}>Travel Chatbot</h1>
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
              <div className={`chat-bubble ${m.role}`}>{m.text}</div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="chip-row" style={{ marginBottom: '1.25rem' }}>
            {suggestions.map((s) => (
              <button key={s} className="suggestion-chip" onClick={() => setInput(s)}>
                <Lightbulb size={13} /> {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-row">
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask about Indian travel..."
          />
          <button className="chat-send" onClick={send}>
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;

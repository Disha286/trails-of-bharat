import fs from 'fs';
import path from 'path';

const file = path.resolve('./src/pages/Guides.jsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add imports and remove hardcoded guides
const hardcodedStart = `const guides = [`;
const hardcodedEnd = `];\n`;

const startIndex = content.indexOf(hardcodedStart);
const endIndex = content.indexOf(hardcodedEnd, startIndex) + hardcodedEnd.length;

// Keep `const guideTypes` downwards
const beforeGuides = content.substring(0, startIndex);
const afterGuides = content.substring(endIndex);

content = beforeGuides + afterGuides;

content = content.replace(
  "import { Link } from 'react-router-dom';",
  "import { Link } from 'react-router-dom';\nimport { getGuides } from '../services/guideService.js';\nimport { Loader2 } from 'lucide-react';"
);

// We need to add useEffect to the imports if it's missing. The top says: `import { useState } from 'react';`
content = content.replace(
  "import { useState } from 'react';",
  "import { useState, useEffect } from 'react';"
);


// 2. Add loading state and fetch logic
const originalLogic = `const Guides = () => {
  const [activeType, setActiveType] = useState('All');
  const [activeRegion, setActiveRegion] = useState('All Regions');
  const [query, setQuery] = useState('');

  const filtered = guides.filter(g => {`;

const newLogic = `const Guides = () => {
  const [activeType, setActiveType] = useState('All');
  const [activeRegion, setActiveRegion] = useState('All Regions');
  const [query, setQuery] = useState('');
  
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      setLoading(true);
      try {
        const data = await getGuides();
        setGuides(data);
        setError(null);
      } catch (err) {
        setError('Failed to load guides. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  const filtered = guides.filter(g => {`;

content = content.replace(originalLogic, newLogic);


// 3. Conditional rendering
const originalGridStart = `        {/* Count */}
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1.5rem' }}>
          Showing <strong style={{ color: 'var(--text-heading)' }}>{filtered.length}</strong> guides
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          <AnimatePresence>
            {filtered.map((g, i) => (`;

const newGridStart = `        {/* Count */}
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1.5rem' }}>
          Showing <strong style={{ color: 'var(--text-heading)' }}>{filtered.length}</strong> guides
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 0', color: 'var(--primary)' }}>
            <Loader2 className="animate-spin" size={48} style={{ marginBottom: '1rem' }} />
            <p style={{ fontWeight: 600 }}>Loading guides...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'rgba(239,68,68,0.1)', borderRadius: '1rem', border: '1px solid rgba(239,68,68,0.2)' }}>
            <p style={{ color: '#ef4444', fontWeight: 600, fontSize: '1.1rem' }}>{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
             <p style={{ color: 'var(--text-muted)' }}>No guides found.</p>
          </div>
        ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          <AnimatePresence>
            {filtered.map((g, i) => (`;

content = content.replace(originalGridStart, newGridStart);

// At the end of the grid:
const endPattern = `              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};`;

const newEndPattern = `              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        )}
      </div>
    </div>
  );
};`;

content = content.replace(endPattern, newEndPattern);

fs.writeFileSync(file, content);
console.log('Guides.jsx updated successfully.');

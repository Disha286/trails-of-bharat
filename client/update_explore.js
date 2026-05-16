import fs from 'fs';
import path from 'path';

const file = path.resolve('./src/pages/Explore.jsx');
let content = fs.readFileSync(file, 'utf8');

// Replace imports
content = content.replace(
  "import { destinations, categories, states } from '../data/destinations';",
  "import { categories, states } from '../data/destinations.js';\nimport { getDestinations } from '../services/destinationService.js';\nimport { Loader2 } from 'lucide-react';"
);

// Add loading state variables and fetch logic
const originalLogic = `  // Sync filters when Navbar links change URL params (SPA navigation)
  useEffect(() => {
    const cat = searchParams.get('cat');
    const q   = searchParams.get('q');
    if (cat) setActiveCat(cat);
    if (q)   setQuery(q);
  }, [searchParams]);

  const filtered = useMemo(() => destinations.filter(d => {
    if (query && !d.name.toLowerCase().includes(query.toLowerCase()) && !d.state.toLowerCase().includes(query.toLowerCase()) && !d.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))) return false;
    if (activeCat !== 'all' && d.category.toLowerCase() !== categories.find(c => c.id === activeCat)?.label.toLowerCase()) return false;
    if (activeState !== 'All States' && d.state !== activeState) return false;
    if (activeBudget !== 'all' && d.budget !== activeBudget) return false;
    if (d.rating < minRating) return false;
    return true;
  }), [query, activeCat, activeState, activeBudget, minRating]);`;

const newLogic = `  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync filters when Navbar links change URL params (SPA navigation)
  useEffect(() => {
    const cat = searchParams.get('cat');
    const q   = searchParams.get('q');
    if (cat) setActiveCat(cat);
    if (q)   setQuery(q);
  }, [searchParams]);

  // Fetch data from backend when filters change
  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const data = await getDestinations({
          category: activeCat,
          state: activeState,
          q: query,
          budget: activeBudget,
        });
        const finalData = data.filter(d => d.rating >= minRating);
        setDestinations(finalData);
        setError(null);
      } catch (err) {
        setError('Failed to load destinations. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, [query, activeCat, activeState, activeBudget, minRating]);

  const filtered = destinations;`;

content = content.replace(originalLogic, newLogic);

// Replace content rendering area
const originalRenderStart = `            {/* ── MAP VIEW ── */}
            {viewMode === 'map' && (`;

const newRenderStart = `            {/* ── CONTENT VIEW ── */}
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 0', color: 'var(--primary)' }}>
                <Loader2 className="animate-spin" size={48} style={{ marginBottom: '1rem' }} />
                <p style={{ fontWeight: 600 }}>Loading destinations...</p>
              </div>
            ) : error ? (
              <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'rgba(239,68,68,0.1)', borderRadius: '1rem', border: '1px solid rgba(239,68,68,0.2)' }}>
                <p style={{ color: '#ef4444', fontWeight: 600, fontSize: '1.1rem' }}>{error}</p>
              </div>
            ) : (
              <>
                {/* ── MAP VIEW ── */}
                {viewMode === 'map' && (`;

content = content.replace(originalRenderStart, newRenderStart);

// At the very end of the component, we need to close the empty fragment.
// The end of the grid view looks like this:
const endPattern = `                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );`;

const newEndPattern = `                    ))}
                  </div>
                )}
              </>
            )}
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );`;

content = content.replace(endPattern, newEndPattern);

fs.writeFileSync(file, content);
console.log('Explore.jsx updated successfully.');

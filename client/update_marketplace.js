import fs from 'fs';
import path from 'path';

const file = path.resolve('./src/pages/Marketplace.jsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Replace imports
content = content.replace(
  "import { products, productCategories } from '../data/products';",
  "import { productCategories } from '../data/products.js';\nimport { getProducts } from '../services/productService.js';\nimport { Loader2 } from 'lucide-react';"
);

content = content.replace(
  "import { Heart, ShoppingCart, Star, MapPin, Search, X, Plus, Minus, Trash2, ArrowRight, Package } from 'lucide-react';",
  "import { Heart, ShoppingCart, Star, MapPin, Search, X, Plus, Minus, Trash2, ArrowRight, Package, Loader2 } from 'lucide-react';"
);
content = content.replace(
  "import { productCategories } from '../data/products.js';\nimport { getProducts } from '../services/productService.js';\nimport { Loader2 } from 'lucide-react';",
  "import { productCategories } from '../data/products.js';\nimport { getProducts } from '../services/productService.js';"
);

// We need to add useEffect to the imports if it's missing. The top says: `import { useState } from 'react';`
content = content.replace(
  "import { useState } from 'react';",
  "import { useState, useEffect } from 'react';"
);


// 2. Add loading state and fetch logic
const originalLogic = `  const [cart, setCart]         = useState([]); // [{ id, name, price, img, state, category, qty }]
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = products.filter(p => {`;

const newLogic = `  const [cart, setCart]         = useState([]); // [{ id, name, price, img, state, category, qty }]
  const [cartOpen, setCartOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter(p => {`;

content = content.replace(originalLogic, newLogic);


// 3. Conditional rendering
const originalGridStart = `        {/* Product grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.75rem' }}>
          <AnimatePresence>
            {filtered.map((p, i) => (`;

const newGridStart = `        {/* Product grid */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 0', color: 'var(--primary)' }}>
            <Loader2 className="animate-spin" size={48} style={{ marginBottom: '1rem' }} />
            <p style={{ fontWeight: 600 }}>Loading marketplace...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'rgba(239,68,68,0.1)', borderRadius: '1rem', border: '1px solid rgba(239,68,68,0.2)' }}>
            <p style={{ color: '#ef4444', fontWeight: 600, fontSize: '1.1rem' }}>{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
             <p style={{ color: 'var(--text-muted)' }}>No products found.</p>
          </div>
        ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.75rem' }}>
          <AnimatePresence>
            {filtered.map((p, i) => (`;

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
console.log('Marketplace.jsx updated successfully.');

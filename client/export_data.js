import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { destinations } from './src/data/destinations.js';
import { products } from './src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../server/data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'destinations.json'), JSON.stringify(destinations, null, 2));
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));

console.log('Successfully exported frontend data to server/data/ JSON files.');

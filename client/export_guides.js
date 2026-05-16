import fs from 'fs';
import path from 'path';

const file = path.resolve('./src/pages/Guides.jsx');
let content = fs.readFileSync(file, 'utf8');

const start = content.indexOf('const guides = [');
const end = content.indexOf('];\n', start) + 2;

const arrayText = content.substring(start, end).replace('const guides = ', '');

// We can safely eval this string because we know exactly what it is.
const guides = eval(arrayText);

fs.writeFileSync(path.resolve('../server/data/guides.json'), JSON.stringify(guides, null, 2));
console.log('guides.json exported successfully!');

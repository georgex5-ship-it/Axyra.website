// Copies the admin panel (Sveltia CMS) from node_modules into public/login/cms/
// so it is served from your own site (no external CDN). Runs automatically before build/dev.
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const src = path.join(root, 'node_modules/@sveltia/cms/dist');
const dest = path.join(root, 'public/login/cms');
if (!fs.existsSync(src)) { console.warn('⚠ Sveltia CMS not installed — run npm install'); process.exit(0); }
fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true, filter: (f) => !f.endsWith('.map') });
console.log('• Admin panel files copied to public/login/cms/');

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy brand assets
const brandSrc = path.join(__dirname, 'public', 'brand');
const brandDest = path.join(distDir, 'brand');
if (fs.existsSync(brandSrc)) {
  if (!fs.existsSync(brandDest)) {
    fs.mkdirSync(brandDest, { recursive: true });
  }
  const files = fs.readdirSync(brandSrc);
  for (const file of files) {
    fs.copyFileSync(path.join(brandSrc, file), path.join(brandDest, file));
  }
}

// Copy index.html to dist/index.html
const indexSrc = path.join(__dirname, 'index.html');
const indexDest = path.join(distDir, 'index.html');
if (fs.existsSync(indexSrc)) {
  fs.copyFileSync(indexSrc, indexDest);
}

console.log('✅ PolarisERP distribution successfully built into dist/index.html AND root index.html');

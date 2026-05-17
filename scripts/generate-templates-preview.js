const sharp = require('sharp');
const path = require('path');

const svgImage = `
<svg width="1200" height="548" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1e3a5f;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="548" fill="url(#bgGrad)"/>
  
  <!-- Pattern grid -->
  <g stroke="rgba(59, 130, 246, 0.08)" stroke-width="1" opacity="0.5">
    <line x1="0" y1="0" x2="1200" y2="0"/>
    <line x1="0" y1="50" x2="1200" y2="50"/>
    <line x1="0" y1="100" x2="1200" y2="100"/>
    <line x1="0" y1="150" x2="1200" y2="150"/>
    <line x1="0" y1="200" x2="1200" y2="200"/>
    <line x1="0" y1="250" x2="1200" y2="250"/>
    <line x1="0" y1="300" x2="1200" y2="300"/>
    <line x1="0" y1="350" x2="1200" y2="350"/>
    <line x1="0" y1="400" x2="1200" y2="400"/>
    <line x1="0" y1="450" x2="1200" y2="450"/>
    <line x1="0" y1="500" x2="1200" y2="500"/>
  </g>
  
  <!-- Border -->
  <rect x="1" y="1" width="1198" height="546" fill="none" stroke="rgba(59, 130, 246, 0.2)" stroke-width="2"/>
  
  <!-- TEMPLATES Badge (top right) -->
  <rect x="1000" y="30" width="120" height="40" rx="20" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 0.5)" stroke-width="1"/>
  <text x="1060" y="57" font-size="12" font-weight="bold" fill="#3b82f6" text-anchor="middle" font-family="Arial, sans-serif">TEMPLATES</text>
  
  <!-- Main heading -->
  <text x="80" y="180" font-size="52" font-weight="bold" fill="#ffffff" font-family="Arial, sans-serif">Premium Next.js Templates</text>
  <text x="80" y="260" font-size="52" font-weight="bold" fill="#ffffff" font-family="Arial, sans-serif">&amp; Expert Development</text>
  
  <!-- Subheading -->
  <text x="80" y="330" font-size="16" fill="rgba(255, 255, 255, 0.7)" font-family="Arial, sans-serif">Accelerate your project with our high-quality Next.js + Supabase templates</text>
  
  <!-- Browse Templates Button -->
  <rect x="80" y="370" width="180" height="50" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="rgba(59, 130, 246, 0.5)" stroke-width="1"/>
  <text x="170" y="405" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="Arial, sans-serif">Browse Templates</text>
  
  <!-- Decorative circle (right) -->
  <circle cx="1050" cy="274" r="180" fill="rgba(59, 130, 246, 0.05)"/>
</svg>
`;

const output = path.join(__dirname, '..', 'public', 'images', 'templates-shop-preview.png');

(async () => {
  try {
    await sharp(Buffer.from(svgImage))
      .png()
      .toFile(output);
    console.log('✅ Templates Shop preview image created:', output);
    console.log('📐 Size: 1200 x 548');
  } catch (error) {
    console.error('❌ Error creating image:', error.message);
    process.exit(1);
  }
})();

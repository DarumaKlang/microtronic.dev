const sharp = require('sharp');
const path = require('path');

const size = 1024;

const svgImage = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1e3a5f;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="url(#bgGrad)"/>
  
  <!-- Pattern grid -->
  <g stroke="rgba(59, 130, 246, 0.08)" stroke-width="1" opacity="0.5">
    ${Array.from({length: 21}, (_, i) => `<line x1="${i*50}" y1="0" x2="${i*50}" y2="${size}"/>`).join('')}
    ${Array.from({length: 21}, (_, i) => `<line x1="0" y1="${i*50}" x2="${size}" y2="${i*50}"/>`).join('')}
  </g>
  
  <!-- Border -->
  <rect x="1" y="1" width="${size-2}" height="${size-2}" fill="none" stroke="rgba(59, 130, 246, 0.2)" stroke-width="2"/>
  
  <!-- TEMPLATES Badge (top right) -->
  <rect x="${size-220}" y="50" width="150" height="50" rx="25" fill="rgba(59, 130, 246, 0.25)" stroke="rgba(59, 130, 246, 0.6)" stroke-width="2"/>
  <text x="${size-145}" y="85" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle" font-family="Arial, sans-serif">TEMPLATES</text>
  
  <!-- Main heading -->
  <text x="60" y="240" font-size="64" font-weight="bold" fill="#ffffff" font-family="Arial, sans-serif">Premium</text>
  <text x="60" y="330" font-size="64" font-weight="bold" fill="#ffffff" font-family="Arial, sans-serif">Next.js</text>
  <text x="60" y="420" font-size="64" font-weight="bold" fill="#ffffff" font-family="Arial, sans-serif">Templates</text>
  
  <!-- Subheading -->
  <text x="60" y="480" font-size="18" fill="rgba(255, 255, 255, 0.75)" font-family="Arial, sans-serif">&amp; Expert Development</text>
  
  <!-- Browse Templates Button -->
  <rect x="60" y="550" width="220" height="60" rx="12" fill="rgba(59, 130, 246, 0.3)" stroke="rgba(59, 130, 246, 0.6)" stroke-width="2"/>
  <text x="170" y="595" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="Arial, sans-serif">Browse Templates</text>
  
  <!-- Decorative circles -->
  <circle cx="${size-150}" cy="300" r="200" fill="rgba(59, 130, 246, 0.05)"/>
  <circle cx="${size-100}" cy="700" r="150" fill="rgba(168, 85, 247, 0.03)"/>
  
  <!-- Tech stack icons area -->
  <g opacity="0.3">
    <rect x="60" y="700" width="50" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)"/>
    <text x="95" y="730" font-size="28" text-anchor="middle" font-family="Arial, sans-serif">⚡</text>
    
    <rect x="140" y="700" width="50" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)"/>
    <text x="175" y="730" font-size="28" text-anchor="middle" font-family="Arial, sans-serif">🚀</text>
    
    <rect x="220" y="700" width="50" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)"/>
    <text x="255" y="730" font-size="28" text-anchor="middle" font-family="Arial, sans-serif">💎</text>
  </g>
</svg>
`;

const output = path.join(__dirname, '..', 'public', 'images', 'templates-shop-square.png');

(async () => {
  try {
    await sharp(Buffer.from(svgImage))
      .png()
      .toFile(output);
    console.log('✅ Templates Shop square image created:', output);
    console.log('📐 Size: ' + size + ' x ' + size);
  } catch (error) {
    console.error('❌ Error creating image:', error.message);
    process.exit(1);
  }
})();

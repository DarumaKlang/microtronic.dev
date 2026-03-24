const sharp = require('sharp');
const fs = require('fs');

const svgBuffer = fs.readFileSync('public/images/cyberpunk-logo.svg');

sharp(svgBuffer)
  .jpeg()
  .toFile('public/images/cyberpunk-logo.jpg')
  .then(() => console.log('Converted to JPG'))
  .catch(err => console.error(err));
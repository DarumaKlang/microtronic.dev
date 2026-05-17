const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, '..', 'public', 'images', 'image.png');
const output = path.join(__dirname, '..', 'public', 'images', 'image-resized.png');

(async () => {
  try {
    const metadata = await sharp(input).metadata();
    console.log('Original size:', metadata.width, 'x', metadata.height);

    // ค่าใหม่: ย่อความกว้างลงด้วย aspect ratio เดิม
    const newWidth = Math.min(1200, metadata.width);
    const newHeight = Math.round((newWidth / metadata.width) * metadata.height);

    await sharp(input)
      .resize(newWidth, newHeight, { fit: 'inside', withoutEnlargement: true })
      .toFile(output);

    console.log('Resized image written to', output);
    console.log('New size:', newWidth, 'x', newHeight);
  } catch (error) {
    console.error('Resize failed:', error);
    process.exit(1);
  }
})();
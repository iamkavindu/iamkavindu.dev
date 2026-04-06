import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const sizes = [256, 384, 512, 640, 768, 1024, 1280];
const quality = 85;

function findImages(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findImages(fullPath));
    } else if (/\.(png|jpe?g)$/i.test(entry.name) && !/-\d+w-q\d+\.webp$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function convertToWebP() {
  try {
    const images = findImages(publicDir);

    for (const inputFile of images) {
      const relPath = path.relative(publicDir, inputFile);
      const ext = path.extname(inputFile);
      const baseName = inputFile.replace(ext, '');

      for (const width of sizes) {
        const outputFile = `${baseName}-${width}w-q${quality}.webp`;
        if (!fs.existsSync(outputFile)) {
          await sharp(inputFile)
            .resize(width, undefined, { withoutEnlargement: true })
            .webp({ quality })
            .toFile(outputFile);
        }
      }
      console.log(`Converted: ${relPath}`);
    }

    console.log('Successfully converted all images to WebP');
  } catch (error) {
    console.error('Error converting images:', error);
  }
}

convertToWebP();
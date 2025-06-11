const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// source folder
const inputDir = path.join(__dirname, 'src/assets/images/original');

// output folder
const outputDir = {
  thumbnail: path.join(__dirname, 'src/assets/images/thumbnails'),
  webp: path.join(__dirname, 'src/assets/images/webp'),
};

// verify if folder exists, if not, create it
Object.values(outputDir).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// create thumbnail
const createThumbnail = async (imagePath) => {
  const outputPath = path.join(outputDir.thumbnail, path.basename(imagePath));

  await sharp(imagePath)
    .resize(500, 500) // thumbnail size
    .toFile(outputPath);
  
  console.log(`Thumbnail created: ${outputPath}`);
};

// create webp
const createWebP = async (imagePath) => {
    const outputPath = path.join(outputDir.webp, path.basename(imagePath, path.extname(imagePath)) + '.webp');
  
    await sharp(imagePath)
      .webp({ quality: 80 })  // WebP quality
      .toFile(outputPath);
  
    console.log(`Image WebP created: ${outputPath}`);
};

const processImages = async () => {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const imagePath = path.join(inputDir, file);
    try {
      await createThumbnail(imagePath);
      await createWebP(imagePath);
    } catch (err) {
      console.error(`Error procesando ${file}:`, err);
    }
  }

};

processImages();

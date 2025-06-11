const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const inputDir = path.join(__dirname, 'src/assets/videos/preview');
const outputDir = path.join(__dirname, 'src/assets/videos/thumbnails');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const resizeVideo = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    // set scale
    // const cmd = `ffmpeg -i "${inputPath}" -vf "scale=500:500:force_original_aspect_ratio=decrease,pad=500:500:(ow-iw)/2:(oh-ih)/2" -c:a copy "${outputPath}" -y`;

    // crop size
    const cmd = `ffmpeg -i "${inputPath}" -vf "crop='min(iw,ih)':'min(iw,ih)',scale=500:500" -c:a copy "${outputPath}" -y`;

    
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error processing ${inputPath}:`, error);
        reject(error);
      } else {
        console.log(`✅ Resized video: ${outputPath}`);
        resolve();
      }
    });
  });
};

const processVideos = async () => {
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.mp4'));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);

    const baseName = file.replace(/^preview-/, '');

    const outputPath = path.join(outputDir, `thumb-${baseName}`);
    await resizeVideo(inputPath, outputPath);
  }
};

processVideos()
  .then(() => console.log('🎉 All videos have been resized'))
  .catch(err => console.error('❌ There was an error:', err));

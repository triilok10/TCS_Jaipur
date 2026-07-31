const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const jobs = [
  {
    input: 'tcs-profile.jpg',
    output: 'tcs-profile.webp',
    width: 600,
    height: 600,
    fit: 'cover',
    quality: 70,
  },
  {
    input: 'bharat-dreamin-1.jpg',
    output: 'bharat-dreamin-1.webp',
    width: 820,
    quality: 70,
  },
  {
    input: 'bharat-dreamin-2.jpg',
    output: 'bharat-dreamin-2.webp',
    width: 820,
    quality: 70,
  },
];

(async () => {
  for (const job of jobs) {
    const inputPath = path.join(publicDir, job.input);
    const outputPath = path.join(publicDir, job.output);
    if (!fs.existsSync(inputPath)) {
      console.error(`Missing source: ${inputPath}`);
      continue;
    }

    let pipeline = sharp(inputPath).webp({ quality: job.quality, effort: 6 });
    if (job.width && job.height) {
      pipeline = pipeline.resize(job.width, job.height, { fit: job.fit || 'cover' });
    } else if (job.width) {
      pipeline = pipeline.resize(job.width, null, { withoutEnlargement: true });
    }

    await pipeline.toFile(outputPath);
    const { size } = fs.statSync(outputPath);
    console.log(`${job.output}: ${size} bytes`);
  }
})();

const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default; // ← This is key!

const baselineDir = 'screenshots/baseline';
const currentDir = 'screenshots';
const diffDir = 'screenshots/diff';

const threshold = 0.1;

fs.mkdirSync(diffDir, { recursive: true });

fs.readdirSync(baselineDir).forEach(file => {
  if (path.extname(file) !== '.png') return;

  const baselinePath = path.join(baselineDir, file);
  const currentPath = path.join(currentDir, file);
  const diffPath = path.join(diffDir, 'diff-' + file);

  if (!fs.existsSync(currentPath)) {
    console.warn(`⚠️  No current screenshot for ${file}, skipping`);
    return;
  }

  const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
  const img2 = PNG.sync.read(fs.readFileSync(currentPath));

  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold });

  if (numDiffPixels > 0) {
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    console.error(`❗ Visual regression detected in ${file} (${numDiffPixels} pixels differ). See ${diffPath}`);
  } else {
    console.log(`✅ ${file} matched baseline.`);
  }
});


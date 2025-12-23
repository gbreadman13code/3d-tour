
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const TILE_SIZE = 512;
const PREVIEW_WIDTH = 1024; // Width for the low-res preview
const OUTPUT_BASE_DIR = path.join(process.cwd(), 'public', 'assets', 'tiles');

// Helper to ensure directory exists
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

async function processImage(inputPath) {
    const filename = path.basename(inputPath, path.extname(inputPath));
    const outputDir = path.join(OUTPUT_BASE_DIR, filename);
    
    console.log(`Processing ${filename}...`);
    ensureDir(outputDir);

    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const { width, height } = metadata;

    if (!width || !height) {
        console.error(`Could not read metadata for ${inputPath}`);
        return;
    }

    // 1. Generate Low-Res Preview
    const previewPath = path.join(outputDir, 'preview.jpg');
    await image
        .clone()
        .resize(PREVIEW_WIDTH)
        .jpeg({ quality: 80 })
        .toFile(previewPath);
    console.log(`  Generated preview: ${previewPath}`);

    // 2. Generate Tiles
    const cols = Math.ceil(width / TILE_SIZE);
    const rows = Math.ceil(height / TILE_SIZE);

    console.log(`  Grid: ${cols} cols x ${rows} rows (Total ${cols * rows} tiles)`);

    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const left = c * TILE_SIZE;
            const top = r * TILE_SIZE;
            const tileWidth = Math.min(TILE_SIZE, width - left);
            const tileHeight = Math.min(TILE_SIZE, height - top);

            const tileName = `tile_${c}_${r}.jpg`;
            const tilePath = path.join(outputDir, tileName);

            await image
                .clone()
                .extract({ left, top, width: tileWidth, height: tileHeight })
                .jpeg({ quality: 85 })
                .toFile(tilePath);
            
            count++;
            // Optional: minimal progress log
            // process.stdout.write('.'); 
        }
    }
    
    console.log(`\n  ✅ Generated ${count} tiles for ${filename}`);
    
    // Output configuration snippet for ease of use
    console.log(`
  Add this to your tour-config.ts for scene '${filename}':
  
  panorama: {
    width: ${width},
    cols: ${cols},
    rows: ${rows},
    baseUrl: \`assets/tiles/${filename}/preview.jpg\`,
    tileUrl: (col, row) => \`assets/tiles/${filename}/tile_\${col}_\${row}.jpg\`,
  }
    `);
}

// Main execution
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('Usage: node scripts/generate-tiles.js <path-to-image> [path-to-image-2 ...]');
    process.exit(1);
}

(async () => {
    for (const arg of args) {
        await processImage(arg);
    }
})();

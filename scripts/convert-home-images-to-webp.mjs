import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.resolve(__dirname, "../src/assets/Home images");

const files = fs
  .readdirSync(inputDir)
  .filter((f) => /\.png$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (files.length === 0) {
  console.error("No .png files found in", inputDir);
  process.exit(1);
}

let totalIn = 0;
let totalOut = 0;

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(inputDir, file.replace(/\.png$/i, ".webp"));

  const inputStat = fs.statSync(inputPath);
  totalIn += inputStat.size;

  await sharp(inputPath)
    .webp({
      quality: 94,
      effort: 5,
      smartSubsample: false,
      nearLossless: false,
    })
    .toFile(outputPath);

  const outputStat = fs.statSync(outputPath);
  totalOut += outputStat.size;

  console.log(
    `${file} → ${path.basename(outputPath)} (${(inputStat.size / 1024).toFixed(0)}KB → ${(outputStat.size / 1024).toFixed(0)}KB)`,
  );
}

console.log(
  `\nConverted ${files.length} images. Total: ${(totalIn / 1024 / 1024).toFixed(2)}MB → ${(totalOut / 1024 / 1024).toFixed(2)}MB`,
);

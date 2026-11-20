import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const sourceDir = process.env.MAKEFUN_BOT_DIR ?? import.meta.dirname;
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(sourceDir, 'POST.json');
const json = readFileSync(sourcePath, 'utf8');
try {
  JSON.parse(json);
} catch (cause) {
  throw new Error(`Invalid JSON in ${sourcePath}`, { cause });
}

mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, 'POST.json');
copyFileSync(sourcePath, outputPath);

const sourceBytes = readFileSync(sourcePath);
const outputBytes = readFileSync(outputPath);
if (!sourceBytes.equals(outputBytes)) {
  throw new Error(`Copy verification failed: ${outputPath} differs from ${sourcePath}`);
}

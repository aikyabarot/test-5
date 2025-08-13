import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';

const ROOT = process.cwd();
const outDir = path.join(ROOT, 'file-agent');
await fs.mkdir(outDir, { recursive: true });

const MAX_FILES = 3000;

const ignoreList = (process.env.FILE_AGENT_IGNORE || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

function isIgnored(rel) {
  const segs = rel.split(/[\\/]/);
  return segs.some(seg => ignoreList.includes(seg));
}

async function walk(dir, base, list) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name));
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(base, full);
    if (isIgnored(rel)) continue;
    if (e.isDirectory()) {
      await walk(full, base, list);
    } else if (e.isFile()) {
      list.push(rel);
      if (list.length >= MAX_FILES) return;
    }
  }
}

const inputPath = process.argv[2] || 'src';
const baseDir = path.resolve(ROOT, inputPath);
let files = [];
let exists = false;

try {
  const st = await fs.stat(baseDir);
  exists = st.isDirectory();
} catch {}

if (exists) {
  await walk(baseDir, baseDir, files);
}

const sha = process.env.GITHUB_SHA || '';
const relBase = path.relative(ROOT, baseDir) || '.';
const header = `File listing for "${relBase}" at ${sha ? `commit ${sha}` : 'current checkout'}`;

let md = `# ${header}\n\n`;
if (!exists) {
  md += `Path not found or not a directory: ${relBase}\n`;
} else if (files.length === 0) {
  md += `No files found.\n`;
} else {
  md += `Total files: ${files.length}${files.length >= MAX_FILES ? ' (truncated)' : ''}\n\n`;
  for (const f of files) {
    md += `- ${path.join(relBase, f)}\n`;
  }
}

await fs.writeFile(path.join(outDir, 'listing.md'), md, 'utf8');
await fs.writeFile(path.join(outDir, 'listing.json'), JSON.stringify({ base: relBase, sha, files, truncated: files.length >= MAX_FILES }, null, 2), 'utf8');
console.log(`Wrote file list to ${path.join(outDir, 'listing.md')}`);
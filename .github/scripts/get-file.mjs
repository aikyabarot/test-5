import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';

const ROOT = process.cwd();
const outDir = path.join(ROOT, 'file-agent');
await fs.mkdir(outDir, { recursive: true });

const MAX_BYTES = 300 * 1024; // 300KB safety cap

const fileArg = process.argv[2];
if (!fileArg) {
  console.error('Usage: node .github/scripts/get-file.mjs <path/to/file>');
  process.exit(1);
}
const target = path.resolve(ROOT, fileArg);

let buf;
try {
  const st = await fs.stat(target);
  if (!st.isFile()) {
    throw new Error('Not a regular file');
  }
  if (st.size > MAX_BYTES) {
    const msg = `File too large to display inline (${st.size} bytes > ${MAX_BYTES} bytes cap).`;
    await fs.writeFile(path.join(outDir, 'file.md'), `### ${fileArg}\n\n${msg}\n\nDownload the artifact "file-agent-output" to view the file.`, 'utf8');
    console.log(msg);
    process.exit(0);
  }
  buf = await fs.readFile(target);
} catch (e) {
  await fs.writeFile(path.join(outDir, 'file.md'), `### ${fileArg}\n\nError reading file: ${e.message}`, 'utf8');
  console.error(`Error: ${e.message}`);
  process.exit(0);
}

function looksBinary(buffer) {
  const len = Math.min(buffer.length, 4096);
  let ctrl = 0;
  for (let i = 0; i < len; i++) {
    const c = buffer[i];
    if (c === 0) return true;
    if (c < 7 || (c > 14 && c < 32)) ctrl++;
  }
  return ctrl / len > 0.1;
}

function guessLang(file) {
  const ext = path.extname(file).toLowerCase();
  const map = {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.js': 'js',
    '.jsx': 'jsx',
    '.json': 'json',
    '.md': 'md',
    '.css': 'css',
    '.scss': 'scss',
    '.html': 'html',
    '.yml': 'yaml',
    '.yaml': 'yaml',
    '.sh': 'bash',
    '.py': 'python',
    '.go': 'go',
    '.rs': 'rust',
    '.java': 'java',
    '.cs': 'csharp',
    '.cpp': 'cpp',
    '.c': 'c',
    '.h': 'c',
    '.rb': 'ruby',
    '.php': 'php',
    '.kt': 'kotlin',
    '.swift': 'swift',
    '.sql': 'sql',
    '.xml': 'xml',
    '.ini': 'ini',
    '.env': 'ini',
    '.txt': ''
  };
  return map[ext] ?? '';
}

let md = `### ${fileArg}\n\n`;
if (looksBinary(buf)) {
  md += `Binary file detected; not displayed inline. Download the artifact "file-agent-output" for the file contents.\n`;
} else {
  const lang = guessLang(fileArg);
  const content = buf.toString('utf8');
  md += '```' + (lang ? lang : '') + '\n';
  md += content.replace(/```/g, '\\`\\`\\`');
  md += '\n```\n';
}
await fs.writeFile(path.join(outDir, 'file.md'), md, 'utf8');
console.log(`Wrote file preview to ${path.join(outDir, 'file.md')}`);
import path from 'path';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import shiki from 'shiki';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourcePath = path.resolve(__dirname, '../client/routes/guide/sample.java');
const targetPath = path.resolve(__dirname, '../public/sample.html');

const source = await readFile(sourcePath, { encoding: 'utf8' });

const highlighter = await shiki.getHighlighter({ theme: 'github-dark' });

let html = highlighter.codeToHtml(source, 'java');
html = html.replace('<pre class="shiki" style="background-color: #24292e"><code>', '');
html = html.replace('</code></pre>', '');
html = html.replace(/^<span class="line">/gm, '');
html = html.replace(/<\/span>$/gm, '');

await writeFile(targetPath, html);

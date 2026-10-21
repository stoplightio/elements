const fs = require('fs');
const http = require('http');
const path = require('path');

const root = __dirname;
const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html' };

const pages = fs
  .readdirSync(root, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && entry.name !== 'node_modules')
  .map(entry => entry.name);

function resolveFile(urlPath) {
  const [, first, ...rest] = urlPath.split('/');
  if (first === '') return 'index.html';
  if (first === 'modules') return path.join('node_modules', ...rest);
  if (pages.includes(first)) return path.join(first, 'index.html');
  return null;
}

http
  .createServer((req, res) => {
    const file = resolveFile(decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    const fullPath = file && path.join(root, file);

    // refuse anything that escapes the example directory
    if (!fullPath || !fullPath.startsWith(root + path.sep) || !fs.existsSync(fullPath)) {
      res.writeHead(404).end('Not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': types[path.extname(fullPath)] || 'application/octet-stream' });
    fs.createReadStream(fullPath).pipe(res);
  })
  .listen(4200, () => console.log('Listening on 4200'));

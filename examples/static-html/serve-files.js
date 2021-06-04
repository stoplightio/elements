const fs = require('fs');
const http = require('http');
const path = require('path');

http
  .createServer((req, res) => {
    fs.readFile(__dirname + req.url, (err, data) => {
      if (err) {
        res.writeHead(404);
        serveFallback(req, res);
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  })
  .listen(4200);

const directoryList = fs
  .readdirSync('.', { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);

function serveFallback(req, res) {
  const folderName = req.url.split('/')[1];
  if (folderName && !directoryList.includes(folderName)) {
    res.writeHead(404);
    res.end();
    return;
  }
  const indexHtml = path.join(__dirname, folderName, 'index.html');
  console.log(indexHtml);
  fs.readFile(indexHtml, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}

console.log('Listening on 4200');

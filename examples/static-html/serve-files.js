const fs = require('fs');
const express = require('express');
const path = require('path');

const directoryList = fs
  .readdirSync('.', { withFileTypes: true })
  .filter(entry => entry.isDirectory() && entry.name !== 'node_modules')
  .map(entry => entry.name);

const app = express();
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/modules/:modulePath(*)', (req, res) => {
  res.sendFile(path.join('node_modules', req.params.modulePath), { root: __dirname });
});

for (const dir of directoryList) {
  app.get([`/${dir}`, `/${dir}/*`], (req, res) => {
    res.sendFile(`${dir}/index.html`, { root: __dirname });
  });
}

app.listen(4200, () => {
  console.log('Listening on 4200');
});

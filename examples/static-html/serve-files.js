const fs = require('fs');
const express = require('express');

const directoryList = fs
  .readdirSync('.', { withFileTypes: true })
  .filter(entry => entry.isDirectory() && entry.name !== 'node_modules')
  .map(entry => entry.name);

const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

for (const dir of directoryList) {
  app.get([`/${dir}`, `/${dir}/*`], (req, res) => {
    res.sendFile(`${dir}/index.html`, { root: __dirname });
  });
}

app.listen(4200, () => {
  console.log('Listening on 4200');
});

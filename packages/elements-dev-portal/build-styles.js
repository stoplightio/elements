const { render } = require('node-sass');
const { resolve } = require('path');
const { writeFile } = require('fs');
const ncp = require('ncp');

const packageImporter = require('node-sass-package-importer');

console.log('Copying SCSS files...');
ncp(resolve(__dirname, 'src', 'styles'), resolve(__dirname, 'dist', 'styles'), err => {
  if (err) {
    return console.error(err);
  }
  console.log('Done copying.');
});

console.log('Compiling SCSS...');

const outFileName = 'elements-dev-portal.min.css';
const outFile = resolve(__dirname, 'dist', 'styles', outFileName);
render(
  {
    file: resolve(__dirname, 'src', 'styles', 'elements-dev-portal-scoped.scss'),
    outFile: outFile,
    importer: packageImporter(),
    outputStyle: 'compressed',
  },
  (err, result) => {
    if (err) {
      return console.error(err);
    }
    writeFile(outFile, result.css, () => {
      console.log(`Done compiling \`${outFileName}\`.`);
    });
  },
);

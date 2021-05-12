const { render } = require('node-sass');
const { resolve } = require('path');
const { writeFile } = require('fs');
const ncp = require('ncp');

const packageImporter = require('node-sass-package-importer');

const sourcePackageName = 'elements-core';
const packageName = process.argv[2] || sourcePackageName;
const inputFileName = 'styles.scss';
const outputFileName = 'styles.min.css';

const sourcePackagePath = resolve(__dirname, '..', 'packages', sourcePackageName);
const destinationPackagePath = resolve(__dirname, '..', 'packages', packageName);

console.log('Copying SCSS files...');
ncp(resolve(sourcePackagePath, 'src', 'styles'), resolve(destinationPackagePath, 'dist', 'styles'), err => {
  if (err) {
    return console.error(err);
  }
  console.log('Done copying.');
});

console.log('Compiling SCSS...');

const outFile = resolve(destinationPackagePath, 'dist', 'styles', outputFileName);
render(
  {
    file: resolve(sourcePackagePath, 'src', 'styles', inputFileName),
    outFile: outFile,
    importer: packageImporter(),
    outputStyle: 'compressed',
  },
  (err, result) => {
    if (err) {
      return console.error(err);
    }
    writeFile(outFile, result.css, () => {
      console.log(`Done compiling \`${outputFileName}\`.`);
    });
  },
);

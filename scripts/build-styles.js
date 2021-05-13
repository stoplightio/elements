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

const outFile = resolve(destinationPackagePath, 'dist', outputFileName);
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

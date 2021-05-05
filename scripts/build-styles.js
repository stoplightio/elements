const { render } = require('node-sass');
const { resolve } = require('path');
const { writeFile } = require('fs');
const ncp = require('ncp');

const packageImporter = require('node-sass-package-importer');

const packageName = process.argv[2];
const inputFileName = `${packageName}-scoped.scss`;
const outputFileName = `${packageName}.min.css`;

const packagePath = resolve(__dirname, '..', 'packages', packageName);

console.log('Copying SCSS files...');
ncp(resolve(packagePath, 'src', 'styles'), resolve(packagePath, 'dist', 'styles'), err => {
  if (err) {
    return console.error(err);
  }
  console.log('Done copying.');
});

console.log('Compiling SCSS...');

const outFile = resolve(packagePath, 'dist', 'styles', outputFileName);
render(
  {
    file: resolve(packagePath, 'src', 'styles', inputFileName),
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

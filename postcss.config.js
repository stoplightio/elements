const importPlugin = require('postcss-import');
const cssNano = require('cssnano');

module.exports = {
  plugins: [importPlugin(), cssNano({ preset: 'default' })],
};

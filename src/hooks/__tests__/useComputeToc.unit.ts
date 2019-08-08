import * as fs from 'fs';
import * as path from 'path';
import { computeToc } from '../useComputeToc';

const fixturesPath = '../../__fixtures__/table-of-contents';
const files = fs.readdirSync(path.resolve(__dirname, fixturesPath));

describe('computeToc', () => {
  files.forEach(filePath => {
    describe(filePath, () => {
      const file = require(`${fixturesPath}/${filePath}`);

      it('should return the correct table of contents', () => {
        expect(computeToc(file.nodes)).toEqual(file.contents);
      });
    });
  });
});

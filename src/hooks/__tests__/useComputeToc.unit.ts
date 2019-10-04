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
        expect(
          computeToc(file.nodes, {
            group: 'folder-close',
            divider: 'chevron-right',
            item: 'document',
          }),
        ).toEqual(file.contents);
      });

      it('should return the correct icons based on node type', () => {
        expect(
          computeToc(file.nodes, {
            article: 'cube',
            model: 'box',
            http_operation: 'download',
            http_service: 'badge',
            http_server: 'cloud',
          }),
        ).toEqual(file.nodeTypeIcons);
      });
    });
  });
});

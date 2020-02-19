import * as fs from 'fs';
import { join } from 'path';
import { prettifyHTML } from '../html';

describe('HTML Prettifier', () => {
  test('should prettify content', () => {
    return expect(
      prettifyHTML(fs.readFileSync(join(__dirname, '../__fixtures__/index.html'), 'utf-8')),
    ).resolves.toMatchSnapshot();
  });
});

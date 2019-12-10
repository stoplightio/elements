import { NodeType } from '@stoplight/types';
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
        ).toMatchSnapshot();
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
        ).toMatchSnapshot();
      });
    });
  });
});

describe('computeToc functionality', () => {
  it('should split directory names on dashes', () => {
    expect(
      computeToc(
        [
          {
            id: '1',
            type: NodeType.Article,
            name: 'APIs',
            srn: 'gh/org/project/docs/APIs/test.md',
          },
          {
            id: '2',
            type: NodeType.Article,
            name: 'Test2',
            srn: 'gh/org/project/docs/split-folder/test.md',
          },
        ],
        {
          group: 'folder-close',
          divider: 'chevron-right',
          item: 'document',
        },
      ),
    ).toEqual(
      expect.arrayContaining([
        {
          depth: 1,
          icon: 'document',
          id: '1',
          name: 'APIs',
          type: 'item',
          href: 'gh/org/project/docs/APIs/test.md',
        },
      ]),
    );
  });

  it('should alphabetically sort tagged models', () => {
    expect(
      computeToc(
        [
          {
            id: 11,
            type: NodeType.HttpService,
            name: 'Another API',
            srn: 'sl/org/project/openapi.v1.yml',
            latestVersion: '1.0',
          },
          {
            id: 12,
            type: NodeType.HttpOperation,
            name: 'List Things',
            srn: 'sl/org/project/openapi.v1.yml/paths/~1things/get',
            tags: ['things'],
          },
          {
            id: 13,
            type: NodeType.Model,
            name: 'Thing',
            srn: 'sl/org/project/openapi.v1.yml/definitions/thing',
            tags: ['things'],
          },
          {
            id: 13,
            type: NodeType.Model,
            name: 'Another Thing',
            srn: 'sl/org/project/openapi.v1.yml/definitions/another-thing',
            tags: ['things'],
          },
        ],
        {
          group: 'folder-close',
          divider: 'chevron-right',
          item: 'document',
        },
      ),
    ).toMatchSnapshot();
  });
});

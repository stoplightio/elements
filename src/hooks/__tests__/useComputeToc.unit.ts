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
        { id: '0-0', name: 'APIs', depth: 0, type: 'group', icon: 'folder-close' },
        { id: '1', name: 'APIs', depth: 1, type: 'item', icon: 'document', href: 'gh/org/project/docs/APIs/test.md' },
        { id: '1-0', name: 'Split Folder', depth: 0, type: 'group', icon: 'folder-close' },
        {
          id: '2',
          name: 'Test2',
          depth: 1,
          type: 'item',
          icon: 'document',
          href: 'gh/org/project/docs/split-folder/test.md',
        },
      ]),
    );
  });

  it('should alphabetically sort tagged models', () => {
    const value = computeToc(
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
          id: 14,
          type: NodeType.Model,
          name: 'Another Thing',
          srn: 'sl/org/project/openapi.v1.yml/definitions/another-thing',
          tags: ['things'],
        },
        {
          id: 15,
          type: NodeType.Model,
          name: 'Something',
          srn: 'sl/org/project/openapi.v1.yml/definitions/something',
        },
        {
          id: 16,
          type: NodeType.Model,
          name: 'Another Something',
          srn: 'sl/org/project/openapi.v1.yml/definitions/another-something',
        },
      ],
      {
        group: 'folder-close',
        divider: 'chevron-right',
        item: 'document',
      },
    );

    expect(value).toEqual(
      expect.arrayContaining([
        { id: 11, name: 'Another API', depth: 0, type: 'divider', icon: 'chevron-right', meta: 'v1.0' },
        {
          id: '11-overview',
          name: 'Overview',
          depth: 0,
          icon: 'document',
          type: 'item',
          href: 'sl/org/project/openapi.v1.yml',
        },
        { id: '11-things-0', name: 'Things', depth: 0, type: 'group', icon: 'folder-close' },
        {
          id: 14,
          name: 'Another Thing',
          depth: 1,
          icon: 'document',
          type: 'item',
          href: 'sl/org/project/openapi.v1.yml/definitions/another-thing',
        },
        {
          id: 12,
          name: 'List Things',
          depth: 1,
          icon: 'document',
          type: 'item',
          href: 'sl/org/project/openapi.v1.yml/paths/~1things/get',
        },
        {
          id: 13,
          name: 'Thing',
          depth: 1,
          icon: 'document',
          type: 'item',
          href: 'sl/org/project/openapi.v1.yml/definitions/thing',
        },
        { id: '11-other', name: 'Other', depth: 0, type: 'group', icon: 'folder-close' },
        {
          id: 16,
          name: 'Another Something',
          depth: 1,
          icon: 'document',
          type: 'item',
          href: 'sl/org/project/openapi.v1.yml/definitions/another-something',
        },
        {
          id: 15,
          name: 'Something',
          depth: 1,
          icon: 'document',
          type: 'item',
          href: 'sl/org/project/openapi.v1.yml/definitions/something',
        },
      ]),
    );
  });
});

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
        { id: '0-1', name: 'Docs', depth: 1, type: 'group', icon: 'folder-close' },
        { id: '0-2', name: 'APIs', depth: 2, type: 'group', icon: 'folder-close' },
        { id: '1', name: 'APIs', depth: 3, type: 'item', icon: 'document', href: 'gh/org/project/docs/APIs/test.md' },
        { id: '1-2', name: 'Split Folder', depth: 2, type: 'group', icon: 'folder-close' },
        {
          id: '2',
          name: 'Test2',
          depth: 3,
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
          tags: ['things'],
        },
        {
          id: 16,
          type: NodeType.Model,
          name: 'Another Something',
          srn: 'sl/org/project/openapi.v1.yml/definitions/another-something',
          tags: ['things'],
        },
        {
          id: 17,
          type: NodeType.Model,
          name: 'Ba',
          srn: 'sl/org/project/openapi.v1.yml/definitions/ba',
          tags: ['things'],
        },
        {
          id: 18,
          type: NodeType.Model,
          name: 'aa',
          srn: 'sl/org/project/openapi.v1.yml/definitions/aa',
        },
        {
          id: 19,
          type: NodeType.Model,
          name: 'aB',
          srn: 'sl/org/project/openapi.v1.yml/definitions/ab',
          tags: ['things'],
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
          id: 18,
          type: 'item',
          icon: 'document',
          depth: 1,
          name: 'aa',
          href: 'sl/org/project/openapi.v1.yml/definitions/aa',
        },
        {
          id: 19,
          type: 'item',
          icon: 'document',
          depth: 1,
          name: 'aB',
          href: 'sl/org/project/openapi.v1.yml/definitions/ab',
        },
        {
          id: 16,
          name: 'Another Something',
          depth: 1,
          icon: 'document',
          type: 'item',
          href: 'sl/org/project/openapi.v1.yml/definitions/another-something',
        },
        {
          id: 17,
          type: 'item',
          icon: 'document',
          depth: 1,
          name: 'Ba',
          href: 'sl/org/project/openapi.v1.yml/definitions/ba',
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

  it('should alphabetically sort articles', () => {
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
          type: NodeType.Article,
          name: 'Something',
          srn: 'sl/org/project/openapi.v1.yml/definitions/something',
        },
        {
          id: 14,
          type: NodeType.Article,
          name: 'Another Something',
          srn: 'sl/org/project/openapi.v1.yml/definitions/another-something',
        },
        {
          id: 15,
          type: NodeType.Article,
          name: 'Ba',
          srn: 'sl/org/project/openapi.v1.yml/definitions/ba',
        },
        {
          id: 16,
          type: NodeType.Article,
          name: 'aa',
          srn: 'sl/org/project/openapi.v1.yml/definitions/aa',
        },
        {
          id: 17,
          type: NodeType.Article,
          name: 'aB',
          srn: 'sl/org/project/openapi.v1.yml/definitions/ab',
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
          id: 12,
          name: 'List Things',
          depth: 1,
          icon: 'document',
          type: 'item',
          href: 'sl/org/project/openapi.v1.yml/paths/~1things/get',
        },
        { id: '11-other', name: 'Other', depth: 0, type: 'group', icon: 'folder-close' },
        {
          id: 16,
          type: 'item',
          icon: 'document',
          depth: 1,
          name: 'aa',
          href: 'sl/org/project/openapi.v1.yml/definitions/aa',
        },
        {
          id: 17,
          type: 'item',
          icon: 'document',
          depth: 1,
          name: 'aB',
          href: 'sl/org/project/openapi.v1.yml/definitions/ab',
        },
        {
          id: 14,
          name: 'Another Something',
          depth: 1,
          icon: 'document',
          type: 'item',
          href: 'sl/org/project/openapi.v1.yml/definitions/another-something',
        },
        {
          id: 15,
          type: 'item',
          icon: 'document',
          depth: 1,
          name: 'Ba',
          href: 'sl/org/project/openapi.v1.yml/definitions/ba',
        },
        {
          id: 13,
          name: 'Something',
          depth: 1,
          icon: 'document',
          type: 'item',
          href: 'sl/org/project/openapi.v1.yml/definitions/something',
        },
      ]),
    );
  });

  it('should alphabetically sort services', () => {
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
          type: NodeType.HttpService,
          name: 'An API',
          srn: 'sl/org/project/anopenapi.v1.yml',
          latestVersion: '1.0',
        },
        {
          id: 14,
          type: NodeType.HttpService,
          name: 'aa',
          srn: 'sl/org/project/aaopenapi.v1.yml',
          latestVersion: '1.0',
        },
        {
          id: 15,
          type: NodeType.HttpService,
          name: 'aB',
          srn: 'sl/org/project/abopenapi.v1.yml',
          latestVersion: '1.0',
        },
        {
          id: 16,
          type: NodeType.HttpService,
          name: 'Ba',
          srn: 'sl/org/project/baopenapi.v1.yml',
          latestVersion: '1.0',
        },
        {
          id: 17,
          type: NodeType.Model,
          name: 'Thing',
          srn: 'sl/org/project/anopenapi.v1.yml/definitions/thing',
          tags: ['things'],
        },
        {
          id: 18,
          type: NodeType.Model,
          name: 'Thing',
          srn: 'sl/org/project/aaopenapi.v1.yml/definitions/thing',
          tags: ['things'],
        },
        {
          id: 19,
          type: NodeType.Model,
          name: 'Thing',
          srn: 'sl/org/project/abopenapi.v1.yml/definitions/thing',
          tags: ['things'],
        },
        {
          id: 20,
          type: NodeType.Model,
          name: 'Thing',
          srn: 'sl/org/project/baopenapi.v1.yml/definitions/thing',
          tags: ['things'],
        },
        {
          id: 21,
          type: NodeType.Model,
          name: 'Thing',
          srn: 'sl/org/project/openapi.v1.yml/definitions/thing',
          tags: ['things'],
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
        { depth: 0, icon: 'chevron-right', id: 14, meta: 'v1.0', name: 'aa', type: 'divider' },
        {
          depth: 0,
          href: 'sl/org/project/aaopenapi.v1.yml',
          icon: 'document',
          id: '14-overview',
          name: 'Overview',
          type: 'item',
        },
        { depth: 0, icon: 'folder-close', id: '14-things-0', name: 'Things', type: 'group' },
        {
          depth: 1,
          href: 'sl/org/project/aaopenapi.v1.yml/definitions/thing',
          icon: 'document',
          id: 18,
          name: 'Thing',
          type: 'item',
        },
        { depth: 0, icon: 'chevron-right', id: 15, meta: 'v1.0', name: 'aB', type: 'divider' },
        {
          depth: 0,
          href: 'sl/org/project/abopenapi.v1.yml',
          icon: 'document',
          id: '15-overview',
          name: 'Overview',
          type: 'item',
        },
        { depth: 0, icon: 'folder-close', id: '15-things-0', name: 'Things', type: 'group' },
        {
          depth: 1,
          href: 'sl/org/project/abopenapi.v1.yml/definitions/thing',
          icon: 'document',
          id: 19,
          name: 'Thing',
          type: 'item',
        },
        { depth: 0, icon: 'chevron-right', id: 13, meta: 'v1.0', name: 'An API', type: 'divider' },
        {
          depth: 0,
          href: 'sl/org/project/anopenapi.v1.yml',
          icon: 'document',
          id: '13-overview',
          name: 'Overview',
          type: 'item',
        },
        { depth: 0, icon: 'folder-close', id: '13-things-0', name: 'Things', type: 'group' },
        {
          depth: 1,
          href: 'sl/org/project/anopenapi.v1.yml/definitions/thing',
          icon: 'document',
          id: 17,
          name: 'Thing',
          type: 'item',
        },
        { depth: 0, icon: 'chevron-right', id: 11, meta: 'v1.0', name: 'Another API', type: 'divider' },
        {
          depth: 0,
          href: 'sl/org/project/openapi.v1.yml',
          icon: 'document',
          id: '11-overview',
          name: 'Overview',
          type: 'item',
        },
        { depth: 0, icon: 'folder-close', id: '11-things-0', name: 'Things', type: 'group' },
        {
          depth: 1,
          href: 'sl/org/project/openapi.v1.yml/paths/~1things/get',
          icon: 'document',
          id: 12,
          name: 'List Things',
          type: 'item',
        },
        {
          depth: 1,
          href: 'sl/org/project/openapi.v1.yml/definitions/thing',
          icon: 'document',
          id: 21,
          name: 'Thing',
          type: 'item',
        },
        { depth: 0, icon: 'chevron-right', id: 16, meta: 'v1.0', name: 'Ba', type: 'divider' },
        {
          depth: 0,
          href: 'sl/org/project/baopenapi.v1.yml',
          icon: 'document',
          id: '16-overview',
          name: 'Overview',
          type: 'item',
        },
        { depth: 0, icon: 'folder-close', id: '16-things-0', name: 'Things', type: 'group' },
        {
          depth: 1,
          href: 'sl/org/project/baopenapi.v1.yml/definitions/thing',
          icon: 'document',
          id: 20,
          name: 'Thing',
          type: 'item',
        },
      ]),
    );
  });
});

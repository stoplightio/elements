import { NodeType } from '@stoplight/types';

import {
  appendArticlesToToC,
  appendHttpServicesToToC,
  appendModelsToToc,
  generateApiToC,
  generateProjectToC,
  generateTocSkeleton,
  groupNodesByType,
  resolveHttpServices,
  sortArticlesByTypeAndPath,
} from '../toc';
import { ITableOfContents, NodeData } from '../types';

describe('toc', () => {
  describe('mapArticlesToToC()', () => {
    it('ignores docs as directory', () => {
      const toc = { items: [] };

      appendArticlesToToC(toc)([
        {
          tags: [],
          type: NodeType.Article,
          name: 'a',
          uri: '/docs/a',
          data: '',
        },
        {
          tags: [],
          type: NodeType.Article,
          name: 'aa',
          uri: '/docs/a/a',
          data: '',
        },
        {
          tags: [],
          type: NodeType.Article,
          name: 'aaa',
          uri: '/docs/a/a/a',
          data: '',
        },
      ]);

      expect(toc).toEqual({
        items: [
          { type: 'item', title: 'a', uri: '/docs/a' },
          { type: 'divider', title: 'a' },
          { type: 'item', title: 'aa', uri: '/docs/a/a' },
          {
            type: 'group',
            items: [{ type: 'item', title: 'aaa', uri: '/docs/a/a/a' }],
            title: 'a',
          },
        ],
      });
    });

    it('does the same when there is no docs', () => {
      const toc = { items: [] };

      appendArticlesToToC(toc)([
        {
          tags: [],
          type: NodeType.Article,
          name: 'a',
          uri: '/a',
          data: '',
        },
        {
          tags: [],
          type: NodeType.Article,
          name: 'aa',
          uri: '/a/a',
          data: '',
        },
        {
          tags: [],
          type: NodeType.Article,
          name: 'aaa',
          uri: '/a/a/a',
          data: '',
        },
      ]);

      expect(toc).toEqual({
        items: [
          { type: 'item', title: 'a', uri: '/a' },
          { type: 'divider', title: 'a' },
          { type: 'item', title: 'aa', uri: '/a/a' },
          {
            type: 'group',
            items: [{ type: 'item', title: 'aaa', uri: '/a/a/a' }],
            title: 'a',
          },
        ],
      });
    });
  });

  describe('mapHttpServicesToToCAndStandaloneModels()', () => {
    describe('tags are set', () => {
      it('converts properly', () => {
        const models: NodeData[] = [
          {
            type: NodeType.Model,
            tags: ['einz', 'zwei'],
            name: 'a',
            uri: '/models/a',
            data: {},
          },
          {
            type: NodeType.Model,
            tags: ['raz', 'dwa'],
            name: 'b',
            uri: '/reference/openapi.json/definitions/b',
            data: {},
          },
          {
            type: NodeType.Model,
            tags: [],
            name: 'c',
            uri: '/reference/openapi.json/definitions/c',
            data: {},
          },
        ];
        const httpServices: NodeData[] = [
          {
            type: NodeType.HttpService,
            tags: ['raz', 'dwa', 'einz', 'zwei'],
            name: 'Service',
            uri: '/reference/openapi.json',
            data: {
              name: 'Service',
              id: 'some-id',
              version: '1.0.0',
            },
          },
        ];
        const httpOperations: NodeData[] = [
          {
            type: NodeType.HttpOperation,
            tags: ['zwei'],
            name: 'Operation',
            uri: '/reference/openapi.json/paths/~1test/get',
            data: {
              method: 'get',
              id: 'some-id',
              path: '/some/path',
              responses: [],
            },
          },
        ];

        const toc = { items: [] };

        const standaloneModels = appendHttpServicesToToC(toc, 'project')({ httpServices, httpOperations, models });

        expect(toc).toEqual({
          items: [
            {
              type: 'group',
              title: 'Service',
              uri: '/reference/openapi.json',
              items: [
                {
                  type: 'group',
                  items: [{ type: 'item', title: 'Operation', uri: '/reference/openapi.json/paths/~1test/get' }],
                  title: 'zwei',
                },
                {
                  type: 'group',
                  items: [
                    { type: 'item', title: 'b', uri: '/reference/openapi.json/definitions/b' },
                    { type: 'item', title: 'c', uri: '/reference/openapi.json/definitions/c' },
                  ],
                  title: 'Schemas',
                },
              ],
            },
          ],
        });
        expect(standaloneModels).toEqual([
          {
            name: 'a',
            uri: '/models/a',
            tags: ['einz', 'zwei'],
            type: 'model',
            data: {},
          },
        ]);
      });

      describe('tags are in mixed case', () => {
        it('performs case insensitive grouping', () => {
          const models: NodeData[] = [
            {
              type: NodeType.Model,
              tags: ['einz'],
              name: 'Model',
              uri: '/reference/openapi.json/components/a',
              data: {},
            },
          ];
          const httpServices: NodeData[] = [
            {
              type: NodeType.HttpService,
              tags: ['Einz'],
              name: 'Service',
              uri: '/reference/openapi.json',
              data: {
                name: 'Service',
                id: 'some-id',
                version: '1.0.0',
              },
            },
          ];
          const httpOperations: NodeData[] = [
            {
              type: NodeType.HttpOperation,
              tags: ['Einz'],
              name: 'Operation',
              uri: '/reference/openapi.json/paths/~1test/get',
              data: {
                method: 'get',
                id: 'some-id',
                path: '/some/path',
                responses: [],
              },
            },
          ];

          const toc = { items: [] };

          appendHttpServicesToToC(toc, 'api')({ httpServices, httpOperations, models });
          expect(toc).toEqual({
            items: [
              {
                type: 'group',
                items: [{ type: 'item', title: 'Operation', uri: '/reference/openapi.json/paths/~1test/get' }],
                title: 'Einz',
              },
              {
                type: 'divider',
                title: 'Schemas',
              },
              {
                type: 'item',
                title: 'Model',
                uri: '/reference/openapi.json/components/a',
              },
            ],
          });
        });

        describe('tag is present in httpService tag list', () => {
          it("follows letter case found in HTTP Service node's tags", () => {
            const httpOperations: NodeData[] = [
              {
                type: NodeType.HttpOperation,
                tags: ['stopLIGHT'],
                name: 'Operation#1',
                uri: '/reference/openapi.json/paths/~1test/get',
                data: {
                  method: 'get',
                  id: 'some-id',
                  path: '/some/path',
                  responses: [],
                },
              },
              {
                type: NodeType.HttpOperation,
                tags: ['STOPlight'],
                name: 'Operation#2',
                uri: '/reference/openapi.json/paths/~1test/post',
                data: {
                  method: 'post',
                  id: 'some-id',
                  path: '/some/path',
                  responses: [],
                },
              },
            ];
            const httpServices: NodeData[] = [
              {
                type: NodeType.HttpService,
                tags: ['Stoplight'],
                name: 'Service',
                uri: '/reference/openapi.json',
                data: {
                  name: 'Service',
                  id: 'some-id',
                  version: '1.0.0',
                },
              },
            ];

            const toc = { items: [] };

            appendHttpServicesToToC(toc, 'project')({ httpServices, httpOperations, models: [] });

            expect(toc).toEqual({
              items: [
                {
                  type: 'group',
                  title: 'Service',
                  uri: '/reference/openapi.json',
                  items: [
                    {
                      type: 'group',
                      items: [
                        { type: 'item', title: 'Operation#1', uri: '/reference/openapi.json/paths/~1test/get' },
                        { type: 'item', title: 'Operation#2', uri: '/reference/openapi.json/paths/~1test/post' },
                      ],
                      title: 'Stoplight',
                    },
                  ],
                },
              ],
            });
          });
        });

        describe('tag is not present in httpService tag list', () => {
          it('chooses letter-case after first occurrence of tag in the list', () => {
            const httpOperations: NodeData[] = [
              {
                type: NodeType.HttpOperation,
                tags: ['stopLIGHT'],
                name: 'Operation#1',
                uri: '/reference/openapi.json/paths/~1test/get',
                data: {
                  method: 'hry',
                  id: 'some-id',
                  path: '/some/path',
                  responses: [],
                },
              },
              {
                type: NodeType.HttpOperation,
                tags: ['STOPlight'],
                name: 'Operation#2',
                uri: '/reference/openapi.json/paths/~1test/post',
                data: {
                  method: 'post',
                  id: 'some-id',
                  path: '/some/path',
                  responses: [],
                },
              },
            ];
            const httpServices: NodeData[] = [
              {
                type: NodeType.HttpService,
                name: 'Service',
                tags: [],
                uri: '/reference/openapi.json',
                data: {
                  name: 'Service',
                  id: 'some-id',
                  version: '1.0.0',
                },
              },
            ];

            const toc = { items: [] };

            appendHttpServicesToToC(toc, 'project')({ httpServices, httpOperations, models: [] });

            expect(toc).toEqual({
              items: [
                {
                  type: 'group',
                  title: 'Service',
                  uri: '/reference/openapi.json',
                  items: [
                    {
                      type: 'group',
                      items: [
                        { type: 'item', title: 'Operation#1', uri: '/reference/openapi.json/paths/~1test/get' },
                        { type: 'item', title: 'Operation#2', uri: '/reference/openapi.json/paths/~1test/post' },
                      ],
                      title: 'stopLIGHT',
                    },
                  ],
                },
              ],
            });
          });
        });
      });
    });

    describe('tags are not set', () => {
      it('converts properly', () => {
        const models: NodeData[] = [
          {
            type: NodeType.Model,
            tags: [],
            name: 'a',
            uri: '/models/a',
            data: {},
          },
          {
            type: NodeType.Model,
            tags: [],
            name: 'b',
            uri: '/reference/openapi.json/definitions/b',
            data: {},
          },
        ];
        const httpServices: NodeData[] = [
          {
            type: NodeType.HttpService,
            name: 'Service',
            tags: [],
            uri: '/reference/openapi.json',
            data: {
              name: 'Service',
              id: 'some-id',
              version: '1.0.0',
            },
          },
        ];
        const httpOperations: NodeData[] = [
          {
            type: NodeType.HttpOperation,
            tags: [],
            name: 'Operation',
            uri: '/reference/openapi.json/paths/~1test/get',
            data: {
              method: 'post',
              id: 'some-id',
              path: '/some/path',
              responses: [],
            },
          },
        ];

        const toc = { items: [] };

        const standaloneModels = appendHttpServicesToToC(toc, 'project')({ httpServices, httpOperations, models });

        expect(toc).toEqual({
          items: [
            {
              type: 'group',
              title: 'Service',
              uri: '/reference/openapi.json',
              items: [
                { type: 'item', title: 'Operation', uri: '/reference/openapi.json/paths/~1test/get' },
                {
                  type: 'group',
                  title: 'Schemas',
                  items: [{ type: 'item', title: 'b', uri: '/reference/openapi.json/definitions/b' }],
                },
              ],
            },
          ],
        });

        expect(standaloneModels).toEqual([
          {
            name: 'a',
            uri: '/models/a',
            type: 'model',
            tags: [],
            data: {},
          },
        ]);
      });
    });
  });

  describe('mapModelsToToc()', () => {
    it('converts properly', () => {
      const models: NodeData[] = [
        {
          type: NodeType.Model,
          tags: ['einz', 'zwei'],
          name: 'a',
          uri: '/models/a',
          data: {},
        },
        {
          type: NodeType.Model,
          tags: ['raz', 'dwa'],
          name: 'b',
          uri: '/reference/openapi.json/definitions/b',
          data: {},
        },
        {
          type: NodeType.Model,
          tags: [],
          name: 'c',
          uri: '/reference/openapi.json/definitions/c',
          data: {},
        },
      ];

      const toc = { items: [] };

      appendModelsToToc(toc)(models);

      expect(toc).toEqual({
        items: [
          { type: 'divider', title: 'Schemas' },
          { type: 'item', title: 'a', uri: '/models/a' },
          { type: 'item', title: 'b', uri: '/reference/openapi.json/definitions/b' },
          { type: 'item', title: 'c', uri: '/reference/openapi.json/definitions/c' },
        ],
      });
    });
  });

  describe('sortArticlesByTypeAndPath()', () => {
    it('sorts correctly', () => {
      const articles: NodeData[] = [
        {
          type: NodeType.Article,
          tags: [],
          name: 'aa',
          uri: '/hello/a/a',
          data: '',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'a',
          uri: '/hello/a',
          data: '',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'c',
          uri: '/c',
          data: '',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'b',
          uri: '/hello/b',
          data: '',
        },
      ];

      expect(sortArticlesByTypeAndPath(articles)).toEqual([
        {
          name: 'c',
          uri: '/c',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
        {
          name: 'a',
          uri: '/hello/a',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
        {
          name: 'aa',
          uri: '/hello/a/a',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
        {
          name: 'b',
          uri: '/hello/b',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
      ]);
    });

    it('moves articles from root and docs directories to the top', () => {
      const articles: NodeData[] = [
        {
          type: NodeType.Article,
          tags: [],
          name: 'aa',
          uri: '/hello/a/a',
          data: '',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'a',
          uri: '/hello/a',
          data: '',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'README',
          uri: '/README',
          data: '',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'b',
          uri: '/docs/b',
          data: '',
        },
      ];

      expect(sortArticlesByTypeAndPath(articles)).toEqual([
        {
          name: 'README',
          uri: '/README',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
        {
          name: 'b',
          uri: '/docs/b',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
        {
          name: 'a',
          uri: '/hello/a',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
        {
          name: 'aa',
          uri: '/hello/a/a',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
      ]);
    });

    it('sorts articles with uris without leading slash', () => {
      const articles: NodeData[] = [
        {
          type: NodeType.Article,
          tags: [],
          name: 'aa',
          uri: 'hello/a/a',
          data: '',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'a',
          uri: 'hello/a',
          data: '',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'README',
          uri: 'README',
          data: '',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'b',
          uri: 'docs/b',
          data: '',
        },
      ];

      expect(sortArticlesByTypeAndPath(articles)).toEqual([
        {
          name: 'README',
          uri: 'README',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
        {
          name: 'b',
          uri: 'docs/b',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
        {
          name: 'a',
          uri: 'hello/a',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
        {
          name: 'aa',
          uri: 'hello/a/a',
          type: NodeType.Article,
          tags: [],
          data: '',
        },
      ]);
    });
  });

  describe('groupNodesByType()', () => {
    it('groups properly', () => {
      const nodes: NodeData[] = [
        {
          type: NodeType.Article,
          name: 'a',
          uri: '/a',
          tags: [],
          data: '',
        },
        {
          tags: [],
          type: NodeType.HttpService,
          name: 'b',
          uri: '/b',
          data: {
            name: 'Service',
            id: 'some-id',
            version: '1.0.0',
          },
        },
        {
          tags: [],
          type: NodeType.HttpOperation,
          name: 'c',
          uri: '/c',
          data: {
            method: 'post',
            id: 'some-id',
            path: '/some/path',
            responses: [],
          },
        },
        {
          tags: [],
          type: NodeType.Model,
          name: 'd',
          uri: '/d',
          data: {},
        },
        {
          tags: [],
          type: NodeType.HttpServer,
          name: 'e',
          uri: '/e',
          data: {},
        },
      ];

      expect(groupNodesByType(nodes)).toEqual({
        articles: [
          {
            name: 'a',
            uri: '/a',
            type: NodeType.Article,
            tags: [],
            data: '',
          },
        ],
        httpOperations: [
          {
            name: 'c',
            uri: '/c',
            type: 'http_operation',
            tags: [],
            data: {
              method: 'post',
              id: 'some-id',
              path: '/some/path',
              responses: [],
            },
          },
        ],
        httpServices: [
          {
            name: 'b',
            uri: '/b',
            type: 'http_service',
            tags: [],
            data: {
              name: 'Service',
              id: 'some-id',
              version: '1.0.0',
            },
          },
        ],
        models: [
          {
            name: 'd',
            uri: '/d',
            type: 'model',
            tags: [],
            data: {},
          },
        ],
      });
    });
  });

  describe('resolveHttpServices', () => {
    it('injects http operations and models in place of existing http service', () => {
      const toc = {
        items: [
          { type: 'item' as const, title: 'an orphan api', uri: '/orphan.yaml' },
          { type: 'item' as const, title: 'an existing api', uri: '/openapi.yaml' },
          { type: 'divider' as const, title: 'hey!' },
        ],
      };

      resolveHttpServices(
        [
          {
            uri: '/openapi.yaml',
            name: 'The API',
            type: NodeType.HttpService,
            tags: ['api'],
            data: {
              name: 'Service',
              id: 'some-id',
              version: '1.0.0',
            },
          },
          {
            uri: '/openapi.yaml/~1path',
            name: 'The Op',
            type: NodeType.HttpOperation,
            tags: ['api'],
            data: {
              method: 'post',
              id: 'some-id',
              path: '/some/path',
              responses: [],
            },
          },
          {
            uri: '/openapi.yaml/~1components~1model',
            name: 'The Model',
            type: NodeType.Model,
            tags: ['api'],
            data: {},
          },
        ],
        toc,
      );

      expect(toc).toEqual({
        items: [
          {
            title: 'an orphan api',
            type: 'item',
            uri: '/orphan.yaml',
          },
          {
            title: 'an existing api',
            type: 'group',
            uri: '/openapi.yaml',
            items: [
              {
                items: [
                  {
                    title: 'The Op',
                    type: 'item',
                    uri: '/openapi.yaml/~1path',
                  },
                ],
                title: 'api',
                type: 'group',
              },
              {
                title: 'Schemas',
                type: 'group',
                items: [
                  {
                    title: 'The Model',
                    type: 'item',
                    uri: '/openapi.yaml/~1components~1model',
                  },
                ],
              },
            ],
          },
          {
            title: 'hey!',
            type: 'divider',
          },
        ],
      });
    });
  });

  describe('generateToC()', () => {
    it('generates correct Api ToC', () => {
      const toc = generateApiToC([
        {
          uri: '/openapi.yaml',
          name: 'The API',
          type: NodeType.HttpService,
          tags: ['api'],
          data: {
            name: 'Service',
            id: 'some-id',
            version: '1.0.0',
            description: 'some description',
          },
        },
        {
          uri: '/openapi.yaml/~1zpath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
          data: {
            method: 'post',
            id: 'some-id',
            path: '/some/path',
            responses: [],
          },
        },
        {
          uri: '/openapi.yaml/~1fpath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
          data: {
            method: 'post',
            id: 'some-id',
            path: '/some/path',
            responses: [],
          },
        },
        {
          uri: '/openapi.yaml/~1apath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
          data: {
            method: 'post',
            id: 'some-id',
            path: '/some/path',
            responses: [],
          },
        },
        {
          uri: '/openapi.yaml/~1components~1model',
          name: 'The Model',
          type: NodeType.Model,
          tags: ['api'],
          data: {},
        },
      ]);

      expect(toc).toEqual({
        items: [
          {
            title: 'Overview',
            type: 'item',
            uri: '/openapi.yaml',
          },
          {
            title: 'Endpoints',
            type: 'divider',
          },
          {
            items: [
              {
                title: 'The Op',
                type: 'item',
                uri: '/openapi.yaml/~1zpath',
              },
              {
                title: 'The Op',
                type: 'item',
                uri: '/openapi.yaml/~1fpath',
              },
              {
                title: 'The Op',
                type: 'item',
                uri: '/openapi.yaml/~1apath',
              },
            ],
            title: 'api',
            type: 'group',
          },
          {
            title: 'Schemas',
            type: 'divider',
          },
          {
            title: 'The Model',
            type: 'item',
            uri: '/openapi.yaml/~1components~1model',
          },
        ],
      });
    });

    it('generates correct Project ToC', () => {
      const toc = generateProjectToC([
        {
          uri: '/directory/article/hello.md',
          name: 'Hello',
          type: NodeType.Article,
          tags: ['api'],
          data: '',
        },
        {
          uri: '/directory/hey.md',
          name: 'Hey',
          type: NodeType.Article,
          tags: ['api'],
          data: '',
        },
        {
          uri: '/article.md',
          name: NodeType.Article,
          type: NodeType.Article,
          tags: ['api'],
          data: '',
        },
        {
          uri: '/model.yaml',
          name: 'Standalone model',
          type: NodeType.Model,
          tags: ['api'],
          data: {},
        },
        {
          uri: '/openapi.yaml',
          name: 'The API',
          type: NodeType.HttpService,
          tags: ['api'],
          data: {
            name: 'Service',
            id: 'some-id',
            version: '1.0.0',
          },
        },
        {
          uri: '/openapi.yaml/~1zpath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
          data: {
            method: 'post',
            id: 'some-id',
            path: '/some/path',
            responses: [],
          },
        },
        {
          uri: '/openapi.yaml/~1fpath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
          data: {
            method: 'post',
            id: 'some-id',
            path: '/some/path',
            responses: [],
          },
        },
        {
          uri: '/openapi.yaml/~1apath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
          data: {
            method: 'post',
            id: 'some-id',
            path: '/some/path',
            responses: [],
          },
        },
        {
          uri: '/openapi.yaml/~1components~1model',
          name: 'The Model',
          type: NodeType.Model,
          tags: ['api'],
          data: {},
        },
      ]);

      expect(toc).toEqual({
        items: [
          {
            title: NodeType.Article,
            type: 'item',
            uri: '/article.md',
          },
          {
            title: 'directory',
            type: 'divider',
          },
          {
            title: NodeType.Article,
            type: 'group',
            items: [
              {
                title: 'Hello',
                type: 'item',
                uri: '/directory/article/hello.md',
              },
            ],
          },
          {
            title: 'Hey',
            type: 'item',
            uri: '/directory/hey.md',
          },
          {
            title: 'APIS',
            type: 'divider',
          },
          {
            title: 'The API',
            type: 'group',
            uri: '/openapi.yaml',
            items: [
              {
                items: [
                  {
                    title: 'The Op',
                    type: 'item',
                    uri: '/openapi.yaml/~1zpath',
                  },
                  {
                    title: 'The Op',
                    type: 'item',
                    uri: '/openapi.yaml/~1fpath',
                  },
                  {
                    title: 'The Op',
                    type: 'item',
                    uri: '/openapi.yaml/~1apath',
                  },
                ],
                title: 'api',
                type: 'group',
              },
              {
                title: 'Schemas',
                type: 'group',
                items: [
                  {
                    title: 'The Model',
                    type: 'item',
                    uri: '/openapi.yaml/~1components~1model',
                  },
                ],
              },
            ],
          },
          {
            title: 'Schemas',
            type: 'divider',
          },
          {
            title: 'Standalone model',
            type: 'item',
            uri: '/model.yaml',
          },
        ],
      });
    });

    it('does not include API divider if there are no APIs', () => {
      const toc = generateProjectToC([
        {
          uri: '/directory/article/hello.md',
          name: 'Hello',
          type: NodeType.Article,
          tags: ['api'],
        },
        {
          uri: '/directory/hey.md',
          name: 'Hey',
          type: NodeType.Article,
          tags: ['api'],
        },
        {
          uri: '/article.md',
          name: NodeType.Article,
          type: NodeType.Article,
          tags: ['api'],
        },
        {
          uri: '/model.yaml',
          name: 'Standalone model',
          type: NodeType.Model,
          tags: ['api'],
        },
      ]);

      expect(toc).toEqual({
        items: [
          {
            title: NodeType.Article,
            type: 'item',
            uri: '/article.md',
          },
          {
            title: 'directory',
            type: 'divider',
          },
          {
            title: NodeType.Article,
            type: 'group',
            items: [
              {
                title: 'Hello',
                type: 'item',
                uri: '/directory/article/hello.md',
              },
            ],
          },
          {
            title: 'Hey',
            type: 'item',
            uri: '/directory/hey.md',
          },
          {
            title: 'Schemas',
            type: 'divider',
          },
          {
            title: 'Standalone model',
            type: 'item',
            uri: '/model.yaml',
          },
        ],
      });
    });

    it('snapshot of platform docs', () => {
      expect(
        generateApiToC([
          {
            name: 'Add Projects',
            type: NodeType.Article,
            tags: [],
            uri: '/1.-quickstarts/add-projects-quickstart.md',
            data: '',
          },
          {
            name: 'Gitea',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/f.gitea.md',
            data: '',
          },
          {
            name: 'Troubleshooting',
            type: NodeType.Article,
            tags: [],
            uri: '/c.troubleshooting.md',
            data: '',
          },
          {
            name: 'Branch Management',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/h.branch-management.md',
            data: '',
          },
          {
            name: 'Migrating from Postman',
            type: NodeType.Article,
            tags: [],
            uri: '/6.-migrations/postman.md',
            data: '',
          },
          {
            name: 'Introduction to Stoplight Platform',
            type: NodeType.Article,
            tags: [],
            uri: '/b.overview.md',
            data: '',
          },
          {
            name: 'GitHub Enterprise',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/d.github-enterprise.md',
            data: '',
          },
          {
            name: 'Bitbucket Server',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/c.bitbucket-server.md',
            data: '',
          },
          {
            name: 'GitLab',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/e.gitlab.md',
            data: '',
          },
          {
            name: 'Types of Documentation',
            type: NodeType.Article,
            tags: ['Documentation'],
            uri: '/4.-documentation/b.types-of-documentation.md',
            data: '',
          },
          {
            name: 'Single Sign-On',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/e.configuring-authentication.md',
            data: '',
          },
          {
            name: 'Exploring your API projects',
            type: NodeType.Article,
            tags: ['Governance'],
            uri: '/5.-governance/bb.exploring-your-api-projects.md',
            data: '',
          },
          {
            name: 'Start a new API design',
            type: NodeType.Article,
            tags: ['Design'],
            uri: '/3.-design/b.starting-a-new-api-design.md',
            data: '',
          },
          {
            name: 'Welcome to the Stoplight Docs!',
            type: NodeType.Article,
            tags: [],
            uri: '/a.introduction.md',
            data: '',
          },
          {
            name: 'Overview',
            type: NodeType.Article,
            tags: ['Documentation'],
            uri: '/4.-documentation/a.overview.md',
            data: '',
          },
          {
            name: 'Bitbucket Cloud',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/b.bitbucket-cloud.md',
            data: '',
          },
          {
            name: 'Creating a workspace',
            type: NodeType.Article,
            tags: ['Workspaces'],
            uri: '/2.-workspaces/a.creating-a-workspace.md',
            data: '',
          },
          {
            name: 'Add Projects',
            type: NodeType.Article,
            tags: ['Workspaces'],
            uri: '/2.-workspaces/b.adding-projects.md',
            data: '',
          },
          {
            name: 'Overview',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/a.configuring-git.md',
            data: '',
          },
          {
            name: 'Style Guides',
            type: NodeType.Article,
            tags: ['Governance'],
            uri: '/5.-governance/d.style-guides.md',
            data: '',
          },
          {
            name: 'Review API Designs',
            type: NodeType.Article,
            tags: [],
            uri: '/3.-design/c.reviewing-your-api-design.md',
            data: '',
          },
          {
            name: 'Work with Local Projects',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/f.working-with-local-projects.md',
            data: '',
          },
          {
            name: 'Configure Projects',
            type: NodeType.Article,
            tags: ['Workspaces'],
            uri: '/2.-workspaces/c.config.md',
            data: '',
          },
          {
            name: 'Migrating from NEXT',
            type: NodeType.Article,
            tags: [],
            uri: '/6.-migrations/next.md',
            data: '',
          },
          {
            name: 'Get Started with API Governance',
            type: NodeType.Article,
            tags: ['governance'],
            uri: '/5.-governance/b.getting-started-with-api-governance.md',
            data: '',
          },
          {
            name: 'Integrate Behind the Firewall',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/i.allowlisting-ips.md',
            data: '',
          },
          {
            name: 'Publishing',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/g.automating-publishing.md',
            data: '',
          },
          {
            name: 'Creating a Design Library',
            type: NodeType.Article,
            tags: ['Governance'],
            uri: '/5.-governance/c.creating-a-design-library.md',
            data: '',
          },
          {
            name: 'Quality API Reference Documentation',
            type: NodeType.Article,
            tags: ['Documentation'],
            uri: '/4.-documentation/c.quality-api-reference-docs.md',
            data: '',
          },
          {
            name: 'Working with Mock Servers',
            type: NodeType.Article,
            tags: ['Design'],
            uri: '/3.-design/d.setting-up-a-mock-server.md',
            data: '',
          },
          {
            name: 'Organize Your Team',
            type: NodeType.Article,
            tags: ['Workspaces'],
            uri: '/2.-workspaces/d.inviting-your-team.md',
            data: '',
          },
          {
            name: 'Overview',
            type: NodeType.Article,
            tags: ['Governance'],
            uri: '/5.-governance/a.overview.md',
            data: '',
          },
          {
            name: 'Share Documentation',
            type: NodeType.Article,
            tags: [],
            uri: '/1.-quickstarts/share-documentation-quickstart.md',
            data: '',
          },
          {
            name: 'Overview',
            type: NodeType.Article,
            tags: ['Design'],
            uri: '/3.-design/a.overview.md',
            data: '',
          },
        ]),
      ).toMatchSnapshot();
    });
  });

  describe('generateTocSkeleton()', () => {
    it('generates correct ToC', () => {
      const toc = generateTocSkeleton([
        {
          uri: '/directory/article/hello.md',
          name: 'Hello',
          type: NodeType.Article,
          tags: ['api'],
          data: '',
        },
        {
          uri: '/directory/hey.md',
          name: 'Hey',
          type: NodeType.Article,
          tags: ['api'],
          data: '',
        },
        {
          uri: '/article.md',
          name: NodeType.Article,
          type: NodeType.Article,
          tags: ['api'],
          data: '',
        },
        {
          uri: '/model.yaml',
          name: 'Standalone model',
          type: NodeType.Model,
          tags: ['api'],
          data: {},
        },
        {
          uri: '/openapi.yaml',
          name: 'The API',
          type: NodeType.HttpService,
          tags: ['api'],
          data: {
            name: 'Service',
            id: 'some-id',
            version: '1.0.0',
          },
        },
      ]);

      expect(toc).toEqual({
        items: [
          {
            title: NodeType.Article,
            type: 'item',
            uri: '/article.md',
          },
          {
            title: 'directory',
            type: 'divider',
          },
          {
            title: NodeType.Article,
            type: 'group',
            items: [
              {
                title: 'Hello',
                type: 'item',
                uri: '/directory/article/hello.md',
              },
            ],
          },
          {
            title: 'Hey',
            type: 'item',
            uri: '/directory/hey.md',
          },
          {
            title: 'APIS',
            type: 'divider',
          },
          {
            title: 'The API',
            type: 'item',
            uri: '/openapi.yaml',
          },
          {
            title: 'Schemas',
            type: 'divider',
          },
          {
            title: 'Standalone model',
            type: 'item',
            uri: '/model.yaml',
          },
        ],
      });
    });
  });

  describe('resolveHttpServices()', () => {
    it('resolves ToC correctly', () => {
      const toc: ITableOfContents = {
        items: [
          {
            title: 'The API',
            type: 'item',
            uri: '/openapi.yaml',
          },
        ],
      };

      resolveHttpServices(
        [
          {
            uri: '/openapi.yaml',
            name: 'The API',
            type: NodeType.HttpService,
            tags: ['api'],
            data: {
              name: 'Service',
              id: 'some-id',
              version: '1.0.0',
            },
          },
          {
            uri: '/openapi.yaml/~1apath',
            name: 'The Op',
            type: NodeType.HttpOperation,
            tags: ['api'],
            data: {
              method: 'post',
              id: 'some-id',
              path: '/some/path',
              responses: [],
            },
          },
          {
            uri: '/openapi.yaml/~1fpath',
            name: 'The Op',
            type: NodeType.HttpOperation,
            tags: ['api'],
            data: {
              method: 'post',
              id: 'some-id',
              path: '/some/path',
              responses: [],
            },
          },
          {
            uri: '/openapi.yaml/~1zpath',
            name: 'The Op',
            type: NodeType.HttpOperation,
            tags: ['api'],
            data: {
              method: 'post',
              id: 'some-id',
              path: '/some/path',
              responses: [],
            },
          },
          {
            uri: '/openapi.yaml/~1components~1model',
            name: 'The Model',
            type: NodeType.Model,
            tags: ['api'],
            data: {},
          },
        ],
        toc,
      );

      expect(toc).toEqual({
        items: [
          {
            type: 'group',
            title: 'The API',
            items: [
              {
                type: 'group',
                title: 'api',
                items: [
                  {
                    type: 'item',
                    title: 'The Op',
                    uri: '/openapi.yaml/~1apath',
                  },
                  {
                    type: 'item',
                    title: 'The Op',
                    uri: '/openapi.yaml/~1fpath',
                  },
                  {
                    type: 'item',
                    title: 'The Op',
                    uri: '/openapi.yaml/~1zpath',
                  },
                ],
              },
              {
                type: 'group',
                title: 'Schemas',
                items: [
                  {
                    type: 'item',
                    title: 'The Model',
                    uri: '/openapi.yaml/~1components~1model',
                  },
                ],
              },
            ],
            uri: '/openapi.yaml',
          },
        ],
      });
    });

    it('resolves ToC with grouped services', () => {
      const toc: ITableOfContents = {
        items: [
          {
            title: 'Group',
            type: 'group',
            items: [
              {
                title: 'The API 1',
                type: 'item',
                uri: '/openapi-1.yaml',
              },
              {
                title: 'The API 2',
                type: 'item',
                uri: '/openapi-2.yaml',
              },
            ],
          },
        ],
      };

      resolveHttpServices(
        [
          {
            uri: '/openapi-1.yaml',
            name: 'The API 1',
            type: NodeType.HttpService,
            tags: ['api'],
            data: {
              name: 'Service',
              id: 'some-id',
              version: '1.0.0',
            },
          },
          {
            uri: '/openapi-1.yaml/~1path',
            name: 'The Op 1',
            type: NodeType.HttpOperation,
            tags: ['api'],
            data: {
              method: 'post',
              id: 'some-id',
              path: '/some/path',
              responses: [],
            },
          },
          {
            uri: '/openapi-1.yaml/~1components~1model',
            name: 'The Model 1',
            type: NodeType.Model,
            tags: ['api'],
            data: {},
          },
          {
            uri: '/openapi-2.yaml',
            name: 'The API 2',
            type: NodeType.HttpService,
            tags: ['api'],
            data: {
              name: 'Service',
              id: 'some-id',
              version: '1.0.0',
            },
          },
          {
            uri: '/openapi-2.yaml/~1path',
            name: 'The Op 2',
            type: NodeType.HttpOperation,
            tags: ['api'],
            data: {
              method: 'post',
              id: 'some-id',
              path: '/some/path',
              responses: [],
            },
          },
          {
            uri: '/openapi-2.yaml/~1components~1model',
            name: 'The Model 2',
            type: NodeType.Model,
            tags: ['api'],
            data: {},
          },
        ],
        toc,
      );

      expect(toc).toEqual({
        items: [
          {
            title: 'Group',
            type: 'group',
            items: [
              {
                type: 'group',
                title: 'The API 1',
                items: [
                  {
                    type: 'group',
                    title: 'api',
                    items: [
                      {
                        type: 'item',
                        title: 'The Op 1',
                        uri: '/openapi-1.yaml/~1path',
                      },
                    ],
                  },
                  {
                    type: 'group',
                    title: 'Schemas',
                    items: [
                      {
                        type: 'item',
                        title: 'The Model 1',
                        uri: '/openapi-1.yaml/~1components~1model',
                      },
                    ],
                  },
                ],
                uri: '/openapi-1.yaml',
              },
              {
                type: 'group',
                title: 'The API 2',
                items: [
                  {
                    type: 'group',
                    title: 'api',
                    items: [
                      {
                        type: 'item',
                        title: 'The Op 2',
                        uri: '/openapi-2.yaml/~1path',
                      },
                    ],
                  },
                  {
                    type: 'group',
                    title: 'Schemas',
                    items: [
                      {
                        type: 'item',
                        title: 'The Model 2',
                        uri: '/openapi-2.yaml/~1components~1model',
                      },
                    ],
                  },
                ],
                uri: '/openapi-2.yaml',
              },
            ],
          },
        ],
      });
    });

    it('removes dividers from groups', () => {
      const toc: ITableOfContents = {
        items: [
          {
            title: 'Group',
            type: 'group',
            items: [
              {
                title: 'The API',
                type: 'divider',
              },
              {
                title: 'The API',
                type: 'item',
                uri: '/openapi.yaml',
              },
              {
                title: 'Footer',
                type: 'divider',
              },
            ],
          },
        ],
      };

      resolveHttpServices(
        [
          {
            uri: '/openapi.yaml',
            name: 'The API',
            type: NodeType.HttpService,
            tags: ['api'],
            data: {
              name: 'Service',
              id: 'some-id',
              version: '1.0.0',
            },
          },
          {
            uri: '/openapi.yaml/~1path',
            name: 'The Op',
            type: NodeType.HttpOperation,
            tags: ['api'],
            data: {
              method: 'post',
              id: 'some-id',
              path: '/some/path',
              responses: [],
            },
          },
          {
            uri: '/openapi.yaml/~1components~1model',
            name: 'The Model',
            type: NodeType.Model,
            tags: ['api'],
            data: {},
          },
        ],
        toc,
      );

      expect(toc).toEqual({
        items: [
          {
            title: 'Group',
            type: 'group',
            items: [
              {
                type: 'group',
                title: 'The API',
                items: [
                  {
                    type: 'group',
                    title: 'api',
                    items: [
                      {
                        type: 'item',
                        title: 'The Op',
                        uri: '/openapi.yaml/~1path',
                      },
                    ],
                  },
                  {
                    type: 'group',
                    title: 'Schemas',
                    items: [
                      {
                        type: 'item',
                        title: 'The Model',
                        uri: '/openapi.yaml/~1components~1model',
                      },
                    ],
                  },
                ],
                uri: '/openapi.yaml',
              },
            ],
          },
        ],
      });
    });
  });
});

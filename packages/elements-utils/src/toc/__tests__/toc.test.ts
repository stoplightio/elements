import { NodeType } from '@stoplight/types';

import {
  appendArticlesToToC,
  appendHttpServicesToToC,
  appendModelsToToc,
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
        },
        {
          tags: [],
          type: NodeType.Article,
          name: 'aa',
          uri: '/docs/a/a',
        },
        {
          tags: [],
          type: NodeType.Article,
          name: 'aaa',
          uri: '/docs/a/a/a',
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
        },
        {
          tags: [],
          type: NodeType.Article,
          name: 'aa',
          uri: '/a/a',
        },
        {
          tags: [],
          type: NodeType.Article,
          name: 'aaa',
          uri: '/a/a/a',
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
          },
          {
            type: NodeType.Model,
            tags: ['raz', 'dwa'],
            name: 'b',
            uri: '/reference/openapi.json/definitions/b',
          },
          {
            type: NodeType.Model,
            tags: [],
            name: 'c',
            uri: '/reference/openapi.json/definitions/c',
          },
        ];
        const httpServices: NodeData[] = [
          {
            type: NodeType.HttpService,
            tags: ['raz', 'dwa', 'einz', 'zwei'],
            name: 'Service',
            uri: '/reference/openapi.json',
          },
        ];
        const httpOperations: NodeData[] = [
          {
            type: NodeType.HttpOperation,
            tags: ['zwei'],
            name: 'Operation',
            uri: '/reference/openapi.json/paths/~1test/get',
          },
        ];

        const toc = { items: [] };

        const standaloneModels = appendHttpServicesToToC(toc)({ httpServices, httpOperations, models });

        expect(toc).toEqual({
          items: [
            {
              type: 'group',
              title: 'Service',
              uri: '/reference/openapi.json',
              items: [
                {
                  type: 'group',
                  title: 'raz',
                  items: [{ type: 'item', title: 'b', uri: '/reference/openapi.json/definitions/b' }],
                },
                {
                  type: 'group',
                  items: [{ type: 'item', title: 'Operation', uri: '/reference/openapi.json/paths/~1test/get' }],
                  title: 'zwei',
                },
                {
                  type: 'group',
                  items: [{ type: 'item', title: 'c', uri: '/reference/openapi.json/definitions/c' }],
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
          },
        ]);
      });

      it('groups standalone models', () => {
        const models: NodeData[] = [
          {
            name: 'newone',
            type: NodeType.Model,
            uri: '/newone.yaml',
            tags: ['withTag'],
          },
          {
            name: 'onemore',
            type: NodeType.Model,
            uri: '/onemore.yaml',
            tags: ['withTag'],
          },
          {
            name: 'notag',
            type: NodeType.Model,
            uri: '/notag.yaml',
            tags: [],
          },
        ];
        const toc = generateProjectToC(models);

        expect(toc).toEqual({
          items: [
            {
              type: 'divider',
              title: 'Schemas',
            },
            {
              type: 'group',
              title: 'withTag',
              items: [
                {
                  title: 'newone',
                  type: 'item',
                  uri: '/newone.yaml',
                },
                {
                  title: 'onemore',
                  type: 'item',
                  uri: '/onemore.yaml',
                },
              ],
            },
            {
              title: 'notag',
              type: 'item',
              uri: '/notag.yaml',
            },
          ],
        });
      });

      describe('tags are in mixed case', () => {
        describe('tag is present in httpService tag list', () => {
          it("follows letter case found in HTTP Service node's tags", () => {
            const httpOperations: NodeData[] = [
              {
                type: NodeType.HttpOperation,
                tags: ['stopLIGHT'],
                name: 'Operation#1',
                uri: '/reference/openapi.json/paths/~1test/get',
              },
              {
                type: NodeType.HttpOperation,
                tags: ['STOPlight'],
                name: 'Operation#2',
                uri: '/reference/openapi.json/paths/~1test/post',
              },
            ];
            const httpServices: NodeData[] = [
              {
                type: NodeType.HttpService,
                tags: ['Stoplight'],
                name: 'Service',
                uri: '/reference/openapi.json',
              },
            ];

            const toc = { items: [] };

            appendHttpServicesToToC(toc)({ httpServices, httpOperations, models: [] });

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
              },
              {
                type: NodeType.HttpOperation,
                tags: ['STOPlight'],
                name: 'Operation#2',
                uri: '/reference/openapi.json/paths/~1test/post',
              },
            ];
            const httpServices: NodeData[] = [
              {
                type: NodeType.HttpService,
                name: 'Service',
                tags: [],
                uri: '/reference/openapi.json',
              },
            ];

            const toc = { items: [] };

            appendHttpServicesToToC(toc)({ httpServices, httpOperations, models: [] });

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
          },
          {
            type: NodeType.Model,
            tags: [],
            name: 'b',
            uri: '/reference/openapi.json/definitions/b',
          },
        ];
        const httpServices: NodeData[] = [
          {
            type: NodeType.HttpService,
            name: 'Service',
            tags: [],
            uri: '/reference/openapi.json',
          },
        ];
        const httpOperations: NodeData[] = [
          {
            type: NodeType.HttpOperation,
            tags: [],
            name: 'Operation',
            uri: '/reference/openapi.json/paths/~1test/get',
          },
        ];

        const toc = { items: [] };

        const standaloneModels = appendHttpServicesToToC(toc)({ httpServices, httpOperations, models });

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
        },
        {
          type: NodeType.Model,
          tags: ['raz', 'dwa'],
          name: 'b',
          uri: '/reference/openapi.json/definitions/b',
        },
        {
          type: NodeType.Model,
          tags: [],
          name: 'c',
          uri: '/reference/openapi.json/definitions/c',
        },
      ];

      const toc = { items: [] };

      appendModelsToToc(toc)(models);

      expect(toc).toEqual({
        items: [
          { type: 'divider', title: 'Schemas' },
          { type: 'group', title: 'einz', items: [{ type: 'item', title: 'a', uri: '/models/a' }] },
          {
            type: 'group',
            title: 'raz',
            items: [{ type: 'item', title: 'b', uri: '/reference/openapi.json/definitions/b' }],
          },
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
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'a',
          uri: '/hello/a',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'c',
          uri: '/c',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'b',
          uri: '/hello/b',
        },
      ];

      expect(sortArticlesByTypeAndPath(articles)).toEqual([
        {
          name: 'c',
          uri: '/c',
          type: NodeType.Article,
          tags: [],
        },
        {
          name: 'a',
          uri: '/hello/a',
          type: NodeType.Article,
          tags: [],
        },
        {
          name: 'aa',
          uri: '/hello/a/a',
          type: NodeType.Article,
          tags: [],
        },
        {
          name: 'b',
          uri: '/hello/b',
          type: NodeType.Article,
          tags: [],
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
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'a',
          uri: '/hello/a',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'README',
          uri: '/README',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'b',
          uri: '/docs/b',
        },
      ];

      expect(sortArticlesByTypeAndPath(articles)).toEqual([
        {
          name: 'README',
          uri: '/README',
          type: NodeType.Article,
          tags: [],
        },
        {
          name: 'b',
          uri: '/docs/b',
          type: NodeType.Article,
          tags: [],
        },
        {
          name: 'a',
          uri: '/hello/a',
          type: NodeType.Article,
          tags: [],
        },
        {
          name: 'aa',
          uri: '/hello/a/a',
          type: NodeType.Article,
          tags: [],
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
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'a',
          uri: 'hello/a',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'README',
          uri: 'README',
        },
        {
          type: NodeType.Article,
          tags: [],
          name: 'b',
          uri: 'docs/b',
        },
      ];

      expect(sortArticlesByTypeAndPath(articles)).toEqual([
        {
          name: 'README',
          uri: 'README',
          type: NodeType.Article,
          tags: [],
        },
        {
          name: 'b',
          uri: 'docs/b',
          type: NodeType.Article,
          tags: [],
        },
        {
          name: 'a',
          uri: 'hello/a',
          type: NodeType.Article,
          tags: [],
        },
        {
          name: 'aa',
          uri: 'hello/a/a',
          type: NodeType.Article,
          tags: [],
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
        },
        {
          tags: [],
          type: NodeType.HttpService,
          name: 'b',
          uri: '/b',
        },
        {
          tags: [],
          type: NodeType.HttpOperation,
          name: 'c',
          uri: '/c',
        },
        {
          tags: [],
          type: NodeType.Model,
          name: 'd',
          uri: '/d',
        },
        {
          tags: [],
          type: NodeType.HttpServer,
          name: 'e',
          uri: '/e',
        },
      ];

      expect(groupNodesByType(nodes)).toEqual({
        articles: [
          {
            name: 'a',
            uri: '/a',
            type: NodeType.Article,
            tags: [],
          },
        ],
        httpOperations: [
          {
            name: 'c',
            uri: '/c',
            type: 'http_operation',
            tags: [],
          },
        ],
        httpServices: [
          {
            name: 'b',
            uri: '/b',
            type: 'http_service',
            tags: [],
          },
        ],
        models: [
          {
            name: 'd',
            uri: '/d',
            type: 'model',
            tags: [],
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
          },
          {
            uri: '/openapi.yaml/~1path',
            name: 'The Op',
            type: NodeType.HttpOperation,
            tags: ['api'],
          },
          {
            uri: '/openapi.yaml/~1components~1model',
            name: 'The Model',
            type: NodeType.Model,
            tags: ['api'],
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
                  {
                    title: 'The Model',
                    type: 'item',
                    uri: '/openapi.yaml/~1components~1model',
                  },
                ],
                title: 'api',
                type: 'group',
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
    it('generates correct Project ToC', () => {
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
        {
          uri: '/openapi.yaml',
          name: 'The API',
          type: NodeType.HttpService,
          tags: ['api'],
        },
        {
          uri: '/openapi.yaml/~1zpath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
        },
        {
          uri: '/openapi.yaml/~1fpath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
        },
        {
          uri: '/openapi.yaml/~1apath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
        },
        {
          uri: '/openapi.yaml/~1components~1model',
          name: 'The Model',
          type: NodeType.Model,
          tags: ['api'],
        },
        {
          uri: '/openapi.yaml/~1components~1model',
          name: 'Untagged Model',
          type: NodeType.Model,
          tags: [],
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
                  {
                    title: 'The Model',
                    type: 'item',
                    uri: '/openapi.yaml/~1components~1model',
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
                    title: 'Untagged Model',
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
            type: 'group',
            title: 'api',
            items: [
              {
                title: 'Standalone model',
                type: 'item',
                uri: '/model.yaml',
              },
            ],
          },
        ],
      });
    });

    it('sorts APIs (but not operations) by title', () => {
      const toc = generateProjectToC([
        {
          uri: '/openapi-b.yaml',
          name: 'The API B',
          type: NodeType.HttpService,
          tags: ['api'],
        },
        {
          uri: '/openapi-a.yaml',
          name: 'The API A',
          type: NodeType.HttpService,
          tags: ['api'],
        },
        {
          uri: '/openapi-a.yaml/~1zpath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
        },
        {
          uri: '/openapi-b.yaml/~1fpath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
        },
        {
          uri: '/openapi-b.yaml/~1apath',
          name: 'The Op',
          type: NodeType.HttpOperation,
          tags: ['api'],
        },
        {
          uri: '/openapi-a.yaml/~1components~1model',
          name: 'The Model',
          type: NodeType.Model,
          tags: ['newtag'],
        },
      ]);

      expect(toc).toEqual({
        items: [
          {
            title: 'APIS',
            type: 'divider',
          },
          {
            title: 'The API A',
            type: 'group',
            uri: '/openapi-a.yaml',
            items: [
              {
                items: [
                  {
                    title: 'The Op',
                    type: 'item',
                    uri: '/openapi-a.yaml/~1zpath',
                  },
                ],
                title: 'api',
                type: 'group',
              },
              {
                title: 'newtag',
                type: 'group',
                items: [
                  {
                    title: 'The Model',
                    type: 'item',
                    uri: '/openapi-a.yaml/~1components~1model',
                  },
                ],
              },
            ],
          },
          {
            title: 'The API B',
            type: 'group',
            uri: '/openapi-b.yaml',
            items: [
              {
                items: [
                  {
                    title: 'The Op',
                    type: 'item',
                    uri: '/openapi-b.yaml/~1fpath',
                  },
                  {
                    title: 'The Op',
                    type: 'item',
                    uri: '/openapi-b.yaml/~1apath',
                  },
                ],
                title: 'api',
                type: 'group',
              },
            ],
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
            title: 'api',
            type: 'group',
            items: [
              {
                title: 'Standalone model',
                type: 'item',
                uri: '/model.yaml',
              },
            ],
          },
        ],
      });
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
        {
          uri: '/openapi.yaml',
          name: 'The API',
          type: NodeType.HttpService,
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
            title: 'api',
            type: 'group',
            items: [
              {
                title: 'Standalone model',
                type: 'item',
                uri: '/model.yaml',
              },
            ],
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
          },
          {
            uri: '/openapi.yaml/~1apath',
            name: 'The Op',
            type: NodeType.HttpOperation,
            tags: ['api'],
          },
          {
            uri: '/openapi.yaml/~1fpath',
            name: 'The Op',
            type: NodeType.HttpOperation,
            tags: ['api'],
          },
          {
            uri: '/openapi.yaml/~1zpath',
            name: 'The Op',
            type: NodeType.HttpOperation,
            tags: ['api'],
          },
          {
            uri: '/openapi.yaml/~1components~1model',
            name: 'The Model',
            type: NodeType.Model,
            tags: ['api'],
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
          },
          {
            uri: '/openapi-1.yaml/~1path',
            name: 'The Op 1',
            type: NodeType.HttpOperation,
            tags: ['api'],
          },
          {
            uri: '/openapi-1.yaml/~1components~1model',
            name: 'The Model 1',
            type: NodeType.Model,
            tags: ['api'],
          },
          {
            uri: '/openapi-2.yaml',
            name: 'The API 2',
            type: NodeType.HttpService,
            tags: ['api'],
          },
          {
            uri: '/openapi-2.yaml/~1path',
            name: 'The Op 2',
            type: NodeType.HttpOperation,
            tags: ['api'],
          },
          {
            uri: '/openapi-2.yaml/~1components~1model',
            name: 'The Model 2',
            type: NodeType.Model,
            tags: [],
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
          },
          {
            uri: '/openapi.yaml/~1path',
            name: 'The Op',
            type: NodeType.HttpOperation,
            tags: ['api'],
          },
          {
            uri: '/openapi.yaml/~1components~1model',
            name: 'The Model',
            type: NodeType.Model,
            tags: ['api'],
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

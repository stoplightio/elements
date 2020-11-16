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
import { ITableOfContents } from '../types';

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
        const models = [
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
        const httpServices = [
          {
            type: NodeType.HttpService,
            tags: ['raz', 'dwa', 'einz', 'zwei'],
            name: 'Service',
            uri: '/reference/openapi.json',
          },
        ];
        const httpOperations = [
          {
            type: NodeType.HttpOperation,
            tags: ['zwei'],
            name: 'Operation',
            uri: '/reference/openapi.json/paths/~1test/get',
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
          },
        ]);
      });

      describe('tags are in mixed case', () => {
        it('performs case insensitive grouping', () => {
          const models = [
            {
              type: NodeType.Model,
              tags: ['einz'],
              name: 'Model',
              uri: '/reference/openapi.json/components/a',
            },
          ];
          const httpServices = [
            {
              type: NodeType.HttpService,
              tags: ['Einz'],
              name: 'Service',
              uri: '/reference/openapi.json',
            },
          ];
          const httpOperations = [
            {
              type: NodeType.HttpOperation,
              tags: ['Einz'],
              name: 'Operation',
              uri: '/reference/openapi.json/paths/~1test/get',
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
            const httpOperations = [
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
            const httpServices = [
              {
                type: NodeType.HttpService,
                tags: ['Stoplight'],
                name: 'Service',
                uri: '/reference/openapi.json',
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
            const httpOperations = [
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
            const httpServices = [
              {
                type: NodeType.HttpService,
                name: 'Service',
                tags: [],
                uri: '/reference/openapi.json',
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
        const models = [
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
        const httpServices = [
          {
            type: NodeType.HttpService,
            name: 'Service',
            tags: [],
            uri: '/reference/openapi.json',
          },
        ];
        const httpOperations = [
          {
            type: NodeType.HttpOperation,
            tags: [],
            name: 'Operation',
            uri: '/reference/openapi.json/paths/~1test/get',
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
          },
        ]);
      });
    });
  });

  describe('mapModelsToToc()', () => {
    it('converts properly', () => {
      const models = [
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
          { type: 'item', title: 'a', uri: '/models/a' },
          { type: 'item', title: 'b', uri: '/reference/openapi.json/definitions/b' },
          { type: 'item', title: 'c', uri: '/reference/openapi.json/definitions/c' },
        ],
      });
    });
  });

  describe('sortArticlesByTypeAndPath()', () => {
    it('sorts correctly', () => {
      const articles = [
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
      const articles = [
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
      const articles = [
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
      const nodes = [
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
                uri: '/openapi.yaml/~1apath',
              },
              {
                title: 'The Op',
                type: 'item',
                uri: '/openapi.yaml/~1fpath',
              },
              {
                title: 'The Op',
                type: 'item',
                uri: '/openapi.yaml/~1zpath',
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
                    uri: '/openapi.yaml/~1apath',
                  },
                  {
                    title: 'The Op',
                    type: 'item',
                    uri: '/openapi.yaml/~1fpath',
                  },
                  {
                    title: 'The Op',
                    type: 'item',
                    uri: '/openapi.yaml/~1zpath',
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

    it('snapshot of platform docs', () => {
      expect(
        generateApiToC([
          {
            name: 'Add Projects',
            type: NodeType.Article,
            tags: [],
            uri: '/1.-quickstarts/add-projects-quickstart.md',
          },
          {
            name: 'Gitea',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/f.gitea.md',
          },
          {
            name: 'Troubleshooting',
            type: NodeType.Article,
            tags: [],
            uri: '/c.troubleshooting.md',
          },
          {
            name: 'Branch Management',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/h.branch-management.md',
          },
          {
            name: 'Migrating from Postman',
            type: NodeType.Article,
            tags: [],
            uri: '/6.-migrations/postman.md',
          },
          {
            name: 'Introduction to Stoplight Platform',
            type: NodeType.Article,
            tags: [],
            uri: '/b.overview.md',
          },
          {
            name: 'GitHub Enterprise',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/d.github-enterprise.md',
          },
          {
            name: 'Bitbucket Server',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/c.bitbucket-server.md',
          },
          {
            name: 'GitLab',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/e.gitlab.md',
          },
          {
            name: 'Types of Documentation',
            type: NodeType.Article,
            tags: ['Documentation'],
            uri: '/4.-documentation/b.types-of-documentation.md',
          },
          {
            name: 'Single Sign-On',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/e.configuring-authentication.md',
          },
          {
            name: 'Exploring your API projects',
            type: NodeType.Article,
            tags: ['Governance'],
            uri: '/5.-governance/bb.exploring-your-api-projects.md',
          },
          {
            name: 'Start a new API design',
            type: NodeType.Article,
            tags: ['Design'],
            uri: '/3.-design/b.starting-a-new-api-design.md',
          },
          {
            name: 'Welcome to the Stoplight Docs!',
            type: NodeType.Article,
            tags: [],
            uri: '/a.introduction.md',
          },
          {
            name: 'Overview',
            type: NodeType.Article,
            tags: ['Documentation'],
            uri: '/4.-documentation/a.overview.md',
          },
          {
            name: 'Bitbucket Cloud',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/b.bitbucket-cloud.md',
          },
          {
            name: 'Creating a workspace',
            type: NodeType.Article,
            tags: ['Workspaces'],
            uri: '/2.-workspaces/a.creating-a-workspace.md',
          },
          {
            name: 'Add Projects',
            type: NodeType.Article,
            tags: ['Workspaces'],
            uri: '/2.-workspaces/b.adding-projects.md',
          },
          {
            name: 'Overview',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/configure-git/a.configuring-git.md',
          },
          {
            name: 'Style Guides',
            type: NodeType.Article,
            tags: ['Governance'],
            uri: '/5.-governance/d.style-guides.md',
          },
          {
            name: 'Review API Designs',
            type: NodeType.Article,
            tags: [],
            uri: '/3.-design/c.reviewing-your-api-design.md',
          },
          {
            name: 'Work with Local Projects',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/f.working-with-local-projects.md',
          },
          {
            name: 'Configure Projects',
            type: NodeType.Article,
            tags: ['Workspaces'],
            uri: '/2.-workspaces/c.config.md',
          },
          {
            name: 'Migrating from NEXT',
            type: NodeType.Article,
            tags: [],
            uri: '/6.-migrations/next.md',
          },
          {
            name: 'Get Started with API Governance',
            type: NodeType.Article,
            tags: ['governance'],
            uri: '/5.-governance/b.getting-started-with-api-governance.md',
          },
          {
            name: 'Integrate Behind the Firewall',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/i.allowlisting-ips.md',
          },
          {
            name: 'Publishing',
            type: NodeType.Article,
            tags: [],
            uri: '/2.-workspaces/g.automating-publishing.md',
          },
          {
            name: 'Creating a Design Library',
            type: NodeType.Article,
            tags: ['Governance'],
            uri: '/5.-governance/c.creating-a-design-library.md',
          },
          {
            name: 'Quality API Reference Documentation',
            type: NodeType.Article,
            tags: ['Documentation'],
            uri: '/4.-documentation/c.quality-api-reference-docs.md',
          },
          {
            name: 'Working with Mock Servers',
            type: NodeType.Article,
            tags: ['Design'],
            uri: '/3.-design/d.setting-up-a-mock-server.md',
          },
          {
            name: 'Organize Your Team',
            type: NodeType.Article,
            tags: ['Workspaces'],
            uri: '/2.-workspaces/d.inviting-your-team.md',
          },
          {
            name: 'Overview',
            type: NodeType.Article,
            tags: ['Governance'],
            uri: '/5.-governance/a.overview.md',
          },
          {
            name: 'Share Documentation',
            type: NodeType.Article,
            tags: [],
            uri: '/1.-quickstarts/share-documentation-quickstart.md',
          },
          {
            name: 'Overview',
            type: NodeType.Article,
            tags: ['Design'],
            uri: '/3.-design/a.overview.md',
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
  });
});

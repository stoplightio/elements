import { dirname, sep } from '@stoplight/path';
import { NodeType } from '@stoplight/types';
import { escapeRegExp, partial, sortBy } from 'lodash';
import { pipe } from 'lodash/fp';

import { Group, isDivider, isGroup, isItem, ITableOfContents, Item, NodeData, TableOfContentItem } from './types';

type SchemaType = 'divider' | 'group';

export function generateProjectToC(searchResults: NodeData[]) {
  return pipe(
    () => searchResults,
    groupNodesByType,
    ({ articles, models, httpServices, httpOperations }) => {
      const toc: ITableOfContents = { items: [] };

      // Articles
      pipe(() => articles, sortArticlesByTypeAndPath, appendArticlesToToC(toc))();

      if (httpServices.length > 0) {
        toc.items.push({ type: 'divider', title: 'APIS' });
      }

      pipe(
        () => httpServices,
        httpServices =>
          appendHttpServicesToToC(toc)({
            httpServices,
            models,
            httpOperations,
          }),
        appendModelsToToc(toc, 'divider'),
      )();

      return toc;
    },
  )();
}

export function generateTocSkeleton(searchResults: NodeData[]) {
  return pipe(
    () => searchResults,
    groupNodesByType,
    ({ articles, models, httpServices }) => {
      const toc: ITableOfContents = { items: [] };

      // Articles
      pipe(() => articles, sortArticlesByTypeAndPath, appendArticlesToToC(toc))();

      // HTTP Services
      toc.items.push({ type: 'divider', title: 'APIS' });
      pipe(() => httpServices, appendHttpServicesItemsToToC(toc))();

      // Models
      pipe(() => models, appendModelsToToc(toc))();

      return toc;
    },
  )();
}

function modifyEach(
  items: TableOfContentItem[],
  apply: (item: Item) => TableOfContentItem[],
  shouldReplace?: (item: Item) => boolean,
) {
  for (let i = items.length - 1; i > -1; i--) {
    const item = items[i];
    if (isItem(item)) {
      if (shouldReplace?.(item)) {
        items.splice(i, 1, ...apply(item));
      } else {
        items.splice(i + 1, 0, ...apply(item));
      }
    }
    if (isGroup(item)) {
      modifyEach(item.items, apply, shouldReplace);
    }
  }
}

function cleanDividers(group: Group) {
  group.items = group.items.filter(item => !isDivider(item));
  group.items.filter(isGroup).forEach(cleanDividers);
}

function cleanToc(toc: ITableOfContents) {
  toc.items.filter(isGroup).forEach(cleanDividers);
}

export function resolveHttpServices(searchResults: NodeData[], toc: ITableOfContents) {
  cleanToc(toc);
  pipe(
    () => searchResults,
    groupNodesByType,
    ({ models, httpServices, httpOperations }) => {
      modifyEach(
        toc.items,
        item => {
          const httpService = httpServices.find(matchesUri(item.uri));

          if (!httpService) return [];

          const { hasTags, ...subNodes } = filterByUriRegexpAndCheckTags([])({
            httpOperations,
            models,
            regexp: new RegExp(`^${escapeRegExp(httpService.uri)}\/`, 'i'),
          });

          const items: TableOfContentItem[] = [];

          appendHttpServiceItemsToToC({ items })(subNodes, httpService.tags || []);

          return [{ type: 'group', title: item.title, items, uri: httpService.uri }];
        },
        item => httpServices.some(matchesUri(item.uri)),
      );
    },
  )();
}

function matchesUri(uri: string) {
  return (item: NodeData) => item.uri.replace(/^\//, '') === uri.replace(/^\//, '');
}

export function groupNodesByType(searchResults: NodeData[]) {
  return searchResults.reduce<{
    articles: Array<NodeData>;
    models: Array<NodeData>;
    httpServices: Array<NodeData>;
    httpOperations: Array<NodeData>;
  }>(
    (results, searchResult) => {
      switch (searchResult.type) {
        case NodeType.Article:
          results.articles.push(searchResult);
          break;
        case NodeType.HttpOperation:
          results.httpOperations.push(searchResult);
          break;
        case NodeType.HttpService:
          results.httpServices.push(searchResult);
          break;
        case NodeType.Model:
          results.models.push(searchResult);
          break;
      }

      return results;
    },
    { articles: [], models: [], httpServices: [], httpOperations: [] },
  );
}

export function sortArticlesByTypeAndPath(articles: NodeData[]) {
  return articles.sort((a1, a2) => {
    const rootDirs = ['/', '.', '/docs', 'docs'];
    const a1DirPath = dirname(a1.uri);
    const a2DirPath = dirname(a2.uri);

    // articles without a directory are lifted to the top
    const dirOrder =
      rootDirs.includes(a1DirPath) || rootDirs.includes(a2DirPath) ? a1DirPath.localeCompare(a2DirPath) : 0;

    return dirOrder === 0 ? a1.uri.localeCompare(a2.uri) : dirOrder;
  });
}

function findOrCreateArticleGroup(toc: ITableOfContents) {
  return (dirs: string[]) => {
    return dirs.reduce<ITableOfContents | Group>((group, dir, i) => {
      if (i === 0) {
        // for depth=0 create the dividers
        const divider = group.items.filter(isDivider).find(item => item.title === dir);

        if (!divider) {
          group.items.push({ type: 'divider', title: dir });
        }

        return group;
      } else {
        // for depth>0 create groups
        const childGroup = group.items.filter(isGroup).find(item => item.title === dir);

        if (!childGroup) {
          const newGroup: Group = { type: 'group', title: dir, items: [] };
          group.items.push(newGroup);

          return newGroup;
        }

        return childGroup;
      }
    }, toc);
  };
}

export function appendArticlesToToC(toc: ITableOfContents) {
  return (articles: NodeData[]) => {
    return articles.reduce<ITableOfContents>(
      (toc, article) =>
        pipe(partial(getDirsFromUri, article.uri), findOrCreateArticleGroup(toc), group => {
          group.items.push({ type: 'item', title: article.name, uri: article.uri });
          return toc;
        })(),
      toc,
    );
  };
}

function filterByUriRegexpAndCheckTags(standaloneModels: NodeData[]) {
  return ({ regexp, httpOperations, models }: { regexp: RegExp; httpOperations: NodeData[]; models: NodeData[] }) => {
    let hasTags = false;

    return {
      httpOperations: httpOperations.filter(n => {
        const isRelevant = regexp.test(n.uri);
        if (isRelevant && n.tags?.length) {
          hasTags = true;
        }
        return isRelevant;
      }),
      models: models.filter(n => {
        const isRelevant = regexp.test(n.uri);
        if (isRelevant) {
          if (n.tags?.length) {
            hasTags = true;
          }

          standaloneModels.splice(
            standaloneModels.findIndex(m => m === n),
            1,
          );
        }

        return isRelevant;
      }),
      hasTags,
    };
  };
}

function appendHttpServiceItemsToToC(toc: ITableOfContents) {
  return (
    { httpOperations, models }: { httpOperations: NodeData[]; models: NodeData[] },
    serviceTagNames: string[],
  ) => {
    const operationsAndModels = [
      ...httpOperations.map(i => ({ ...i, nodeType: NodeType.HttpOperation })),
      ...models.map(i => ({ ...i, nodeType: NodeType.Model })),
    ];

    const { groups, ungroupedModels, ungroupedOperations } = operationsAndModels.reduce<{
      groups: { [key: string]: Group };
      ungroupedOperations: Item[];
      ungroupedModels: NodeData[];
    }>(
      (result, subNode) => {
        const [tagName] = subNode.tags || [];
        const item: Item = {
          type: 'item',
          title: subNode.name,
          uri: subNode.uri,
        };

        if (tagName) {
          if (result.groups[tagName.toLowerCase()]) {
            result.groups[tagName.toLowerCase()].items.push(item);
          } else {
            const serviceTagName = serviceTagNames.find(tn => tn.toLowerCase() === tagName.toLowerCase());
            result.groups[tagName.toLowerCase()] = {
              type: 'group',
              title: serviceTagName || tagName,
              items: [item],
            };
          }
        } else {
          if (subNode.nodeType === NodeType.HttpOperation) {
            result.ungroupedOperations.push(item);
          } else {
            result.ungroupedModels.push(subNode);
          }
        }

        return result;
      },
      { groups: {}, ungroupedOperations: [], ungroupedModels: [] },
    );

    ungroupedOperations.forEach(item => toc.items.push(item));

    const tagNamesLC = serviceTagNames.map(tn => tn.toLowerCase());

    Object.entries(groups)
      .sort(([g1], [g2]) => {
        const g1LC = g1.toLowerCase();
        const g2LC = g2.toLowerCase();
        const g1Idx = tagNamesLC.findIndex(tn => tn === g1LC);
        const g2Idx = tagNamesLC.findIndex(tn => tn === g2LC);

        // Move not-tagged groups to the bottom
        if (g1Idx < 0 && g2Idx < 0) return 0;
        if (g1Idx < 0) return 1;
        if (g2Idx < 0) return -1;

        // sort tagged groups according to the order found in HttpService
        return g1Idx - g2Idx;
      })
      .forEach(([, group]) => toc.items.push(group));

    appendModelsToToc(toc, 'group')(ungroupedModels);
  };
}

function appendHttpServicesItemsToToC(toc: ITableOfContents) {
  return (httpServices: NodeData[]) => {
    if (httpServices.length) {
      httpServices.forEach(httpService =>
        toc.items.push({ type: 'item', title: httpService.name, uri: httpService.uri }),
      );
    }
  };
}

export function appendHttpServicesToToC(toc: ITableOfContents) {
  return ({
    httpServices,
    httpOperations,
    models,
  }: {
    httpServices: NodeData[];
    httpOperations: NodeData[];
    models: NodeData[];
  }) => {
    const standaloneModels = models.slice();
    sortBy(httpServices, 'name').forEach(httpService => {
      let tocNode: ITableOfContents | Group;

      tocNode = { type: 'group', title: httpService.name, items: [], uri: httpService.uri };
      toc.items.push(tocNode);

      pipe(
        () => ({
          httpOperations,
          models,
          regexp: new RegExp(`^${escapeRegExp(httpService.uri)}${httpService.uri.endsWith('/') ? '' : '/'}`, 'i'),
        }),
        filterByUriRegexpAndCheckTags(standaloneModels),
        ({ hasTags, ...subNodes }) => appendHttpServiceItemsToToC(tocNode)(subNodes, httpService.tags || []),
      )();
    });
    return standaloneModels;
  };
}

export function appendModelsToToc(toc: ITableOfContents, schemaType: SchemaType = 'divider') {
  return (models: NodeData[]) => {
    if (models.length) {
      const { others, groups } = models.reduce<{
        groups: { [key: string]: Group };
        others: Item[];
      }>(
        (result, model) => {
          const [tagName] = model.tags || [];
          const item: Item = { type: 'item', title: model.name, uri: model.uri };

          if (tagName) {
            if (result.groups[tagName.toLowerCase()]) {
              result.groups[tagName.toLowerCase()].items.push(item);
            } else {
              result.groups[tagName.toLowerCase()] = {
                type: 'group',
                title: tagName,
                items: [item],
              };
            }
          } else {
            result.others.push(item);
          }

          return result;
        },
        { groups: {}, others: [] },
      );

      const childItems: TableOfContentItem[] = [];
      Object.entries(groups).forEach(([, group]) => childItems.push(group));
      others.forEach(item => childItems.push(item));

      if (schemaType === 'divider') {
        toc.items.push({ type: 'divider', title: 'Schemas' });
        toc.items.push(...childItems);
      } else {
        toc.items.push({ type: 'group', title: 'Schemas', items: childItems });
      }
    }
  };
}

function getDirsFromUri(uri: string) {
  const strippedUri = uri.replace(/^\/?(?:docs\/)?/, '');
  return strippedUri.split(sep).slice(0, -1);
}

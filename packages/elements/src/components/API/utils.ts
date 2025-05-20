import {
  isHttpOperation,
  isHttpService,
  isHttpWebhookOperation,
  resolveUrl,
  TableOfContentsGroup,
  TableOfContentsItem,
} from '@stoplight/elements-core';
import { INodeTag } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';

import { OperationNode, SchemaNode, ServiceChildNode, ServiceNode, WebhookNode } from '../../utils/oas/types';

type GroupableNode = OperationNode | WebhookNode | SchemaNode;

type OpenApiTagGroup = { name: string; tags: string[] };

export type TagGroup<T extends GroupableNode> = { title: string; isDivider: boolean; items?: T[] };

export function computeTagGroups<T extends GroupableNode>(
  serviceNode: ServiceNode,
  nodeType: T['type'],
  config: { useTagGroups: boolean },
): { groups: TagGroup<T>[]; ungrouped: T[] } {
  const groupsByTagId: { [tagId: string]: TagGroup<T> } = {};
  const nodesByTagId: { [tagId: string]: TagGroup<T> } = {};
  const ungrouped: T[] = [];

  const { useTagGroups = false } = config ?? {};

  const lowerCaseServiceTags = serviceNode.tags.map(tn => tn.toLowerCase());

  const groupableNodes = serviceNode.children.filter(n => n.type === nodeType) as T[];

  const rawServiceTags = serviceNode.data.tags ?? [];

  const serviceExtensions = serviceNode.data.extensions ?? {};
  const tagGroupExtensionName = Object.keys(serviceExtensions).find(item => item.toLowerCase() === 'x-taggroups');
  const tagGroups: OpenApiTagGroup[] = tagGroupExtensionName
    ? (serviceExtensions[tagGroupExtensionName] as OpenApiTagGroup[])
    : [];

  for (const node of groupableNodes) {
    for (const tagName of node.tags) {
      const tagId = tagName.toLowerCase();
      if (groupsByTagId[tagId]) {
        groupsByTagId[tagId].items?.push(node);
      } else {
        const serviceTagIndex = lowerCaseServiceTags.findIndex(tn => tn === tagId);
        const rawServiceTag: INodeTag & { 'x-displayName': string | undefined } = rawServiceTags[
          serviceTagIndex
        ] as INodeTag & { 'x-displayName': string | undefined };
        let serviceTagName = serviceNode.tags[serviceTagIndex];
        if (rawServiceTag && typeof rawServiceTag['x-displayName'] !== 'undefined') {
          serviceTagName = rawServiceTag['x-displayName'];
        }
        groupsByTagId[tagId] = {
          title: serviceTagName || tagName,
          isDivider: false,
          items: [node],
        };
      }

      // Only bother collecting node-groups mapping data when tag groups are used
      if (useTagGroups) {
        for (const nodeTag of node.tags) {
          const nodeTagId = nodeTag.toLowerCase();
          const serviceTag = rawServiceTags.find(t => t.name.toLowerCase() === nodeTagId) as
            | (INodeTag & {
                'x-displayName': string | undefined;
              })
            | undefined;

          let nodeTagName = nodeTag;
          if (serviceTag && typeof serviceTag['x-displayName'] !== 'undefined') {
            nodeTagName = serviceTag['x-displayName'];
          }

          if (nodesByTagId[nodeTagId]) {
            nodesByTagId[nodeTagId].items?.push(node);
          } else {
            nodesByTagId[nodeTagId] = {
              title: nodeTagName,
              isDivider: false,
              items: [node],
            };
          }
        }
      }
    }
    if (node.tags.length === 0) {
      ungrouped.push(node);
    }
  }

  let orderedTagGroups: TagGroup<T>[] = [];
  if (useTagGroups) {
    let grouped: TagGroup<T>[] = [];
    for (const tagGroup of tagGroups) {
      if (!tagGroup.tags.length) {
        continue;
      }

      const tagGroups = [];
      for (const tag of tagGroup.tags) {
        const tagGroupTagId = tag.toLowerCase();
        const entries = nodesByTagId[tagGroupTagId];
        if (entries) {
          tagGroups.push(entries);
        }
      }

      //
      if (tagGroups.length > 0) {
        let groupTitle = tagGroup.name;

        const groupTag = rawServiceTags.find(t => t.name.toLowerCase() === tagGroup.name.toLowerCase()) as
          | (INodeTag & {
              'x-displayName': string | undefined;
            })
          | undefined;
        if (groupTag && typeof groupTag['x-displayName'] !== 'undefined') {
          groupTitle = groupTag['x-displayName'];
        }

        grouped.push({
          title: groupTitle,
          isDivider: true,
        });

        for (const entries of tagGroups) {
          grouped.push(entries);
        }
      }
    }

    return { groups: grouped, ungrouped };
  }

  orderedTagGroups = Object.entries(groupsByTagId)
    .sort(([g1], [g2]) => {
      const g1LC = g1.toLowerCase();
      const g2LC = g2.toLowerCase();
      const g1Idx = lowerCaseServiceTags.findIndex(tn => tn === g1LC);
      const g2Idx = lowerCaseServiceTags.findIndex(tn => tn === g2LC);

      // Move not-tagged groups to the bottom
      if (g1Idx < 0 && g2Idx < 0) return 0;
      if (g1Idx < 0) return 1;
      if (g2Idx < 0) return -1;

      // sort tagged groups according to the order found in HttpService
      return g1Idx - g2Idx;
    })
    .map(([, tagGroup]) => tagGroup);

  return { groups: orderedTagGroups, ungrouped };
}

// interface ComputeAPITreeConfig {
//   hideSchemas?: boolean;
//   hideInternal?: boolean;
// }

// const defaultComputerAPITreeConfig = {
//   hideSchemas: false,
//   hideInternal: false,
// };

// export const computeAPITree = (serviceNode: ServiceNode, config: ComputeAPITreeConfig = {}) => {
//   const mergedConfig = defaults(config, defaultComputerAPITreeConfig);
//   const tree: TableOfContentsItem[] = [];

//   tree.push({
//     id: '/',
//     slug: '/',
//     title: 'Overview',
//     type: 'overview',
//     meta: '',
//   });

//   const hasOperationNodes = serviceNode.children.some(node => node.type === NodeType.HttpOperation);
//   if (hasOperationNodes) {
//     tree.push({
//       title: 'Endpoints',
//     });

//     const { groups, ungrouped } = computeTagGroups<OperationNode>(serviceNode, NodeType.HttpOperation);
//     addTagGroupsToTree(groups, ungrouped, tree, NodeType.HttpOperation, mergedConfig.hideInternal);
//   }

//   const hasWebhookNodes = serviceNode.children.some(node => node.type === NodeType.HttpWebhook);
//   if (hasWebhookNodes) {
//     tree.push({
//       title: 'Webhooks',
//     });

//     const { groups, ungrouped } = computeTagGroups<WebhookNode>(serviceNode, NodeType.HttpWebhook);
//     addTagGroupsToTree(groups, ungrouped, tree, NodeType.HttpWebhook, mergedConfig.hideInternal);
//   }

//   let schemaNodes = serviceNode.children.filter(node => node.type === NodeType.Model);
//   if (mergedConfig.hideInternal) {
//     schemaNodes = schemaNodes.filter(n => !isInternal(n));
//   }

//   if (!mergedConfig.hideSchemas && schemaNodes.length) {
//     tree.push({
//       title: 'Schemas',
//     });

//     const { groups, ungrouped } = computeTagGroups<SchemaNode>(serviceNode, NodeType.Model);
//     addTagGroupsToTree(groups, ungrouped, tree, NodeType.Model, mergedConfig.hideInternal);
//   }
//   return tree;
// };

// export const findFirstNodeSlug = (tree: TableOfContentsItem[]): string | void => {
//   for (const item of tree) {
//     if ('slug' in item) {
//       return item.slug;
//     }

//     if ('items' in item) {
//       const slug = findFirstNodeSlug(item.items);
//       if (slug) {
//         return slug;
//       }
//     }
//   }

//   return;
// };

export const isInternal = (node: ServiceChildNode | ServiceNode): boolean => {
  const data = node.data;

  if (isHttpOperation(data) || isHttpWebhookOperation(data)) {
    return !!data.internal;
  }

  if (isHttpService(data)) {
    return false;
  }

  return !!data['x-internal' as keyof JSONSchema7];
};

export const addTagGroupsToTree = <T extends GroupableNode>(
  groups: TagGroup<T>[],
  ungrouped: T[],
  tree: TableOfContentsItem[],
  itemsType: TableOfContentsGroup['itemsType'],
  config: { hideInternal: boolean; useTagGroups: boolean },
) => {
  const { hideInternal = false } = config ?? {};
  // Show ungrouped nodes above tag groups
  ungrouped.forEach(node => {
    if (hideInternal && isInternal(node)) {
      return;
    }
    tree.push({
      id: node.uri,
      slug: node.uri,
      title: node.name,
      type: node.type,
      meta: isHttpOperation(node.data) || isHttpWebhookOperation(node.data) ? node.data.method : '',
    });
  });

  groups.forEach(group => {
    const items = group.items?.flatMap(node => {
      if (hideInternal && isInternal(node)) {
        return [];
      }
      return {
        id: node.uri,
        slug: node.uri,
        title: node.name,
        type: node.type,
        meta: isHttpOperation(node.data) || isHttpWebhookOperation(node.data) ? node.data.method : '',
      };
    });
    if (items && items.length > 0) {
      tree.push({
        title: group.title,
        items,
        itemsType,
      });
    } else if (group.isDivider) {
      tree.push({
        title: group.title,
      });
    }
  });
};

export const resolveRelativePath = (currentPath: string, basePath: string, outerRouter: boolean): string => {
  if (!outerRouter || !basePath || basePath === '/') {
    return currentPath;
  }
  const baseUrl = resolveUrl(basePath);
  const currentUrl = resolveUrl(currentPath);
  return baseUrl && currentUrl && baseUrl !== currentUrl ? currentUrl.replace(baseUrl, '') : '/';
};

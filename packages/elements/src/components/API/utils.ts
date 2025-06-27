import {
  isHttpOperation,
  isHttpService,
  isHttpWebhookOperation,
  resolveUrl,
  TableOfContentsGroup,
  TableOfContentsItem,
  TableOfContentsNode,
} from '@stoplight/elements-core';
import { NodeType } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';
import { defaults } from 'lodash';

import { OperationNode, SchemaNode, ServiceChildNode, ServiceNode, WebhookNode } from '../../utils/oas/types';

type GroupableNode = OperationNode | WebhookNode | SchemaNode;

export type TagGroup<T extends GroupableNode> = { title: string; items: T[] };

export function computeTagGroups<T extends GroupableNode>(serviceNode: ServiceNode, nodeType: T['type']) {
  const groupsByTagId: { [tagId: string]: TagGroup<T> } = {};
  const ungrouped: T[] = [];

  const lowerCaseServiceTags = serviceNode.tags.map(tn => tn.toLowerCase());

  const groupableNodes = serviceNode.children.filter(n => n.type === nodeType) as T[];

  for (const node of groupableNodes) {
    for (const tagName of node.tags) {
      const tagId = tagName.toLowerCase();
      if (groupsByTagId[tagId]) {
        groupsByTagId[tagId].items.push(node);
      } else {
        const serviceTagIndex = lowerCaseServiceTags.findIndex(tn => tn === tagId);
        const serviceTagName = serviceNode.tags[serviceTagIndex];
        groupsByTagId[tagId] = {
          title: serviceTagName || tagName,
          items: [node],
        };
      }
    }
    if (node.tags.length === 0) {
      ungrouped.push(node);
    }
  }

  const orderedTagGroups = Object.entries(groupsByTagId)
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

interface ComputeAPITreeConfig {
  hideSchemas?: boolean;
  hideInternal?: boolean;
}

const defaultComputerAPITreeConfig = {
  hideSchemas: false,
  hideInternal: false,
};

export const computeAPITree = (serviceNode: ServiceNode, config: ComputeAPITreeConfig = {}) => {
  const mergedConfig = defaults(config, defaultComputerAPITreeConfig);
  const tree: TableOfContentsItem[] = [];

  tree.push({
    id: '/',
    slug: '/',
    title: 'Overview',
    type: 'overview',
    meta: '',
  });

  const xTagGroups = (serviceNode.data.infoExtensions?.['x-tagGroups'] || []) as any[];

  const hasOperationNodes = serviceNode.children.some(node => node.type === NodeType.HttpOperation);
  if (hasOperationNodes) {
    const { groups, ungrouped } = computeTagGroups<OperationNode>(serviceNode, NodeType.HttpOperation);
    addTagGroupsToTree(
      'Endpoints',
      groups,
      ungrouped,
      tree,
      NodeType.HttpOperation,
      mergedConfig.hideInternal,
      xTagGroups,
    );
  }

  const hasWebhookNodes = serviceNode.children.some(node => node.type === NodeType.HttpWebhook);
  if (hasWebhookNodes) {
    const { groups, ungrouped } = computeTagGroups<WebhookNode>(serviceNode, NodeType.HttpWebhook);
    addTagGroupsToTree(
      'Webhooks',
      groups,
      ungrouped,
      tree,
      NodeType.HttpWebhook,
      mergedConfig.hideInternal,
      xTagGroups,
    );
  }

  let schemaNodes = serviceNode.children.filter(node => node.type === NodeType.Model);
  if (mergedConfig.hideInternal) {
    schemaNodes = schemaNodes.filter(n => !isInternal(n));
  }

  if (!mergedConfig.hideSchemas && schemaNodes.length) {
    const { groups, ungrouped } = computeTagGroups<SchemaNode>(serviceNode, NodeType.Model);
    addTagGroupsToTree('Schemas', groups, ungrouped, tree, NodeType.Model, mergedConfig.hideInternal, xTagGroups);
  }
  return tree;
};

export const findFirstNodeSlug = (tree: TableOfContentsItem[]): string | void => {
  for (const item of tree) {
    if ('slug' in item) {
      return item.slug;
    }

    if ('items' in item) {
      const slug = findFirstNodeSlug(item.items);
      if (slug) {
        return slug;
      }
    }
  }

  return;
};

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

const addTagGroupsToTree = <T extends GroupableNode>(
  sectionTitle: string,
  groups: TagGroup<T>[],
  ungrouped: T[],
  tree: TableOfContentsItem[],
  itemsType: TableOfContentsGroup['itemsType'],
  hideInternal: boolean,
  xTagGroups: any[],
) => {
  tree.push({
    title: sectionTitle,
  });

  const processedItemIds = new Set<string>();

  // Process x-tagGroups first
  xTagGroups.forEach((xTagGroup: { name: string; tags: string[] }) => {
    const xTagGroupTitle = xTagGroup.name;
    const xTagGroupItems: TableOfContentsGroup['items'] = []; // This will hold the nested tag groups

    xTagGroup.tags.forEach((tagName: string) => {
      const individualTagGroup = groups.find(g => g.title === tagName); // Find the group for this individual tag
      if (individualTagGroup) {
        const nodesForThisTag: TableOfContentsNode[] = [];
        individualTagGroup.items.forEach(node => {
          if (!(hideInternal && isInternal(node)) && !processedItemIds.has(node.uri)) {
            nodesForThisTag.push({
              id: node.uri,
              slug: node.uri,
              title: node.name,
              type: node.type,
              meta: isHttpOperation(node.data) || isHttpWebhookOperation(node.data) ? node.data.method : '',
            });
            processedItemIds.add(node.uri);
          }
        });

        if (nodesForThisTag.length > 0) {
          // Create a nested TableOfContentsGroup for the individual tag
          xTagGroupItems.push({
            title: individualTagGroup.title, // Use the individual tag name as the title
            items: nodesForThisTag,
            itemsType,
          });
        }
      }
    });

    if (xTagGroupItems.length > 0) {
      // Push the top-level x-tagGroup as a divider
      tree.push({
        title: xTagGroupTitle,
      });
      // Push the nested tag groups directly to the main tree
      xTagGroupItems.forEach(item => tree.push(item));
    }
  });

  // Add remaining ungrouped items (not part of any x-tagGroups)
  ungrouped.forEach(node => {
    if (!(hideInternal && isInternal(node)) && !processedItemIds.has(node.uri)) {
      tree.push({
        id: node.uri,
        slug: node.uri,
        title: node.name,
        type: node.type,
        meta: isHttpOperation(node.data) || isHttpWebhookOperation(node.data) ? node.data.method : '',
      });
      processedItemIds.add(node.uri);
    }
  });

  // Add remaining groups (not part of any x-tagGroups)
  groups.forEach(group => {
    const items: TableOfContentsGroup['items'] = [];
    group.items.forEach(node => {
      if (!(hideInternal && isInternal(node)) && !processedItemIds.has(node.uri)) {
        items.push({
          id: node.uri,
          slug: node.uri,
          title: node.name,
          type: node.type,
          meta: isHttpOperation(node.data) || isHttpWebhookOperation(node.data) ? node.data.method : '',
        });
        processedItemIds.add(node.uri);
      }
    });
    if (items.length > 0) {
      tree.push({
        title: group.title,
        items,
        itemsType,
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

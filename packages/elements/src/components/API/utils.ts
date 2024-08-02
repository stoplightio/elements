import {
  isHttpOperation,
  isHttpService,
  isHttpWebhookOperation,
  TableOfContentsGroup,
  TableOfContentsItem,
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
    const tagName = node.tags[0];

    if (tagName) {
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
    } else {
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

  const hasOperationNodes = serviceNode.children.some(node => node.type === NodeType.HttpOperation);
  if (hasOperationNodes) {
    tree.push({
      title: 'Endpoints',
    });

    const { groups, ungrouped } = computeTagGroups<OperationNode>(serviceNode, NodeType.HttpOperation);
    addTagGroupsToTree(groups, ungrouped, tree, NodeType.HttpOperation, mergedConfig.hideInternal);
  }

  const hasWebhookNodes = serviceNode.children.some(node => node.type === NodeType.HttpWebhook);
  if (hasWebhookNodes) {
    tree.push({
      title: 'Webhooks',
    });

    const { groups, ungrouped } = computeTagGroups<WebhookNode>(serviceNode, NodeType.HttpWebhook);
    addTagGroupsToTree(groups, ungrouped, tree, NodeType.HttpWebhook, mergedConfig.hideInternal);
  }

  let schemaNodes = serviceNode.children.filter(node => node.type === NodeType.Model);
  if (mergedConfig.hideInternal) {
    schemaNodes = schemaNodes.filter(n => !isInternal(n));
  }

  if (!mergedConfig.hideSchemas && schemaNodes.length) {
    tree.push({
      title: 'Schemas',
    });

    const { groups, ungrouped } = computeTagGroups<SchemaNode>(serviceNode, NodeType.Model);
    addTagGroupsToTree(groups, ungrouped, tree, NodeType.Model, mergedConfig.hideInternal);
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
  groups: TagGroup<T>[],
  ungrouped: T[],
  tree: TableOfContentsItem[],
  itemsType: TableOfContentsGroup['itemsType'],
  hideInternal: boolean,
) => {
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
    const items = group.items.flatMap(node => {
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
    if (items.length > 0) {
      tree.push({
        title: group.title,
        items,
        itemsType,
      });
    }
  });
};

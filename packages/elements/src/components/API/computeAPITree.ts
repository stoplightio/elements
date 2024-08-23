import type { TableOfContentsItem } from '@stoplight/elements-core';
import type { Extensions } from '@stoplight/types';
import { NodeType } from '@stoplight/types';
import { defaults } from 'lodash';

import type { OperationNode, SchemaNode, ServiceNode, WebhookNode } from '../../utils/oas/types';
import { addTagGroupsToTree, computeTagGroups, isInternal } from './utils';

export interface ComputeAPITreeConfig {
  hideSchemas?: boolean;
  hideInternal?: boolean;
}

export const defaultComputerAPITreeConfig = {
  hideSchemas: false,
  hideInternal: false,
};

export const computeAPITree = (serviceNode: ServiceNode, config: ComputeAPITreeConfig = {}) => {
  const mergedConfig = defaults(config, defaultComputerAPITreeConfig);
  const tree: TableOfContentsItem[] = [];

  // check if spec has x-tagGroups extension
  const rootVendorExtensions = serviceNode.data.extensions ?? ({} as Extensions);
  const rootVendorExtensionNames = Object.keys(rootVendorExtensions).map(item => item.toLowerCase());
  const isHavingTagGroupsExtension =
    typeof rootVendorExtensions['x-taggroups'] !== 'undefined' && rootVendorExtensionNames.length > 0;

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

    const { groups, ungrouped } = computeTagGroups<OperationNode>(serviceNode, NodeType.HttpOperation, {
      useTagGroups: isHavingTagGroupsExtension,
    });
    addTagGroupsToTree(groups, ungrouped, tree, NodeType.HttpOperation, {
      hideInternal: mergedConfig.hideInternal,
      useTagGroups: isHavingTagGroupsExtension,
    });
  }

  const hasWebhookNodes = serviceNode.children.some(node => node.type === NodeType.HttpWebhook, {
    useTagGroups: isHavingTagGroupsExtension,
  });
  if (hasWebhookNodes) {
    tree.push({
      title: 'Webhooks',
    });

    const { groups, ungrouped } = computeTagGroups<WebhookNode>(serviceNode, NodeType.HttpWebhook, {
      useTagGroups: isHavingTagGroupsExtension,
    });
    addTagGroupsToTree(groups, ungrouped, tree, NodeType.HttpWebhook, {
      hideInternal: mergedConfig.hideInternal,
      useTagGroups: isHavingTagGroupsExtension,
    });
  }

  let schemaNodes = serviceNode.children.filter(node => node.type === NodeType.Model);
  if (mergedConfig.hideInternal) {
    schemaNodes = schemaNodes.filter(n => !isInternal(n));
  }

  if (!mergedConfig.hideSchemas && schemaNodes.length) {
    tree.push({
      title: 'Schemas',
    });

    const { groups, ungrouped } = computeTagGroups<SchemaNode>(serviceNode, NodeType.Model, {
      useTagGroups: isHavingTagGroupsExtension,
    });
    addTagGroupsToTree(groups, ungrouped, tree, NodeType.Model, {
      hideInternal: mergedConfig.hideInternal,
      useTagGroups: isHavingTagGroupsExtension,
    });
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

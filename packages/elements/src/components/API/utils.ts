import { isHttpOperation, isHttpService, TableOfContentsItem } from '@stoplight/elements-core';
import { NodeType } from '@stoplight/types';
import { defaults } from 'lodash';

import { ServiceChildNode, ServiceNode } from '../../utils/oas/types';

export type TagGroup = { title: string; items: ServiceChildNode[] };

export const computeTagGroups = (serviceNode: ServiceNode) => {
  const groupsByTagId: { [tagId: string]: TagGroup } = {};
  const ungrouped = [];

  const lowerCaseServiceTags = serviceNode.tags.map(tn => tn.toLowerCase());

  for (const node of serviceNode.children) {
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
};

interface ComputeAPITreeConfig {
  hideSchemas?: boolean;
  hideInternal?: boolean;
}

const defaultComputerAPITreeConfig = {
  hideSchemas: false,
  hideInternal: false,
};

const constructTreeItem = (serviceChildNode: ServiceChildNode) => {
  return {
    id: serviceChildNode.uri,
    slug: serviceChildNode.uri,
    title: serviceChildNode.name,
    type: serviceChildNode.type,
    meta: serviceChildNode.type === NodeType.HttpOperation ? serviceChildNode.data.method : '',
  };
};

export const computeAPITree = (serviceNode: ServiceNode, config: ComputeAPITreeConfig = {}): TableOfContentsItem[] => {
  const mergedConfig = defaults(config, defaultComputerAPITreeConfig);

  const { groups, ungrouped } = computeTagGroups(serviceNode);
  const groupedItems: TableOfContentsItem[] = [];
  const ungroupedOperations: TableOfContentsItem[] = [];
  const ungroupedSchemas: TableOfContentsItem[] = [];

  // Show ungrouped operations above tag groups
  ungrouped.forEach(serviceChildNode => {
    if (mergedConfig.hideInternal && isInternal(serviceChildNode)) {
      return;
    } else if (serviceChildNode.type === NodeType.HttpOperation) {
      ungroupedOperations.push(constructTreeItem(serviceChildNode));
    } else if (serviceChildNode.type === NodeType.Model && !mergedConfig.hideSchemas) {
      ungroupedSchemas.push(constructTreeItem(serviceChildNode));
    }
  });
  if (ungroupedSchemas.length) {
    ungroupedSchemas.unshift({
      title: 'Schemas',
    });
  }

  groups.forEach(group => {
    const items = group.items.flatMap(serviceChildNode => {
      if ((mergedConfig.hideInternal && isInternal(serviceChildNode)) || mergedConfig.hideSchemas) {
        return [];
      }
      return constructTreeItem(serviceChildNode);
    });
    if (items.length > 0) {
      groupedItems.push({
        title: group.title,
        items,
      });
    }
  });

  return [
    {
      id: '/',
      slug: '/',
      title: 'Overview',
      type: 'overview',
      meta: '',
    },
    ...ungroupedOperations,
    ...groupedItems,
    ...ungroupedSchemas,
  ];
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

  if (isHttpOperation(data)) {
    return !!data.internal;
  }

  if (isHttpService(data)) {
    return false;
  }

  return !!data['x-internal'];
};

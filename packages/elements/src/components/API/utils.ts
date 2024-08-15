import type { TableOfContentsGroup, TableOfContentsItem } from '@stoplight/elements-core';
import { isHttpOperation, isHttpService, isHttpWebhookOperation } from '@stoplight/elements-core';
import type { INodeTag } from '@stoplight/types';
import type { JSONSchema7 } from 'json-schema';

import type { OperationNode, SchemaNode, ServiceChildNode, ServiceNode, WebhookNode } from '../../utils/oas/types';

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
    const tagName = node.tags[0];

    if (tagName) {
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
    } else {
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

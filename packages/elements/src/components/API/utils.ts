import { isHttpOperation, isHttpService, TableOfContentsItem, TableOfContentsTagGroups } from '@stoplight/elements-core';
import { NodeType } from '@stoplight/types';
import { defaults, isEmpty } from 'lodash';

import { OperationNode, ServiceChildNode, ServiceNode } from '../../utils/oas/types';

export type TagGroup = { title: string; items: OperationNode[] };

type XTagGroup = {
  name: string;
  tags: string[];
}
type XTagGroupExtension = Record<string, XTagGroup>

interface ComputeAPITreeConfig {
  hideSchemas?: boolean;
  hideInternal?: boolean;
}

const defaultComputerAPITreeConfig = {
  hideSchemas: false,
  hideInternal: false,
};
export const groupByTagId = (serviceNode: ServiceNode) => {
  const groupsByTagId: { [tagId: string]: TagGroup } = {};

  const lowerCaseServiceTags = serviceNode.tags.map(tn => tn.toLowerCase());

  for (const node of serviceNode.children) {
    if (node.type !== NodeType.HttpOperation) continue;
    const tagName = node.tags[0] ?? "ungrouped";

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
  return groupsByTagId
}

export const computeTagGroups = (serviceNode: ServiceNode) => {
  const lowerCaseServiceTags = serviceNode.tags.map(tn => tn.toLowerCase());
  const {"ungrouped": ungroupedGroup, ...tagGroups }= groupByTagId(serviceNode)
  const ungrouped = ungroupedGroup?.items ?? []

  const orderedTagGroups = Object.entries(tagGroups)
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


const overviewNode = {
  id: '/',
  slug: '/',
  title: 'Overview',
  type: 'overview',
  meta: '',
}

const computeOperationNodesTree = (operationNodes: OperationNode[], config: ComputeAPITreeConfig = {}) => [
  {
    title: 'Endpoints',
  },
  ...operationNodes.map((operationNode) => ({
    id: operationNode.uri,
    slug: operationNode.uri,
    title: operationNode.name,
    type: operationNode.type,
    meta: operationNode.data.method,
  }))
]

const computeSimpleAPITree = (serviceNode: ServiceNode, config: ComputeAPITreeConfig = {}) => {

  const mergedConfig = defaults(config, defaultComputerAPITreeConfig);
  const tree: TableOfContentsItem[] = [];

  const operationNodes = serviceNode.children.filter(node => node.type === NodeType.HttpOperation);
  if (operationNodes.length) {
  }

  let schemaNodes = serviceNode.children.filter(node => node.type === NodeType.Model);
  if (mergedConfig.hideInternal) {
    schemaNodes = schemaNodes.filter(node => !node.data['x-internal']);
  }

  if (!mergedConfig.hideSchemas && schemaNodes.length) {
    tree.push({
      title: 'Schemas',
    });

    schemaNodes.forEach(node => {
      tree.push({
        id: node.uri,
        slug: node.uri,
        title: node.name,
        type: node.type,
        meta: '',
      });
    });
  }
  return tree;
}

const getTagGroups = (serviceNode: ServiceNode): XTagGroupExtension | undefined => serviceNode?.extensions?.["x-tagGroups"] as XTagGroupExtension | undefined

const createTagToGroupReference = (tagGroups: XTagGroupExtension): Record<string, string> => {
  const tagToTagGroup = {}
  Object.keys(tagGroups).forEach((e: string) => {
    const group = tagGroups[e]
    group.tags.forEach((t) => {
      tagToTagGroup[t] = group.name
    })
  })
  return tagToTagGroup
}

const computeGroupedAPITree =(serviceNode: ServiceNode, config: ComputeAPITreeConfig = {}): TableOfContentsTagGroups[] => {
  const groupTree: Record<string, TagGroup[]> = {};
  const xTagGroups: XTagGroupExtension = getTagGroups(serviceNode) ?? {}
  const tagToGroupRef = createTagToGroupReference(xTagGroups)
  // All your resources should be tagged when using x-tagGroups
  const groups = groupByTagId(serviceNode);

  Object.keys(groups).forEach( k => {
    const node = groups[k]
    const isTagGroup = node?.items && node.title
    if (isTagGroup) {
      const targetGroupName = tagToGroupRef[node.title] ?? ""
      groupTree[targetGroupName] = groupTree[targetGroupName]?.length > 0 ? [...groupTree[targetGroupName], node] : [node]
    }
  })

  return Object.keys(groupTree).map((title) => ({
    title,
    items: groupTree[title].map( i => ({
      title: i.title,
      items: computeOperationNodesTree(i["items"])
    })),
    type: "tagGroup"
  })
)
}
export const computeAPITree = (serviceNode: ServiceNode, config: ComputeAPITreeConfig = {}) => {
  const isUsingTagGroups = !isEmpty(getTagGroups(serviceNode))
  const tree = isUsingTagGroups? computeGroupedAPITree(serviceNode, config) : computeSimpleAPITree(serviceNode, config)
  return [overviewNode, ...tree]
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

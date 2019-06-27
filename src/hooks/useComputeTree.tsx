import { Classes } from '@blueprintjs/core';
import { Dictionary } from '@stoplight/types';
import { Icon } from '@stoplight/ui-kit';
import * as React from 'react';

import { TreeNode } from '../components/TableOfContents';
import { ITableOfContentsNode, NodeTypeColors, NodeTypeIcons } from '../utils/node';

export const useComputeTree = (
  nodes: ITableOfContentsNode[],
  collapsed: Dictionary<boolean> = {},
  activeNodeSrn?: string,
) => {
  return React.useMemo(() => computeTree(nodes, collapsed, activeNodeSrn), [nodes, collapsed, activeNodeSrn]);
};

export const computeTree = (
  nodes: ITableOfContentsNode[],
  collapsed: Dictionary<boolean> = {},
  activeNodeSrn?: string,
) => {
  const tree: TreeNode[] = [];
  const nodeIdsInTree: Array<string | number> = [];

  /** Group by http service */
  const httpServiceNodes = nodes.filter((n: ITableOfContentsNode) => n.type === 'http_service');
  for (const service of httpServiceNodes) {
    nodeIdsInTree.push(service.id);

    // Find all nodes in the same folder as the http service
    const serviceParentFolderUri = service.uri
      .split('/')
      .slice(0, -2)
      .join('/');
    const children = nodes.filter((node: ITableOfContentsNode) => {
      if (node.uri.includes(serviceParentFolderUri) && node.id !== service.id) {
        nodeIdsInTree.push(node.id);
        return true;
      }
      return false;
    });

    // Don't render http service if there aren't any children
    if (!children.length) continue;

    // Group http service children by their tags
    const tagGroups = {};
    const untaggedGroup = [];
    for (const node of children) {
      if (node.tags && node.tags.length) {
        const tag = node.tags[0].toLowerCase();

        if (tagGroups[tag]) {
          tagGroups[tag].push(node);
        } else {
          tagGroups[tag] = [node];
        }
      } else {
        untaggedGroup.push(node);
      }
    }

    const childNodes: TreeNode[] = untaggedGroup.map(n => nodeToTreeNode(n, collapsed, activeNodeSrn));

    for (const tag in tagGroups) {
      if (!tagGroups[tag]) continue;

      childNodes.push(
        nodeToTreeNode(
          {
            id: service.id + '-' + tag,
            name: titleCase(tag),
            type: 'tag',
          } as ITableOfContentsNode,
          collapsed,
          activeNodeSrn,

          tagGroups[tag].map((n: ITableOfContentsNode) => nodeToTreeNode(n, collapsed, activeNodeSrn)),
        ),
      );
    }

    sortTreeNodes(childNodes);

    tree.push(nodeToTreeNode(service, collapsed, activeNodeSrn, childNodes));
  }

  // Group other nodes by their tags or URI
  const groups = {};
  const otherNodes = nodes.filter((n: ITableOfContentsNode) => !nodeIdsInTree.includes(n.id));
  for (const node of otherNodes) {
    const parts =
      node.tags && node.tags.length
        ? (node.tags || []).concat(node.name)
        : (node.uri.includes('docs') ? node.uri.split('docs')[1] : node.uri).split('/').filter(Boolean);

    let currentGroup = groups;
    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];

      if (index === parts.length - 1) {
        currentGroup[part] = node.id;
      } else {
        currentGroup[part] = currentGroup[part] || {};
        currentGroup = currentGroup[part];
      }
    }
  }

  tree.push(...traverseGroups(groups, nodes, collapsed, activeNodeSrn));

  sortTreeNodes(tree, true);

  return tree;
};

/**
 * Turn a node into a tree node
 */
const nodeToTreeNode = (
  node: ITableOfContentsNode,
  collapsed: Dictionary<boolean>,
  activeNodeSrn?: string,
  childNodes?: TreeNode[],
): TreeNode => {
  const isSelected = activeNodeSrn && node.srn && node.srn === activeNodeSrn ? true : false;
  const isExpanded = !collapsed[node.id];

  return {
    id: node.id,
    label: node.name,
    className: 'cursor-pointer',
    icon: (
      <Icon
        className={Classes.TREE_NODE_ICON}
        icon={NodeTypeIcons[node.type]}
        color={isSelected ? 'white' : NodeTypeColors[node.type] || '#5c7080'}
      />
    ),
    nodeData: node,
    isSelected,
    isExpanded,
    hasCaret: false,
    secondaryLabel: !!(childNodes && childNodes.length) ? (
      <Icon icon={isExpanded ? 'chevron-down' : 'chevron-right'} color="#5c7080" />
    ) : null,
    childNodes: childNodes && sortTreeNodes(childNodes),
  };
};

const traverseGroups = (
  groups: any,
  nodes: ITableOfContentsNode[],
  collapsed: Dictionary<boolean>,
  activeNodeSrn?: string,
) => {
  const tree: TreeNode[] = [];

  for (const key in groups) {
    if (!groups[key]) continue;

    if (typeof groups[key] === 'object') {
      tree.push({
        ...nodeToTreeNode(
          { id: key, name: titleCase(key) } as ITableOfContentsNode,
          collapsed,
          activeNodeSrn,
          traverseGroups(groups[key], nodes, collapsed, activeNodeSrn),
        ),
      });
    } else {
      const node = nodes.find((n: ITableOfContentsNode) => n.id === groups[key]);
      if (!node) continue;

      tree.push(nodeToTreeNode(node, collapsed, activeNodeSrn));
    }
  }

  return tree;
};

function titleCase(title: string) {
  return title.slice(0, 1).toUpperCase() + title.slice(1);
}

/**
 * Sorts by name and puts ungroupped nodes at the bottom
 */
const sortTreeNodes = (nodes: TreeNode[], ungrouppedAtTop: boolean = false) => {
  const tree = nodes;

  nodes.sort((a, b) => {
    if (a.childNodes && !b.childNodes) {
      return ungrouppedAtTop ? 1 : -1;
    }

    if (!a.childNodes && b.childNodes) {
      return ungrouppedAtTop ? -1 : 1;
    }

    const nameA = typeof a.label === 'string' ? a.label.toUpperCase() : a.label;
    const nameB = typeof b.label === 'string' ? b.label.toUpperCase() : b.label;

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  return tree;
};

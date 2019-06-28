import { Classes } from '@blueprintjs/core';
import { Icon } from '@stoplight/ui-kit';
import * as React from 'react';

import { TreeNode } from '../components/TableOfContents';
import { LinkContext } from '../containers/Provider';
import { ITableOfContentsNode, NodeTypeColors, NodeTypeIcons } from '../utils/node';

/**
 * Memoized hook that computes a tree structure from an array of nodes
 */
export function useComputeTree(nodes: ITableOfContentsNode[], activeNodeSrn?: string) {
  const Link = React.useContext(LinkContext);

  return React.useMemo(() => computeTree(nodes, activeNodeSrn, Link), [nodes, activeNodeSrn]);
}

/**
 * Computes a tree structure from an array of nodes
 */
export function computeTree(nodes: ITableOfContentsNode[], activeNodeSrn?: string, Link?: any) {
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

    const childNodes: TreeNode[] = untaggedGroup.map(n => createTreeNode(n, activeNodeSrn, undefined, Link));

    for (const tag in tagGroups) {
      if (!tagGroups[tag]) continue;

      childNodes.push(
        createTreeNode(
          // @ts-ignore: Need to support folder nodes
          {
            id: service.id + '-' + tag,
            name: titleCase(tag),
            type: 'tag',
          } as ITableOfContentsNode,
          activeNodeSrn,

          tagGroups[tag].map((n: ITableOfContentsNode) => createTreeNode(n, activeNodeSrn, undefined, Link)),

          Link,
        ),
      );
    }

    tree.push(createTreeNode(service, activeNodeSrn, childNodes, Link));
  }

  // Group other nodes by their tags or URI
  const groups = {};
  const otherNodes = nodes.filter((n: ITableOfContentsNode) => !nodeIdsInTree.includes(n.id));
  for (const node of otherNodes) {
    let path = [];
    if (node.tags && node.tags.length) {
      path = node.tags.concat(node.name);
    } else {
      path = node.uri.split('/').filter(part => part && !['docs', 'reference'].includes(part.toLowerCase()));
    }

    let currentGroup = groups;
    for (let index = 0; index < path.length; index++) {
      const part = path[index];

      // Assume the last part in the array is the node's path
      if (index === path.length - 1) {
        currentGroup[part] = node.id;
      } else {
        currentGroup[part] = currentGroup[part] || {};
        currentGroup = currentGroup[part];
      }
    }
  }

  tree.push(...traverseGroups(groups, nodes, activeNodeSrn, Link));

  return sortTreeNodes(tree, true);
}

/**
 * Turn a node into a tree node
 */
function createTreeNode(
  node: ITableOfContentsNode,
  activeNodeSrn?: string,
  childNodes?: TreeNode[],
  Link?: any,
): TreeNode {
  const isSelected = !!(activeNodeSrn && node.srn && node.srn === activeNodeSrn);
  const hasChildren = !!(childNodes && childNodes.length);

  return {
    id: node.id,
    label: hasChildren ? <div>{node.name}</div> : <Link href={`/${node.srn}`}>{node.name}</Link>,
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
    hasCaret: hasChildren,
    // secondaryLabel: !!(childNodes && childNodes.length) ? (
    //   <Icon icon={isExpanded ? 'chevron-down' : 'chevron-right'} color="#5c7080" />
    // ) : null,
    childNodes: childNodes && sortTreeNodes(childNodes),
  };
}

/**
 * Traverses an object into tree nodes
 */
function traverseGroups(groups: object, nodes: ITableOfContentsNode[], activeNodeSrn?: string, Link?: any) {
  const tree: TreeNode[] = [];

  for (const key in groups) {
    if (!groups[key]) continue;

    if (typeof groups[key] === 'object') {
      tree.push({
        ...createTreeNode(
          // @ts-ignore: Need to support folder nodes
          { id: key, name: titleCase(key) } as ITableOfContentsNode,
          activeNodeSrn,
          traverseGroups(groups[key], nodes, activeNodeSrn, Link),
          Link,
        ),
      });
    } else {
      const node = nodes.find((n: ITableOfContentsNode) => n.id === groups[key]);
      if (!node) continue;

      tree.push(createTreeNode(node, activeNodeSrn, undefined, Link));
    }
  }

  return tree;
}

/**
 * Capitalizes first character
 */
function titleCase(title: string) {
  return title.slice(0, 1).toUpperCase() + title.slice(1);
}

/**
 * Sorts by name and puts ungroupped nodes at the bottom
 */
function sortTreeNodes(nodes: TreeNode[], ungrouppedAtTop: boolean = false) {
  const tree = nodes;

  tree.sort((a, b) => {
    if (a.childNodes && !b.childNodes) {
      return ungrouppedAtTop ? 1 : -1;
    }

    if (!a.childNodes && b.childNodes) {
      return ungrouppedAtTop ? -1 : 1;
    }

    const nameA = a.nodeData!.name.toUpperCase();
    const nameB = b.nodeData!.name.toUpperCase();

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
}

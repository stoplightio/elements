import { Dictionary, NodeType } from '@stoplight/types';
import { escapeRegExp, sortBy, startCase, toLower, upperFirst } from 'lodash';
import * as React from 'react';

import { IconsContext } from '../containers/Provider';
import { IBranchNode, IContentsNodeWithId, NodeIconMapping } from '../types';

const README_REGEXP = new RegExp(`${escapeRegExp('README.md')}$`, 'i'); // Regex to get the README file

/**
 * Memoized hook that computes a tree structure from an array of nodes
 */
export function useComputeToc(branchNodes: IBranchNode[]) {
  const icons = React.useContext(IconsContext);
  return React.useMemo(() => computeToc(branchNodes, icons), [branchNodes, icons]);
}

/**
 * Sorts project nodes into a flat array
 */

export function computeToc(branchNodes: IBranchNode[], icons: NodeIconMapping): IContentsNodeWithId[] {
  // There is a chance that we pass an empty array
  if (!branchNodes.length) return [];

  let contents: IContentsNodeWithId[] = [];
  const folders: string[] = [];
  const rootNodes: IContentsNodeWithId[] = []; // These nodes will appear at the top of the tree

  /** All document nodes */
  const docsNodes = sortBy(
    branchNodes.filter((branchNode) => branchNode.snapshot.type === NodeType.Article),
    (branchNode) => toLower(branchNode.node.uri),
  );

  for (const nodeIndex in docsNodes) {
    if (!docsNodes[nodeIndex]) continue;
    const branchNode = docsNodes[nodeIndex];

    // Strip off leading slash and the (optionally) docs since we ignore that folder
    const uri = branchNode.node.uri.replace(/^\/(?:docs\/)?/, '');
    const parts = uri.split('/');

    // Handle adding the parent folders if we haven't already added them
    if (parts.length > 1) {
      // All the path parts not including the file name
      const pathToItem = parts.slice(0, -1);
      for (const pathIndex in pathToItem) {
        if (!pathToItem[pathIndex]) continue;

        // Create a folder if one doesn't already exist
        const folderName = pathToItem[pathIndex];
        if (!folders.includes(`${folderName}/${pathIndex}`)) {
          folders.push(`${folderName}/${pathIndex}`);

          const id = `${nodeIndex}-${pathIndex}`;
          const name = folderName
            .split('-')
            .map((item) => upperFirst(item))
            .join(' ');

          if (Number(pathIndex) === 0) {
            contents.push({
              id,
              name,
              depth: 0,
              type: 'divider',
            });
          } else {
            contents.push({
              id,
              name,
              depth: Number(pathIndex) - 1,
              type: 'group',
              icon: icons.group,
            });
          }
        }
      }

      contents.push({
        id: branchNode.id,
        name: branchNode.snapshot.name,
        depth: Math.max(parts.length - 2, 0),
        type: 'item',
        icon: icons[branchNode.snapshot.type] || icons.item,
        href: branchNode.node.uri,
      });
    } else {
      // if our node only has one part, it must not be listed in a folder! Lets add it to a group that we will push onto the front of the stack at the end of this loop
      const contentNode: IContentsNodeWithId = {
        id: branchNode.id,
        name: branchNode.snapshot.name,
        depth: 0,
        type: 'item',
        icon: icons[branchNode.snapshot.type] || icons.item,
        href: branchNode.node.uri,
      };

      if (README_REGEXP.test(branchNode.node.uri)) {
        rootNodes.unshift(contentNode);
      } else {
        rootNodes.push(contentNode);
      }
    }
  }

  // Add the root nodes to the top of the tree
  contents = rootNodes.concat(contents);

  /** Reference folder */
  const httpServiceNodes = sortBy(
    branchNodes.filter((branchNode) => branchNode.snapshot.type === NodeType.HttpService),
    (branchNode) => toLower(branchNode.snapshot.name),
  );

  for (const httpServiceNode of httpServiceNodes) {
    const parentUriRegexp = new RegExp(`^${escapeRegExp(httpServiceNode.node.uri)}\/`, 'i');
    const childNodes = branchNodes.filter(
      (branchNode) => parentUriRegexp.test(branchNode.node.uri) && branchNode.snapshot.type !== NodeType.HttpService,
    );
    if (!childNodes.length) continue;

    const dividerNode: IContentsNodeWithId = {
      id: httpServiceNode.id,
      name: httpServiceNode.snapshot.name,
      depth: 0,
      type: 'divider',
      icon: icons[httpServiceNode.snapshot.type] || icons.divider,
    };

    if (httpServiceNode.version && httpServiceNode.version !== '0.0') {
      dividerNode.meta = `v${httpServiceNode.version}`;
    }

    contents.push(dividerNode);
    contents.push({
      id: `${httpServiceNode.id}-overview`,
      name: 'Overview',
      depth: 0,
      icon: icons.item,
      type: 'item',
      href: httpServiceNode.node.uri,
    });

    const tags: Dictionary<IBranchNode[], string> = {};
    const other = [];

    /** Group by Tags */
    for (const childNode of childNodes) {
      if (childNode.snapshot.tagNames?.length) {
        const tag = toLower(childNode.snapshot.tagNames[0]);
        if (!tags[tag]) {
          tags[tag] = [];
        }

        tags[tag].push(childNode);
      } else {
        other.push(childNode);
      }
    }

    /** Add tag groups to the tree */
    const sortedTags = sortBy(Object.keys(tags), (t) => toLower(t));
    for (const tagIndex in sortedTags) {
      if (!sortedTags[tagIndex]) continue;
      const tag = sortedTags[tagIndex];

      contents.push({
        id: `${httpServiceNode.id}-${tag}-${tagIndex}`,
        name: startCase(tag),
        depth: 0,
        type: 'group',
        icon: icons.group,
      });

      for (const tagChild of sortBy(tags[tag], 'name')) {
        contents.push({
          id: tagChild.id,
          name: tagChild.snapshot.name,
          depth: 1,
          icon: icons[tagChild.snapshot.type] || icons.item,
          type: 'item',
          href: tagChild.node.uri,
        });
      }
    }

    /** Group whatever is left into "Other" */
    if (other.length) {
      contents.push({
        id: `${httpServiceNode.id}-other`,
        name: 'Other',
        depth: 0,
        type: 'group',
        icon: icons.group,
      });

      for (const otherChild of sortBy(other, (branchNode) => toLower(branchNode.snapshot.name))) {
        contents.push({
          id: otherChild.id,
          name: otherChild.snapshot.name,
          depth: 1,
          icon: icons[otherChild.snapshot.type] || icons.item,
          type: 'item',
          href: otherChild.node.uri,
        });
      }
    }
  }

  /** Models folder */
  const modelContents: IContentsNodeWithId[] = [];

  const modelNodes = sortBy(
    branchNodes.filter((branchNode) => branchNode.snapshot.type === NodeType.Model),
    (branchNode) => toLower(branchNode.snapshot.name),
  );

  for (const modelNode of modelNodes) {
    // Only add models that aren't already in the tree
    if (contents.find((n) => n.href === modelNode.node.uri)) continue;

    const node: IContentsNodeWithId = {
      id: modelNode.id,
      name: modelNode.snapshot.name,
      href: modelNode.node.uri,
      depth: 0,
      type: 'item',
      icon: icons[modelNode.snapshot.type] || icons.item,
    };

    if (modelNode.version && modelNode.version !== '0.0') {
      node.meta = `v${modelNode.version}`;
    }

    modelContents.push(node);
  }

  if (modelContents.length) {
    contents.push({
      id: 'models',
      name: 'Models',
      depth: 0,
      type: 'divider',
    });

    contents = contents.concat(modelContents);
  }

  return contents;
}

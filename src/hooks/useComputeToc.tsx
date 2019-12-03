import { Dictionary, NodeType } from '@stoplight/types';
import { IContentsNode } from '@stoplight/ui-kit/TableOfContents/types';
import { compact, escapeRegExp, sortBy, startCase, words } from 'lodash';
import * as React from 'react';
import { IconsContext } from '../containers/Provider';
import { IProjectNode, ProjectNodeWithUri } from '../types';
import { NodeIconMapping } from '../types';
import { deserializeSrn } from '../utils/srns';

const README_REGEXP = new RegExp(`${escapeRegExp('README.md')}$`, 'i'); // Regex to get the README file

/**
 * Memoized hook that computes a tree structure from an array of nodes
 */
export function useComputeToc(nodes: IProjectNode[], srn?: string) {
  const icons = React.useContext(IconsContext);
  return React.useMemo(() => computeToc(nodes, icons, srn), [nodes, icons, srn]);
}

/**
 * Sorts project nodes into a flat array
 */

export function computeToc(_nodes: IProjectNode[], icons: NodeIconMapping, srn?: string) {
  // There is a chance that we pass an empty array
  if (!_nodes.length) return [];

  // Add uri to each node since it's used heavily in this function
  const nodes: ProjectNodeWithUri[] = _nodes.map(n => ({ ...n, uri: deserializeSrn(n.srn).uri }));

  let contents: IContentsNode[] = [];
  const folders: string[] = [];
  const rootNodes: IContentsNode[] = []; // These nodes will appear at the top of the tree

  // Grab the root level README and put it at the top of the folder
  const readmeNode = nodes.find(node => {
    return README_REGEXP.test(node.uri) && compact(node.uri.split('/')).length === 1;
  });
  if (readmeNode) {
    rootNodes.push({
      name: readmeNode.name,
      isActive: srn === readmeNode.srn,
      depth: 0,
      type: 'item',
      icon: icons[readmeNode.type] || icons.item,
      href: readmeNode.srn,
    });
  }

  /** Docs folder */
  const docsNodes = sortBy(
    nodes.filter(node => /^\/docs/.test(node.uri) && node.type === NodeType.Article),
    'srn',
  );
  for (const node of docsNodes) {
    // Strip off the /docs since we ignore that folder
    const uri = node.uri.replace(/^\/docs\//, '');
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
          contents.push({
            name: startCase(words(folderName).join(' ')),
            depth: Number(pathIndex),
            type: 'group',
            icon: icons.group,
          });
        }
      }

      contents.push({
        name: node.name,
        isActive: srn === node.srn,
        depth: parts.length - 1,
        type: 'item',
        icon: icons[node.type] || icons.item,
        href: node.srn,
      });
    } else {
      // if our node only has one part, it must not be listed in a folder! Lets add it to a group that we will push onto the front of the stack at the end of this loop
      rootNodes.push({
        name: node.name,
        isActive: srn === node.srn,
        depth: 0,
        type: 'item',
        icon: icons[node.type] || icons.item,
        href: node.srn,
      });
    }
  }

  // Add the root nodes to the top of the tree
  contents = rootNodes.concat(contents);

  /** Reference folder */
  const httpServiceNodes = sortBy(
    nodes.filter(n => n.type === NodeType.HttpService),
    'name',
  );
  for (const httpServiceNode of httpServiceNodes) {
    const parentUriRegexp = new RegExp(`^${escapeRegExp(httpServiceNode.uri)}\/`, 'i');

    const childNodes = nodes.filter(node => parentUriRegexp.test(node.uri) && node.type !== NodeType.HttpService);
    if (!childNodes.length) continue;

    contents.push({
      name: httpServiceNode.name,
      depth: 0,
      type: 'divider',
      icon: icons[httpServiceNode.type] || icons.divider,
    });
    contents.push({
      name: 'Overview',
      isActive: srn === httpServiceNode.srn,
      depth: 0,
      icon: icons.item,
      type: 'item',
      href: httpServiceNode.srn,
    });

    const tags: Dictionary<IProjectNode[], string> = {};
    const other = [];

    /** Group by Tags */
    for (const childNode of childNodes) {
      if (childNode.tags && childNode.tags.length) {
        const tag = childNode.tags[0].toLowerCase();
        if (!tags[tag]) {
          tags[tag] = [];
        }

        tags[tag].push(childNode);
      } else {
        other.push(childNode);
      }
    }

    /** Add tag groups to the tree */
    for (const tag of sortBy(Object.keys(tags))) {
      contents.push({
        name: startCase(tag),
        depth: 0,
        type: 'group',
        icon: icons.group,
      });

      for (const tagChild of tags[tag]) {
        contents.push({
          name: tagChild.name,
          isActive: srn === tagChild.srn,
          depth: 1,
          icon: icons[tagChild.type] || icons.item,
          type: 'item',
          href: tagChild.srn,
        });
      }
    }

    /** Group whatever is left into "Other" */
    if (other.length) {
      contents.push({
        name: 'Other',
        depth: 0,
        type: 'group',
        icon: icons.group,
      });

      for (const otherChild of other) {
        contents.push({
          name: otherChild.name,
          isActive: srn === otherChild.srn,
          depth: 1,
          icon: icons[otherChild.type] || icons.item,
          type: 'item',
          href: otherChild.srn,
        });
      }
    }
  }

  /** Models folder */
  const modelContents: IContentsNode[] = [];
  const modelNodes = sortBy(
    nodes.filter(n => n.type === NodeType.Model),
    'name',
  );
  for (const modelNode of modelNodes) {
    // Only add models that aren't already in the tree
    if (contents.find(n => n.href === modelNode.srn)) continue;

    modelContents.push({
      name: modelNode.name,
      href: modelNode.srn,
      depth: 0,
      type: 'item',
      icon: icons[modelNode.type] || icons.item,
      isActive: srn === modelNode.srn,
    });
  }

  if (modelContents.length) {
    contents.push({
      name: 'Models',
      depth: 0,
      type: 'divider',
    });

    contents = contents.concat(modelContents);
  }

  return contents;
}

import { Dictionary, NodeType } from '@stoplight/types';
import * as React from 'react';
import { IContentsNode, IProjectNode } from '../types';
import { deserializeSrn } from '../utils/srns';

/**
 * Memoized hook that computes a tree structure from an array of nodes
 */
export function useComputeToc(nodes: IProjectNode[]) {
  return React.useMemo(() => computeToc(nodes), [nodes]);
}

/**
 * Sorts project nodes into a flat array
 */
export function computeToc(nodes: IProjectNode[]) {
  const contents: IContentsNode[] = [];

  /** Group by docs */
  const docsNodes = sortNodesBySrn(
    sortNodesAlphabetically(nodes.filter(node => /^\/docs/.test(deserializeSrn(node.srn).uri)), 'name'),
  );
  const folders: string[] = [];
  for (const node of docsNodes) {
    const uri = deserializeSrn(node.srn).uri.replace(/^\/docs\//, '');

    const parts = uri.split('/');

    // Handle adding the parent folders if we haven't already added them
    if (parts.length > 1) {
      const pathToItem = parts.slice(0, -1);
      for (const pathIndex in pathToItem) {
        if (!pathToItem[pathIndex]) continue;

        const folderName = pathToItem[pathIndex];
        if (!folders.includes(`${folderName}/${pathIndex}`)) {
          folders.push(`${folderName}/${pathIndex}`);
          contents.push({
            name: titleCase(folderName),
            depth: Number(pathIndex),
          });
        }
      }
    }

    contents.push({
      name: node.name,
      srn: node.srn,
      depth: parts.length - 1,
    });
  }

  /** Group by reference */
  const referenceNodes = sortNodesAlphabetically(
    nodes.filter(node => /^\/reference/.test(deserializeSrn(node.srn).uri)),
    'name',
  );
  const httpServiceNodes = sortNodesAlphabetically(referenceNodes.filter(n => n.type === NodeType.HttpService), 'name');
  for (const httpServiceNode of httpServiceNodes) {
    const parentUri = deserializeSrn(httpServiceNode.srn)
      .uri.split('/')
      .slice(0, -1)
      .join('/');

    const childNodes = referenceNodes.filter(
      node => deserializeSrn(node.srn).uri.includes(parentUri) && node.type !== NodeType.HttpService,
    );
    if (!childNodes.length) continue;

    contents.push({
      name: httpServiceNode.name,
      depth: 0,
    });
    contents.push({
      name: 'Overview',
      srn: httpServiceNode.srn,
      depth: 0,
    });

    const tags: Dictionary<IProjectNode[], string> = {};
    const other = [];

    for (const childNode of childNodes) {
      if (childNode.tags && childNode.tags.length) {
        const tag = childNode.tags[0];
        if (!tags[tag]) {
          tags[tag] = [];
        }

        tags[tag].push(childNode);
      } else {
        other.push(childNode);
      }
    }

    for (const tag of sortNodesAlphabetically(Object.keys(tags))) {
      contents.push({
        name: titleCase(tag),
        depth: 0,
      });

      for (const tagChild of tags[tag]) {
        contents.push({
          name: tagChild.name,
          srn: tagChild.srn,
          depth: 1,
        });
      }
    }

    if (other.length) {
      contents.push({
        name: 'Other',
        depth: 0,
      });

      for (const otherChild of other) {
        contents.push({
          name: otherChild.name,
          srn: otherChild.srn,
          depth: 1,
        });
      }
    }
  }

  return contents;
}

/**
 * Sorts by node SRN length
 */
function sortNodesBySrn(nodes: IProjectNode[]) {
  const contents = nodes;

  contents.sort((a, b) => {
    const srnA = a.srn.split('/').length;
    const srnB = b.srn.split('/').length;

    if (srnA < srnB) {
      return -1;
    }
    if (srnA > srnB) {
      return 1;
    }

    // srns must be equal
    return 0;
  });

  return contents;
}

/**
 * Sorts alphabetically. Optionally takes a prop to sort by.
 */
function sortNodesAlphabetically<T = IProjectNode>(nodes: T[], prop?: string) {
  const contents = nodes;

  contents.sort((a, b) => {
    const nameA = (prop ? a[prop] : a).toUpperCase();
    const nameB = (prop ? b[prop] : b).toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  return contents;
}

/**
 * Capitalizes first character
 */
function titleCase(title: string) {
  return title.slice(0, 1).toUpperCase() + title.slice(1);
}

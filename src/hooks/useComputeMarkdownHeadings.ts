import { IHeading, IRoot, ITextNode } from '@stoplight/markdown';
import * as React from 'react';
import { Parent } from 'unist';

import { IPageHeading } from '../types';

const selectAll = require('unist-util-select').selectAll;

export function useComputeMarkdownHeadings(tree: IRoot) {
  return React.useMemo(() => computeMarkdownHeadings(tree), [tree]);
}

export function computeMarkdownHeadings(tree: IRoot): IPageHeading[] {
  return selectAll(':root > [type=heading]', tree)
    .map((heading: IHeading) => ({
      title: findTitle(heading),
      id: heading.data && (heading.data.id as string | undefined),
      depth: heading.depth - 1,
    }))
    .filter((item: IPageHeading) => item.depth >= 1 && item.depth <= 2);
}

const findTitle = (parent: Parent) => {
  return (selectAll('[type=text]', parent) as ITextNode[]).map(textNode => textNode.value as string).join(' ');
};

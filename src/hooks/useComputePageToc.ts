import { IHeading, IRoot, ITextNode } from '@stoplight/markdown';
import * as React from 'react';
import { Parent } from 'unist';

const selectAll = require('unist-util-select').selectAll;

export interface IPageTocHeading {
  title: string;
  depth: number;
  id: string;
  isSelected?: boolean;
}

export function useComputePageToc(tree: IRoot) {
  return React.useMemo(() => computePageToc(tree), [tree]);
}

export function computePageToc(tree: IRoot): IPageTocHeading[] {
  return selectAll(':root > [type=heading]', tree)
    .map((heading: IHeading) => ({
      title: findTitle(heading),
      id: heading.data && (heading.data.id as (string | undefined)),
      depth: heading.depth - 1,
    }))
    .filter((item: IPageTocHeading) => item.depth >= 1 && item.depth <= 2);
}

const findTitle = (parent: Parent) => {
  return (selectAll('[type=text]', parent) as ITextNode[]).map(textNode => textNode.value as string).join(' ');
};

import { MDAST } from '@stoplight/markdown';
import * as React from 'react';
import { Parent } from 'unist';
import { selectAll } from 'unist-util-select';

import { IArticleHeading } from '../types';

export function useComputeMarkdownHeadings(tree: MDAST.Root) {
  return React.useMemo(() => computeMarkdownHeadings(tree), [tree]);
}

export function computeMarkdownHeadings(tree: MDAST.Root): IArticleHeading[] {
  return (selectAll(':root > [type=heading]', tree) as MDAST.Heading[])
    .map((heading: MDAST.Heading) => ({
      title: findTitle(heading),
      id: (heading.data?.id as string | undefined) || '',
      depth: heading.depth - 1,
    }))
    .filter((item: IArticleHeading) => item.depth >= 1 && item.depth <= 2);
}

const findTitle = (parent: Parent) => {
  return (selectAll('[type=text]', parent) as MDAST.Text[]).map(textNode => String(textNode.value)).join(' ');
};

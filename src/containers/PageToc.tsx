import { Reader } from '@stoplight/markdown/reader';
import React from 'react';
import { Literal, Node, Parent } from 'unist';

import { useNodeInfo } from '..';
import { PageToc as PageTocComponent } from '../components/PageToc';
import { PageTocSkeleton } from '../components/PageTocSkeleton';

const unified = require('unified');
const remarkSlug = require('remark-slug');

export const PageToc: React.FC<{ srn: string; version?: string; className?: string }> = ({
  srn,
  version,
  className,
}) => {
  const { isLoading, data } = useNodeInfo(srn, version);

  const tree = React.useMemo(() => {
    const reader = new Reader();
    return reader.toSpec(
      unified()
        .use([remarkSlug])
        .runSync(reader.fromLang(data ? data.data : '')),
    );
  }, [data]);

  const headings = React.useMemo(
    () =>
      tree.children
        .filter(isHeadingNode)
        .map(heading => ({
          title: findTitles(heading).join(' '),
          id: heading.data && heading.data.id,
          depth: heading.depth,
        }))
        .filter(heading => heading.depth > 1 && heading.depth <= 3),
    [tree],
  );

  if (isLoading || !headings.length) {
    return <PageTocSkeleton className={className} />;
  }

  return <PageTocComponent items={headings} className={className} />;
};

const findTitles = (parent: Parent): string[] => {
  return parent.children.reduce((titles: string[], node) => {
    if (isParent(node)) {
      return titles.concat(findTitles(node));
    }

    if (isTextNode(node)) {
      titles.push(node.value);
    }

    return titles;
  }, []);
};

interface ITextNode extends Literal {
  type: 'text';
  value: string;
}

interface IHeadingNode extends Parent {
  type: 'heading';
  depth: 1 | 2 | 3 | 4 | 5 | 6;
  data?: { id: string };
}

function isParent(node: Node): node is Parent {
  return !!(node as Parent).children;
}

function isTextNode(node: Node): node is ITextNode {
  return node.type === 'text';
}

function isHeadingNode(node: Node): node is IHeadingNode {
  return node.type === 'heading';
}

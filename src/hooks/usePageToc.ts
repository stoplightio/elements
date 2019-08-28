import { IHeading, ITextNode } from '@stoplight/markdown/ast-types/mdast';
import { Reader } from '@stoplight/markdown/reader';
import { Node, Parent } from 'unist';
import { useNodeInfo } from './useNodeInfo';

const unified = require('unified');
const remarkSlug = require('remark-slug');

export function usePageToc(srn: string, version?: string) {
  const { isLoading, data } = useNodeInfo(srn, version);

  const reader = new Reader();
  const tree = reader.toSpec(
    unified()
      .use([remarkSlug])
      .runSync(reader.fromLang(data ? data.data : '')),
  );

  const headings = tree.children
    .filter(isHeading)
    .map(heading => ({
      title: findTitles(heading).join(' '),
      id: heading.data && heading.data.id,
      depth: heading.depth - 1,
    }))
    .filter(heading => heading.depth > 0 && heading.depth <= 2);

  return { isLoading, headings };
}

const findTitles = (parent: Parent): string[] => {
  return parent.children.reduce((titles: string[], node) => {
    if (isParent(node)) {
      return titles.concat(findTitles(node));
    }

    if (isTextNode(node)) {
      titles.push(node.value as string);
    }

    return titles;
  }, []);
};

function isParent(node: Node): node is Parent {
  return !!(node as Parent).children;
}

function isTextNode(node: Node): node is ITextNode {
  return node.type === 'text';
}

function isHeading(node: Node): node is IHeading {
  return node.type === 'heading';
}

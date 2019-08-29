import { IHeading, ITextNode, Reader } from '@stoplight/markdown';
import { Parent } from 'unist';
import { IPageTocHeading } from '../components/PageToc';

const unified = require('unified');
const remarkSlug = require('remark-slug');
const selectAll = require('unist-util-select').selectAll;

export function computePageToc(data: string) {
  const reader = new Reader();

  const tree = reader.toSpec(
    unified()
      .use([remarkSlug])
      .runSync(reader.fromLang(data)),
  );

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

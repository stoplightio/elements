import { IHeading, ITextNode, Reader } from '@stoplight/markdown';
import { Parent } from 'unist';
import { IPageTocItem } from '../components/PageToc';
import { useNodeInfo } from './useNodeInfo';

const unified = require('unified');
const remarkSlug = require('remark-slug');
const selectAll = require('unist-util-select').selectAll;

export function usePageToc(srn: string, version?: string) {
  const { isLoading, data } = useNodeInfo(srn, version);
  const reader = new Reader();
  const tree = reader.toSpec(
    unified()
      .use([remarkSlug])
      .runSync(reader.fromLang(data ? data.data : '')),
  );

  const headings = selectAll(':root > [type=heading]', tree)
    .map((heading: IHeading) => ({
      title: findTitle(heading),
      id: heading.data && (heading.data.id as (string | undefined)),
      depth: heading.depth - 1,
    }))
    .filter((item: IPageTocItem) => item.depth >= 1 && item.depth <= 2);

  return { isLoading, headings };
}

const findTitle = (parent: Parent) => {
  return (selectAll('[type=text]', parent) as ITextNode[]).map(textNode => textNode.value as string).join(' ');
};

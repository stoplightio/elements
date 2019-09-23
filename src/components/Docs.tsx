import 'resize-observer-polyfill';

import useComponentSize from '@rehooks/component-size';
import { safeStringify } from '@stoplight/json';
import { MarkdownViewer, processMarkdownTree } from '@stoplight/markdown-viewer';
import { Builder } from '@stoplight/markdown/builder';
import { NodeType } from '@stoplight/types';
import { JSONSchema4 } from 'json-schema';
import * as React from 'react';

import { useComponents } from '../hooks/useComponents';
import { useComputePageToc } from '../hooks/useComputePageToc';
import { PageToc } from './PageToc';

export interface IDocs {
  type: NodeType | 'json_schema';
  data: unknown;
  padding?: string;
}

export const Docs: React.FunctionComponent<IDocs> = ({ type, data, padding }) => {
  const components = useComponents();
  const pageDocsRef = React.useRef<HTMLDivElement | null>(null);
  const { width } = useComponentSize(pageDocsRef);
  const showPageToc = width >= 1000;

  const markdown = new Builder();

  if (type === NodeType.Article) {
    markdown.addMarkdown(String(data || ''));
  } else if (type === NodeType.Model) {
    const { description, ...schema } = (data || {}) as JSONSchema4;
    if (description) {
      markdown.addMarkdown(`${description}\n\n`);
    }

    markdown.addChild({
      type: 'code',
      lang: 'json',
      meta: 'model',
      value: safeStringify(schema, undefined, 4),
    });

    markdown.addMarkdown('\n');
  } else {
    markdown.addChild({
      type: 'code',
      lang: 'json',
      meta: type,
      value: safeStringify(data, undefined, 4),
    });

    markdown.addMarkdown('\n');

    if (type === NodeType.HttpOperation) {
      markdown.addMarkdown('\n');
    }
  }

  const tree = processMarkdownTree(markdown.root);
  const headings = useComputePageToc(tree);

  if (markdown.root.children.length === 0) {
    markdown.addMarkdown('No content');
  }

  return (
    <div className="Page__docs flex w-full" ref={pageDocsRef}>
      <MarkdownViewer className={`Page__content flex-1 p-${padding}`} markdown={tree} components={components} />

      <PageToc className="Page__toc" padding={padding} headings={headings} minimal={!showPageToc} />
    </div>
  );
};

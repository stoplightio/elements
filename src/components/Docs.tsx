import 'resize-observer-polyfill';

import { IconName } from '@blueprintjs/core';
import useComponentSize from '@rehooks/component-size';
import { safeStringify } from '@stoplight/json';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import {
  BlockHeader,
  CLASSNAMES,
  ICodeAnnotations,
  IComponentMappingProps,
  MarkdownViewer,
  processMarkdownTree,
} from '@stoplight/markdown-viewer';
import { Builder } from '@stoplight/markdown/builder';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import { JSONSchema4 } from 'json-schema';
import * as React from 'react';
import { ComponentsContext } from '../containers/Provider';
import { useComputePageToc } from '../hooks/useComputePageToc';
import { useResolver } from '../hooks/useResolver';
import { HttpOperation } from './HttpOperation';
import { HttpRequest } from './HttpRequest';
import { HttpService } from './HttpService';
import { PageToc } from './PageToc';

export interface IDocs {
  type: NodeType | 'json_schema' | 'http';
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

const JSV_MAX_ROWS = 50;
const MarkdownViewerCode: React.FunctionComponent<{
  type: NodeType | 'json_schema' | 'http';
  value: any;
  annotations: ICodeAnnotations;
}> = ({ type, value, annotations }) => {
  const resolved = useResolver(type, value);

  if (type === NodeType.Model || type === 'json_schema') {
    const title = annotations && annotations.title;
    const icon: IconName = 'cube';
    const color = '#ef932b';

    return (
      <div>
        {title && <BlockHeader icon={icon} iconColor={color} title={title} />}

        <div className={cn(CLASSNAMES.block, CLASSNAMES.bordered, 'dark:border-darken')}>
          <JsonSchemaViewer schema={resolved} maxRows={JSV_MAX_ROWS} />
        </div>
      </div>
    );
  } else if (type === NodeType.HttpOperation) {
    return <HttpOperation value={resolved} />;
  } else if (type === NodeType.HttpService) {
    return <HttpService value={resolved} />;
  } else if (type === 'http') {
    return <HttpRequest request={resolved} />;
  }

  return null;
};

function useComponents() {
  const Components = React.useContext(ComponentsContext);

  return React.useMemo(() => {
    return {
      ...Components,

      code: (props: IComponentMappingProps<any>, key: React.Key) => {
        const { node, defaultComponents } = props;

        const nodeType = node.annotations && node.annotations.type ? node.annotations.type : node.meta;
        if (['json_schema', 'http', NodeType.Model, NodeType.HttpOperation, NodeType.HttpService].includes(nodeType)) {
          return <MarkdownViewerCode key={key} type={nodeType} value={node.value} annotations={node.annotations} />;
        }

        return Components && Components.code ? Components.code(props, key) : defaultComponents.code(props, key);
      },
    };
  }, [Components]);
}

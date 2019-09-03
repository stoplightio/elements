import { IconName } from '@blueprintjs/core';
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
import * as React from 'react';

import { ComponentsContext } from '../containers/Provider';
import { useComputePageToc } from '../hooks/useComputePageToc';
import { useResolver } from '../hooks/useResolver';
import { HttpOperation } from './HttpOperation';
import { HttpService } from './HttpService';
import { PageToc } from './PageToc';

export interface IDocs {
  type: NodeType | 'json_schema';
  data: any;
  className?: string;
  toc?: IDocsToc;
  content?: IDocsContent;
}

export interface IDocsToc {
  className?: string;
  disabled?: boolean;
}

export interface IDocsContent {
  className?: string;
}

export const Docs: React.FunctionComponent<IDocs> = ({ type, data, className, toc, content = {} }) => {
  const components = useComponents();

  const markdown = new Builder();

  if (type === NodeType.Article) {
    markdown.addMarkdown(data);
  } else if (type === NodeType.Model) {
    const { description, ...schema } = data;
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
  const shouldDisplayToc = !(toc && toc.disabled) && headings && headings.length;

  return (
    <div className={cn(className, 'flex')}>
      <MarkdownViewer className={content.className} markdown={tree} components={components} />
      {shouldDisplayToc ? <PageToc headings={headings} className={(toc && toc.className) || 'p-4 pt-10 h-0'} /> : null}
    </div>
  );
};

const JSV_MAX_ROWS = 50;
const MarkdownViewerCode: React.FunctionComponent<{
  type: NodeType | 'json_schema';
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
        if (['json_schema', NodeType.Model, NodeType.HttpOperation, NodeType.HttpService].includes(nodeType)) {
          return <MarkdownViewerCode key={key} type={nodeType} value={node.value} annotations={node.annotations} />;
        }

        return Components && Components.code ? Components.code(props, key) : defaultComponents.code(props, key);
      },
    };
  }, [Components]);
}

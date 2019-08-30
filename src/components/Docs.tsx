import { IconName } from '@blueprintjs/core';
import { safeStringify } from '@stoplight/json';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import {
  BlockHeader,
  CLASSNAMES,
  ICodeAnnotations,
  IComponentMappingProps,
  MarkdownViewer,
  useMarkdownTree,
} from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { IRoot } from '@stoplight/markdown';
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
}

export interface IDocsToc {
  className?: string;
}

export const Docs: React.FunctionComponent<IDocs> = ({ type, data, className, toc }) => {
  const components = useComponents();

  let markdown = 'No content';
  if (type === NodeType.Article) {
    markdown = data;
  } else if (type === NodeType.Model) {
    const { description, ...schema } = data;
    markdown = description ? description + '\n\n' : '';
    markdown += '```json' + ` ${type}\n` + safeStringify(schema, undefined, 4) + '\n```\n';
  } else if (type === NodeType.HttpOperation) {
    markdown = '```json' + ` ${type}\n` + safeStringify(data, undefined, 4) + '\n```\n\n';
  } else {
    markdown = '```json' + ` ${type}\n` + safeStringify(data, undefined, 4) + '\n```\n';
  }

  const tree = useMarkdownTree(markdown);

  const markdownElem = <MarkdownViewer className={className} markdown={tree} components={components} />;

  if (!toc) return markdownElem;

  return <DocsWithToc markdownElem={markdownElem} tree={tree} toc={toc} />;
};

const DocsWithToc = ({ markdownElem, tree, toc }: { markdownElem: React.ReactNode; tree: IRoot; toc: IDocsToc }) => {
  const headings = useComputePageToc(tree);

  if (!headings || !headings.length) return <>{markdownElem}</>;

  return (
    <div className="flex">
      {markdownElem}
      <PageToc headings={headings} className={toc.className || 'p-4 pt-10 h-0'} />
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

import { IconName } from '@blueprintjs/core';
import { safeStringify } from '@stoplight/json';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import {
  BlockHeader,
  CLASSNAMES,
  ICodeAnnotations,
  IComponentMappingProps,
  MarkdownViewer,
} from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';
import { ComponentsContext } from '../containers/Provider';
import { useResolver } from '../hooks/useResolver';
import { HttpOperation } from './HttpOperation';
import { HttpService } from './HttpService';

export type DocsNodeType = NodeType | 'json_schema';

export interface IDocs {
  type: DocsNodeType;
  data: any;

  className?: string;
}

export const Docs: React.FunctionComponent<IDocs> = ({ type, data, className }) => {
  const components = useComponents();

  let markdown = 'No content';
  if (type === NodeType.Article) {
    markdown = data;
  } else if (type === NodeType.Model) {
    const { description, ...schema } = data;
    markdown = `${description}\n\n` + '```json' + ` ${type}\n` + safeStringify(schema, undefined, 4) + '\n```\n';
  } else if (type === NodeType.HttpOperation) {
    markdown = '```json' + ` ${type}\n` + safeStringify(data, undefined, 4) + '\n```\n\n';
  } else {
    markdown = '```json' + ` ${type}\n` + safeStringify(data, undefined, 4) + '\n```\n';
  }

  return <MarkdownViewer className={className} markdown={markdown} components={components} />;
};

const JSV_MAX_ROWS = 50;
const MarkdownViewerCode: React.FunctionComponent<{
  type: DocsNodeType;
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

        <div className={cn(CLASSNAMES.block, CLASSNAMES.bordered)}>
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

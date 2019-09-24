import { IconName } from '@blueprintjs/core';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import {
  BlockHeader,
  CLASSNAMES,
  ICodeAnnotations,
  IComponentMapping,
  IComponentMappingProps,
} from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import React from 'react';

import { HttpOperation } from '../components/HttpOperation';
import { HttpService } from '../components/HttpService';
import { ComponentsContext } from '../containers/Provider';
import { useResolver } from './useResolver';

const JSV_MAX_ROWS = 50;
const MarkdownViewerCode: React.FunctionComponent<{
  type: NodeType | 'json_schema';
  value: any;
  annotations: ICodeAnnotations;
}> = ({ type, value, annotations }) => {
  const { result: resolved } = useResolver(type, value);

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

export function useComponents(): IComponentMapping {
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

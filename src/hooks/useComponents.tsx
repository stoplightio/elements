import { CLASSNAMES, ICodeAnnotations, IComponentMappingProps } from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';
import { HttpOperation } from '../components/HttpOperation';
import { HttpService } from '../components/HttpService';
import { Model } from '../components/Model';
import { ComponentsContext } from '../containers/Provider';
import { useResolver } from '../hooks/useResolver';

export function useComponents() {
  const Components = React.useContext(ComponentsContext);

  return React.useMemo(() => {
    return {
      ...Components,

      code: (props: IComponentMappingProps<any>, key: React.Key) => {
        const { node, defaultComponents, parent } = props;

        const nodeType = node.annotations && node.annotations.type ? node.annotations.type : node.meta;
        if (['json_schema', NodeType.Model, NodeType.HttpOperation, NodeType.HttpService].includes(nodeType)) {
          return (
            <MarkdownViewerCode
              key={key}
              type={nodeType}
              value={node.value}
              annotations={node.annotations}
              parent={parent}
            />
          );
        }

        return Components && Components.code ? Components.code(props, key) : defaultComponents.code(props, key);
      },
    };
  }, [Components]);
}

const MarkdownViewerCode: React.FC<{
  type: NodeType | 'json_schema';
  value: any;
  annotations: ICodeAnnotations;
  parent: IComponentMappingProps<any>['parent'];
}> = ({ type, value, annotations, parent }) => {
  const { result, errors } = useResolver(type, value);

  if (type === NodeType.Model || type === 'json_schema') {
    return (
      <Model
        schema={result}
        title={annotations && annotations.title}
        errors={errors}
        className={cn('dark:border-darken', {
          [CLASSNAMES.bordered]: !parent || parent.type !== 'tab',
          [CLASSNAMES.block]: !parent || parent.type !== 'tab',
        })}
      />
    );
  } else if (type === NodeType.HttpOperation) {
    return <HttpOperation value={result} />;
  } else if (type === NodeType.HttpService) {
    return <HttpService value={result} />;
  }

  return null;
};

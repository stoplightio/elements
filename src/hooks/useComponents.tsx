import { CLASSNAMES, IComponentMappingProps } from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';
import { HttpOperation } from '../components/HttpOperation';
import { HttpRequest } from '../components/HttpRequest';
import { HttpService } from '../components/HttpService';
import { Model } from '../components/Model';
import { ComponentsContext } from '../containers/Provider';

export function useComponents() {
  const Components = React.useContext(ComponentsContext);

  return React.useMemo(() => {
    return {
      ...Components,

      code: (props: IComponentMappingProps<any>, key: React.Key) => {
        const { node, defaultComponents, parent } = props;
        const { annotations, value } = node;

        const nodeType = annotations && annotations.type ? annotations.type : node.meta;

        if (nodeType === NodeType.Model || nodeType === 'json_schema') {
          return (
            <Model
              key={key}
              className={cn('dark:border-darken', {
                [CLASSNAMES.bordered]: !parent || parent.type !== 'tab',
                [CLASSNAMES.block]: !parent || parent.type !== 'tab',
              })}
              title={annotations && annotations.title}
              schema={value}
            />
          );
        } else if (nodeType === NodeType.HttpOperation) {
          return <HttpOperation key={key} value={value} />;
        } else if (nodeType === NodeType.HttpService) {
          return <HttpService key={key} value={value} />;
        } else if (nodeType === 'http') {
          return <HttpRequest className="my-10" value={value} />;
        }

        return Components && Components.code ? Components.code(props, key) : defaultComponents.code(props, key);
      },
    };
  }, [Components]);
}

import { CLASSNAMES, IComponentMapping } from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import { get } from 'lodash';
import * as React from 'react';

import { HttpOperation } from '../components/HttpOperation';
import { HttpRequest } from '../components/HttpRequest';
import { HttpService } from '../components/HttpService';
import { Model } from '../components/Model';
import { ComponentsContext } from '../containers/Provider';

export function useComponents() {
  const Components = React.useContext(ComponentsContext);

  return React.useMemo<IComponentMapping>(() => {
    return {
      ...defaultComponents,
      ...Components,
    };
  }, [Components]);
}

export const defaultComponents: IComponentMapping = {
  code: (props, key) => {
    const { node, defaultComponents: components, parent } = props;
    const { annotations, value } = node;

    const nodeType = get(annotations, 'type') || node.meta;

    if (nodeType === NodeType.Model || nodeType === 'json_schema') {
      return (
        <Model
          key={key}
          className={cn('dark:border-darken', {
            [CLASSNAMES.bordered]: !parent || parent.type !== 'tab',
            [CLASSNAMES.block]: !parent || parent.type !== 'tab',
          })}
          title={annotations?.title}
          errors={annotations?.errors}
          maxRows={nodeType === 'json_schema' ? 15 : undefined}
          value={value}
        />
      );
    } else if (nodeType === NodeType.HttpOperation) {
      return <HttpOperation key={key} value={value} />;
    } else if (nodeType === NodeType.HttpService) {
      return <HttpService key={key} value={value} />;
    } else if (nodeType === 'http') {
      return (
        <HttpRequest
          key={key}
          className={cn('my-10', {
            [CLASSNAMES.block]: !parent || parent.type !== 'tab',
          })}
          value={value}
        />
      );
    }

    return components.code(props, key);
  },
};

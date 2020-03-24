import { CLASSNAMES, defaultComponentMapping, IComponentMapping } from '@stoplight/markdown-viewer';
import cn from 'classnames';
import { get } from 'lodash';
import * as React from 'react';

import { HttpRequest } from '../components/Docs/HttpRequest';
import { SchemaViewer } from '../components/SchemaViewer';
import { ComponentsContext } from '../containers/Provider';
import { isJSONSchema } from '../utils/json-schema';
import { useParsedValue } from './useParsedValue';

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
    const { node, parent } = props;
    const { annotations, value } = node;

    const nodeType = get(annotations, 'type') || node.meta;
    if (['json_schema', 'http'].includes(nodeType)) {
      return <WrapperComponent key={key} value={value} nodeType={nodeType} annotations={annotations} parent={parent} />;
    }

    const DefaultCode = defaultComponentMapping.code;
    return <DefaultCode {...props} />;
  },
};

// TODO (CL): remove when merged https://github.com/stoplightio/markdown-viewer/pull/40
const WrapperComponent = ({
  value,
  nodeType,
  annotations,
  parent,
}: {
  value: string;
  nodeType: 'json_schema' | 'http';
  annotations: any;
  parent: any;
}) => {
  const parsedValue = useParsedValue(value);

  if (nodeType === 'json_schema' && isJSONSchema(parsedValue)) {
    let examples;

    // TODO (CL): Handle other examples?
    if ('x-examples' in parsedValue) {
      examples = parsedValue['x-examples'];
    } else if ('examples' in parsedValue) {
      examples = parsedValue.examples;
    }

    return (
      <SchemaViewer
        className={cn('dark:border-darken', {
          [CLASSNAMES.bordered]: !parent || parent.type !== 'tab',
          [CLASSNAMES.block]: !parent || parent.type !== 'tab',
        })}
        title={annotations?.title}
        schema={parsedValue}
        examples={examples}
        errors={annotations?.errors}
      />
    );
  } else if (nodeType === 'http') {
    return (
      <HttpRequest
        className={cn('my-10', {
          [CLASSNAMES.block]: !parent || parent.type !== 'tab',
        })}
        value={value}
      />
    );
  }

  return null;
};

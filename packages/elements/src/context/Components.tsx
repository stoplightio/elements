import {
  CLASSNAMES,
  defaultComponentMapping,
  ICodeAnnotations,
  IComponentMapping,
  IComponentMappingProps,
} from '@stoplight/markdown-viewer';
import { ICode } from '@stoplight/markdown/ast-types/smdast';
import cn from 'classnames';
import { defaults, get, isObject } from 'lodash';
import * as React from 'react';

import { getExamplesFromSchema } from '../components/Docs/HttpOperation/utils';
import { HttpRequest } from '../components/Docs/HttpRequest';
import { SchemaViewer } from '../components/SchemaViewer';
import { useParsedValue } from '../hooks/useParsedValue';
import { isHttpRequest, isJSONSchema } from '../utils/guards';

const ComponentsContext = React.createContext<IComponentMapping | undefined>(undefined);
ComponentsContext.displayName = 'ComponentsContext';

export const useComponents = () => React.useContext(ComponentsContext) ?? defaultComponents;

interface ComponentsProviderProps {
  value: Partial<IComponentMapping> | undefined;
}

const CodeComponent = (props: IComponentMappingProps<ICode<ICodeAnnotations>>) => {
  const { node, parent } = props;
  const { annotations, value } = node;
  const nodeType = get(annotations, 'type') || node.meta;

  const parsedValue = useParsedValue(value);

  if (nodeType === 'json_schema') {
    if (!isJSONSchema(parsedValue)) {
      return null;
    }

    return (
      <SchemaViewer title={annotations?.title} schema={parsedValue} examples={getExamplesFromSchema(parsedValue)} />
    );
  }

  if (nodeType === 'http') {
    if (!isObject(parsedValue)) {
      return null;
    }

    return (
      <HttpRequest
        className={cn('my-10', {
          [CLASSNAMES.block]: !parent || parent.type !== 'tab',
        })}
        data={isHttpRequest(parsedValue) ? parsedValue : { method: 'get', ...parsedValue }}
      />
    );
  }

  const DefaultCode = defaultComponentMapping.code!;
  return <DefaultCode {...props} />;
};

const defaultComponents: IComponentMapping = {
  code: CodeComponent,
};

/**
 * Provides components to markdown-viewer.
 * Unlike a traditional context object, components not explicitly specified in `value` will inherit from the closest parent ComponentsProvider (if any).
 */
export const ComponentsProvider: React.FC<ComponentsProviderProps> = ({ value, children }) => {
  const currentComponents = useComponents();
  const newComponents = defaults({}, value, currentComponents); // override components without clearing ones that are not present in `value`
  return <ComponentsContext.Provider value={newComponents}>{children}</ComponentsContext.Provider>;
};

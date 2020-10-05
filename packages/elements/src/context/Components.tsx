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

const CodeComponent = (props: IComponentMappingProps<ICode>) => {
  const { node } = props;
  const { annotations } = node;
  const nodeType = get(annotations, 'type') || node.meta;

  if (['json_schema', 'http'].includes(nodeType)) {
    return <WrapperComponent {...props} />;
  }

  const DefaultCode = defaultComponentMapping.code!;
  return <DefaultCode {...props} />;
};

const WrapperComponent = ({ node, parent }: IComponentMappingProps<ICode<ICodeAnnotations>>) => {
  const { annotations, value } = node;

  // TODO (CL): We need to resolve this value to support $ref's in Markdown
  const parsedValue = useParsedValue(value);
  const nodeType = get(annotations, 'type') || node.meta;

  if (nodeType === 'json_schema' && isJSONSchema(parsedValue)) {
    return (
      <SchemaViewer title={annotations?.title} schema={parsedValue} examples={getExamplesFromSchema(parsedValue)} />
    );
  } else if (nodeType === 'http' && isObject(parsedValue)) {
    return (
      <HttpRequest
        className={cn('my-10', {
          [CLASSNAMES.block]: !parent || parent.type !== 'tab',
        })}
        data={isHttpRequest(parsedValue) ? parsedValue : { method: 'get', ...parsedValue }}
      />
    );
  }

  return null;
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

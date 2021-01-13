import {
  defaultComponentMapping,
  ICodeAnnotations,
  IComponentMapping,
  IComponentMappingProps,
} from '@stoplight/markdown-viewer';
import { ICode } from '@stoplight/markdown/ast-types/smdast';
import { defaults, get } from 'lodash';
import * as React from 'react';

import { getExamplesFromSchema } from '../components/Docs/HttpOperation/utils';
import { SchemaViewer } from '../components/SchemaViewer';
import { useParsedValue } from '../hooks/useParsedValue';
import { isJSONSchema } from '../utils/guards';

const ComponentsContext = React.createContext<IComponentMapping | undefined>(undefined);
ComponentsContext.displayName = 'ComponentsContext';

export const useComponents = () => React.useContext(ComponentsContext) ?? defaultComponents;

interface ComponentsProviderProps {
  value: Partial<IComponentMapping> | undefined;
}

const CodeComponent = (props: IComponentMappingProps<ICode<ICodeAnnotations>>) => {
  const { node } = props;
  const { annotations, value, resolved } = node;
  const nodeType = get(annotations, 'type') || node.meta;

  const parsedValue = useParsedValue(resolved ?? value);

  if (nodeType === 'json_schema') {
    if (!isJSONSchema(parsedValue)) {
      return null;
    }

    return (
      <SchemaViewer title={annotations?.title} schema={parsedValue} examples={getExamplesFromSchema(parsedValue)} />
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

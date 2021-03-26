import { defaultComponentMapping, ICodeAnnotations, IComponentMappingProps } from '@stoplight/markdown-viewer';
import { ICode } from '@stoplight/markdown/ast-types/smdast';
import { get } from 'lodash';
import React from 'react';

import { useParsedValue } from '../../../hooks/useParsedValue';
import { isJSONSchema } from '../../../utils/guards';
import { getExamplesFromSchema } from '../../Docs/HttpOperation/utils';
import { SchemaViewer } from '../../SchemaViewer';

export const CodeWithSchemaViewer = (props: IComponentMappingProps<ICode<ICodeAnnotations>>) => {
  const {
    node: { annotations, value, resolved, meta },
  } = props;
  const nodeType = get(annotations, 'type') || meta;

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

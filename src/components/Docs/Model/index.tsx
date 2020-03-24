import cn from 'classnames';
import * as React from 'react';

import { useParsedValue } from '../../../hooks/useParsedValue';
import { IBranchNode } from '../../../types';
import { isJSONSchema } from '../../../utils/json-schema';
import { SchemaViewer } from '../../SchemaViewer';

export interface IModelProps {
  node: IBranchNode;

  className?: string;
  errors?: string[];
  maxRows?: number;
  actions?: React.ReactElement;
}

export const Model = ({ node, className, maxRows = 50 }: IModelProps) => {
  const schema = useParsedValue(node.snapshot.data);

  if (!isJSONSchema(schema)) return null;

  let examples;

  // TODO (CL): Handle other examples?
  if ('x-examples' in schema) {
    examples = schema['x-examples'];
  } else if ('examples' in schema) {
    examples = schema.examples;
  }

  return <SchemaViewer className={cn('Model', className)} schema={schema} examples={examples} maxRows={maxRows} />;
};

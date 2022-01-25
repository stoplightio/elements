import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { HttpParamStyles, IHttpParam } from '@stoplight/types';
import type { JSONSchema7Object } from 'json-schema';
import { sortBy } from 'lodash';
import * as React from 'react';

import { isNodeExample } from '../../../utils/http-spec/examples';

type ParameterType = 'query' | 'header' | 'path' | 'cookie';

interface ParametersProps {
  parameterType: ParameterType;
  parameters?: IHttpParam[];
}

const readableStyles = {
  [HttpParamStyles.PipeDelimited]: 'Pipe separated values',
  [HttpParamStyles.SpaceDelimited]: 'Space separated values',
  [HttpParamStyles.CommaDelimited]: 'Comma separated values',
  [HttpParamStyles.Simple]: 'Comma separated values',
  [HttpParamStyles.Matrix]: 'Path style values',
  [HttpParamStyles.Label]: 'Label style values',
  [HttpParamStyles.Form]: 'Form style values',
} as const;

const defaultStyle = {
  query: HttpParamStyles.Form,
  header: HttpParamStyles.Simple,
  path: HttpParamStyles.Simple,
  cookie: HttpParamStyles.Form,
} as const;

export const Parameters: React.FunctionComponent<ParametersProps> = ({ parameters, parameterType }) => {
  const schema = React.useMemo(
    () => httpOperationParamsToSchema({ parameters, parameterType }),
    [parameters, parameterType],
  );

  if (!schema) return null;

  return <JsonSchemaViewer schema={schema} disableCrumbs />;
};
Parameters.displayName = 'HttpOperation.Parameters';

const httpOperationParamsToSchema = ({ parameters, parameterType }: ParametersProps): JSONSchema7Object | null => {
  if (!parameters || !parameters.length) return null;

  const schema = {
    properties: {},
    required: [],
  };

  const sortedParams = sortBy(parameters, ['required', 'name']);

  for (const p of sortedParams) {
    if (!p.schema) continue;

    const { name, description, required, deprecated, examples, style } = p;

    const paramExamples =
      examples?.map(example => {
        if (isNodeExample(example)) {
          return example.value;
        }

        return example.externalValue;
      }) || [];
    const schemaExamples = p.schema?.examples;
    const schemaExamplesArray = Array.isArray(schemaExamples) ? schemaExamples : [];

    // TODO (CL): This can be removed when http operations are fixed https://github.com/stoplightio/http-spec/issues/26
    const paramDescription = description || p.schema.description;

    const paramDeprecated = deprecated || (p.schema as any).deprecated;
    const paramStyle = style && defaultStyle[parameterType] !== style ? readableStyles[style] || style : undefined;

    schema.properties![p.name] = {
      ...p.schema,
      description: paramDescription,
      examples: [...paramExamples, ...schemaExamplesArray],
      deprecated: paramDeprecated,
      style: paramStyle,
    };

    if (required) {
      // @ts-expect-error
      schema.required!.push(name);
    }
  }

  return schema;
};

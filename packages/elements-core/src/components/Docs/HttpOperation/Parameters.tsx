import { isPlainObject } from '@stoplight/json';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { HttpParamStyles, IHttpParam } from '@stoplight/types';
import type { JSONSchema7Object } from 'json-schema';
import { sortBy } from 'lodash';
import * as React from 'react';

import { useSchemaInlineRefResolver } from '../../../context/InlineRefResolver';
import { useOptionsCtx } from '../../../context/Options';
import { isNodeExample } from '../../../utils/http-spec/examples';

type ParameterType = 'query' | 'header' | 'path' | 'cookie';

interface ParametersProps {
  parameterType: ParameterType;
  parameters?: IHttpParam[];
}

const readableStyles: Readonly<Partial<Record<HttpParamStyles, string>>> = {
  [HttpParamStyles.PipeDelimited]: 'Pipe separated values',
  [HttpParamStyles.SpaceDelimited]: 'Space separated values',
  [HttpParamStyles.CommaDelimited]: 'Comma separated values',
  [HttpParamStyles.Simple]: 'Comma separated values',
  [HttpParamStyles.Matrix]: 'Path style values',
  [HttpParamStyles.Label]: 'Label style values',
  [HttpParamStyles.Form]: 'Form style values',
};

const defaultStyle: Readonly<Partial<Record<string, HttpParamStyles>>> = {
  query: HttpParamStyles.Form,
  header: HttpParamStyles.Simple,
  path: HttpParamStyles.Simple,
  cookie: HttpParamStyles.Form,
};

export const Parameters: React.FunctionComponent<ParametersProps> = ({ parameters, parameterType }) => {
  const { nodeHasChanged, renderExtensionAddon } = useOptionsCtx();
  const [refResolver, maxRefDepth] = useSchemaInlineRefResolver();

  const schema = React.useMemo(
    () => httpOperationParamsToSchema({ parameters, parameterType }),
    [parameters, parameterType],
  );

  if (!schema) return null;

  return (
    <JsonSchemaViewer
      resolveRef={refResolver}
      maxRefDepth={maxRefDepth}
      schema={schema}
      disableCrumbs
      nodeHasChanged={nodeHasChanged}
      renderExtensionAddon={renderExtensionAddon}
    />
  );
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
    const { name, description, required, deprecated, examples, style } = p;

    const paramSchema = isPlainObject(p.schema) ? p.schema : {};
    const paramExamples =
      examples?.map(example => {
        if (isNodeExample(example)) {
          return example.value;
        }

        return example.externalValue;
      }) || [];

    const schemaExamples = paramSchema.examples;
    const schemaExamplesArray = Array.isArray(schemaExamples) ? schemaExamples : [];

    // TODO (CL): This can be removed when http operations are fixed https://github.com/stoplightio/http-spec/issues/26
    const paramDescription = description || paramSchema.description;
    const paramDeprecated = !!(deprecated || paramSchema.deprecated);

    let paramStyle: string | undefined;
    if (style && style !== HttpParamStyles.Unspecified && defaultStyle[parameterType] !== style) {
      paramStyle = readableStyles[style] || style;
    }

    if (isPlainObject(schema.properties)) {
      schema.properties![p.name] = {
        ...paramSchema,
        description: paramDescription,
        examples: [...paramExamples, ...schemaExamplesArray],
        deprecated: paramDeprecated,
        style: paramStyle,

        // the schema is technically the param, so set the stored id to the param's id
        'x-stoplight': {
          ...(isPlainObject(paramSchema['x-stoplight']) ? paramSchema['x-stoplight'] : {}),
          id: p.id,
        },
      };
    }

    if (required && Array.isArray(schema.required)) {
      // @ts-ignore
      schema.required.push(name);
    }
  }

  return schema;
};

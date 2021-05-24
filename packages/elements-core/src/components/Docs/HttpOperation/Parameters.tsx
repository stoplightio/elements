import { Validations } from '@stoplight/json-schema-viewer';
import { Box, VStack } from '@stoplight/mosaic';
import { Dictionary, HttpParamStyles, IHttpParam } from '@stoplight/types';
import { get, isEmpty, omit, omitBy, sortBy } from 'lodash';
import * as React from 'react';

import { useInlineRefResolver } from '../../../context/InlineRefResolver';

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
  const resolveRef = useInlineRefResolver();
  if (!parameters || !parameters.length) return null;

  return (
    <VStack spacing={2} divider={<Box borderT borderColor="light" w="full"></Box>}>
      {sortBy(parameters, ['required', 'name']).map(parameter => {
        const resolvedSchema =
          parameter.schema?.$ref && resolveRef
            ? resolveRef({ pointer: parameter.schema.$ref, source: null }, null, {})
            : null;

        return (
          <Parameter
            key={parameter.name}
            parameter={resolvedSchema ? { ...parameter, schema: resolvedSchema } : parameter}
            parameterType={parameterType}
          />
        );
      })}
    </VStack>
  );
};
Parameters.displayName = 'HttpOperation.Parameters';

interface IParameterProps {
  parameter: IHttpParam;
  parameterType: ParameterType;
}

export const Parameter: React.FunctionComponent<IParameterProps> = ({ parameter, parameterType }) => {
  if (!parameter) return null;

  // TODO (CL): This can be removed when http operations are fixed https://github.com/stoplightio/http-spec/issues/26
  const description = get(parameter, 'description') || get(parameter, 'schema.description');

  const type = get(parameter, 'schema.type', 'unknown');

  const format = parameter.schema?.format;

  // TODO (JJ): schema.deprecated is used in platform - to be removed once it's updated https://github.com/stoplightio/platform-internal/issues/2267
  const deprecated = get(parameter, 'deprecated') || get(parameter, 'schema.deprecated', false);

  const validations = omitBy(
    {
      ...omit(parameter, ['name', 'required', 'deprecated', 'description', 'schema', 'style']),
      ...omit(get(parameter, 'schema'), ['description', 'type', 'deprecated']),
    },
    // Remove empty arrays and objects
    value => typeof value === 'object' && isEmpty(value),
  ) as Dictionary<unknown, string>;

  return (
    <div className="HttpOperation__Parameters">
      <div className="sl-flex sl-items-center sl-my-2">
        <div className="sl-flex sl-items-baseline sl-text-base sl-flex-1">
          <div className="sl-font-mono sl-font-bold">{parameter.name}</div>
          <div className={'ml-2 sl-text-muted'}>{format ? `${type}<${format}>` : type}</div>
        </div>
        <div className="sl-text-sm sl-text-warning">
          {deprecated && <span className="sl-ml-2">deprecated</span>}
          {parameter.required && <span className="sl-ml-2">required</span>}
        </div>
      </div>

      {description && <div className="sl-w-full sl-text-muted sl-text-sm sl-my-2">{description}</div>}

      <div className="sl-text-sm">
        <Validations validations={validations} />
      </div>

      {parameter.style && defaultStyle[parameterType] !== parameter.style && (
        <div className="sl-flex sl-my-2">
          <span
            className="sl-px-1 sl-text-muted sl-font-mono sl-border sl-rounded-lg sl-text-sm sl-capitalize"
            style={{ backgroundColor: '#EDF2F7' }}
          >
            {readableStyles[parameter.style] || parameter.style}
          </span>
        </div>
      )}
    </div>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';

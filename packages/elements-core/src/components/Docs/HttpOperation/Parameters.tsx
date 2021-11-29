import { Validations } from '@stoplight/json-schema-viewer';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { Box, Flex, VStack } from '@stoplight/mosaic';
import { Dictionary, HttpParamStyles, IHttpParam } from '@stoplight/types';
import { get, isEmpty, omit, omitBy, sortBy } from 'lodash';
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
  if (!parameters || !parameters.length) return null;

  return (
    <VStack spacing={2} divider={<Box borderT borderColor="light" w="full"></Box>}>
      {sortBy(parameters, ['required', 'name']).map(parameter => {
        return <Parameter key={parameter.name} parameter={parameter} parameterType={parameterType} />;
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

  const rootType = get(parameter, 'schema.type', 'unknown');
  const type =
    parameter.schema?.items?.['type'] && rootType === 'array' ? `array[${parameter.schema.items['type']}]` : rootType;

  const format = parameter.schema?.format;

  // TODO (JJ): schema.deprecated is used in platform - to be removed once it's updated https://github.com/stoplightio/platform-internal/issues/2267
  const deprecated = get(parameter, 'deprecated') || get(parameter, 'schema.deprecated', false);

  const parameterExamples =
    parameter.examples?.map(example => {
      if (isNodeExample(example)) {
        return example.value;
      }

      return example.externalValue;
    }) || [];

  const schemaExamples = parameter.schema?.examples;
  const schemaExamplesArray = Array.isArray(schemaExamples) ? schemaExamples : [];

  const validations = omitBy(
    {
      ...omit(parameter, ['name', 'required', 'deprecated', 'description', 'schema', 'style', 'examples']),
      ...omit(get(parameter, 'schema'), ['description', 'type', 'deprecated']),
      ...omit(get(parameter, 'schema.items'), ['description', 'type', 'deprecated']),
      examples: [...parameterExamples, ...schemaExamplesArray],
    },
    // Remove empty arrays and objects
    value => (typeof value === 'object' && isEmpty(value)) || typeof value === 'undefined',
  ) as Dictionary<unknown, string>;

  return (
    <Box className="HttpOperation__Parameters">
      <Flex alignItems="center" my={2}>
        <Flex alignItems="baseline" fontSize="base" flex={1}>
          <Box fontFamily="mono" fontWeight="bold">
            {parameter.name}
          </Box>
          <Box ml={2} color="muted">
            {format ? `${type}<${format}>` : type}
          </Box>
        </Flex>
        <Box fontSize="sm" color="warning">
          {deprecated && (
            <Box as="span" ml={2}>
              deprecated
            </Box>
          )}
          {parameter.required && (
            <Box as="span" ml={2}>
              required
            </Box>
          )}
        </Box>
      </Flex>

      {description && (
        <Box w="full" color="muted" fontSize="sm" my={2}>
          <MarkdownViewer markdown={description} />
        </Box>
      )}

      <Box fontSize="sm">
        <Validations validations={validations} />
      </Box>

      {parameter.style && defaultStyle[parameterType] !== parameter.style && (
        <Flex my={2}>
          <Box
            as="span"
            px={1}
            color="muted"
            fontFamily="mono"
            rounded="lg"
            fontSize="sm"
            textTransform="capitalize"
            style={{ backgroundColor: '#EDF2F7' }}
          >
            {readableStyles[parameter.style] || parameter.style}
          </Box>
        </Flex>
      )}
    </Box>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';

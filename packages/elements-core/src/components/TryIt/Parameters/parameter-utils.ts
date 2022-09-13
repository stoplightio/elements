import { safeStringify } from '@stoplight/json';
import type { IHttpParam, INodeExample, INodeExternalExample } from '@stoplight/types';
import { JSONSchema7Definition, JSONSchema7Type } from 'json-schema';
import { isObject, keyBy, map, mapValues } from 'lodash';

export type ParameterSpec = Pick<IHttpParam, 'name' | 'schema' | 'required'> & {
  examples?: (Omit<INodeExample, 'id'> | Omit<INodeExternalExample, 'id'>)[];
};
const booleanOptions = [
  { label: 'Not Set', value: '' },
  { label: 'False', value: 'false' },
  { label: 'True', value: 'true' },
];

function enumOptions(enumValues: JSONSchema7Type[], required?: boolean) {
  const options = map(enumValues, v => ({ value: typeof v === 'number' ? v : String(v) }));
  return required ? options : [{ label: 'Not Set', value: '' }, ...options];
}

export function parameterOptions(parameter: ParameterSpec) {
  return parameter.schema?.type === 'boolean'
    ? booleanOptions
    : parameter.schema?.enum !== undefined
    ? enumOptions(parameter.schema.enum, parameter.required)
    : null;
}

export const selectExampleOption = { value: '', label: 'Pick an example' };

export function exampleOptions(parameter: ParameterSpec) {
  return parameter.examples?.length && parameter.examples.length > 1
    ? [
        selectExampleOption,
        ...parameter.examples.map(example => ({ label: example.key, value: exampleValue(example) })),
      ]
    : null;
}

export function parameterSupportsFileUpload(parameter: Pick<ParameterSpec, 'schema'>) {
  return (
    parameter.schema?.type === 'string' &&
    (parameter.schema?.contentEncoding === 'base64' ||
      parameter.schema?.contentMediaType === 'application/octet-stream')
  );
}

function stringifyValue(value: unknown) {
  return typeof value === 'object' ? JSON.stringify(value) : escapeQuotes(String(value));
}

function exampleValue(example: Omit<INodeExample, 'id'> | Omit<INodeExternalExample, 'id'>) {
  const value = 'value' in example ? example.value : example.externalValue;
  return stringifyValue(value);
}

function escapeQuotes(value: string) {
  return value.replace(/"/g, '\\"');
}

export function getPlaceholderForParameter(parameter: ParameterSpec) {
  const { value: parameterValue, isDefault } = getValueForParameter(parameter);

  if (parameterValue) return `${isDefault ? 'defaults to' : 'example'}: ${parameterValue}`;

  return String(parameter.schema?.type ?? '');
}

function retrieveDefaultFromSchema(parameter: ParameterSpec) {
  const defaultValue = parameter.schema?.default;
  return isObject(defaultValue) ? safeStringify(defaultValue) : defaultValue;
}

const getValueForParameter = (parameter: ParameterSpec) => {
  const defaultValue = retrieveDefaultFromSchema(parameter);
  if (typeof defaultValue !== 'undefined') {
    return { value: stringifyValue(defaultValue), isDefault: true };
  }

  const examples = parameter.examples ?? [];
  if (examples.length > 0) {
    return { value: exampleValue(examples[0]) };
  }

  const enums = parameter.schema?.enum ?? [];
  if (enums.length > 0) {
    return { value: stringifyValue(enums[0]) };
  }

  return { value: '' };
};

const getInitialValueForParameter = (parameter: ParameterSpec) => {
  const isRequired = !!parameter.required;

  if (!isRequired) return '';

  return getValueForParameter(parameter).value;
};

export const initialParameterValues: (params: readonly ParameterSpec[]) => Record<string, string> = params => {
  const paramsByName = keyBy(params, (param: ParameterSpec) => param.name);
  return mapValues(paramsByName, param => getInitialValueForParameter(param));
};

export function mapSchemaPropertiesToParameters(
  properties: { [key: string]: JSONSchema7Definition },
  required: string[] | undefined,
) {
  return Object.entries(properties).map(([name, schema]) => ({
    name,
    schema: typeof schema !== 'boolean' ? schema : undefined,
    examples: typeof schema !== 'boolean' && schema.examples ? [{ key: 'example', value: schema.examples }] : undefined,
    ...(required?.includes(name) && { required: true }),
  }));
}

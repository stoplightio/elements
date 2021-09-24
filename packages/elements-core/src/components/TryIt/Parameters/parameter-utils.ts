import { safeStringify } from '@stoplight/json';
import { IHttpParam, INodeExample, INodeExternalExample } from '@stoplight/types';
import { JSONSchema7Definition, JSONSchema7Type } from 'json-schema';
import { isObject, map } from 'lodash';
import { keyBy, mapValues, pipe } from 'lodash/fp';

export type ParameterSpec = Pick<IHttpParam, 'name' | 'examples' | 'schema' | 'required'>;
const booleanOptions = [
  { label: 'Not Set', value: '' },
  { label: 'False', value: 'false' },
  { label: 'True', value: 'true' },
];

function enumOptions(enumValues: JSONSchema7Type[], required?: boolean) {
  const options = map(enumValues, v => ({ value: Number.isNaN(Number(v)) ? String(v) : Number(v) }));
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

function exampleValue(example: INodeExample | INodeExternalExample) {
  return 'value' in example ? String(example.value) : String(example.externalValue);
}

export function getPlaceholderForParameter(parameter: ParameterSpec) {
  const parameterValue = getValueForParameter(parameter);

  if (parameterValue) return `example: ${parameterValue}`;

  return parameterValue || String(parameter.schema?.type ?? '');
}

function retrieveDefaultFromSchema(parameter: ParameterSpec) {
  const defaultValue = parameter.schema?.default;
  return isObject(defaultValue) ? safeStringify(defaultValue) : defaultValue;
}

const getValueForParameter = (parameter: ParameterSpec) => {
  const examples = parameter.examples ?? [];
  if (examples.length > 0) return exampleValue(examples[0]);

  const defaultValue = retrieveDefaultFromSchema(parameter);
  if (defaultValue) return String(defaultValue);

  const enums = parameter.schema?.enum ?? [];
  if (enums.length > 0) return String(enums[0]);

  return '';
};

const getInitialValueForParameter = (parameter: ParameterSpec) => {
  const isRequired = !!parameter.required;

  if (!isRequired) return '';

  return getValueForParameter(parameter);
};

export const initialParameterValues: (params: readonly ParameterSpec[]) => Record<string, string> = pipe(
  keyBy((param: ParameterSpec) => param.name),
  mapValues(getInitialValueForParameter),
);

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

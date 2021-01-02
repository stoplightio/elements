import { safeStringify } from '@stoplight/json';
import { IHttpParam, INodeExample, INodeExternalExample } from '@stoplight/types';
import { isObject, map } from 'lodash';

export type ParameterSpec = Pick<IHttpParam, 'name' | 'examples' | 'schema' | 'required'>;
const booleanOptions = [
  { label: 'Not Set', value: '' },
  { label: 'False', value: 'false' },
  { label: 'True', value: 'true' },
];

export function parameterOptions(parameter: ParameterSpec) {
  return parameter.schema?.type === 'boolean'
    ? booleanOptions
    : parameter.schema?.enum !== undefined
    ? map(parameter.schema.enum, v => (Number.isNaN(Number(v)) ? String(v) : Number(v)))
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

export function exampleValue(example: INodeExample | INodeExternalExample) {
  return 'value' in example ? example.value : example.externalValue;
}

export function getPlaceholderForParameter(parameter: ParameterSpec) {
  const defaultOrType = getDefaultForParameter(parameter) ?? parameter.schema?.type;
  return defaultOrType !== undefined ? String(defaultOrType) : undefined;
}

function getDefaultForParameter(parameter: ParameterSpec) {
  const defaultValue = parameter.schema?.default;
  return isObject(defaultValue) ? safeStringify(defaultValue) : defaultValue;
}

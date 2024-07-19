import { safeStringify } from '@stoplight/json';
import { isRegularNode, RegularNode, SchemaNode } from '@stoplight/json-schema-tree';
import type { IHttpParam, INodeExample, INodeExternalExample } from '@stoplight/types';
import { JSONSchema7, JSONSchema7Definition, JSONSchema7Type } from 'json-schema';
import { isObject, keyBy, last, map, mapValues } from 'lodash';

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

export function parameterSupportsFileUpload(parameter?: Pick<ParameterSpec, 'schema'>) {
  return (
    parameter &&
    parameter.schema &&
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

export function getPlaceholderForSelectedParameter(parameter: ParameterSpec) {
  const { value: parameterValue, isDefault } = getValueForParameter(parameter);

  if (isDefault) {
    return `select an option (defaults to: ${parameterValue})`;
  }

  return undefined;
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
    examples:
      typeof schema !== 'boolean' && Array.isArray(schema.examples) && schema.examples[0]
        ? [{ key: 'example', value: schema.examples[0] }]
        : undefined,
    ...(required?.includes(name) && { required: true }),
  }));
}

export function toParameterSpec(jsonTreeNode: RegularNode): ParameterSpec {
  const isBoolean = jsonTreeNode.primaryType === 'boolean';
  // TODO: Why does ParameterSpec assume JSONSchema7 and ignore 6 and 4?
  const schema = !isBoolean ? (jsonTreeNode.fragment as JSONSchema7) : undefined;
  const examples =
    !isBoolean && jsonTreeNode.fragment.examples && jsonTreeNode.fragment.examples[0]
      ? [{ key: 'example', value: jsonTreeNode.fragment.examples[0] }]
      : undefined;

  // It's possible -- but very unlikely -- that the path is empty here.
  const lastJsonPathSegment = last(jsonTreeNode.path) ?? '<<UNKNOWN>>';

  return {
    name: lastJsonPathSegment,
    schema,
    examples,
    required: isRequired(jsonTreeNode),
  };
}

/**
 * @returns
 * - `true` iff this schema/property is among the properties required by `n`'s
 *   parent
 * - `false` iff this schema/property is NOT among the properties required by
 *   `n`'s parent
 * - `undefined` when required-ness is intedeterminate; e.g., there's no parent,
 *   the parent isn't a `RegularNode`, this thing lacks a key/name, `n` isn't a
 *   `RegularNode`
 */
export function isRequired(n: SchemaNode): boolean | undefined {
  if (!isRegularNode(n)) {
    return undefined;
  }

  const name: string | undefined = last(n.path);
  if (name === undefined) {
    return undefined;
  }

  const parent = n.parent;
  if (parent === null || !isRegularNode(parent)) {
    return undefined;
  }

  return parent.required !== null && parent.required.includes(name);
}

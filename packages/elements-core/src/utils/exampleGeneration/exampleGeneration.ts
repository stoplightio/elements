import { isPlainObject, safeStringify } from '@stoplight/json';
import * as Sampler from '@stoplight/json-schema-sampler';
import { IMediaTypeContent, INodeExample, INodeExternalExample } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';
import React from 'react';

import { useDocument } from '../../context/InlineRefResolver';
import { getResolvedObject } from '../ref-resolving/resolvedObject';

type Example = {
  label: string;
  data: string;
};

// Merges oneOf/anyOf with their first option because @stoplight/json-schema-sampler cannot handle them.
const mergeOneOfAnyOf = (schema: any): any => {
  if (!isPlainObject(schema)) {
    return schema;
  }

  let result: any = { ...schema };

  if (result.oneOf && result.oneOf.length > 0) {
    const firstOption = result.oneOf[0];
    const { oneOf, ...rest } = result;
    result = { ...rest, ...firstOption };
  } else if (result.anyOf && result.anyOf.length > 0) {
    const firstOption = result.anyOf[0];
    const { anyOf, ...rest } = result;
    result = { ...rest, ...firstOption };
  }

  if (result.properties) {
    result.properties = Object.fromEntries(
      Object.entries(result.properties).map(([key, value]) => [key, mergeOneOfAnyOf(value)]),
    );
  }

  if (result.items) {
    result.items = mergeOneOfAnyOf(result.items);
  }

  if (result.allOf) {
    result.allOf = result.allOf.map((item: any) => mergeOneOfAnyOf(item));
  }

  delete result.oneOf;
  delete result.anyOf;

  return result;
};

// Range bounds injected by convertToJsonSchema for OAS numeric formats.
const OAS_FORMAT_RANGES: Record<string, { minimum: number; maximum: number }> = {
  int32: { minimum: 0 - 2 ** 31, maximum: 2 ** 31 - 1 },
  int64: { minimum: Number.MIN_SAFE_INTEGER, maximum: Number.MAX_SAFE_INTEGER },
  float: { minimum: 0 - 2 ** 128, maximum: 2 ** 128 - 1 },
  double: { minimum: 0 - Number.MAX_VALUE, maximum: Number.MAX_VALUE },
};

// Stoplight translation can infer numeric bounds from formats (e.g. int32/float).
// When those bounds were not explicitly authored, omit them so the sampler generates
// representative values instead of format-boundary extremes.
const stripInferredNumericBounds = (schema: any): any => {
  if (!isPlainObject(schema)) {
    return schema;
  }

  const result: any = { ...schema };
  const explicitProperties = Array.isArray(result?.['x-stoplight']?.explicitProperties)
    ? result['x-stoplight'].explicitProperties
    : [];
  const isNumericType = result.type === 'integer' || result.type === 'number';
  const formatRange = OAS_FORMAT_RANGES[result.format];

  // Strip if not explicit OR if the value exactly matches the format-injected range default.
  // The second condition handles schemas that were processed twice, causing the range value
  // to appear in explicitProperties even though it was not authored.
  const hasExplicitMinimum = explicitProperties.includes('minimum') && result.minimum !== formatRange?.minimum;
  const hasExplicitMaximum = explicitProperties.includes('maximum') && result.maximum !== formatRange?.maximum;

  if (isNumericType && !hasExplicitMinimum) {
    delete result.minimum;
  }

  if (isNumericType && !hasExplicitMaximum) {
    delete result.maximum;
  }

  if (result.properties && isPlainObject(result.properties)) {
    result.properties = Object.fromEntries(
      Object.entries(result.properties).map(([key, value]) => [key, stripInferredNumericBounds(value)]),
    );
  }

  if (Array.isArray(result.items)) {
    result.items = result.items.map((item: any) => stripInferredNumericBounds(item));
  } else if (result.items) {
    result.items = stripInferredNumericBounds(result.items);
  }

  if (Array.isArray(result.allOf)) {
    result.allOf = result.allOf.map((item: any) => stripInferredNumericBounds(item));
  }

  if (Array.isArray(result.oneOf)) {
    result.oneOf = result.oneOf.map((item: any) => stripInferredNumericBounds(item));
  }

  if (Array.isArray(result.anyOf)) {
    result.anyOf = result.anyOf.map((item: any) => stripInferredNumericBounds(item));
  }

  return result;
};

// Sentinel replaced with literal 0.0 after JSON stringify to produce a decimal representation.
const FLOAT_ZERO_MARKER = '__FLOAT_ZERO__';

// Walks sampled value + schema in parallel; replaces 0 with FLOAT_ZERO_MARKER for float/double fields.
const markFloatZeros = (value: any, schema: any): any => {
  if (!isPlainObject(schema)) return value;

  if (Array.isArray(schema.allOf)) {
    return schema.allOf.reduce((currentValue: any, item: any) => markFloatZeros(currentValue, item), value);
  }

  if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
    return markFloatZeros(value, schema.oneOf[0]);
  }

  if (Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
    return markFloatZeros(value, schema.anyOf[0]);
  }

  if (schema.type === 'number' && (schema.format === 'float' || schema.format === 'double') && value === 0) {
    return FLOAT_ZERO_MARKER;
  }

  if (isPlainObject(value) && isPlainObject(schema.properties)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, markFloatZeros(v, (schema.properties as any)[k] ?? {})]),
    );
  }

  if (Array.isArray(value) && schema.items && !Array.isArray(schema.items)) {
    return value.map((item: any) => markFloatZeros(item, schema.items));
  }

  return value;
};

const stringifyWithFloatZeros = (value: any): string => {
  // safeStringify returns a bare string (no JSON quotes) for scalar string values,
  // so handle the top-level float marker before stringifying.
  if (value === FLOAT_ZERO_MARKER) return '0.0';
  return (safeStringify(value, undefined, 2) ?? '').replace(/"__FLOAT_ZERO__"/g, '0.0');
};

const normalizeInferredNumericBounds = (value: any, schema: any): any => {
  if (!isPlainObject(schema)) return value;

  const schemaObject: any = schema;

  if (Array.isArray(schemaObject.allOf)) {
    return schemaObject.allOf.reduce(
      (currentValue: any, item: any) => normalizeInferredNumericBounds(currentValue, item),
      value,
    );
  }

  if (Array.isArray(schemaObject.oneOf) && schemaObject.oneOf.length > 0) {
    return normalizeInferredNumericBounds(value, schemaObject.oneOf[0]);
  }

  if (Array.isArray(schemaObject.anyOf) && schemaObject.anyOf.length > 0) {
    return normalizeInferredNumericBounds(value, schemaObject.anyOf[0]);
  }

  const explicitProperties = Array.isArray(schemaObject?.['x-stoplight']?.explicitProperties)
    ? schemaObject['x-stoplight'].explicitProperties
    : [];
  const isNumericType = schemaObject.type === 'integer' || schemaObject.type === 'number';
  const formatRange = OAS_FORMAT_RANGES[schemaObject.format];
  const hasExplicitMinimum = explicitProperties.includes('minimum') && schemaObject.minimum !== formatRange?.minimum;
  const hasExplicitMaximum = explicitProperties.includes('maximum') && schemaObject.maximum !== formatRange?.maximum;

  if (
    isNumericType &&
    formatRange &&
    ((!hasExplicitMinimum && value === formatRange.minimum) || (!hasExplicitMaximum && value === formatRange.maximum))
  ) {
    return schemaObject.type === 'number' && (schemaObject.format === 'float' || schemaObject.format === 'double')
      ? FLOAT_ZERO_MARKER
      : 0;
  }

  if (isPlainObject(value) && isPlainObject(schemaObject.properties)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        normalizeInferredNumericBounds(nestedValue, (schemaObject.properties as any)[key] ?? {}),
      ]),
    );
  }

  if (Array.isArray(value) && schemaObject.items && !Array.isArray(schemaObject.items)) {
    return value.map((item: any) => normalizeInferredNumericBounds(item, schemaObject.items));
  }

  if (Array.isArray(value) && Array.isArray(schemaObject.items)) {
    return value.map((item: any, index: number) => normalizeInferredNumericBounds(item, schemaObject.items[index]));
  }

  return value;
};

export const stringifyExampleWithResolvedSchema = (value: any, schema: any): string => {
  const normalizedValue = normalizeInferredNumericBounds(value, schema);
  return stringifyWithFloatZeros(markFloatZeros(normalizedValue, schema));
};

export type GenerateExampleFromMediaTypeContentOptions = Sampler.Options;

export const useGenerateExampleFromMediaTypeContent = (
  mediaTypeContent: IMediaTypeContent | undefined,
  chosenExampleIndex?: number,
  { skipReadOnly, skipWriteOnly, skipNonRequired, ticks }: GenerateExampleFromMediaTypeContentOptions = {},
) => {
  const document = useDocument();
  return React.useMemo(
    () =>
      generateExampleFromMediaTypeContent(mediaTypeContent, document, chosenExampleIndex, {
        skipNonRequired,
        skipWriteOnly,
        skipReadOnly,
        ticks: ticks || 6000,
      }),
    [mediaTypeContent, document, chosenExampleIndex, skipNonRequired, skipWriteOnly, skipReadOnly, ticks],
  );
};

export const generateExampleFromMediaTypeContent = (
  mediaTypeContent: IMediaTypeContent | undefined,
  document: any,
  chosenExampleIndex = 0,
  options?: GenerateExampleFromMediaTypeContentOptions,
) => {
  const textRequestBodySchema = mediaTypeContent?.schema;
  const textRequestBodyExamples = mediaTypeContent?.examples;

  try {
    if (textRequestBodyExamples?.length) {
      return (
        safeStringify(
          textRequestBodyExamples?.[chosenExampleIndex]['value' as keyof (INodeExample | INodeExternalExample)],
          undefined,
          2,
        ) ?? ''
      );
    } else if (textRequestBodySchema) {
      let unwrappedSchema = getResolvedObject(textRequestBodySchema) as any;

      unwrappedSchema = stripInferredNumericBounds(unwrappedSchema);
      unwrappedSchema = mergeOneOfAnyOf(unwrappedSchema);

      const generated = Sampler.sample(unwrappedSchema, options, document);

      if (generated === null) return '';
      return stringifyExampleWithResolvedSchema(generated, unwrappedSchema);
    }
  } catch (e) {
    console.warn(e);
    return `Example cannot be created for this schema\n${e}`;
  }
  return '';
};

export const generateExamplesFromJsonSchema = (schema: JSONSchema7 & { 'x-examples'?: unknown }): Example[] => {
  const examples: Example[] = [];

  if (Array.isArray(schema?.examples)) {
    schema.examples.forEach((example, index) => {
      examples.push({
        data: safeStringify(example, undefined, 2) ?? '',
        label: index === 0 ? 'default' : `example-${index}`,
      });
    });
  } else if (isPlainObject(schema?.['x-examples'])) {
    for (const [label, example] of Object.entries(schema['x-examples'])) {
      if (isPlainObject(example)) {
        const val = example.hasOwnProperty('value') && Object.keys(example).length === 1 ? example.value : example;
        examples.push({
          label,
          data: safeStringify(val, undefined, 2) ?? '',
        });
      }
    }
  }

  if (examples.length) {
    return examples;
  }

  try {
    let resolvedSchema = getResolvedObject(schema);
    resolvedSchema = stripInferredNumericBounds(resolvedSchema);
    resolvedSchema = mergeOneOfAnyOf(resolvedSchema);

    const generated = Sampler.sample(resolvedSchema, {
      maxSampleDepth: 4,
      ticks: 6000,
    });

    return generated !== null
      ? [
          {
            label: 'default',
            data: stringifyExampleWithResolvedSchema(generated, resolvedSchema),
          },
        ]
      : [{ label: 'default', data: '' }];
  } catch (e) {
    return [{ label: '', data: `Example cannot be created for this schema\n${e}` }];
  }
};

export const exceedsSize = (example: string, size: number = 500) => {
  return example.split(/\r\n|\r|\n/).length > size;
};

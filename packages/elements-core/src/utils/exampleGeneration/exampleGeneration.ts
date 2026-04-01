import { isPlainObject, safeStringify } from '@stoplight/json';
import * as Sampler from '@stoplight/json-schema-sampler';
import { IMediaTypeContent, INodeExample, INodeExternalExample } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';
import React from 'react';

import { useDocument } from '../../context/InlineRefResolver';

type Example = {
  label: string;
  data: string;
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
      const generated = Sampler.sample(textRequestBodySchema, options, document);
      return generated !== null ? safeStringify(generated, undefined, 2) ?? '' : '';
    }
  } catch (e) {
    console.warn(e);
    return `Example cannot be created for this schema\n${e}`;
  }
  return '';
};

export const generateExamplesFromJsonSchema = (schema: JSONSchema7 & { 'x-examples'?: unknown }): Example[] => {
  const examples: Example[] = [];

  const hasNoResolvedProperties = (schemaToCheck: JSONSchema7): boolean => {
    // Cond1: object type with no properties
    if (schemaToCheck.type !== 'object') return false;

    // Cond2: check allOf, oneOf, anyOf — if any sub-schema has 'properties', return false
    const composedArray = schemaToCheck.allOf || schemaToCheck.oneOf || schemaToCheck.anyOf;

    if (Array.isArray(composedArray)) {
      const hasProperties = composedArray.some(sub => typeof sub === 'object' && sub !== null && 'properties' in sub);
      if (!hasProperties) {
        return true;
      }
    } else if (!schemaToCheck.properties) {
      return true;
    }

    return false;
  };

  const isHasNoResolvedProperties = hasNoResolvedProperties(schema);

  if (Array.isArray(schema?.examples)) {
    if (isHasNoResolvedProperties) {
      schema.examples.forEach((example, index) => {
        examples.push({
          data: '{}',
          label: index === 0 ? 'default' : `example-${index}`,
        });
      });
    } else {
      let res = filterExamplesBySchema(schema, schema.examples);
      res.forEach((example, index) => {
        examples.push({
          data: safeStringify(example, undefined, 2) ?? '',
          label: index === 0 ? 'default' : `example-${index}`,
        });
      });
    }
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
    const generated = Sampler.sample(schema, {
      maxSampleDepth: 4,
      ticks: 6000,
    });

    return generated !== null
      ? [
          {
            label: 'default',
            data: safeStringify(generated, undefined, 2) ?? '',
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

/**
 * Filters examples to only include properties that exist in the schema.
 * Handles nested objects, arrays, allOf, oneOf, anyOf, and additionalProperties.
 * Only removes a property from the example at the exact path where it was removed from the schema.
 *
 * @param schema - The JSON Schema (possibly with masked/hidden properties)
 * @param examples - Array of raw JSON values (e.g. schema.examples)
 * @returns New array of filtered objects matching the schema structure
 */
export const filterExamplesBySchema = (
  schema: JSONSchema7 & { 'x-examples'?: unknown },
  examples: unknown[],
): unknown[] => {
  return examples.map(example => {
    try {
      return filterValueBySchema(example, schema);
    } catch {
      return example;
    }
  });
};

const collectSchemaPropertyNames = (schema: JSONSchema7): Set<string> => {
  const keys = new Set<string>();

  if (schema.properties) {
    for (const key of Object.keys(schema.properties)) {
      keys.add(key);
    }
  }

  const composedSchemas = [
    ...(Array.isArray(schema.allOf) ? schema.allOf : []),
    ...(Array.isArray(schema.oneOf) ? schema.oneOf : []),
    ...(Array.isArray(schema.anyOf) ? schema.anyOf : []),
  ];

  for (const sub of composedSchemas) {
    if (typeof sub === 'object' && sub !== null) {
      for (const key of collectSchemaPropertyNames(sub as JSONSchema7)) {
        keys.add(key);
      }
    }
  }

  return keys;
};

const findPropertySchema = (schema: JSONSchema7, propertyName: string): JSONSchema7 | undefined => {
  if (schema.properties?.[propertyName]) {
    const prop = schema.properties[propertyName];
    return typeof prop === 'boolean' ? undefined : prop;
  }

  const composedSchemas = [
    ...(Array.isArray(schema.allOf) ? schema.allOf : []),
    ...(Array.isArray(schema.oneOf) ? schema.oneOf : []),
    ...(Array.isArray(schema.anyOf) ? schema.anyOf : []),
  ];

  for (const sub of composedSchemas) {
    if (typeof sub === 'object' && sub !== null) {
      const found = findPropertySchema(sub as JSONSchema7, propertyName);
      if (found) return found;
    }
  }

  return undefined;
};

const filterValueBySchema = (value: unknown, schema: JSONSchema7): unknown => {
  if (value === null || value === undefined) return value;

  // Handle arrays
  if (Array.isArray(value)) {
    const itemSchema =
      schema.items && typeof schema.items !== 'boolean' && !Array.isArray(schema.items)
        ? (schema.items as JSONSchema7)
        : undefined;

    return itemSchema ? value.map(item => filterValueBySchema(item, itemSchema)) : value;
  }

  // Handle objects
  if (isPlainObject(value)) {
    const allowedKeys = collectSchemaPropertyNames(schema);
    const hasStructure = allowedKeys.size > 0;
    const hasAdditionalProperties = schema.additionalProperties;

    if (!hasStructure && !hasAdditionalProperties) return value;

    const result: Record<string, unknown> = {};

    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      if (allowedKeys.has(key)) {
        const propSchema = findPropertySchema(schema, key);
        result[key] = propSchema ? filterValueBySchema(val, propSchema) : val;
      } else if (hasAdditionalProperties) {
        result[key] = val;
      }
      // else: property was masked/removed from schema — omit it
    }

    return result;
  }

  // Primitives
  return value;
};

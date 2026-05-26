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
      const unwrappedDocument = document ? getResolvedObject(document) : document;

      unwrappedSchema = mergeOneOfAnyOf(unwrappedSchema);

      const generated = Sampler.sample(unwrappedSchema, options, unwrappedDocument);

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
    resolvedSchema = mergeOneOfAnyOf(resolvedSchema);

    const generated = Sampler.sample(resolvedSchema, {
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

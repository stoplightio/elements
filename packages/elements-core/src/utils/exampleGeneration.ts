import { isPlainObject, safeStringify } from '@stoplight/json';
import * as Sampler from '@stoplight/json-schema-sampler';
import { IMediaTypeContent } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';
import React from 'react';

import { useDocument } from '../context/InlineRefResolver';

type Example = {
  label: string;
  data: string;
};

export type GenerateExampleFromMediaTypeContentOptions = Sampler.Options;

export const useGenerateExampleFromMediaTypeContent = (
  mediaTypeContent: IMediaTypeContent | undefined,
  chosenExampleIndex?: number,
  { skipReadOnly, skipWriteOnly, skipNonRequired }: GenerateExampleFromMediaTypeContentOptions = {},
) => {
  const document = useDocument();
  return React.useMemo(
    () =>
      generateExampleFromMediaTypeContent(mediaTypeContent, document, chosenExampleIndex, {
        skipNonRequired,
        skipWriteOnly,
        skipReadOnly,
      }),
    [mediaTypeContent, document, chosenExampleIndex, skipNonRequired, skipReadOnly, skipWriteOnly],
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
      return safeStringify(textRequestBodyExamples?.[chosenExampleIndex]['value'], undefined, 2) ?? '';
    } else if (textRequestBodySchema) {
      const generated = Sampler.sample(textRequestBodySchema, options, document);
      return generated !== null ? safeStringify(generated, undefined, 2) ?? '' : '';
    }
  } catch (e) {
    console.warn(e);
  }
  return '';
};

export const generateExamplesFromJsonSchema = (schema: JSONSchema7): Example[] => {
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

  const generated = Sampler.sample(schema, {
    maxSampleDepth: 4,
  });

  return generated !== null
    ? [
        {
          label: 'default',
          data: safeStringify(generated, undefined, 2) ?? '',
        },
      ]
    : [{ label: 'default', data: '' }];
};

import { safeStringify } from '@stoplight/json';
import * as Sampler from '@stoplight/json-schema-sampler';
import { IMediaTypeContent } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';
import React from 'react';

import { useDocument } from '../context/InlineRefResolver';

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

export const generateExampleFromJsonSchema = (schema: JSONSchema7) => {
  if (Array.isArray(schema?.examples)) {
    return schema.examples.map(example => safeStringify(example, undefined, 2) ?? '');
  }
  const generated = Sampler.sample(schema);
  return generated !== null ? [safeStringify(generated, undefined, 2) ?? ''] : [''];
};

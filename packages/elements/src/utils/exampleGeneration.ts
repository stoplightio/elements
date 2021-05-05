import { safeStringify } from '@stoplight/json';
import * as Sampler from '@stoplight/json-schema-sampler';
import { IMediaTypeContent } from '@stoplight/types';
import React from 'react';

import { useDocument } from '../context/InlineRefResolver';

export const useGenerateExampleFromMediaTypeContent = (
  mediaTypeContent: IMediaTypeContent | undefined,
  chosenExampleIndex?: number,
) => {
  const document = useDocument();
  return React.useMemo(() => generateExampleFromMediaTypeContent(mediaTypeContent, document, chosenExampleIndex), [
    mediaTypeContent,
    document,
    chosenExampleIndex,
  ]);
};

export const generateExampleFromMediaTypeContent = (
  mediaTypeContent: IMediaTypeContent | undefined,
  document: any,
  chosenExampleIndex = 0,
) => {
  const textRequestBodySchema = mediaTypeContent?.schema;
  const textRequestBodyExamples = mediaTypeContent?.examples;

  try {
    if (textRequestBodyExamples?.length) {
      return safeStringify(textRequestBodyExamples?.[chosenExampleIndex]['value'], undefined, 2) ?? '';
    } else if (textRequestBodySchema) {
      const generated = Sampler.sample(textRequestBodySchema, { skipReadOnly: true }, document);
      return generated !== null ? safeStringify(generated, undefined, 2) ?? '' : '';
    }
  } catch (e) {
    console.warn(e);
  }
  return '';
};

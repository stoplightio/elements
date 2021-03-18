import { safeStringify } from '@stoplight/json';
import { IMediaTypeContent } from '@stoplight/types';
import * as Sampler from 'openapi-sampler';

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

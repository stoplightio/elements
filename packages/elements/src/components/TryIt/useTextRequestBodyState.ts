import { safeStringify } from '@stoplight/json';
import { IMediaTypeContent } from '@stoplight/types';
import * as Sampler from 'openapi-sampler';
import * as React from 'react';

/**
 * Manages the state of the request body text editor.
 *
 * A wrapper for `React.useState`, but handles creating the initial value, and resetting when the content definition changes.
 */
export const useTextRequestBodyState = (
  mediaTypeContent: IMediaTypeContent | undefined,
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const initialRequestBody = React.useMemo(() => {
    const textRequestBodySchema = mediaTypeContent?.schema;
    const textRequestBodyExamples = mediaTypeContent?.examples;

    try {
      if (textRequestBodyExamples?.length) {
        return safeStringify(textRequestBodyExamples?.[0]['value']) ?? '';
      } else if (textRequestBodySchema) {
        return safeStringify(Sampler.sample(textRequestBodySchema, { skipReadOnly: true })) ?? '';
      }
    } catch (e) {
      console.warn(e);
    }
    return '';
  }, [mediaTypeContent]);

  const [textRequestBody, setTextRequestBody] = React.useState<string>(initialRequestBody);

  React.useEffect(() => {
    setTextRequestBody(initialRequestBody);
  }, [initialRequestBody]);

  return [textRequestBody, setTextRequestBody];
};

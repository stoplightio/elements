import { IMediaTypeContent } from '@stoplight/types';
import * as React from 'react';

import { useGenerateExampleFromMediaTypeContent } from '../../../utils/exampleGeneration/exampleGeneration';

/**
 * Manages the state of the request body text editor.
 *
 * A wrapper for `React.useState`, but handles creating the initial value, and resetting when the content definition changes.
 */

export const useTextRequestBodyState = (
  mediaTypeContent: IMediaTypeContent | undefined,
  skipReadOnly: boolean,
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const initialRequestBody = useGenerateExampleFromMediaTypeContent(mediaTypeContent, undefined, {
    skipReadOnly,
  });

  const [textRequestBody, setTextRequestBody] = React.useState<string>(initialRequestBody);

  React.useEffect(() => {
    setTextRequestBody(initialRequestBody);
  }, [initialRequestBody]);

  return [textRequestBody, setTextRequestBody];
};

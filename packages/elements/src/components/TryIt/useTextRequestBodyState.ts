import { IMediaTypeContent } from '@stoplight/types';
import * as React from 'react';

import { useDocument } from '../../context/InlineRefResolver';
import { generateExampleFromMediaTypeContent } from '../../utils/exampleGeneration';

/**
 * Manages the state of the request body text editor.
 *
 * A wrapper for `React.useState`, but handles creating the initial value, and resetting when the content definition changes.
 */

export const useTextRequestBodyState = (
  mediaTypeContent: IMediaTypeContent | undefined,
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const document = useDocument();
  const initialRequestBody = React.useMemo(() => generateExampleFromMediaTypeContent(mediaTypeContent, document), [
    mediaTypeContent,
    document,
  ]);

  const [textRequestBody, setTextRequestBody] = React.useState<string>(initialRequestBody);

  React.useEffect(() => {
    setTextRequestBody(initialRequestBody);
  }, [initialRequestBody]);

  return [textRequestBody, setTextRequestBody];
};

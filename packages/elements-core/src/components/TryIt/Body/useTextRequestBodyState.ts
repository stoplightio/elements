import { IMediaTypeContent } from '@stoplight/types';
import * as React from 'react';

import { useGenerateExampleFromMediaTypeContent } from '../../../utils/exampleGeneration/exampleGeneration';
import ExamplesContext from './../../../context/ExamplesContext';
/**
 * Manages the state of the request body text editor.
 *
 * A wrapper for `React.useState`, but handles creating the initial value, and resetting when the content definition changes.
 */

export const useTextRequestBodyState = (
  mediaTypeContent: IMediaTypeContent | undefined,
  skipReadOnly: boolean,
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const { globalSelectedExample } = React.useContext(ExamplesContext);

  const selectedExampleIndex =
    globalSelectedExample && mediaTypeContent?.examples?.findIndex(e => e.key === globalSelectedExample);

  const hasFoundExample = selectedExampleIndex && selectedExampleIndex >= 0;

  const initialRequestBody = useGenerateExampleFromMediaTypeContent(
    mediaTypeContent,
    hasFoundExample ? selectedExampleIndex : undefined,
    {
      skipReadOnly,
    },
  );

  const [textRequestBody, setTextRequestBody] = React.useState<string>(initialRequestBody);

  React.useEffect(() => {
    setTextRequestBody(initialRequestBody);
  }, [initialRequestBody]);

  return [textRequestBody, setTextRequestBody];
};

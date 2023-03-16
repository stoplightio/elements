import { addTargetClient, availableTargets, HTTPSnippet } from '@readme/httpsnippet';

import type { HarRequest } from '../../types';
import { python3 } from './httpsnippet/targets/python/python3/client';

addTargetClient('python', python3);

const AVAILABLE_TARGET_IDS = availableTargets().map(({ key }) => key);

function isValidTarget(value: string): value is typeof AVAILABLE_TARGET_IDS[number] {
  return AVAILABLE_TARGET_IDS.includes(value as unknown as typeof AVAILABLE_TARGET_IDS[number]);
}

export const convertRequestToSample = (language: string, library: string | undefined, request: HarRequest) => {
  if (!isValidTarget(language)) return null;

  try {
    const snippet = new HTTPSnippet({
      ...request,
      postData: request.postData ?? {
        mimeType: 'text/plain',
        text: '',
      },
    });

    const converted = snippet.convert(language, library);
    if (Array.isArray(converted)) {
      return converted.join('\n');
    }

    return converted || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

import { Request as HarFormatRequest } from 'har-format';
import { HTTPSnippet, isValidTargetId } from 'httpsnippet-lite';

export const convertRequestToSample = async (
  language: string,
  library: string | undefined,
  request: HarFormatRequest,
) => {
  if (!isValidTargetId(language)) return null;

  try {
    const snippet = new HTTPSnippet(request);
    const converted = await snippet.convert(language, library);
    if (Array.isArray(converted)) {
      return converted[0];
    }

    return converted || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

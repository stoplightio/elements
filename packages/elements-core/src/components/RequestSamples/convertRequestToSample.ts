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
    let converted = await snippet.convert(language, library);
    if (Array.isArray(converted)) {
      converted = converted[0];
    } else {
      converted = converted || null;
    }
    if (typeof converted === 'string') {
      converted = converted.replace(/%7B/g, '{').replace(/%7D/g, '}');
    }

    return converted;
  } catch (err) {
    console.error(err);
    return null;
  }
};

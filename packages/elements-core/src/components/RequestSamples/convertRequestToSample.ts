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

      if (language === 'shell' && library === 'curl') {
        // Check if Content-Type is application/x-www-form-urlencoded
        const isUrlEncoded = request?.headers?.some(
          header =>
            header.name.toLowerCase() === 'content-type' && header.value === 'application/x-www-form-urlencoded',
        ); // Replace --data with --data-urlencode if necessary
        if (isUrlEncoded) {
          converted = converted.replace(/--data\b/g, '--data-urlencode');
        }
      }
    }

    return converted;
  } catch (err) {
    console.error(err);

    return null;
  }
};

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
      // Only decode curly brackets in URL path portion (before ?)
      // This preserves placeholder parameters like {docId} in paths while keeping
      // query parameters properly encoded
      const urlRegex = /(https?:\/\/[^\s'"]+)/g;

      converted = converted.replace(urlRegex, url => {
        const [pathPart, queryPart] = url.split('?', 2);

        // Decode only curly brackets in the path part
        const decodedPath = pathPart.replace(/%7B/g, '{').replace(/%7D/g, '}');

        // Keep the query part (if any) as-is
        return queryPart ? `${decodedPath}?${queryPart}` : decodedPath;
      });

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

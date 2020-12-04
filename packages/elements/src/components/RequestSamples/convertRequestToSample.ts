import { Request as HarFormatRequest } from 'har-format';
import HTTPSnippet from 'httpsnippet';

export const convertRequestToSample = (language: string, library: string | undefined, request: HarFormatRequest) => {
  try {
    const snippet = new HTTPSnippet(request);
    return snippet.convert(language, library) || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

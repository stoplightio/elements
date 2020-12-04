import { Request as HarFormatRequest } from 'har-format';
import HTTPSnippet from 'httpsnippet';

export type RequestToSampleConverter = (request: HarFormatRequest) => string | null;

export const httpSnippetConverter = (language: string, library: string): RequestToSampleConverter => request => {
  try {
    const snippet = new HTTPSnippet(request);
    return snippet.convert(language, library) || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

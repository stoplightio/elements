import { Dictionary } from '@stoplight/types';
import { Request } from 'har-format';
import HTTPSnippet from 'httpsnippet';

export type SupportedRequestType = 'cURL';

type RequestConverter = (request: Request) => string | null;

const httpSnippetConverter = (language: string, library: string): RequestConverter => request => {
  try {
    const snippet = new HTTPSnippet(request);
    return snippet.convert(language, library) || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const requestConverters: Dictionary<RequestConverter, SupportedRequestType> = {
  cURL: httpSnippetConverter('shell', 'curl'),
};

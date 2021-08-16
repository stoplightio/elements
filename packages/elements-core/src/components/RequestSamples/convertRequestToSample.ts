import { safeParse, safeStringify } from '@stoplight/json';
import { HttpMethod } from '@stoplight/types';
import { safeStringify as safeStringifyYaml } from '@stoplight/yaml';
import { Request as HarFormatRequest } from 'har-format';
import HTTPSnippet from 'httpsnippet';

import { PartialHttpRequest } from '../MarkdownViewer/CustomComponents/CodeComponent';

export const convertRequestToSample = (language: string, library: string | undefined, request: HarFormatRequest) => {
  // Stoplight Markdown support
  if (language === 'StoplightMarkdown') {
    let markdown;
    if (library === 'yaml') {
      markdown =
        '```yaml http\n' +
        `${safeStringifyYaml(toPartialHttpRequest(request), { indent: 2, noRefs: true, skipInvalid: true })}` +
        '\n```';
    } else {
      markdown = '```json http\n' + `${safeStringify(toPartialHttpRequest(request), undefined, 2)}` + '\n```';
    }

    return markdown;
  }

  try {
    const snippet = new HTTPSnippet(request);
    return snippet.convert(language, library) || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

function toPartialHttpRequest(request: HarFormatRequest): PartialHttpRequest {
  const query = request.queryString.reduce((obj, item) => Object.assign(obj, { [item.name]: [item.value] }), {});
  const header = request.headers.reduce((obj, item) => Object.assign(obj, { [item.name]: [item.value] }), {});

  return {
    method: request.method as HttpMethod,
    url: request.url,
    query: query,
    headers: header,
    body: request.postData?.text && safeParse(request.postData?.text),
  };
}

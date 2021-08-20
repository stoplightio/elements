import { safeParse, safeStringify } from '@stoplight/json';
import { HttpMethod } from '@stoplight/types';
import { safeStringify as safeStringifyYaml } from '@stoplight/yaml';
import HTTPSnippet from 'httpsnippet';
import { concat } from 'lodash';

import { PartialHttpRequest } from '../MarkdownViewer/CustomComponents/CodeComponent';
import { ExtendedHarRequestFormat } from '../TryIt/build-request';

export const convertRequestToSample = (
  language: string,
  library: string | undefined,
  request: ExtendedHarRequestFormat,
) => {
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

function toPartialHttpRequest(request: ExtendedHarRequestFormat): PartialHttpRequest {
  const query = request.queryString.reduce((obj, item) => Object.assign(obj, { [item.name]: [item.value] }), {});
  const header = request.headers.reduce((obj, item) => Object.assign(obj, { [item.name]: [item.value] }), {});
  console.log(request);

  const url = request.pathParametersData?.template
    ? request.baseUrl + request.pathParametersData?.template
    : request.url;

  return {
    method: request.method as HttpMethod,
    url,
    query: query,
    headers: header,
    body: request.postData?.text && safeParse(request.postData?.text),
  };
}

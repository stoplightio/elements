import { Dictionary, IHttpOperation, IMediaTypeContent } from '@stoplight/types';
import { safeStringify } from '@stoplight/yaml';
import { Request as HarRequest } from 'har-format';
import { flatten } from 'lodash';

import { HttpSecuritySchemeWithValues, isApiKeySecurityScheme } from './authentication-utils';
import { MockData } from './mocking-utils';
import { BodyParameterValues, createRequestBody } from './request-body-utils';

interface BuildRequestInput {
  httpOperation: IHttpOperation;
  mediaTypeContent: IMediaTypeContent | undefined;
  parameterValues: Dictionary<string, string>;
  bodyInput?: BodyParameterValues | string;
  mockData?: MockData;
  authValue?: HttpSecuritySchemeWithValues;
}

export async function buildFetchRequest({
  httpOperation,
  mediaTypeContent,
  bodyInput,
  parameterValues,
  mockData,
  authValue,
}: BuildRequestInput): Promise<Parameters<typeof fetch>> {
  const server = mockData?.url || httpOperation.servers?.[0]?.url;
  const shouldIncludeBody = ['PUT', 'POST', 'PATCH'].includes(httpOperation.method.toUpperCase());

  const queryParams =
    httpOperation.request?.query
      ?.map(param => [param.name, parameterValues[param.name] ?? ''])
      .filter(([_, value]) => value.length > 0) ?? [];

  if (authValue && isApiKeySecurityScheme(authValue) && authValue.in === 'query') {
    queryParams.push([authValue.name, safeStringify(authValue.value)]);
  }

  const expandedPath = uriExpand(httpOperation.path, parameterValues);
  const url = new URL(server + expandedPath);
  url.search = new URLSearchParams(queryParams).toString();

  const body = typeof bodyInput === 'object' ? await createRequestBody(httpOperation, bodyInput) : bodyInput;

  return [
    url.toString(),
    {
      credentials: 'omit',
      method: httpOperation.method,
      headers: {
        'Content-Type': mediaTypeContent?.mediaType ?? 'application/json',
        ...(authValue &&
          isApiKeySecurityScheme(authValue) &&
          authValue.in === 'header' && {
            [authValue.name]: authValue?.value,
          }),
        ...Object.fromEntries(
          httpOperation.request?.headers
            ?.filter(
              hparam =>
                !flatten(httpOperation.security).some(
                  sec => !isApiKeySecurityScheme(sec) || sec.name.toUpperCase() === hparam.name.toUpperCase(),
                ),
            )
            .map(header => [header.name, parameterValues[header.name] ?? '']) ?? [],
        ),
        ...mockData?.header,
      },
      body: shouldIncludeBody ? body : undefined,
    },
  ];
}

export async function buildHarRequest({
  httpOperation,
  bodyInput,
  parameterValues,
  mediaTypeContent,
}: BuildRequestInput): Promise<HarRequest> {
  const server = httpOperation.servers?.[0]?.url;
  const mimeType = mediaTypeContent?.mediaType ?? 'application/json';
  const shouldIncludeBody = ['PUT', 'POST', 'PATCH'].includes(httpOperation.method.toUpperCase());

  const queryParams = httpOperation.request?.query
    ?.map(param => ({ name: param.name, value: parameterValues[param.name] ?? '' }))
    .filter(({ value }) => value.length > 0);

  let postData: HarRequest['postData'] = undefined;
  if (shouldIncludeBody && typeof bodyInput === 'string') {
    postData = { mimeType, text: bodyInput };
  }
  if (shouldIncludeBody && typeof bodyInput === 'object') {
    postData = {
      mimeType,
      params: Object.entries(bodyInput).map(([name, value]) => {
        if (value instanceof File) {
          return {
            name,
            fileName: value.name,
            contentType: value.type,
          };
        }
        return {
          name,
          value,
        };
      }),
    };
  }

  return {
    method: httpOperation.method.toUpperCase(),
    url: server + uriExpand(httpOperation.path, parameterValues),
    httpVersion: 'HTTP/1.1',
    cookies: [],
    headers: [
      { name: 'Content-Type', value: mimeType },
      ...(httpOperation.request?.headers?.map(header => ({
        name: header.name,
        value: parameterValues[header.name] ?? '',
      })) ?? []),
    ],
    queryString: queryParams ?? [],
    postData: postData,
    headersSize: -1,
    bodySize: -1,
  };
}

function uriExpand(uri: string, data: Dictionary<string, string>) {
  if (!data) {
    return uri;
  }
  return uri.replace(/{([^#?]+?)}/g, (match, value) => {
    return data[value] || match;
  });
}

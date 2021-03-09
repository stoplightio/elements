import { Dictionary, IHttpOperation, IMediaTypeContent } from '@stoplight/types';
import { safeStringify } from '@stoplight/yaml';
import { Request as HarRequest } from 'har-format';

import {
  filterOutAuthorizationParams,
  HttpSecuritySchemeWithValues,
  isApiKeySecurityScheme,
  isOAuth2SecurityScheme,
} from './authentication-utils';
import { MockData } from './mocking-utils';
import { BodyParameterValues, createRequestBody } from './request-body-utils';

interface BuildRequestInput {
  httpOperation: IHttpOperation;
  mediaTypeContent: IMediaTypeContent | undefined;
  parameterValues: Dictionary<string, string>;
  bodyInput?: BodyParameterValues | string;
  mockData?: MockData;
  auth?: HttpSecuritySchemeWithValues;
}

export async function buildFetchRequest({
  httpOperation,
  mediaTypeContent,
  bodyInput,
  parameterValues,
  mockData,
  auth,
}: BuildRequestInput): Promise<Parameters<typeof fetch>> {
  const server = mockData?.url || httpOperation.servers?.[0]?.url;
  const shouldIncludeBody = ['PUT', 'POST', 'PATCH'].includes(httpOperation.method.toUpperCase());

  const queryParams =
    httpOperation.request?.query
      ?.map(param => [param.name, parameterValues[param.name] ?? ''])
      .filter(([_, value]) => value.length > 0) ?? [];

  const rawHeaders = Object.fromEntries(
    filterOutAuthorizationParams(httpOperation.request?.headers ?? [], httpOperation.security).map(header => [
      header.name,
      parameterValues[header.name] ?? '',
    ]),
  );

  const [queryParamsWithAuth, headersWithAuth] = auth
    ? runAuthRequestEhancements(auth, queryParams, rawHeaders)
    : [queryParams, rawHeaders];

  const expandedPath = uriExpand(httpOperation.path, parameterValues);
  const url = new URL(server + expandedPath);
  url.search = new URLSearchParams(queryParamsWithAuth).toString();

  const body = typeof bodyInput === 'object' ? await createRequestBody(httpOperation, bodyInput) : bodyInput;

  const headers = {
    'Content-Type': mediaTypeContent?.mediaType ?? 'application/json',
    ...headersWithAuth,
    ...mockData?.header,
  };

  return [
    url.toString(),
    {
      credentials: 'omit',
      method: httpOperation.method,
      headers,
      body: shouldIncludeBody ? body : undefined,
    },
  ];
}

const runAuthRequestEhancements = (
  auth: HttpSecuritySchemeWithValues,
  queryParams: string[][],
  headers: HeadersInit,
): [string[][], HeadersInit] => {
  const newQueryParams: string[][] = [...queryParams];
  const newHeaders: HeadersInit = { ...headers };

  if (isApiKeySecurityScheme(auth.scheme)) {
    if (auth.scheme.in === 'query') {
      newQueryParams.push([auth.scheme.name, safeStringify(auth.authValue)]);
    }

    if (auth.scheme.in === 'header') {
      newHeaders[auth.scheme.name] = auth.authValue;
    }
  }

  if (isOAuth2SecurityScheme(auth.scheme)) {
    newHeaders['Authorization'] = auth.authValue;
  }

  return [newQueryParams, newHeaders];
};

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

import { Dictionary, IHttpOperation, IMediaTypeContent } from '@stoplight/types';
import { safeStringify } from '@stoplight/yaml';
import { Request as HarRequest } from 'har-format';

import {
  filterOutAuthorizationParams,
  HttpSecuritySchemeWithValues,
  isApiKeySecurityScheme,
  isBearerSecurityScheme,
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
  const serverUrl = mockData?.url || httpOperation.servers?.[0]?.url || window.location.origin;
  const shouldIncludeBody = ['PUT', 'POST', 'PATCH'].includes(httpOperation.method.toUpperCase());

  const queryParams =
    httpOperation.request?.query
      ?.map(param => [param.name, parameterValues[param.name] ?? ''])
      .filter(([_, value]) => value.length > 0) ?? [];

  const rawHeaders = filterOutAuthorizationParams(
    httpOperation.request?.headers ?? [],
    httpOperation.security,
  ).map(header => [header.name, parameterValues[header.name] ?? '']);

  const [queryParamsWithAuth, headersWithAuth] = runAuthRequestEhancements(auth, queryParams, rawHeaders);

  const expandedPath = uriExpand(httpOperation.path, parameterValues);
  const url = new URL(serverUrl + expandedPath);
  url.search = new URLSearchParams(queryParamsWithAuth).toString();

  const body = typeof bodyInput === 'object' ? await createRequestBody(mediaTypeContent, bodyInput) : bodyInput;

  const headers = {
    'Content-Type': mediaTypeContent?.mediaType ?? 'application/json',
    ...Object.fromEntries(headersWithAuth),
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
  auth: HttpSecuritySchemeWithValues | undefined,
  queryParams: string[][],
  headers: string[][],
): [string[][], string[][]] => {
  if (!auth) return [queryParams, headers];

  const newQueryParams: string[][] = [...queryParams];
  const newHeaders: string[][] = [...headers];

  if (isApiKeySecurityScheme(auth.scheme)) {
    if (auth.scheme.in === 'query') {
      newQueryParams.push([auth.scheme.name, safeStringify(auth.authValue)]);
    }

    if (auth.scheme.in === 'header') {
      newHeaders.push([auth.scheme.name, auth.authValue]);
    }
  }

  if (isOAuth2SecurityScheme(auth.scheme)) {
    newHeaders.push(['Authorization', auth.authValue]);
  }

  if (isBearerSecurityScheme(auth.scheme)) {
    newHeaders.push(['Authorization', `Bearer ${auth.authValue}`]);
  }

  return [newQueryParams, newHeaders];
};

type NameAndValue = {
  name: string;
  value: string;
};

const arrayToNameAndValueObject = ([name, value]: string[]): NameAndValue => ({ name, value });

export async function buildHarRequest({
  httpOperation,
  bodyInput,
  parameterValues,
  mediaTypeContent,
  auth,
}: BuildRequestInput): Promise<HarRequest> {
  const serverUrl = httpOperation.servers?.[0]?.url || window.location.origin;
  const mimeType = mediaTypeContent?.mediaType ?? 'application/json';
  const shouldIncludeBody = ['PUT', 'POST', 'PATCH'].includes(httpOperation.method.toUpperCase());

  const queryParams =
    httpOperation.request?.query
      ?.map(param => [param.name, parameterValues[param.name] ?? ''])
      .filter(([, value]) => value.length > 0) ?? [];

  const headerParams =
    httpOperation.request?.headers?.map(header => [header.name, parameterValues[header.name] ?? '']) ?? [];

  const [queryParamsWithAuth, headerParamsWithAuth] = runAuthRequestEhancements(auth, queryParams, headerParams);

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
    url: serverUrl + uriExpand(httpOperation.path, parameterValues),
    httpVersion: 'HTTP/1.1',
    cookies: [],
    headers: [{ name: 'Content-Type', value: mimeType }, ...headerParamsWithAuth.map(arrayToNameAndValueObject)],
    queryString: queryParamsWithAuth.map(arrayToNameAndValueObject),
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

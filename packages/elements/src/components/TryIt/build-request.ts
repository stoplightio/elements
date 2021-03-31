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

type NameAndValue = {
  name: string;
  value: string;
};

const nameAndValueObjectToPair = ({ name, value }: NameAndValue): [string, string] => [name, value];

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
      ?.map(param => ({ name: param.name, value: parameterValues[param.name] ?? '' }))
      .filter(({ value }) => value.length > 0) ?? [];

  const rawHeaders = filterOutAuthorizationParams(
    httpOperation.request?.headers ?? [],
    httpOperation.security,
  ).map(header => ({ name: header.name, value: parameterValues[header.name] ?? '' }));

  const [queryParamsWithAuth, headersWithAuth] = runAuthRequestEhancements(auth, queryParams, rawHeaders);

  const expandedPath = uriExpand(httpOperation.path, parameterValues);
  const url = new URL(serverUrl + expandedPath);
  url.search = new URLSearchParams(queryParamsWithAuth.map(nameAndValueObjectToPair)).toString();

  const body = typeof bodyInput === 'object' ? await createRequestBody(mediaTypeContent, bodyInput) : bodyInput;

  const headers = {
    'Content-Type': mediaTypeContent?.mediaType ?? 'application/json',
    ...Object.fromEntries(headersWithAuth.map(nameAndValueObjectToPair)),
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
  queryParams: NameAndValue[],
  headers: NameAndValue[],
): [NameAndValue[], NameAndValue[]] => {
  if (!auth) return [queryParams, headers];

  const newQueryParams = [...queryParams];
  const newHeaders = [...headers];

  if (isApiKeySecurityScheme(auth.scheme)) {
    if (auth.scheme.in === 'query') {
      newQueryParams.push({
        name: auth.scheme.name,
        value: safeStringify(auth.authValue),
      });
    }

    if (auth.scheme.in === 'header') {
      newHeaders.push({
        name: auth.scheme.name,
        value: auth.authValue,
      });
    }
  }

  if (isOAuth2SecurityScheme(auth.scheme)) {
    newHeaders.push({
      name: 'Authorization',
      value: auth.authValue,
    });
  }

  if (isBearerSecurityScheme(auth.scheme)) {
    newHeaders.push({
      name: 'Authorization',
      value: `Bearer ${auth.authValue}`,
    });
  }

  return [newQueryParams, newHeaders];
};

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
      ?.map(param => ({ name: param.name, value: parameterValues[param.name] ?? '' }))
      .filter(({ value }) => value.length > 0) ?? [];

  const headerParams =
    httpOperation.request?.headers?.map(header => ({ name: header.name, value: parameterValues[header.name] ?? '' })) ??
    [];

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
    headers: [{ name: 'Content-Type', value: mimeType }, ...headerParamsWithAuth],
    queryString: queryParamsWithAuth,
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

import { Dictionary, HttpParamStyles, IHttpOperation, IMediaTypeContent, IServer } from '@stoplight/types';
import { Request as HarRequest } from 'har-format';

import { getServerUrlWithVariableValues, resolveUrl } from '../../utils/http-spec/IServer';
import {
  filterOutAuthorizationParams,
  HttpSecuritySchemeWithValues,
  isApiKeySecurityScheme,
  isBasicSecurityScheme,
  isBearerSecurityScheme,
  isDigestSecurityScheme,
  isOAuth2SecurityScheme,
} from './Auth/authentication-utils';
import { BodyParameterValues, createRequestBody } from './Body/request-body-utils';
import { MockData } from './Mocking/mocking-utils';

type NameAndValue = {
  name: string;
  value: string;
};

const nameAndValueObjectToPair = ({ name, value }: NameAndValue): [string, string] => [name, value];

interface BuildRequestInput {
  httpOperation: IHttpOperation;
  mediaTypeContent: IMediaTypeContent | undefined;
  parameterValues: Dictionary<string, string>;
  serverVariableValues: Dictionary<string, string>;
  bodyInput?: BodyParameterValues | string;
  mockData?: MockData;
  auth?: HttpSecuritySchemeWithValues[];
  chosenServer?: IServer | null;
  credentials?: 'omit' | 'include' | 'same-origin';
  corsProxy?: string;
}

const getServerUrl = ({
  chosenServer,
  httpOperation,
  mockData,
  corsProxy,
  serverVariableValues,
}: Pick<BuildRequestInput, 'httpOperation' | 'chosenServer' | 'mockData' | 'corsProxy' | 'serverVariableValues'>) => {
  const server = chosenServer || httpOperation.servers?.[0];
  const chosenServerUrl = server && getServerUrlWithVariableValues(server, serverVariableValues);
  const serverUrl = resolveUrl(mockData?.url || chosenServerUrl || window.location.origin);

  if (corsProxy && !mockData) {
    return `${corsProxy}${serverUrl}`;
  }

  return serverUrl;
};

const delimiter = {
  [HttpParamStyles.Form]: ',',
  [HttpParamStyles.SpaceDelimited]: ' ',
  [HttpParamStyles.PipeDelimited]: '|',
};

export const getQueryParams = ({
  httpOperation,
  parameterValues,
}: Pick<BuildRequestInput, 'httpOperation'> & Pick<BuildRequestInput, 'parameterValues'>) => {
  const query = httpOperation.request?.query;
  if (!query) return [];

  return query.reduce<{ name: string; value: string }[]>((acc, param) => {
    const value = parameterValues[param.name] ?? '';
    if (value.length === 0) return acc;

    const explode = param.explode ?? true;

    if (param.schema?.type === 'object' && param.style === 'form' && value) {
      let nested: Dictionary<string, string>;
      try {
        nested = JSON.parse(value);
        if (!(typeof nested === 'object' && nested !== null)) throw Error();
      } catch (e) {
        throw new Error(`Cannot use param value "${value}". JSON object expected.`);
      }

      if (explode) {
        acc.push(...Object.entries(nested).map(([name, value]) => ({ name, value: value.toString() })));
      } else {
        acc.push({
          name: param.name,
          value: Object.entries(nested)
            .map(entry => entry.join(','))
            .join(','),
        });
      }
    } else if (param.schema?.type === 'array' && value) {
      let nested: string[];
      let parsed: any;
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed === 'string') {
          nested = parsed.split(delimiter[param.style as keyof typeof delimiter]);
        } else if (Array.isArray(parsed)) {
          nested = parsed;
        } else {
          throw Error();
        }
      } catch (e) {
        if (!parsed && typeof value === 'string') {
          nested = value.split(delimiter[param.style as keyof typeof delimiter]);
        } else {
          throw new Error(`Cannot use param value "${value}". JSON array expected.`);
        }
      }

      if (explode) {
        acc.push(...nested.map(value => ({ name: param.name, value: value.toString() })));
      } else {
        acc.push({
          name: param.name,
          value: nested.join(delimiter[param.style as keyof typeof delimiter] ?? delimiter[HttpParamStyles.Form]),
        });
      }
    } else {
      acc.push({ name: param.name, value });
    }

    return acc;
  }, []);
};

export async function buildFetchRequest({
  httpOperation,
  mediaTypeContent,
  bodyInput,
  parameterValues,
  serverVariableValues,
  mockData,
  auth,
  chosenServer,
  credentials = 'omit',
  corsProxy,
}: BuildRequestInput): Promise<Parameters<typeof fetch>> {
  const serverUrl = getServerUrl({ httpOperation, mockData, chosenServer, corsProxy, serverVariableValues });

  const shouldIncludeBody =
    ['PUT', 'POST', 'PATCH'].includes(httpOperation.method.toUpperCase()) && bodyInput !== undefined;

  const queryParams = getQueryParams({ httpOperation, parameterValues });

  const rawHeaders = filterOutAuthorizationParams(httpOperation.request?.headers ?? [], httpOperation.security)
    .map(header => ({ name: header.name, value: parameterValues[header.name] ?? '' }))
    .filter(({ value }) => value.length > 0);

  const [queryParamsWithAuth, headersWithAuth] = runAuthRequestEhancements(auth, queryParams, rawHeaders);

  const expandedPath = uriExpand(httpOperation.path, parameterValues);

  // urlObject is concatenated this way to avoid /user and /user/ endpoint edge cases
  const urlObject = new URL(serverUrl + expandedPath);
  urlObject.search = new URLSearchParams(queryParamsWithAuth.map(nameAndValueObjectToPair)).toString();

  const body = typeof bodyInput === 'object' ? await createRequestBody(mediaTypeContent, bodyInput) : bodyInput;

  const acceptedMimeTypes = getAcceptedMimeTypes(httpOperation);
  const headers = {
    ...(acceptedMimeTypes.length > 0 && { Accept: acceptedMimeTypes.join(', ') }),
    // do not include multipart/form-data - browser handles its content type and boundary
    ...(mediaTypeContent?.mediaType !== 'multipart/form-data' &&
      shouldIncludeBody && {
        'Content-Type': mediaTypeContent?.mediaType ?? 'application/json',
      }),
    ...Object.fromEntries(headersWithAuth.map(nameAndValueObjectToPair)),
    ...mockData?.header,
  };

  return [
    urlObject.href,
    {
      credentials,
      method: httpOperation.method.toUpperCase(),
      headers,
      body: shouldIncludeBody ? body : undefined,
    },
  ];
}

const runAuthRequestEhancements = (
  auths: HttpSecuritySchemeWithValues[] | undefined,
  queryParams: NameAndValue[],
  headers: NameAndValue[],
): [NameAndValue[], NameAndValue[]] => {
  if (!auths) return [queryParams, headers];

  const newQueryParams = [...queryParams];
  const newHeaders = [...headers];
  auths.forEach(auth => {
    if (!auth.authValue) {
      // don't add header param if authValue is empty
      return;
    }
    if (isApiKeySecurityScheme(auth.scheme)) {
      if (auth.scheme.in === 'query') {
        newQueryParams.push({
          name: auth.scheme.name,
          value: auth.authValue || '123',
        });
      }

      if (auth.scheme.in === 'header') {
        newHeaders.push({
          name: auth.scheme.name,
          value: auth.authValue || '123',
        });
      }
    }

    if (isOAuth2SecurityScheme(auth.scheme)) {
      newHeaders.push({
        name: 'Authorization',
        value: auth.authValue || 'Bearer 123',
      });
    }

    if (isBearerSecurityScheme(auth.scheme)) {
      newHeaders.push({
        name: 'Authorization',
        value: `Bearer ${auth.authValue || '123'}`,
      });
    }

    if (isDigestSecurityScheme(auth.scheme)) {
      newHeaders.push({
        name: 'Authorization',
        value: auth.authValue?.replace(/\s\s+/g, ' ').trim() || '123',
      });
    }

    if (isBasicSecurityScheme(auth.scheme)) {
      newHeaders.push({
        name: 'Authorization',
        value: `Basic ${auth.authValue || '123'}`,
      });
    }
  });

  return [newQueryParams, newHeaders];
};

export async function buildHarRequest({
  httpOperation,
  bodyInput,
  parameterValues,
  serverVariableValues,
  mediaTypeContent,
  auth,
  mockData,
  chosenServer,
  corsProxy,
}: BuildRequestInput): Promise<HarRequest> {
  const serverUrl = getServerUrl({ httpOperation, mockData, chosenServer, corsProxy, serverVariableValues });

  const mimeType = mediaTypeContent?.mediaType ?? 'application/json';
  const shouldIncludeBody =
    ['PUT', 'POST', 'PATCH'].includes(httpOperation.method.toUpperCase()) && bodyInput !== undefined;

  const queryParams = getQueryParams({ httpOperation, parameterValues });

  const headerParams =
    httpOperation.request?.headers?.map(header => ({ name: header.name, value: parameterValues[header.name] ?? '' })) ??
    [];

  if (mockData?.header) {
    headerParams.push({ name: 'Prefer', value: mockData.header.Prefer });
  }

  if (shouldIncludeBody) {
    headerParams.push({ name: 'Content-Type', value: mimeType });
  }

  const acceptedMimeTypes = getAcceptedMimeTypes(httpOperation);
  if (acceptedMimeTypes.length > 0) {
    headerParams.push({ name: 'Accept', value: acceptedMimeTypes.join(', ') });
  }

  const [queryParamsWithAuth, headerParamsWithAuth] = runAuthRequestEhancements(auth, queryParams, headerParams);
  const expandedPath = uriExpand(httpOperation.path, parameterValues);
  const urlObject = new URL(serverUrl + expandedPath);

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
    url: urlObject.href,
    httpVersion: 'HTTP/1.1',
    cookies: [],
    headers: headerParamsWithAuth,
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

export function getAcceptedMimeTypes(httpOperation: IHttpOperation): string[] {
  return Array.from(
    new Set(
      httpOperation.responses.flatMap(response =>
        response === undefined || response.contents === undefined
          ? []
          : response.contents.map(contentType => contentType.mediaType),
      ),
    ),
  );
}

import {
  HttpSecurityScheme,
  IApiKeySecurityScheme,
  IBearerSecurityScheme,
  IHttpHeaderParam,
  IHttpQueryParam,
  IOauth2SecurityScheme,
} from '@stoplight/types';
import { flatten, isObject } from 'lodash';

import { caseInsensitivelyEquals } from '../../utils/string';

export type HttpSecuritySchemeWithValues = {
  scheme: HttpSecurityScheme;
  authValue: string;
};

export const isApiKeySecurityScheme = (maybeIApiKey: HttpSecurityScheme): maybeIApiKey is IApiKeySecurityScheme =>
  isObject(maybeIApiKey) && maybeIApiKey.type === 'apiKey';

export const isOAuth2SecurityScheme = (maybeIOAuth2: HttpSecurityScheme): maybeIOAuth2 is IOauth2SecurityScheme =>
  isObject(maybeIOAuth2) && maybeIOAuth2.type === 'oauth2';

export const isBearerSecurityScheme = (maybeIBearer: HttpSecurityScheme): maybeIBearer is IBearerSecurityScheme =>
  isObject(maybeIBearer) && maybeIBearer.type === 'http' && maybeIBearer.scheme === 'bearer';

export function filterOutAuthorizationParams(
  queryParams: IHttpQueryParam[],
  securitySchemes?: HttpSecurityScheme[][],
): IHttpQueryParam[];
export function filterOutAuthorizationParams(
  queryParams: IHttpHeaderParam[],
  securitySchemes?: HttpSecurityScheme[][],
): IHttpHeaderParam[];
export function filterOutAuthorizationParams(
  queryParams: (IHttpQueryParam | IHttpHeaderParam)[],
  securitySchemes: HttpSecurityScheme[][] = [],
): (IHttpQueryParam | IHttpHeaderParam)[] {
  const flattenedSecuritySchemes = flatten(securitySchemes);
  const securitySchemeNames = getSecuritySchemeNames(flattenedSecuritySchemes);

  return queryParams.filter(queryParam => !securitySchemeNames.some(caseInsensitivelyEquals(queryParam.name)));
}

const getSecuritySchemeNames = (securitySchemes: HttpSecurityScheme[]): string[] =>
  securitySchemes.flatMap(scheme => {
    if (isApiKeySecurityScheme(scheme)) {
      return scheme.name;
    }

    if (isOAuth2SecurityScheme(scheme)) {
      return 'Authorization';
    }

    return [];
  });

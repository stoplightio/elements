import {
  Dictionary,
  HttpSecurityScheme,
  IApiKeySecurityScheme,
  IBasicSecurityScheme,
  IBearerSecurityScheme,
  IHttpHeaderParam,
  IHttpQueryParam,
  IOauth2SecurityScheme,
} from '@stoplight/types';
import { atom, useAtom } from 'jotai';
import { flatten, isObject, isPlainObject } from 'lodash';
import React from 'react';

import { persistAtom } from '../../../utils/jotai/persistAtom';
import { caseInsensitivelyEquals } from '../../../utils/string';

export type HttpSecuritySchemeWithValues = {
  scheme: HttpSecurityScheme;
  authValue: string | undefined;
};

export const isApiKeySecurityScheme = (maybeIApiKey: HttpSecurityScheme): maybeIApiKey is IApiKeySecurityScheme =>
  isObject(maybeIApiKey) && maybeIApiKey.type === 'apiKey';

export const isOAuth2SecurityScheme = (maybeIOAuth2: HttpSecurityScheme): maybeIOAuth2 is IOauth2SecurityScheme =>
  isObject(maybeIOAuth2) && maybeIOAuth2.type === 'oauth2';

export const isBasicSecurityScheme = (maybeIBasic: HttpSecurityScheme): maybeIBasic is IBasicSecurityScheme =>
  isObject(maybeIBasic) && maybeIBasic.type === 'http' && maybeIBasic.scheme === 'basic';

export const isBearerSecurityScheme = (maybeIBearer: HttpSecurityScheme): maybeIBearer is IBearerSecurityScheme =>
  isObject(maybeIBearer) && maybeIBearer.type === 'http' && maybeIBearer.scheme === 'bearer';

export const isDigestSecurityScheme = (maybeIBearer: HttpSecurityScheme): maybeIBearer is IBasicSecurityScheme =>
  isObject(maybeIBearer) && maybeIBearer.type === 'http' && maybeIBearer.scheme === 'digest';

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

type SecuritySchemeValues = Dictionary<string>;

const isSecuritySchemeValues = (
  maybeSecuritySchemeValues: unknown,
): maybeSecuritySchemeValues is SecuritySchemeValues => isPlainObject(maybeSecuritySchemeValues);

const securitySchemeValuesAtom = persistAtom('TryIt_securitySchemeValues', atom<SecuritySchemeValues>({}));
export const usePersistedSecuritySchemeWithValues = (): [
  HttpSecuritySchemeWithValues[] | undefined,
  React.Dispatch<HttpSecuritySchemeWithValues | undefined>,
  React.Dispatch<HttpSecuritySchemeWithValues[] | undefined>,
] => {
  const [currentScheme, setCurrentScheme] = React.useState<HttpSecuritySchemeWithValues[] | undefined>();
  const [securitySchemeValues, setSecuritySchemeValues] = useAtom(securitySchemeValuesAtom);

  const setPersistedAuthenticationSettings = (securitySchemeWithValues: HttpSecuritySchemeWithValues | undefined) => {
    if (securitySchemeWithValues) {
      const key = securitySchemeWithValues.scheme.key;
      const value = securitySchemeWithValues.authValue;

      if (value !== undefined) {
        setSecuritySchemeValues({
          ...securitySchemeValues,
          [key]: value,
        });
      }
    }
  };

  const schemeWithPersistedValue = React.useMemo(() => {
    if (!currentScheme) return undefined;
    return currentScheme.map(scheme => {
      return {
        scheme: scheme.scheme,
        authValue: isSecuritySchemeValues(securitySchemeValues) ? securitySchemeValues[scheme.scheme.key] : undefined,
      };
    });
  }, [currentScheme, securitySchemeValues]);

  return [schemeWithPersistedValue, setPersistedAuthenticationSettings, setCurrentScheme];
};

export const createUndefinedValuedSchemes = (schemes: HttpSecurityScheme[]): HttpSecuritySchemeWithValues[] => {
  return schemes.map(scheme => ({ scheme, authValue: undefined }));
};

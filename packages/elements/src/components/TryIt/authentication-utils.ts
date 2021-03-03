import { HttpSecurityScheme, IApiKeySecurityScheme } from '@stoplight/types';
import { isObject } from 'lodash';

export type HttpSecuritySchemeWithValues = {
  scheme: HttpSecurityScheme;
  authValue: string;
};

export const isApiKeySecurityScheme = (maybeIApiKey: HttpSecurityScheme): maybeIApiKey is IApiKeySecurityScheme =>
  isObject(maybeIApiKey) && maybeIApiKey.type === 'apiKey';

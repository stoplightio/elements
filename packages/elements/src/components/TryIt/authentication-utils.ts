import { HttpSecurityScheme, IApiKeySecurityScheme } from '@stoplight/types';
import { isObject } from 'lodash';

export type HttpSecuritySchemeWithValues = HttpSecurityScheme & {
  value: string | number;
};

export const isIApiKeySecurityScheme = (
  maybeIApiKey: HttpSecurityScheme | HttpSecuritySchemeWithValues,
): maybeIApiKey is IApiKeySecurityScheme | (IApiKeySecurityScheme & { value: string | number }) =>
  isObject(maybeIApiKey) && maybeIApiKey.type === 'apiKey';

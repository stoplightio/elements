import { HttpSecurityScheme, IApiKeySecurityScheme } from '@stoplight/types';
import { isObject } from 'lodash';

export type HttpSecuritySchemeWithValues = HttpSecurityScheme & {
  value: string;
};

export const isIApiKeySecurityScheme = (
  maybeIApiKey: HttpSecurityScheme | HttpSecuritySchemeWithValues,
): maybeIApiKey is IApiKeySecurityScheme | (IApiKeySecurityScheme & { value: string }) =>
  isObject(maybeIApiKey) && maybeIApiKey.type === 'apiKey';

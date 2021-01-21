import { IHttpOperation } from '@stoplight/types';
import { compact } from 'lodash';

import { formatMultiValueHeader } from '../../utils/headers';

export type MockingOptions = { isEnabled: boolean; code?: string; example?: string; dynamic?: boolean };
type PreferHeaderProps = { code: string; example?: string; dynamic?: boolean };

export type MockData = {
  url: string;
  header?: Record<'Prefer', string>;
};

export function getMockData(
  url: string | undefined,
  httpOperation: IHttpOperation,
  { isEnabled, code, dynamic, example }: MockingOptions,
): MockData | undefined {
  return isEnabled && url && code && supportsResponseCode(httpOperation, code)
    ? { url, header: buildPreferHeader({ code, dynamic, example }) }
    : undefined;
}

export function buildPreferHeader({ code, example, dynamic }: PreferHeaderProps): Record<'Prefer', string> {
  const args: Array<readonly [string, string] | string> = compact([
    ['code', code],
    dynamic ? ['dynamic', String(dynamic)] : undefined,
    example ? ['example', example] : undefined,
  ]);
  const headerValue = formatMultiValueHeader(...args);

  return {
    Prefer: headerValue,
  };
}

function supportsResponseCode(httpOperation: IHttpOperation, code: string) {
  return httpOperation.responses?.find(response => response.code === code) !== undefined;
}

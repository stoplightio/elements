import { IHttpOperation } from '@stoplight/types';
import { compact, uniq } from 'lodash';

import { IActiveInfo } from '../../containers/Provider';
import { useActionsApi } from '../../hooks/usePlatformApi';
import { formatMultiValueHeader } from '../../utils/headers';

export type MockingOptions = { isEnabled: boolean; code?: string; example?: string; dynamic?: boolean };
type PreferHeaderProps = { code?: string; example?: string; dynamic?: boolean };

export type MockData = {
  url: string;
  header?: Record<'Prefer', string>;
};

export type MockUrlResult = { servicePath: string; operationPath?: string; id: number };

export function getMockData(
  url: string | undefined,
  httpOperation: IHttpOperation,
  { isEnabled, code, dynamic, example }: MockingOptions,
): MockData | undefined {
  return isEnabled && url ? { url, header: buildPreferHeader({ code, dynamic, example }, httpOperation) } : undefined;
}

export function buildPreferHeader(
  { code, example, dynamic }: PreferHeaderProps,
  httpOperation: IHttpOperation,
): Record<'Prefer', string> {
  const isCodeSupported = supportsResponseCode(httpOperation, code);
  const isExampleSupported = isCodeSupported && supportsExample(httpOperation, code, example);

  const args: Array<readonly [string, string] | string> = compact([
    code && isCodeSupported ? ['code', code] : undefined,
    dynamic ? ['dynamic', String(dynamic)] : undefined,
    example && isExampleSupported ? ['example', example] : undefined,
  ]);
  const headerValue = formatMultiValueHeader(...args);

  return {
    Prefer: headerValue,
  };
}

function supportsResponseCode(httpOperation: IHttpOperation, code?: string) {
  return httpOperation.responses?.find(response => response.code === code) !== undefined;
}

function supportsExample(httpOperation: IHttpOperation, code?: string, exampleKey?: string) {
  if (!exampleKey) return false;

  const response = httpOperation.responses?.find(response => response.code === code);
  if (!response) return false;

  const exampleKeys = uniq(response.contents?.flatMap(c => c.examples || []).map(example => example.key));
  return exampleKeys.includes(exampleKey);
}

export function useMockUrl(info: IActiveInfo, nodeUri: string | undefined) {
  const mockActionsUrl = 'api/actions/branchNodeMockUrl';
  const { data: mockUrlResult } = useActionsApi<MockUrlResult>(mockActionsUrl, {
    platformUrl: info.host,
    workspaceSlug: info.workspace,
    projectSlug: info.project,
    branchSlug: info.branch,
    nodeUri,
    authToken: info.authToken,
  });
  return mockUrlResult;
}

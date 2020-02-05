import { join, stripRoot } from '@stoplight/path';
import { Dictionary } from '@stoplight/types';

export interface IFetchProps {
  host: string;
  headers: Dictionary<string, string> | null;
}

const isAbsoluteURL = (url: string) => /^(?:https?:\/\/|localhost(?::\d+)?)/.test(url);

export const createFetchClient = (opts: IFetchProps): typeof fetch => (input: RequestInfo, init?: RequestInit) =>
  fetch(typeof input !== 'string' ? input : isAbsoluteURL(input) ? input : join(opts.host, stripRoot(input)), {
    ...init,
    ...(opts.headers && { headers: opts.headers }),
    credentials: 'include',
  });

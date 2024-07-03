import type { Dictionary, INodeVariable, IServer } from '@stoplight/types';
import URI from 'urijs';

import { isProperUrl } from '../guards';

export type ServerVariable = INodeVariable & { name: string };

type ServerWithOptionalUrl = Omit<IServer, 'url'> & { url: string | null } & { description: string };

function isValidServer(server: ServerWithOptionalUrl): server is ServerWithOptionalUrl & { url: string } {
  return server.url !== null;
}

export const getServersToDisplay = (
  originalServers: IServer[],
  mockUrl: string | undefined,
  inlineDefaults: boolean,
): IServer[] => {
  const servers = originalServers.map<ServerWithOptionalUrl>((server, i) => {
    const fallbackDescription = originalServers.length === 1 ? 'Live Server' : `Server ${i + 1}`;

    let url: string | null = server.url;

    if (inlineDefaults) {
      url = getServerUrlWithVariableValues(server, {});
    }

    return {
      ...server,
      url,
      description: server.description || fallbackDescription,
    };
  });

  if (mockUrl) {
    servers.push({
      id: 'mock',
      description: 'Mock Server',
      url: mockUrl,
    });
  }

  return servers.filter(isValidServer);
};

export const getServerVariables = (server?: IServer | null): ServerVariable[] => {
  return Object.entries(server?.variables ?? {}).map(([key, value]) => ({
    name: key,
    default: value.default,
    description: value.description,
    enum: value.enum,
  }));
};

export const getServerVariableDefaults = (server: IServer): Record<string, string> => {
  const o: Record<string, string> = {};
  if (server.variables) {
    for (const key in server.variables) {
      o[key] = server.variables[key].default;
    }
  }
  return o;
};

export function resolveUrl(urlString: string | null): string | null {
  if (urlString === null) return null;

  let url;

  try {
    url = URI(urlString);
  } catch {
    return null;
  }

  let stringifiedUrl: string;

  if (url.is('relative') && typeof window !== 'undefined') {
    stringifiedUrl = url.absoluteTo(window.location.origin).toString();
  } else {
    stringifiedUrl = url.toString();
  }

  if (isProperUrl(stringifiedUrl)) {
    return stringifiedUrl.endsWith('/') ? stringifiedUrl.slice(0, -1) : stringifiedUrl;
  }

  return null;
}

export const getServerUrlWithVariableValues = (server: IServer, values: Dictionary<string, string>): string => {
  let urlString = server.url;

  const variables = Object.entries(server.variables ?? {});
  variables.forEach(([variableName, variableInfo]) => {
    urlString = urlString.replaceAll(`{${variableName}}`, values[variableName] ?? variableInfo.default);
  });

  return urlString;
};

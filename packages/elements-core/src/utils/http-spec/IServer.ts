import type { IServer } from '@stoplight/types';
import { isEmpty } from 'lodash';
import URI from 'urijs';

import { isProperUrl } from '../guards';

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
      url = getServerUrlWithDefaultValues(server);
    } else if (isEmpty(server.variables)) {
      url = resolveUrl(server.url);
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

function resolveUrl(urlString: string): string | null {
  let url;

  try {
    url = URI(urlString);
  } catch {
    return null;
  }

  let stringifiedUrl;

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

export const getServerUrlWithDefaultValues = (server: IServer): string | null => {
  let urlString = server.url;

  const variables = Object.entries(server.variables ?? {});
  variables.forEach(([variableName, variableInfo]) => {
    urlString = urlString.replaceAll(`{${variableName}}`, variableInfo.default);
  });

  return resolveUrl(urlString);
};

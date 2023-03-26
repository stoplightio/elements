import type { IServer } from '@stoplight/types';

import { isProperUrl } from '../guards';

type ServerWithOptionalUrl = Omit<IServer, 'url'> & { url: string | null } & { description: string };

function isValidServer(server: ServerWithOptionalUrl): server is ServerWithOptionalUrl & { url: string } {
  return server.url !== null && isProperUrl(server.url);
}

export const getServersToDisplay = (originalServers: IServer[], mockUrl?: string): IServer[] => {
  const servers = originalServers
    .map<ServerWithOptionalUrl>((server, i) => {
      const fallbackDescription = originalServers.length === 1 ? 'Live Server' : `Server ${i + 1}`;

      return {
        ...server,
        url: getServerUrlWithDefaultValues(server),
        description: server.description || fallbackDescription,
      };
    })
    .filter(isValidServer);

  if (mockUrl) {
    servers.push({
      id: 'mock',
      description: 'Mock Server',
      url: mockUrl,
    });
  }

  return servers;
};

export const getServerUrlWithDefaultValues = (server: IServer): string | null => {
  let urlString = server.url;

  const variables = Object.entries(server.variables ?? {});
  variables.forEach(([variableName, variableInfo]) => {
    urlString = urlString.replace(`{${variableName}}`, variableInfo.default);
  });

  let url;

  try {
    url = new URL(urlString, typeof window !== 'undefined' ? window.location.origin : undefined);
  } catch {
    return null;
  }

  const stringifiedUrl = url.toString();

  return stringifiedUrl.endsWith('/') ? stringifiedUrl.slice(0, -1) : stringifiedUrl;
};

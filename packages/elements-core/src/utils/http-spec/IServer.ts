import { IServer } from '@stoplight/types';
import URI from 'urijs';

import { isProperUrl } from '../guards';

export const getServersToDisplay = (originalServers: IServer[], mockUrl?: string): IServer[] => {
  const servers = originalServers
    .map((server, i) => {
      const fallbackDescription = originalServers.length === 1 ? 'Live Server' : `Server ${i + 1}`;

      return {
        ...server,
        url: getServerUrlWithDefaultValues(server),
        description: server.description || fallbackDescription,
      };
    })
    .filter(server => isProperUrl(server.url));

  if (mockUrl) {
    servers.push({
      description: 'Mock Server',
      url: mockUrl,
    });
  }

  return servers;
};

export const getServerUrlWithDefaultValues = (server: IServer): string => {
  let urlString = server.url;

  const variables = Object.entries(server.variables ?? {});
  variables.forEach(([variableName, variableInfo]) => {
    urlString = urlString.replace(`{${variableName}}`, variableInfo.default);
  });

  let url = URI(urlString);

  if (url.is('relative') && typeof window !== 'undefined') {
    url = url.absoluteTo(window.location.origin);
  }

  return url.toString();
};

import { IServer } from '@stoplight/types';
import URI from 'urijs';

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

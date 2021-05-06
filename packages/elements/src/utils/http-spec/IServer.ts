import { IServer } from '@stoplight/types';

export const getServerUrlWithDefaultValues = (server: IServer): string => {
  let url = server.url;

  if (url[0] === '/' && typeof window !== 'undefined') {
    url = `${window.location.origin}${url}`;
  }

  const variables = Object.entries(server.variables ?? {});

  variables.forEach(([variableName, variableInfo]) => {
    url = url.replace(`{${variableName}}`, variableInfo.default);
  });

  return url;
};

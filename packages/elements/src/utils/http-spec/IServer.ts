import { IServer } from '@stoplight/types';

export const getServerUrlWithDefaultValues = (server: IServer): string => {
  let url = server.url;

  const variables = Object.entries(server.variables ?? {});

  variables.forEach(([variableName, variableInfo]) => {
    url = url.replace(`{${variableName}}`, variableInfo.default);
  });

  return url;
};

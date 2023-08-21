import type { IServer } from '@stoplight/types';

import { getServersToDisplay, getServerUrlWithVariableValues } from '../IServer';

describe('IServer', () => {
  describe('getServerUrlWithVariableValues()', () => {
    it('should handle invalid server URLs', () => {
      const server: IServer = {
        id: 'http-server-https://[env].stoplight.io/v1',
        url: 'https://[env].stoplight.io/v1',
      };

      expect(getServerUrlWithVariableValues(server, {})).toBeNull();
    });
  });

  describe('getServersToDisplay', () => {
    it('should filter out server objects containing invalid URLs', () => {
      const servers: IServer[] = [
        {
          id: 'http-server-https://[env].stoplight.io/v1',
          url: 'https://[env].stoplight.io/v1',
          variables: {
            env: {
              default: 'abc',
            },
          },
        },
        {
          id: 'http-server-https://stoplight.io/v1',
          url: 'https://stoplight.io/v1',
        },
      ];

      expect(getServersToDisplay(servers, undefined, true)).toStrictEqual([
        { id: 'http-server-https://stoplight.io/v1', description: 'Server 2', url: 'https://stoplight.io/v1' },
      ]);
    });

    it('given inlineDefaults, should expand the URL', () => {
      const servers: IServer[] = [
        {
          id: 'http-server-https://{env}.stoplight.io:{port}',
          url: 'https://{env}.stoplight.io:{port}',
          variables: {
            env: {
              default: 'int',
            },
            port: {
              default: '443',
            },
          },
        },
      ];

      expect(getServersToDisplay(servers, undefined, true)).toStrictEqual([
        {
          id: 'http-server-https://{env}.stoplight.io:{port}',
          description: 'Live Server',
          url: 'https://int.stoplight.io:443',
          variables: {
            env: {
              default: 'int',
            },
            port: {
              default: '443',
            },
          },
        },
      ]);
    });
  });
});

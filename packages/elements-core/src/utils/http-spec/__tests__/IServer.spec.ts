import type { IServer } from '@stoplight/types';

import { getServersToDisplay, getServerUrlWithDefaultValues } from '../IServer';

describe('IServer', () => {
  describe('getServerUrlWithDefaultValues()', () => {
    it('should handle invalid server URLs', () => {
      const server: IServer = {
        url: 'https://[env].stoplight.io/v1',
      };

      expect(getServerUrlWithDefaultValues(server)).toBeNull();
    });

    it('should set port to empty string if port is 80', () => {
      const urlWithPort = 'https://commonsvotes-api.parliament.uk:80/swagger/docs/v1';
      const urlWithoutPort = 'https://commonsvotes-api.parliament.uk/swagger/docs/v1';
      const server: IServer = {
        url: urlWithPort,
      };

      expect(getServerUrlWithDefaultValues(server)).toEqual(urlWithoutPort);
    });

    it('should set leave port in url if port is not 80', () => {
      const urlWithPort = 'https://commonsvotes-api.parliament.uk:100/swagger/docs/v1';
      const server: IServer = {
        url: urlWithPort,
      };

      expect(getServerUrlWithDefaultValues(server)).toEqual(urlWithPort);
    });
  });

  describe('getServersToDisplay', () => {
    it('should filter out server objects containing invalid URLs', () => {
      const servers: IServer[] = [
        {
          url: 'https://[env].stoplight.io/v1',
        },
        {
          url: 'https://stoplight.io/v1',
        },
      ];

      expect(getServersToDisplay(servers)).toStrictEqual([{ description: 'Server 2', url: 'https://stoplight.io/v1' }]);
    });
  });
});

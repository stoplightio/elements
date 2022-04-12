import type { IServer } from '@stoplight/types';

import { getServersToDisplay, getServerUrlWithDefaultValues } from '../IServer';

describe('IServer', () => {
  describe('getServerUrlWithDefaultValues()', () => {
    it('should handle invalid server URLs', () => {
      const server: IServer = {
        id: 'http-server-https://[env].stoplight.io/v1',
        url: 'https://[env].stoplight.io/v1',
      };

      expect(getServerUrlWithDefaultValues(server)).toBeNull();
    });
  });

  describe('getServersToDisplay', () => {
    it('should filter out server objects containing invalid URLs', () => {
      const servers: IServer[] = [
        {
          id: 'http-server-https://[env].stoplight.io/v1',
          url: 'https://[env].stoplight.io/v1',
        },
        {
          id: 'http-server-https://stoplight.io/v1',
          url: 'https://stoplight.io/v1',
        },
      ];

      expect(getServersToDisplay(servers)).toStrictEqual([
        { id: 'http-server-https://stoplight.io/v1', description: 'Server 2', url: 'https://stoplight.io/v1' },
      ]);
    });
  });
});

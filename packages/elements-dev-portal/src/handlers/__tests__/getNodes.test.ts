import fetchMock from 'jest-fetch-mock';

import { getNodes } from '../getNodes';

describe('getNodes', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  describe('with a provided workspace identifier', () => {
    it('should URI encode the parameters in the request URL', async () => {
      fetchMock.mockResolvedValue(
        new Response('{}', {
          status: 200,
          statusText: 'OK',
          headers: [],
        }),
      );

      await getNodes({
        workspaceId: 'my?workspace',
        projectIds: ['some/slash'],
        branchSlug: 'test+branch',
        search: 'a?special&search',
      });

      expect(fetchMock).toBeCalledWith(
        'https://stoplight.io/api/v1/workspaces/my%3Fworkspace/nodes?project_ids[0]=some%2Fslash&search=a%3Fspecial%26search&branch=test%2Bbranch',
        {
          headers: expect.objectContaining({
            'Stoplight-Elements-Version': expect.any(String),
          }),
        },
      );
    });
  });
});

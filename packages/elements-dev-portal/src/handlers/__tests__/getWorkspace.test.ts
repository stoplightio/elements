import fetchMock from 'jest-fetch-mock';

import { getWorkspace } from '../getWorkspace';

describe('getWorkspace', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  it('should URI encode the parameters in the request URL', async () => {
    fetchMock.mockResolvedValue(
      new Response('{}', {
        status: 200,
        statusText: 'OK',
        headers: [],
      }),
    );

    await getWorkspace({
      projectIds: ['some/slash'],
    });

    expect(fetchMock).toBeCalledWith('https://stoplight.io/api/v1/projects/some%2Fslash', {
      headers: expect.objectContaining({
        'Stoplight-Elements-Version': expect.any(String),
      }),
    });
  });
});

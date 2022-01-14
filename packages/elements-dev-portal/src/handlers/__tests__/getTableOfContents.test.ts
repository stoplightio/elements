import fetchMock from 'jest-fetch-mock';

import { getTableOfContents } from '../getTableOfContents';

describe('getTableOfContents', () => {
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

    await getTableOfContents({
      projectId: 'some/slash',
      branchSlug: 'test+branch',
    });

    expect(fetchMock).toBeCalledWith(
      'https://stoplight.io/api/v1/projects/some%2Fslash/table-of-contents?branch=test%2Bbranch',
      {
        headers: expect.objectContaining({
          'Stoplight-Elements-Version': expect.any(String),
        }),
      },
    );
  });
});

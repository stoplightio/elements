import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import * as React from 'react';

import branches from '../__fixtures__/branches.json';
import nodeContent from '../__fixtures__/node-content.json';
import tableOfContents from '../__fixtures__/table-of-contents.json';
import { StoplightProject } from './StoplightProject';

describe('Stoplight Project', () => {
  beforeEach(() => {
    fetchMock.mockResponse(request => {
      if (request.url.match(/\/api\/v1\/projects\/[a-zA-Z0-9_.-]+\/table-of-contents/i)) {
        return Promise.resolve({
          body: JSON.stringify(tableOfContents),
          status: 200,
          statusText: 'OK',
          headers: [],
        });
      } else if (request.url.match(/\/api\/v1\/projects\/[a-zA-Z0-9_.-]+\/nodes/i)) {
        return Promise.resolve({
          body: JSON.stringify(nodeContent),
          status: 200,
          statusText: 'OK',
          headers: [],
        });
      } else if (request.url.match(/\/api\/v1\/projects\/[a-zA-Z0-9_.-]+\/branches/i)) {
        return Promise.resolve({
          body: JSON.stringify(branches),
          status: 200,
          statusText: 'OK',
          headers: [],
        });
      } else {
        return Promise.resolve({ status: 404, statusText: 'Not Found', headers: [], body: '' });
      }
    });
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.disableMocks();
  });

  it('loads correctly', async () => {
    render(<StoplightProject router="memory" projectId="cHJqOjExOTY" platformUrl="https://stoplight.io" />);

    expect(
      await screen.findByText(
        'Markdown is supported in descriptions. Add information here for users to get accustomed to endpoints',
        {},
        { timeout: 10000 },
      ),
    ).toBeInTheDocument();
  });

  it('includes authorization header when auth token is passed', async () => {
    render(
      <StoplightProject
        router="memory"
        projectId="cHJqOjExOTY"
        platformUrl="https://stoplight.io"
        authToken="secret"
      />,
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const tocRequestInit = fetchMock.mock.calls[3][1]!;
    const branchesRequestInit = fetchMock.mock.calls[4][1]!;
    const nodeRequestInit = fetchMock.mock.calls[5][1]!;

    const tocHeaders = new Headers(tocRequestInit.headers);
    const branchesHeaders = new Headers(branchesRequestInit.headers);
    const nodeHeaders = new Headers(nodeRequestInit.headers);

    expect(tocHeaders.get('Authorization')).toBe('Bearer secret');
    expect(branchesHeaders.get('Authorization')).toBe('Bearer secret');
    expect(nodeHeaders.get('Authorization')).toBe('Bearer secret');
  });
});

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
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

  it('loads correctly using memory router', async () => {
    render(<StoplightProject router="memory" projectId="cHJqOjYwNjYx" platformUrl="https://stoplight.io" />);

    expect(
      await screen.findByText(
        'Markdown is supported in descriptions. Add information here for users to get accustomed to endpoints',
        {},
        { timeout: 10000 },
      ),
    ).toBeInTheDocument();
  });

  it('loads correctly using static router', async () => {
    render(
      <StoplightProject
        router="static"
        projectId="cHJqOjYwNjYx"
        basePath=""
        staticRouterPath="/b3A6Mzg5NDM2-create-todo"
        platformUrl="https://stoplight.io"
      />,
    );

    expect(
      await screen.findByText(
        'Markdown is supported in descriptions. Add information here for users to get accustomed to endpoints',
        {},
        { timeout: 10000 },
      ),
    ).toBeInTheDocument();
  });
});

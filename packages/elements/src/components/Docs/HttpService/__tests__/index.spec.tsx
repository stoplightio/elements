import 'jest-enzyme';

import { render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';

import httpService from '../../../../__fixtures__/services/petstore';
import { HttpService } from '../index';
import { ServerInfo } from '../ServerInfo';

const APIComponentContext = {
  host: 'https://stoplight.io',
  isStoplightComponent: false,
  project: 'studio-demo',
  workspace: 'elements',
};

const StoplightComponentContext = {
  host: 'https://stoplight.io',
  isStoplightComponent: true,
  project: 'studio-demo',
  workspace: 'elements',
};

describe('HttpService', () => {
  it('Should render correctly', () => {
    const wrapper = render(<HttpService data={httpService} />);

    expect(wrapper.getByText(httpService.name).tagName.toLowerCase()).toBe('h1');
  });

  it('displays first server url', () => {
    render(
      <ServerInfo
        serverUrl={httpService.servers}
        mockUrl="https://foo.stoplight.io/prism/123"
        activeContextInfo={APIComponentContext}
      />,
    );

    const serverUrl = screen.getByLabelText('production-server');
    expect(serverUrl).toHaveTextContent('https://api.stoplight.io');

    const secondServer = screen.queryByText('https://api.staging.stoplight.io');
    expect(secondServer).not.toBeInTheDocument();

    expect(screen.queryByLabelText('mock-server')).not.toBeInTheDocument();
  });

  it('displays mock server url when embedded in Stoplight Project', async () => {
    render(
      <ServerInfo
        serverUrl={httpService.servers}
        mockUrl="https://foo.stoplight.io/prism/123"
        activeContextInfo={StoplightComponentContext}
      />,
    );

    const mockServer = screen.queryByLabelText('mock-server');
    await waitFor(() => expect(mockServer).toHaveTextContent('https://foo.stoplight.io/prism/123'));
  });
});

import 'jest-enzyme';

import { render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';

import httpService from '../../../../__fixtures__/services/petstore';
import { Provider } from '../../../../containers/Provider';
import { HttpService } from '../index';
import { ServerInfo } from '../ServerInfo';

describe('HttpService', () => {
  it('Should render correctly', () => {
    const wrapper = render(<HttpService data={httpService} />);

    expect(wrapper.getByText(httpService.name).tagName.toLowerCase()).toBe('h1');
  });

  it('displays first server url', () => {
    render(<ServerInfo servers={httpService.servers} mockUrl="https://foo.stoplight.io/prism/123" />);

    const serverUrl = screen.getByLabelText('production-server');
    expect(serverUrl).toHaveTextContent('https://api.stoplight.io');

    const secondServer = screen.queryByText('https://api.staging.stoplight.io');
    expect(secondServer).not.toBeInTheDocument();

    expect(screen.queryByLabelText('mock-server')).not.toBeInTheDocument();
  });

  it('displays mock server url when embedded in Stoplight Project', async () => {
    render(
      <Provider host="https://stoplight.io" isStoplightProjectComponent project="studio-demo" workspace="elements">
        <ServerInfo servers={httpService.servers} mockUrl="https://foo.stoplight.io/prism/123" />
      </Provider>,
    );

    const mockServer = screen.queryByLabelText('mock-server');
    await waitFor(() => expect(mockServer).toHaveTextContent('https://foo.stoplight.io/prism/123'));
  });
});

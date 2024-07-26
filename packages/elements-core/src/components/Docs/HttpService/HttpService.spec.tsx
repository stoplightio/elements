import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { render, screen, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { apiKey, oauth } from '../../../__fixtures__/security-schemes';
import httpService from '../../../__fixtures__/services/petstore';
import { httpServiceWithUnnamedServers } from '../../../__fixtures__/services/with-unnamed-servers';
import { httpServiceWithUrlVariables } from '../../../__fixtures__/services/with-url-variables';
import { httpServiceWithoutOrigin } from '../../../__fixtures__/services/without-origin';
import { AdditionalInfo } from './AdditionalInfo';
import { HttpService } from './index';
import { SecuritySchemes } from './SecuritySchemes';
import { ServerInfo, useSplitUrl } from './ServerInfo';

describe('HttpService', () => {
  it('Should render correctly', () => {
    const wrapper = render(
      <Router>
        <HttpService data={httpService} />
      </Router>,
    );

    expect(wrapper.getByText(httpService.name).tagName.toLowerCase()).toBe('h1');
  });

  it('should not display servers when hideServerInfo is provided', () => {
    render(
      <Router>
        <HttpService layoutOptions={{ hideServerInfo: true }} data={{ ...httpService, security: [] }} />
      </Router>,
    );

    const serverUrl = screen.queryByLabelText('Production API');
    expect(serverUrl).not.toBeInTheDocument();
  });

  it('displays all server urls', () => {
    render(<ServerInfo servers={httpService.servers ?? []} />);

    const serverUrl = screen.getByLabelText('Production API');
    expect(serverUrl).toHaveTextContent('https://api.stoplight.io');

    const secondServerUrl = screen.getByLabelText('Staging API');
    expect(secondServerUrl).toHaveTextContent('https://api.{environment}.stoplight.io');

    const thirdServerUrl = screen.getByLabelText('Development API');
    expect(thirdServerUrl).toHaveTextContent('https://localhost:{port}');

    expect(screen.queryByLabelText('Mock Server')).not.toBeInTheDocument();
  });

  it('generates names for servers without descriptions', () => {
    render(<ServerInfo servers={httpServiceWithUnnamedServers.servers ?? []} />);

    const secondServerUrl = screen.getByLabelText('Server 2');
    expect(secondServerUrl).toHaveTextContent('https://api.staging.stoplight.io');

    const fourthServerUrl = screen.getByLabelText('Server 4');
    expect(fourthServerUrl).toHaveTextContent('https://localhost:4060');

    expect(screen.queryByLabelText('Mock Server')).not.toBeInTheDocument();
  });

  it('keeps url variables in displayed url', () => {
    render(<ServerInfo servers={httpServiceWithUrlVariables.servers ?? []} />);

    const serverUrl = screen.getByLabelText('Production API');
    expect(serverUrl).toHaveTextContent('{protocol}://{namespace}.stoplight.io');
  });

  it('shows url variables in an expandable panel', async () => {
    render(<ServerInfo servers={httpServiceWithUrlVariables.servers ?? []} />);

    await waitFor(() => expect(screen.queryByRole('region')).toBeInTheDocument());

    expect(screen.getByRole('region')).toHaveTextContent(
      `protocolstringAllowed values:ftphttphttpsDefault:ftpnamespacestringDefault:default-namespace`,
    );
  });

  it('hides subsequent panels with server variables ', async () => {
    const servers = [
      ...httpServiceWithUrlVariables.servers!.slice(0, -1),
      {
        id: '?http-server-3?',
        url: 'https://localhost:{port}',
        description: 'Development API',
        variables: {
          port: {
            default: '443',
          },
        },
      },
    ];

    render(<ServerInfo servers={servers} />);

    await waitFor(() => expect(screen.queryAllByRole('region')).toHaveLength(1));

    const serverUrl = screen.getByLabelText('Development API');
    userEvent.click(serverUrl.parentElement!);

    await waitFor(() => expect(screen.queryAllByRole('region')).toHaveLength(2));

    expect(screen.getAllByRole('region')[1]).toHaveTextContent(`portstringDefault:443`);
  });

  it('handles urls without an origin', () => {
    render(<ServerInfo servers={httpServiceWithoutOrigin.servers ?? []} />);

    const serverUrl = screen.getByLabelText('Production API');
    expect(serverUrl).toHaveTextContent('api');
  });

  it('displays mock server url when embedded in Stoplight Project', async () => {
    render(<ServerInfo servers={httpService.servers ?? []} mockUrl="https://foo.stoplight.io/prism/123" />);

    const mockServer = screen.queryByLabelText('Mock Server');
    await waitFor(() => expect(mockServer).toHaveTextContent('https://foo.stoplight.io/prism/123'));
  });

  it('Base URL block handles an invalid URL', () => {
    const modifiedData = {
      ...httpService,
      servers: [
        {
          id: '?http-server-0?',
          url: 'https://///',
          name: 'Production API',
        },
      ],
    };

    render(
      <Router>
        <HttpService data={modifiedData} />
      </Router>,
    );

    expect(screen.queryByText(/api base url/i)).toBeInTheDocument();
  });

  describe('Security schemes', () => {
    it('should render single security scheme', () => {
      render(<SecuritySchemes secSchemes={[[apiKey]]} parentId="2@adfg4F" />);

      const title = screen.getByRole('heading', { name: 'Security' });
      const scheme = screen.getByRole('heading', { name: 'API Key' });

      expect(title).toBeInTheDocument();
      expect(scheme).toBeInTheDocument();
    });

    it('should not render if no security schemes provided', () => {
      render(
        <Router>
          <HttpService data={{ ...httpService, security: [] }} />
        </Router>,
      );

      const security = screen.queryByRole('heading', { name: 'Security' });
      expect(security).not.toBeInTheDocument();
    });

    it('should not render if hideSecurityInfo is provided', () => {
      render(
        <Router>
          <HttpService layoutOptions={{ hideSecurityInfo: true }} data={{ ...httpService, security: [] }} />
        </Router>,
      );

      const security = screen.queryByRole('heading', { name: 'Security' });
      expect(security).not.toBeInTheDocument();
    });

    it('should render default description', () => {
      render(<SecuritySchemes secSchemes={[[apiKey]]} parentId="2@adfg4F" />);

      const description = screen.getByText(/An API key/);
      expect(description).toBeInTheDocument();
    });

    it('should render custom description', () => {
      render(
        <SecuritySchemes secSchemes={[[{ ...apiKey, description: 'Api Key description' }]]} parentId="2@adfg4F" />,
      );

      const description = screen.getByText('Api Key description');
      expect(description).toBeInTheDocument();
    });

    it('should render both custom description and other scheme details', () => {
      render(
        <SecuritySchemes secSchemes={[[{ ...oauth, description: 'A custom description' }]]} parentId="2@adfg4F" />,
      );

      const description = screen.getByText('A custom description');
      const implicit = screen.getByText('Implicit OAuth Flow');

      expect(description).toBeInTheDocument();
      expect(implicit).toBeInTheDocument();
    });

    it('should render oauth flows for default description', () => {
      render(<SecuritySchemes secSchemes={[[oauth]]} parentId="2@adfg4F" />);

      const implicit = screen.getByText('Implicit OAuth Flow');
      const password = screen.getByText('Password OAuth Flow');
      const clientCredentials = screen.getByText('Client Credentials OAuth Flow');
      const authCode = screen.getByText('Authorization Code OAuth Flow');

      expect(implicit).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(clientCredentials).toBeInTheDocument();
      expect(authCode).toBeInTheDocument();
    });

    it('should render multiple schemes', () => {
      render(<SecuritySchemes secSchemes={[[apiKey], [oauth]]} parentId="2@adfg4F" />);

      const apiKeyScheme = screen.getByRole('heading', { name: 'API Key' });
      const oauthScheme = screen.getByRole('heading', { name: 'OAuth 2.0' });
      const expandButtons = screen.getAllByRole('button');

      expect(apiKeyScheme).toBeInTheDocument();
      expect(oauthScheme).toBeInTheDocument();
      expect(expandButtons.length).toEqual(2);
    });

    it('should expand first scheme by default', () => {
      render(<SecuritySchemes secSchemes={[[apiKey], [oauth]]} parentId="2@adfg4F" />);

      const apiKeyDescription = screen.queryByText(/An API key/);
      let oauthDescription = screen.queryByText('Implicit OAuth Flow');

      expect(apiKeyDescription).toBeInTheDocument();
      expect(oauthDescription).not.toBeInTheDocument();

      const oauthScheme = screen.getByRole('heading', { name: 'OAuth 2.0' });
      userEvent.click(oauthScheme);
      oauthDescription = screen.queryByText('Implicit OAuth Flow');
      expect(oauthDescription).toBeInTheDocument();
    });
  });

  describe('Additional information', () => {
    it('should render additional information', () => {
      const contact = {
        name: 'Developer',
        email: 'developer@stoplight.io',
        url: 'https://stoplight.io/contact-us/',
      };

      const license = {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      };
      render(
        <AdditionalInfo id="a" contact={contact} license={license} termsOfService="https://stoplight.io/terms/" />,
      );

      const title = screen.getByRole('heading', { name: 'Additional Information' });

      expect(title).toBeInTheDocument();
    });

    it('should not render if contact, license, and terms of service do not exist', () => {
      render(<AdditionalInfo id="a" />);

      const title = screen.queryByRole('heading', { name: 'Additional Information' });
      expect(title).not.toBeInTheDocument();
    });

    it('should not render if props do not have sufficient subprops', () => {
      const contact = {
        name: 'Developer',
      };

      render(<AdditionalInfo id="a" contact={contact} />);

      const title = screen.queryByRole('heading', { name: 'Additional Information' });
      expect(title).not.toBeInTheDocument();
    });
  });

  describe('export button', () => {
    it('should render correctly', () => {
      const wrapper = render(
        <Router>
          <MosaicProvider>
            <HttpService
              data={httpService}
              exportProps={{ original: { onPress: jest.fn() }, bundled: { onPress: jest.fn() } }}
            />
          </MosaicProvider>
        </Router>,
      );

      const exportButton = wrapper.getByRole('button', { name: 'Export' });
      expect(exportButton).toBeInTheDocument();

      userEvent.click(exportButton);
      expect(wrapper.getByRole('menuitem', { name: 'Original' })).toBeInTheDocument();
      expect(wrapper.getByRole('menuitem', { name: 'Bundled References' })).toBeInTheDocument();
    });

    it('should not render if hideExport is true', () => {
      const wrapper = render(
        <Router>
          <MosaicProvider>
            <HttpService
              data={httpService}
              exportProps={{ original: { onPress: jest.fn() }, bundled: { onPress: jest.fn() } }}
              layoutOptions={{ hideExport: true }}
            />
          </MosaicProvider>
        </Router>,
      );

      const exportButton = wrapper.queryByRole('button', { name: 'Export' });
      expect(exportButton).not.toBeInTheDocument();
    });

    it('should not render if no exportProps are present', () => {
      const wrapper = render(
        <Router>
          <MosaicProvider>
            <HttpService data={httpService} />
          </MosaicProvider>
        </Router>,
      );

      const exportButton = wrapper.queryByRole('button', { name: 'Export' });
      expect(exportButton).not.toBeInTheDocument();
    });
  });
});

describe('useSplitUrl hook', () => {
  it('should correctly distinguish variables from static parts', () => {
    let { result } = renderHook(() => useSplitUrl('https://{api}.stoplight.io:{port}'));

    expect(result.current).toStrictEqual([
      { kind: 'static', value: 'https://' },
      { kind: 'variable', value: '{api}' },
      { kind: 'static', value: '.stoplight.io:' },
      { kind: 'variable', value: '{port}' },
    ]);

    ({ result } = renderHook(() => useSplitUrl('{protocol}://stoplight.io:{port}')));

    expect(result.current).toStrictEqual([
      { kind: 'variable', value: '{protocol}' },
      { kind: 'static', value: '://stoplight.io:' },
      { kind: 'variable', value: '{port}' },
    ]);

    ({ result } = renderHook(() => useSplitUrl('https://{version}{username}.stoplight.io')));

    expect(result.current).toStrictEqual([
      { kind: 'static', value: 'https://' },
      { kind: 'variable', value: '{version}' },
      { kind: 'variable', value: '{username}' },
      { kind: 'static', value: '.stoplight.io' },
    ]);

    ({ result } = renderHook(() => useSplitUrl('https://www.stoplight.io')));

    expect(result.current).toStrictEqual([{ kind: 'static', value: 'https://www.stoplight.io' }]);
  });

  it('should gracefully handle invalid input', () => {
    let { result } = renderHook(() => useSplitUrl('https://{{{{}'));

    expect(result.current).toStrictEqual([{ kind: 'static', value: 'https://{{{{}' }]);

    ({ result } = renderHook(() => useSplitUrl('{protocol://stoplight.io:{api}')));

    expect(result.current).toStrictEqual([
      { kind: 'static', value: '{protocol://stoplight.io:' },
      { kind: 'variable', value: '{api}' },
    ]);

    ({ result } = renderHook(() => useSplitUrl('https://{version}{username}.stoplight.io{test')));

    expect(result.current).toStrictEqual([
      { kind: 'static', value: 'https://' },
      { kind: 'variable', value: '{version}' },
      { kind: 'variable', value: '{username}' },
      { kind: 'static', value: '.stoplight.io{test' },
    ]);
  });
});

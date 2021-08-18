import 'jest-enzyme';

import { Provider as MosaicProvider } from '@stoplight/mosaic';
import {
  IOauth2AuthorizationCodeFlow,
  IOauth2ClientCredentialsFlow,
  IOauth2ImplicitFlow,
  IOauth2PasswordFlow,
} from '@stoplight/types';
import { render, screen, waitFor } from '@testing-library/react';
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
import { getOAuthFlowDescription, SecuritySchemes } from './SecuritySchemes';
import { ServerInfo } from './ServerInfo';

describe('HttpService', () => {
  it('Should render correctly', () => {
    const wrapper = render(
      <Router>
        <HttpService data={httpService} />
      </Router>,
    );

    expect(wrapper.getByText(httpService.name).tagName.toLowerCase()).toBe('h1');
  });

  it('displays all server urls', () => {
    render(<ServerInfo servers={httpService.servers ?? []} />);

    const serverUrl = screen.getByLabelText('Production API');
    expect(serverUrl).toHaveTextContent('https://api.stoplight.io');

    const secondServerUrl = screen.getByLabelText('Staging API');
    expect(secondServerUrl).toHaveTextContent('https://api.staging.stoplight.io');

    const thirdServerUrl = screen.getByLabelText('Integration API');
    expect(thirdServerUrl).toHaveTextContent('https://api.int.stoplight.io');

    const fourthServerUrl = screen.getByLabelText('Development API');
    expect(fourthServerUrl).toHaveTextContent('https://localhost:4060');

    expect(screen.queryByLabelText('Mock Server')).not.toBeInTheDocument();
  });

  it('generates names for servers without names', () => {
    render(<ServerInfo servers={httpServiceWithUnnamedServers.servers ?? []} />);

    const secondServerUrl = screen.getByLabelText('Server 2');
    expect(secondServerUrl).toHaveTextContent('https://api.staging.stoplight.io');

    const fourthServerUrl = screen.getByLabelText('Server 4');
    expect(fourthServerUrl).toHaveTextContent('https://localhost:4060');

    expect(screen.queryByLabelText('Mock Server')).not.toBeInTheDocument();
  });

  it('replaces url variables with default values in displayed url', () => {
    render(<ServerInfo servers={httpServiceWithUrlVariables.servers ?? []} />);

    const serverUrl = screen.getByLabelText('Production API');
    expect(serverUrl).toHaveTextContent('ftp://default-namespace.stoplight.io');
  });

  it('prepends origin to urls without origin', () => {
    render(<ServerInfo servers={httpServiceWithoutOrigin.servers ?? []} />);

    const serverUrl = screen.getByLabelText('Production API');
    expect(serverUrl).toHaveTextContent('http://localhost/api');
  });

  it('displays mock server url when embedded in Stoplight Project', async () => {
    render(<ServerInfo servers={httpService.servers ?? []} mockUrl="https://foo.stoplight.io/prism/123" />);

    const mockServer = screen.queryByLabelText('Mock Server');
    await waitFor(() => expect(mockServer).toHaveTextContent('https://foo.stoplight.io/prism/123'));
  });

  it('removes Base URL block when an invalid URL is given', () => {
    const modifiedData = {
      ...httpService,
      servers: [
        {
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

    expect(screen.queryByText(/api base url/i)).not.toBeInTheDocument();
  });

  describe('Security schemes', () => {
    it('should render single security scheme', () => {
      render(<SecuritySchemes schemes={[apiKey]} />);

      const title = screen.getByRole('heading', { name: 'Security' });
      const scheme = screen.getByRole('heading', { name: 'API Key' });

      expect(title).toBeInTheDocument();
      expect(scheme).toBeInTheDocument();
    });

    it('should not render if no security schemes provided', () => {
      render(
        <Router>
          <HttpService data={{ ...httpService, securitySchemes: [] }} />
        </Router>,
      );

      const security = screen.queryByRole('heading', { name: 'Security' });
      expect(security).not.toBeInTheDocument();
    });

    it('should render default description', () => {
      render(<SecuritySchemes schemes={[apiKey]} />);

      const description = screen.getByText(/An API key/);
      expect(description).toBeInTheDocument();
    });

    it('should render custom description', () => {
      render(<SecuritySchemes schemes={[{ ...apiKey, description: 'Api Key description' }]} />);

      const description = screen.getByText('Api Key description');
      expect(description).toBeInTheDocument();
    });

    it('should render both custom description and other scheme details', () => {
      render(<SecuritySchemes schemes={[{ ...oauth, description: 'A custom description' }]} />);

      const description = screen.getByText('A custom description');
      const implicit = screen.getByText('Implicit OAuth Flow');

      expect(description).toBeInTheDocument();
      expect(implicit).toBeInTheDocument();
    });

    it('should render oauth flows for default description', () => {
      render(<SecuritySchemes schemes={[oauth]} />);

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
      render(<SecuritySchemes schemes={[apiKey, oauth]} />);

      const apiKeyScheme = screen.getByRole('heading', { name: 'API Key' });
      const oauthScheme = screen.getByRole('heading', { name: 'OAuth 2.0' });
      const expandButtons = screen.getAllByRole('button');

      expect(apiKeyScheme).toBeInTheDocument();
      expect(oauthScheme).toBeInTheDocument();
      expect(expandButtons.length).toEqual(2);
    });

    it('should expand first scheme by default', () => {
      render(<SecuritySchemes schemes={[apiKey, oauth]} />);

      const apiKeyDescription = screen.queryByText(/An API key/);
      let oauthDescription = screen.queryByText('Implicit OAuth Flow');

      expect(apiKeyDescription).toBeInTheDocument();
      expect(oauthDescription).not.toBeInTheDocument();

      const oauthScheme = screen.getByRole('heading', { name: 'OAuth 2.0' });
      userEvent.click(oauthScheme);
      oauthDescription = screen.queryByText('Implicit OAuth Flow');
      expect(oauthDescription).toBeInTheDocument();
    });

    describe('getOAuthFlowDescription', () => {
      it('should handle implicit flow', () => {
        const flow: IOauth2ImplicitFlow = {
          authorizationUrl: 'http://authorizationURL',
          scopes: { 'scope:implicit': 'implicit scope description', 'scope:read': 'read scope description' },
        };

        const description = getOAuthFlowDescription('Implicit', flow);

        expect(description).toMatchInlineSnapshot(`
          "**Implicit OAuth Flow**

          Authorize URL: http://authorizationURL

          Scopes:
          - \`scope:implicit\` - implicit scope description
          - \`scope:read\` - read scope description"
        `);
      });
    });

    it('should handle authorization code flow', () => {
      const flow: IOauth2AuthorizationCodeFlow = {
        authorizationUrl: 'http://authorizationURL',
        tokenUrl: 'http://tokenURL',
        refreshUrl: 'http://refreshURL',
        scopes: { 'scope:authorizationCode': 'authorizationCode scope description' },
      };

      const description = getOAuthFlowDescription('Authorization Code', flow);

      expect(description).toMatchInlineSnapshot(`
        "**Authorization Code OAuth Flow**

        Authorize URL: http://authorizationURL

        Token URL: http://tokenURL

        Refresh URL: http://refreshURL

        Scopes:
        - \`scope:authorizationCode\` - authorizationCode scope description"
      `);
    });

    it('should handle client credentials flow', () => {
      const flow: IOauth2ClientCredentialsFlow = {
        tokenUrl: 'http://tokenURL',
        scopes: { 'scope:clientCredentials': 'clientCredentials scope description' },
      };

      const description = getOAuthFlowDescription('Client Credentials', flow);

      expect(description).toMatchInlineSnapshot(`
        "**Client Credentials OAuth Flow**

        Token URL: http://tokenURL

        Scopes:
        - \`scope:clientCredentials\` - clientCredentials scope description"
      `);
    });

    it('should handle password flow', () => {
      const flow: IOauth2PasswordFlow = {
        tokenUrl: 'http://tokenURL',
        scopes: { 'scope:password': 'password scope description' },
      };

      const description = getOAuthFlowDescription('Password', flow);

      expect(description).toMatchInlineSnapshot(`
        "**Password OAuth Flow**

        Token URL: http://tokenURL

        Scopes:
        - \`scope:password\` - password scope description"
      `);
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
      render(<AdditionalInfo contact={contact} license={license} termsOfService="https://stoplight.io/terms/" />);

      const title = screen.getByRole('heading', { name: 'Additional Information' });

      expect(title).toBeInTheDocument();
    });

    it('should not render if contact, license, and terms of service do not exist', () => {
      render(<AdditionalInfo />);

      const title = screen.queryByRole('heading', { name: 'Additional Information' });
      expect(title).not.toBeInTheDocument();
    });

    it('should not render if props do not have sufficient subprops', () => {
      const contact = {
        name: 'Developer',
      };

      render(<AdditionalInfo contact={contact} />);

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

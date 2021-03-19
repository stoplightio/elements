import 'jest-enzyme';

import {
  IOauth2AuthorizationCodeFlow,
  IOauth2ClientCredentialsFlow,
  IOauth2ImplicitFlow,
  IOauth2PasswordFlow,
} from '@stoplight/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { apiKey, oauth } from '../../../../__fixtures__/security-schemes';
import httpService from '../../../../__fixtures__/services/petstore';
import { HttpService } from '../index';
import { getOAuthFlowDescription, SecuritySchemes } from '../SecuritySchemes';

describe('HttpService', () => {
  it('Should render correctly', () => {
    const wrapper = render(
      <Router>
        <HttpService data={httpService} />
      </Router>,
    );

    expect(wrapper.getByText(httpService.name).tagName.toLowerCase()).toBe('h1');
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
});

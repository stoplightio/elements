import 'jest-enzyme';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { apiKey, oauth } from '../../../../__fixtures__/security-schemes';
import httpService from '../../../../__fixtures__/services/petstore';
import { HttpService } from '../index';
import { SecuritySchemes } from '../SecuritySchemes';

describe('HttpService', () => {
  it('Should render correctly', () => {
    const wrapper = render(<HttpService data={httpService} />);

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
  });
});

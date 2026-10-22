import '@testing-library/jest-dom';

import { fetchMock } from '@test-utils/fetchMock';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { MemoryRouter, useLocation } from 'react-router';

import { InstagramAPI } from '../__fixtures__/api-descriptions/Instagram';
import { simpleApiWithoutDescription } from '../__fixtures__/api-descriptions/simpleApiWithoutDescription';
import { API } from './API';

const LocationDisplay = () => <div data-testid="location">{useLocation().pathname}</div>;

const renderAt = (path: string, ui: React.ReactElement) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LocationDisplay />
      {ui}
    </MemoryRouter>,
  );

describe('API', () => {
  const APIDocument = {
    ...InstagramAPI,
    info: {
      ...InstagramAPI.info,
      'x-logo': {
        ...InstagramAPI.info['x-logo'],
        altText: 'instagram-logo',
      },
    },
  };

  // we need to add scrollTo to the Element prototype before we mount so it has the method available
  Element.prototype.scrollTo = () => {};

  it('displays logo specified in x-logo property of API document', async () => {
    render(<API layout="sidebar" apiDescriptionDocument={InstagramAPI} />);

    // checks if altText defaults to "logo" if the prop is not passed in API document
    // checks if logo is present
    expect(await screen.findByAltText('logo')).toBeInTheDocument();
  });

  it('uses the altText property from the API document', async () => {
    render(<API layout="sidebar" apiDescriptionDocument={APIDocument} />);

    expect(await screen.findByAltText('instagram-logo')).toBeInTheDocument();
  });

  it("doesn't display the logo when no properties are passed neither via API document nor as component prop", () => {
    render(<API layout="sidebar" apiDescriptionDocument={simpleApiWithoutDescription} />);

    expect(screen.queryByAltText('logo')).not.toBeInTheDocument();
  });

  it('overrides the logo from API document with the one passed in a prop', async () => {
    render(<API logo="thisisarequiredprop" layout="sidebar" apiDescriptionDocument={APIDocument} />);

    expect(screen.queryByAltText('instagram-logo')).not.toBeInTheDocument();
    expect(await screen.findByAltText('logo')).toBeInTheDocument();
  });

  it('displays internal operations by default', async () => {
    renderAt('/paths/internal-operation/get', <API layout="sidebar" apiDescriptionDocument={APIDocument} />);

    expect(await screen.findByText('If you see this, something went wrong')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/paths/internal-operation/get');
  });

  it('displays internal models by default', async () => {
    renderAt('/schemas/InternalObject', <API layout="sidebar" apiDescriptionDocument={APIDocument} />);

    expect(await screen.findByText('Cool object, but internal.')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/schemas/InternalObject');
  });

  it('reroutes away from an internal operation if hideInternal is on', async () => {
    renderAt(
      '/paths/internal-operation/get',
      <API layout="sidebar" apiDescriptionDocument={APIDocument} hideInternal />,
    );

    await waitFor(() => expect(screen.getByTestId('location')).not.toHaveTextContent('/paths/internal-operation/get'));
    expect(await screen.findAllByRole('heading', { name: /Instagram API/ })).not.toHaveLength(0);
    expect(screen.queryByText('If you see this, something went wrong')).not.toBeInTheDocument();
  });

  it('reroutes away from an internal model if hideInternal is on', async () => {
    renderAt('/schemas/InternalObject', <API layout="sidebar" apiDescriptionDocument={APIDocument} hideInternal />);

    await waitFor(() => expect(screen.getByTestId('location')).not.toHaveTextContent('/schemas/InternalObject'));
    expect(await screen.findAllByRole('heading', { name: /Instagram API/ })).not.toHaveLength(0);
    expect(screen.queryByText('Cool object, but internal.')).not.toBeInTheDocument();
  });

  describe('loading the description', () => {
    beforeEach(() => {
      fetchMock.mockClear();
    });

    it('fetches the document from apiDescriptionUrl', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(InstagramAPI));

      render(<API layout="sidebar" apiDescriptionUrl="https://example.com/instagram.json" />);

      expect(await screen.findByAltText('logo')).toBeInTheDocument();
      expect(fetchMock).toHaveBeenCalledWith('https://example.com/instagram.json');
    });

    it('does not fetch when a document is passed as well', async () => {
      render(
        <API layout="sidebar" apiDescriptionUrl="https://example.com/x.json" apiDescriptionDocument={InstagramAPI} />,
      );

      expect(await screen.findByAltText('logo')).toBeInTheDocument();
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('says so when the document cannot be fetched', async () => {
      fetchMock.mockResponseOnce('not found', { status: 404 });

      render(<API layout="sidebar" apiDescriptionUrl="https://example.com/missing.json" />);

      expect(await screen.findByText('Document could not be loaded')).toBeInTheDocument();
    });

    it('says so when the request fails', async () => {
      fetchMock.mockRejectOnce(new Error('network down'));

      render(<API layout="sidebar" apiDescriptionUrl="https://example.com/down.json" />);

      expect(await screen.findByText('Document could not be loaded')).toBeInTheDocument();
    });

    it('says so when the document is not an OpenAPI description', async () => {
      render(<API layout="sidebar" apiDescriptionDocument={{ not: 'openapi' }} />);

      expect(await screen.findByText('Failed to parse OpenAPI file')).toBeInTheDocument();
    });
  });

  describe('layouts', () => {
    it('renders the responsive layout', async () => {
      render(<API layout="responsive" apiDescriptionDocument={APIDocument} />);

      expect(await screen.findAllByRole('heading', { name: /Instagram API/ })).not.toHaveLength(0);
    });
  });

  describe('stackedLayout', () => {
    it('shows operation path and method when collapsed', async () => {
      render(<API logo="thisisarequiredprop" layout="stacked" apiDescriptionDocument={APIDocument} />);

      const users = await screen.findByText('users');
      await userEvent.click(users);

      expect(screen.queryByText('/users/{user-id}')).toBeInTheDocument();
    });

    it('shows operation name when expanded', async () => {
      render(<API logo="thisisarequiredprop" layout="stacked" apiDescriptionDocument={APIDocument} />);

      const users = await screen.findByText('users');
      await userEvent.click(users);

      const usersPath = await screen.findByText('/users/{user-id}');
      await userEvent.click(usersPath);

      const usersSummary = await screen.findByText('Get basic information about a user.');

      expect(usersSummary).toBeInTheDocument();
    });
  });
});

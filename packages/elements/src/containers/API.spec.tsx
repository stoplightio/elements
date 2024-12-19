import '@testing-library/jest-dom';

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { InstagramAPI } from '../__fixtures__/api-descriptions/Instagram';
import { simpleApiWithoutDescription } from '../__fixtures__/api-descriptions/simpleApiWithoutDescription';
import { API } from './API';

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

  it('displays internal operations by default', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/paths/internal-operation/get']}>
        <API layout="sidebar" apiDescriptionDocument={APIDocument} />
      </MemoryRouter>,
    );

    expect(screen.getByText('If you see this, something went wrong')).toBeInTheDocument();

    unmount();
  });

  it('displays internal models by default', () => {
    render(
      <MemoryRouter initialEntries={['/schemas/InternalObject']}>
        <API layout="sidebar" apiDescriptionDocument={APIDocument} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Cool object, but internal.')).toBeInTheDocument();
  });

  it('reroutes to main page on internal operation if hideInternal is on', () => {
    render(
      <MemoryRouter initialEntries={['/paths/internal-operation/get']}>
        <API layout="sidebar" apiDescriptionDocument={APIDocument} hideInternal />
      </MemoryRouter>,
    );

    expect(screen.queryByText('If you see this, something went wrong')).not.toBeInTheDocument();
    expect(location.pathname).toBe('/');
  });

  it('reroutes to main page on internal model if hideInternal is on', () => {
    render(
      <MemoryRouter initialEntries={['/schemas/InternalObject']}>
        <API layout="sidebar" apiDescriptionDocument={APIDocument} hideInternal />
      </MemoryRouter>,
    );

    expect(screen.queryByText('Cool object, but internal.')).not.toBeInTheDocument();
    expect(location.pathname).toBe('/');
  });

  describe('stackedLayout', () => {
    it('shows operation path and method when collapsed', async () => {
      render(<API logo="thisisarequiredprop" layout="stacked" apiDescriptionDocument={APIDocument} />);

      const users = await screen.findByText('users');
      act(() => userEvent.click(users));

      expect(screen.queryByText('/users/{user-id}')).toBeInTheDocument();
    });

    it('shows operation name when expanded', async () => {
      render(<API logo="thisisarequiredprop" layout="stacked" apiDescriptionDocument={APIDocument} />);

      const users = await screen.findByText('users');
      act(() => userEvent.click(users));

      const usersPath = await screen.findByText('/users/{user-id}');
      act(() => userEvent.click(usersPath));

      const usersSummary = await screen.findByText('Get basic information about a user.');

      expect(usersSummary).toBeInTheDocument();
    });
  });
});

import '@testing-library/jest-dom';

import {
  withMosaicProvider,
  withPersistenceBoundary,
  withQueryClientProvider,
  withStyles,
} from '@stoplight/elements-core';
import { act, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
import { flow } from 'lodash';
import * as React from 'react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router';

import { InstagramAPI } from '../__fixtures__/api-descriptions/Instagram';
import { simpleApiWithoutDescription } from '../__fixtures__/api-descriptions/simpleApiWithoutDescription';
import { API, APIImpl } from './API';

export const APIWithoutRouter = flow(
  withStyles,
  withPersistenceBoundary,
  withMosaicProvider,
  withQueryClientProvider,
)(APIImpl);

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
    const routes: RouteObject[] = [
      {
        path: '*',
        element: <APIWithoutRouter layout="sidebar" apiDescriptionDocument={APIDocument} />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0,
    });

    const { unmount } = render(<RouterProvider router={router} />);
    act(() => {
      router.navigate('/paths/internal-operation/get');
    });
    expect(screen.getByText('If you see this, something went wrong')).toBeInTheDocument();

    unmount();
  });

  it('displays internal models by default', () => {
    const routes: RouteObject[] = [
      {
        path: '*',
        element: <APIWithoutRouter layout="sidebar" apiDescriptionDocument={APIDocument} />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);
    act(() => {
      router.navigate('/schemas/InternalObject');
    });

    expect(screen.getByText('Cool object, but internal.')).toBeInTheDocument();
  });

  it('reroutes to main page on internal operation if hideInternal is on', () => {
    const routes: RouteObject[] = [
      {
        path: '*',
        element: <APIWithoutRouter layout="sidebar" apiDescriptionDocument={APIDocument} hideInternal />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);
    act(() => {
      router.navigate('/paths/internal-operation/get');
    });

    expect(screen.queryByText('If you see this, something went wrong')).not.toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/');
  });

  it('reroutes to main page on internal model if hideInternal is on', () => {
    const routes: RouteObject[] = [
      {
        path: '*',
        element: <APIWithoutRouter layout="sidebar" apiDescriptionDocument={APIDocument} hideInternal />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);
    act(() => {
      router.navigate('/schemas/InternalObject');
    });

    expect(screen.queryByText('Cool object, but internal.')).not.toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/');
  });
});

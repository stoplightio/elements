import { act, render, screen } from '@testing-library/react';
import * as React from 'react';
import { HashRouter, useLocation } from 'react-router-dom';

import { withRouter } from '../../hoc/withRouter';
import { getRouterPathFromHash, HashRouterSync } from '.';

const LocationProbe = () => {
  const { pathname, search, hash } = useLocation();
  return <div data-testid="router-location">{`${pathname}${search}${hash}`}</div>;
};

const routerLocation = () => screen.getByTestId('router-location').textContent;

// What a host SPA router (for example VitePress) does when a same-page link is clicked:
// it updates the URL with pushState(), which fires no event, and then dispatches a hashchange event.
const hostNavigate = (url: string) => {
  act(() => {
    window.history.pushState({}, '', url);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
};

describe('HashRouterSync', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('is needed because React Router alone ignores hashchange-only navigation', () => {
    render(
      <HashRouter>
        <LocationProbe />
      </HashRouter>,
    );

    hostNavigate('/#/operations/b');

    expect(window.location.hash).toBe('#/operations/b');
    expect(routerLocation()).toBe('/');
  });

  it('moves the router to a route hash set by the host page', () => {
    render(
      <HashRouter>
        <HashRouterSync />
        <LocationProbe />
      </HashRouter>,
    );

    hostNavigate('/#/operations/b');

    expect(routerLocation()).toBe('/operations/b');
  });

  it('keeps the history entry created by the host instead of adding another one', () => {
    render(
      <HashRouter>
        <HashRouterSync />
        <LocationProbe />
      </HashRouter>,
    );
    const lengthBefore = window.history.length;

    hostNavigate('/#/operations/b');

    expect(window.history.length).toBe(lengthBefore + 1);
    expect(window.location.hash).toBe('#/operations/b');
  });

  it('keeps the query and the in-page anchor of the route', () => {
    render(
      <HashRouter>
        <HashRouterSync />
        <LocationProbe />
      </HashRouter>,
    );

    hostNavigate('/#/operations/b?tab=1#request-body');

    expect(routerLocation()).toBe('/operations/b?tab=1#request-body');
  });

  it('ignores fragments that are not routes, such as a skip link', () => {
    render(
      <HashRouter>
        <HashRouterSync />
        <LocationProbe />
      </HashRouter>,
    );
    hostNavigate('/#/operations/a');

    hostNavigate('/#main-content');

    expect(routerLocation()).toBe('/operations/a');
    expect(window.location.hash).toBe('#main-content');
  });

  it('treats an empty hash as the router root', () => {
    render(
      <HashRouter>
        <HashRouterSync />
        <LocationProbe />
      </HashRouter>,
    );
    hostNavigate('/#/operations/a');

    hostNavigate('/');

    expect(routerLocation()).toBe('/');
  });

  it('does not navigate again when the router already followed a popstate', () => {
    render(
      <HashRouter>
        <HashRouterSync />
        <LocationProbe />
      </HashRouter>,
    );
    const replaceState = jest.spyOn(window.history, 'replaceState');

    // A real fragment navigation fires popstate (handled by React Router) and then hashchange.
    act(() => {
      window.history.pushState({}, '', '/#/operations/c');
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
    });
    act(() => {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(routerLocation()).toBe('/operations/c');
    expect(replaceState).not.toHaveBeenCalled();
    replaceState.mockRestore();
  });

  it('resolves routes relative to basePath', () => {
    window.history.replaceState(null, '', '/#/docs');
    render(
      <HashRouter basename="/docs">
        <HashRouterSync basePath="/docs" />
        <LocationProbe />
      </HashRouter>,
    );

    hostNavigate('/#/docs/operations/b');

    expect(routerLocation()).toBe('/operations/b');
    expect(window.location.hash).toBe('#/docs/operations/b');
  });

  it('ignores hashes outside basePath', () => {
    window.history.replaceState(null, '', '/#/docs/operations/a');
    render(
      <HashRouter basename="/docs">
        <HashRouterSync basePath="/docs" />
        <LocationProbe />
      </HashRouter>,
    );

    hostNavigate('/#/other/page');

    expect(routerLocation()).toBe('/operations/a');
  });

  it('stops listening when unmounted', () => {
    const { unmount } = render(
      <HashRouter>
        <HashRouterSync />
        <LocationProbe />
      </HashRouter>,
    );
    unmount();
    const replaceState = jest.spyOn(window.history, 'replaceState');

    hostNavigate('/#/operations/b');

    expect(replaceState).not.toHaveBeenCalled();
    replaceState.mockRestore();
  });
});

describe('getRouterPathFromHash()', () => {
  it.each([
    ['', '/', '/'],
    ['#/', '/', '/'],
    ['#/operations/a', '/', '/operations/a'],
    ['#/operations/a?x=1#heading', '/', '/operations/a?x=1#heading'],
    ['#main-content', '/', null],
    ['#VPContent', '/', null],
    ['', '/docs', '/'],
    ['#/docs', '/docs', '/'],
    ['#/docs/operations/a', '/docs', '/operations/a'],
    ['#/DOCS/operations/a', 'docs/', '/operations/a'],
    ['#/docs-old/operations/a', '/docs', null],
    ['#/other', '/docs', null],
  ])('maps %p under basePath %p to %p', (hash, basePath, expected) => {
    expect(getRouterPathFromHash(hash, basePath)).toBe(expected);
  });
});

describe('withRouter() with HashRouterSync', () => {
  const Page = withRouter(() => <LocationProbe />);

  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('follows hashchange-only navigation when router is "hash"', () => {
    render(<Page router="hash" />);

    hostNavigate('/#/operations/b');

    expect(routerLocation()).toBe('/operations/b');
  });

  it('passes basePath through when router is "hash"', () => {
    window.history.replaceState(null, '', '/#/docs');
    render(<Page router="hash" basePath="/docs" />);

    hostNavigate('/#/docs/operations/b');

    expect(routerLocation()).toBe('/operations/b');
  });

  it('is not added for other router types', () => {
    const addEventListener = jest.spyOn(window, 'addEventListener');

    render(<Page router="memory" />);

    expect(addEventListener).not.toHaveBeenCalledWith('hashchange', expect.any(Function));
    addEventListener.mockRestore();
  });
});

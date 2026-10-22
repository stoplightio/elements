import { render, screen } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes } from 'react-router';

import { RoutingProps } from '../types';
import { withRouter } from './withRouter';

// Links in the table of contents are relative, such as `operations/b`
const Content = withRouter((_props: RoutingProps) => <Link to="operations/b">B</Link>);

describe('withRouter()', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  describe('in the router of the host app', () => {
    it('resolves relative links against the route the host app mounts it on', async () => {
      render(
        <MemoryRouter initialEntries={['/api']}>
          <Routes>
            <Route path="/api/*" element={<Content />} />
          </Routes>
        </MemoryRouter>,
      );

      expect(await screen.findByRole('link', { name: 'B' })).toHaveAttribute('href', '/api/operations/b');
    });

    it('resolves relative links against the mount point from a page deeper down', async () => {
      render(
        <MemoryRouter initialEntries={['/api/operations/a']}>
          <Routes>
            <Route path="/api/*" element={<Content />} />
          </Routes>
        </MemoryRouter>,
      );

      expect(await screen.findByRole('link', { name: 'B' })).toHaveAttribute('href', '/api/operations/b');
    });

    it('resolves relative links against the mount point when it is not at the root of the host app', async () => {
      render(
        <MemoryRouter initialEntries={['/docs/reference/operations/a']}>
          <Routes>
            <Route path="/docs/reference/*" element={<Content />} />
          </Routes>
        </MemoryRouter>,
      );

      expect(await screen.findByRole('link', { name: 'B' })).toHaveAttribute('href', '/docs/reference/operations/b');
    });
  });

  describe('with a router of its own', () => {
    it('resolves relative links against the base path from a page deeper down', async () => {
      window.history.pushState({}, '', '/api/operations/a');

      render(<Content router="history" basePath="/api" />);

      expect(await screen.findByRole('link', { name: 'B' })).toHaveAttribute('href', '/api/operations/b');
    });
  });
});

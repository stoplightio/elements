import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { HttpOperation } from '..';
import httpOperation from '../../../../__fixtures__/operations/put-todos';

test('"Deprecated" badge is displayed for deprecated http operation', () => {
  render(<HttpOperation data={{ ...httpOperation, deprecated: true }} />);

  const deprecatedBadge = screen.getByTestId('deprecated-badge');

  expect(deprecatedBadge).toBeInTheDocument();
  expect(deprecatedBadge).toHaveTextContent('Deprecated');

  // alternative version of querying component
  const badge = screen.getAllByRole('badge');
  badge.filter(deprecated => expect(deprecated).toHaveTextContent('Deprecated'));
});

test('"Deprecated" badge is not displayed for http operation that is not deprecated', () => {
  render(<HttpOperation data={{ ...httpOperation, deprecated: false }} />);

  const deprecatedBadge = screen.queryByTestId('deprecated-badge');

  expect(deprecatedBadge).not.toBeInTheDocument();
});

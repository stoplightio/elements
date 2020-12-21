import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { HttpOperation } from '..';
import httpOperation from '../../../../__fixtures__/operations/put-todos';

function getDeprecatedBadge() {
  return screen.queryByRole('badge', { name: /Deprecated/i });
}

test('"Deprecated" badge is displayed for deprecated http operation', () => {
  render(<HttpOperation data={{ ...httpOperation, deprecated: true }} />);

  const badge = getDeprecatedBadge();

  expect(badge).toBeInTheDocument();
});

test('"Deprecated" badge is not displayed for http operation that is not deprecated', () => {
  render(<HttpOperation data={{ ...httpOperation, deprecated: false }} />);

  const deprecatedBadge = getDeprecatedBadge();

  expect(deprecatedBadge).not.toBeInTheDocument();
});

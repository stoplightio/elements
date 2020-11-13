import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { TryItHeader } from '../header';

test('When hovered over question circle icon, Try It Out details are displayed', async () => {
  render(<TryItHeader />);
  const icon = screen.getByTestId('try-it-about');

  userEvent.click(icon);

  expect(await screen.findByRole('tooltip')).toBeVisible();
});

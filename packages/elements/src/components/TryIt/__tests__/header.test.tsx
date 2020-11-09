import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { TryItHeader } from '../header';

test('Try It header renders correctly', () => {
  render(<TryItHeader />);
  const elem = screen.getByTestId('try-it-header');
  expect(elem.textContent).toBe(' Try It Out');
});

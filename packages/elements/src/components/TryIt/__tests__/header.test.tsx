import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { TryItHeader } from '../header';

test('Try It header renders correctly', () => {
  render(<TryItHeader />);
  const elem = screen.getByTestId('try-it-header');
  expect(elem.textContent).toBe(' Try It Out');
  expect(elem.innerHTML).toContain('data-icon="magic"');
  expect(elem.innerHTML).toContain('data-icon="question-circle"');
});

test('When hovered over question circle icon, Try It Out details are displayed', async () => {
  render(<TryItHeader />);
  const elem = screen.getByTestId('try-it-header');
  const icon = elem.querySelector('[data-icon="question-circle"]') as Element;

  userEvent.hover(icon);

  expect(
    await screen.findByText(
      "Send HTTP requests to your API, or one of our mock servers, to see how it's going to respond. View the docs",
    ),
  ).toBeInTheDocument();

  expect(await (await screen.findByText('here.')).closest('a')).toHaveAttribute(
    'href',
    'https://meta.stoplight.io/docs/studio/docs/Design-and-Modeling/05-request-maker.md',
  );
});

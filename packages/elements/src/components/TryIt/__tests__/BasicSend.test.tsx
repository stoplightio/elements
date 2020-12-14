import '@testing-library/jest-dom/extend-expect';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { operation } from '../../../__fixtures__/operations/simple-get';
import { BasicSend } from '../BasicSend';

describe('TryIt', () => {
  let originalFetch = globalThis.fetch;
  // TODO: use library instead
  let mockFetch = jest.fn();

  beforeEach(() => {
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("Doesn't crash", () => {
    render(<BasicSend httpOperation={operation} />);
  });

  it('Makes the correct basic request', async () => {
    render(<BasicSend httpOperation={operation} />);

    const button = screen.getByRole('button', { name: /send/i });
    userEvent.click(button);

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls[0][0]).toEqual('https://todos.stoplight.io/todos');
    expect(mockFetch.mock.calls[0][1]).toMatchObject({
      method: 'get',
    });
  });

  it('Displays response', async () => {
    mockFetch.mockResolvedValue(
      new Response('{}', {
        status: 200,
        statusText: 'OK',
        headers: [],
      }),
    );

    render(<BasicSend httpOperation={operation} />);

    let responseHeader = screen.queryByText('Response');
    expect(responseHeader).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: /send/i });
    userEvent.click(button);

    responseHeader = await screen.findByText('Response');
    expect(responseHeader).toBeVisible();
  });

  it('Handles error', () => {});
});

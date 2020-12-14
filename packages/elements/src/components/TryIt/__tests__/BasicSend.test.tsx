import '@testing-library/jest-dom/extend-expect';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { httpOperation as putOperation } from '../../../__fixtures__/operations/put-todos';
import { operation as basicOperation } from '../../../__fixtures__/operations/simple-get';
import { BasicSend } from '../BasicSend';

function clickSend() {
  const button = screen.getByRole('button', { name: /send/i });
  userEvent.click(button);
}

describe('TryIt', () => {
  let originalFetch = globalThis.fetch;
  // TODO: use library instead
  let mockFetch = jest.fn();

  beforeEach(() => {
    mockFetch.mockReset();
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("Doesn't crash", () => {
    render(<BasicSend httpOperation={basicOperation} />);
  });

  it('Makes the correct basic request', async () => {
    render(<BasicSend httpOperation={basicOperation} />);

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

    render(<BasicSend httpOperation={basicOperation} />);

    let responseHeader = screen.queryByText('Response');
    expect(responseHeader).not.toBeInTheDocument();

    clickSend();

    responseHeader = await screen.findByText('Response');
    expect(responseHeader).toBeVisible();
  });

  it('Handles error', () => {});

  describe('Parameter Handling', () => {
    it('Hides panel when there are no parameters', () => {
      render(<BasicSend httpOperation={basicOperation} />);

      let parametersHeader = screen.queryByText('Parameters');
      expect(parametersHeader).not.toBeInTheDocument();
    });

    it('Shows panel when there are parameters', () => {
      render(<BasicSend httpOperation={putOperation} />);

      let parametersHeader = screen.queryByText('Parameters');
      expect(parametersHeader).toBeInTheDocument();
    });

    it('Displays types correctly', () => {
      render(<BasicSend httpOperation={putOperation} />);

      const todoIdField = screen.getByLabelText('todoId') as HTMLInputElement;
      expect(todoIdField.placeholder).toMatch(/string/i);
    });

    it('Passes all parameters to the request', async () => {
      render(<BasicSend httpOperation={putOperation} />);

      // path param
      const todoIdField = screen.getByLabelText('todoId');
      await userEvent.type(todoIdField, '123');

      // query params
      const limitField = screen.getByLabelText('limit');
      await userEvent.type(limitField, '5');

      const typeField = screen.getByLabelText('type');
      await userEvent.type(typeField, 'some-type');

      // header param

      const accountIdField = screen.getByLabelText('account-id');
      await userEvent.type(accountIdField, '1999');

      // click send
      clickSend();

      expect(mockFetch).toHaveBeenCalled();
      expect(mockFetch.mock.calls[0][0]).toEqual('https://todos.stoplight.io/todos/123?limit=5&type=some-type');
      expect(mockFetch.mock.calls[0][1]).toMatchObject({
        method: 'put',
        headers: {
          'account-id': '1999',
        },
      });
    });
  });
});

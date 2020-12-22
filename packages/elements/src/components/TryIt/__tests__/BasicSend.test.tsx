import '@testing-library/jest-dom/extend-expect';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import * as React from 'react';

import { httpOperation as putOperation } from '../../../__fixtures__/operations/put-todos';
import { operation as basicOperation } from '../../../__fixtures__/operations/simple-get';
import { BasicSend } from '../BasicSend';

function clickSend() {
  const button = screen.getByRole('button', { name: /send/i });
  userEvent.click(button);
}

describe('TryIt', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("Doesn't crash", () => {
    render(<BasicSend httpOperation={basicOperation} />);
  });

  it('Makes the correct basic request', async () => {
    render(<BasicSend httpOperation={basicOperation} />);

    const button = screen.getByRole('button', { name: /send/i });
    userEvent.click(button);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toBeCalledWith(
      'https://todos.stoplight.io/todos',
      expect.objectContaining({
        method: 'get',
      }),
    );
  });

  it('Displays response', async () => {
    fetchMock.mockResolvedValue(
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

    it('Initializes parameters correctly', () => {
      render(<BasicSend httpOperation={putOperation} />);

      // path param
      const completedField = screen.getByLabelText('completed');
      expect(completedField).toHaveValue('');

      // query params
      const limitField = screen.getByLabelText('limit');
      expect(limitField).toHaveValue('0');

      const typeField = screen.getByLabelText('type');
      expect(typeField).toHaveValue('something');

      const valueField = screen.getByLabelText('value');
      expect(valueField).toHaveValue('0');

      // header param

      const accountIdField = screen.getByLabelText('account-id') as HTMLInputElement;
      expect(accountIdField).toHaveValue('example id');
      expect(accountIdField.placeholder).toMatch(/account-id-default/i);

      const messageIdField = screen.getByLabelText('message-id');
      expect(messageIdField).toHaveValue('example value');
    });

    it('Passes all parameters to the request', async () => {
      render(<BasicSend httpOperation={putOperation} />);

      // path param
      const todoIdField = screen.getByLabelText('todoId');
      await userEvent.type(todoIdField, '123');

      // query params
      const limitField = screen.getByLabelText('limit');
      await userEvent.selectOptions(limitField, '3');

      const typeField = screen.getByLabelText('type');
      await userEvent.selectOptions(typeField, 'another');

      // header param

      const accountIdField = screen.getByLabelText('account-id');
      await userEvent.type(accountIdField, ' 1999');

      const messageIdField = screen.getByLabelText('message-id-select');
      await userEvent.selectOptions(messageIdField, 'example 2');

      // click send
      clickSend();

      expect(fetchMock).toHaveBeenCalled();
      expect(fetchMock).toBeCalledWith(
        'https://todos.stoplight.io/todos/123?limit=3&value=0&type=another',
        expect.objectContaining({
          method: 'put',
          headers: {
            'account-id': 'example id 1999',
            'message-id': 'another example',
          },
        }),
      );
    });
  });
});

import '@testing-library/jest-dom/extend-expect';

import { HttpParamStyles, IHttpOperation } from '@stoplight/types';
import { screen, waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import * as React from 'react';

import { httpOperation as base64FileUpload } from '../../../__fixtures__/operations/base64-file-upload';
import { examplesRequestBody } from '../../../__fixtures__/operations/examples-request-body';
import { httpOperation as multipartFormdataOperation } from '../../../__fixtures__/operations/multipart-formdata-post';
import { httpOperation as putOperation } from '../../../__fixtures__/operations/put-todos';
import { requestBody } from '../../../__fixtures__/operations/request-body';
import { operation as basicOperation } from '../../../__fixtures__/operations/simple-get';
import { httpOperation as urlEncodedPostOperation } from '../../../__fixtures__/operations/urlencoded-post';
import { PersistenceContextProvider, withPersistenceBoundary } from '../../../context/Persistence';
import { TryIt } from '../index';

function clickSend() {
  const button = screen.getByRole('button', { name: /send/i });
  userEvent.click(button);
}

const TryItWithPersistence = withPersistenceBoundary(TryIt);

describe('TryIt', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("Doesn't crash", () => {
    render(<TryItWithPersistence httpOperation={basicOperation} />);
  });

  it('Makes the correct basic request', async () => {
    render(<TryItWithPersistence httpOperation={basicOperation} />);

    const button = screen.getByRole('button', { name: /send/i });
    userEvent.click(button);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
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

    render(<TryItWithPersistence httpOperation={basicOperation} />);

    let responseHeader = screen.queryByText('Response');
    expect(responseHeader).not.toBeInTheDocument();

    clickSend();

    responseHeader = await screen.findByText('Response');
    expect(responseHeader).toBeVisible();
  });

  it('Handles error', async () => {
    fetchMock.mockReject(new Error('sample error'));

    render(<TryItWithPersistence httpOperation={basicOperation} />);

    let errorHeader = screen.queryByText('Error');
    expect(errorHeader).not.toBeInTheDocument();

    clickSend();

    errorHeader = await screen.findByText('Error');
    expect(errorHeader).toBeVisible();

    const responseHeader = screen.queryByText('Response');
    expect(responseHeader).not.toBeInTheDocument();
  });

  describe('Parameter Handling', () => {
    it('Hides panel when there are no parameters', () => {
      render(<TryItWithPersistence httpOperation={basicOperation} />);

      let parametersHeader = screen.queryByText('Parameters');
      expect(parametersHeader).not.toBeInTheDocument();
    });

    it('Shows panel when there are parameters', () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      let parametersHeader = screen.queryByText('Parameters');
      expect(parametersHeader).toBeInTheDocument();
    });

    it('Displays types correctly', () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      const todoIdField = screen.getByLabelText('todoId') as HTMLInputElement;
      expect(todoIdField.placeholder).toMatch(/string/i);
    });

    it('Initializes parameters correctly', () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

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
      render(<TryItWithPersistence httpOperation={putOperation} />);

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

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());
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

    it('Persists parameter values between operations', async () => {
      const { rerender } = render(
        <PersistenceContextProvider>
          <TryIt httpOperation={putOperation} />
        </PersistenceContextProvider>,
      );

      // fill path param
      const todoIdField = screen.getByLabelText('todoId');
      await userEvent.type(todoIdField, '123');

      // unmount (to make sure parameters are not simply stored in component state)
      rerender(
        <PersistenceContextProvider>
          <div />
        </PersistenceContextProvider>,
      );

      // mount a different instance

      const alternativeSchema: IHttpOperation = {
        id: 'patch',
        method: 'patch',
        path: '/todos/{todoId}',
        responses: [],
        servers: [
          {
            url: 'https://todos.stoplight.io',
          },
        ],
        request: {
          path: [
            {
              schema: {
                type: 'string',
              },
              name: 'todoId',
              style: HttpParamStyles.Simple,
              required: true,
            },
          ],
        },
      };

      rerender(
        <PersistenceContextProvider>
          <TryIt httpOperation={alternativeSchema} />
        </PersistenceContextProvider>,
      );

      screen.debug(screen.getByLabelText('todoId'));
      expect(screen.getByLabelText('todoId')).toHaveValue('123');
    });
  });

  describe('Form Data Body', () => {
    it('Hides panel when there are no parameters', () => {
      render(<TryItWithPersistence httpOperation={basicOperation} />);

      let parametersHeader = screen.queryByText('Body');
      expect(parametersHeader).not.toBeInTheDocument();
    });

    it('Shows panel when there are parameters', () => {
      render(<TryItWithPersistence httpOperation={urlEncodedPostOperation} />);

      let parametersHeader = screen.queryByText('Body');
      expect(parametersHeader).toBeInTheDocument();
    });

    it('Displays types correctly', () => {
      render(<TryItWithPersistence httpOperation={urlEncodedPostOperation} />);

      const nameField = screen.getByRole('textbox', { name: 'name' }) as HTMLInputElement;
      expect(nameField.placeholder).toMatch(/string/i);

      const completedField = screen.getByRole('combobox', { name: 'completed' });
      expect(completedField).toBeInTheDocument();
    });

    const formDataCases: ReadonlyArray<[string, NewableFunction, IHttpOperation]> = [
      ['application/x-www-form-urlencoded', URLSearchParams, urlEncodedPostOperation],
      ['multipart/form-data', FormData, multipartFormdataOperation],
    ];

    describe.each(formDataCases)('Builds correct %p request', (name, prototype, fixture) => {
      let body: URLSearchParams | FormData;
      beforeAll(async () => {
        render(<TryItWithPersistence httpOperation={fixture} />);

        // path param
        const nameField = screen.getByRole('textbox', { name: 'name' }) as HTMLInputElement;
        await userEvent.type(nameField, 'some-name');

        // click send
        clickSend();

        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
        expect(fetchMock).toHaveBeenCalledTimes(1);
        body = fetchMock.mock.calls[0][1]!.body as URLSearchParams | FormData;
        expect(body).toBeInstanceOf(prototype);
      });

      it('Sends user input', () => {
        expect(body.get('name')).toBe('some-name');
      });

      it('Includes untouched fields', () => {
        expect(body.get('completed')).toBe('');
      });

      it('Sets untouched enums to their first value', () => {
        expect(body.get('someEnum')).toBe('a');
      });
    });

    describe('File Upload', () => {
      it('displays the name of the imported file in the string input', () => {
        render(<TryItWithPersistence httpOperation={multipartFormdataOperation} />);

        userEvent.upload(screen.getByLabelText('Upload'), new File(['something'], 'some-file'));

        expect(screen.getByLabelText('someFile')).toHaveValue('some-file');
      });

      it('allows to remove file after importing it', () => {
        render(<TryItWithPersistence httpOperation={multipartFormdataOperation} />);

        userEvent.upload(screen.getByLabelText('Upload'), new File(['something'], 'some-file'));

        userEvent.click(screen.getByLabelText('Remove file'));

        expect(screen.getByLabelText('someFile')).not.toHaveValue();
      });

      it('allows to upload file in multipart request', async () => {
        render(<TryItWithPersistence httpOperation={multipartFormdataOperation} />);

        userEvent.upload(screen.getByLabelText('Upload'), new File(['something'], 'some-file'));

        clickSend();
        await waitFor(() => expect(fetchMock).toHaveBeenCalled());

        const body = fetchMock.mock.calls[0][1]!.body as FormData;

        expect(body.get('someFile')).toBeInstanceOf(File);
        expect((body.get('someFile') as File).name).toBe('some-file');
      });

      it('allows to upload file in base64 format in multipart request', async () => {
        render(<TryItWithPersistence httpOperation={base64FileUpload} />);

        userEvent.upload(screen.getByLabelText('Upload'), new File(['something'], 'some-file'));

        clickSend();
        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
        const body = fetchMock.mock.calls[0][1]!.body as FormData;

        // c29tZXRoaW5n is "something" encoded as base64
        expect(body.get('someFile')).toBe('c29tZXRoaW5n');
      });
    });
  });

  describe('Text Request Body', () => {
    describe('when no request body examples', () => {
      it('hides panel when there is no schema for request body', () => {
        render(<TryItWithPersistence httpOperation={basicOperation} />);

        let bodyHeader = screen.queryByText('Body');
        expect(bodyHeader).not.toBeInTheDocument();
      });

      it('statically generates request body basing on request body schema', () => {
        render(<TryItWithPersistence httpOperation={requestBody} />);

        let bodyHeader = screen.queryByText('Body');
        expect(bodyHeader).toBeInTheDocument();

        expect(screen.getByRole('textbox')).toHaveTextContent('{"name":"string","age":0}');
      });
    });

    describe('when there are request body examples', () => {
      let examplesItems = ['example-1', 'named-example', 'example-3'];

      it("is populated to first example if there's one", () => {
        render(<TryItWithPersistence httpOperation={examplesRequestBody} />);
        expect(screen.getByRole('textbox')).toHaveTextContent('{"name":"Andrew","age":19,"trial":true}');
      });

      it('allows users to choose request body examples from spec using dropdown menu', () => {
        render(<TryItWithPersistence httpOperation={examplesRequestBody} />);
        let examplesButton = screen.getByRole('button', { name: /Examples/ });
        userEvent.click(examplesButton);

        let examples = screen.getAllByRole('menuitem').map(el => el.textContent);
        expect(examples).toEqual(examplesItems);
      });
    });
  });

  describe('Mocking', () => {
    it('Shows mock button', () => {
      render(<TryItWithPersistence httpOperation={basicOperation} showMocking />);

      const mockingButton = screen.getByRole('button', { name: /mocking/i });
      expect(mockingButton).toBeInTheDocument();
    });

    it('Invokes request with mocked data', async () => {
      render(
        <TryItWithPersistence httpOperation={basicOperation} showMocking mockUrl="https://mock-todos.stoplight.io" />,
      );

      const mockingButton = screen.getByRole('button', { name: /mocking/i });

      userEvent.click(mockingButton);

      const enableItem = screen.getByText('Enabled');
      const responseCodeItem = screen.getByText('200');

      expect(enableItem).toBeInTheDocument();
      expect(responseCodeItem).toBeInTheDocument();

      // enable mocking, set response code and send
      userEvent.click(enableItem);
      userEvent.click(responseCodeItem);
      clickSend();

      // disable mocking and send
      userEvent.click(enableItem);
      clickSend();
      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock.mock.calls).toEqual([
        [
          'https://mock-todos.stoplight.io/todos',
          expect.objectContaining({
            method: 'get',
            headers: {
              Prefer: 'code=200',
            },
          }),
        ],
        [
          'https://todos.stoplight.io/todos',
          expect.objectContaining({
            method: 'get',
            headers: {},
          }),
        ],
      ]);
    });

    it('Persists mocking options between operations', async () => {
      const { rerender } = render(
        <PersistenceContextProvider>
          <TryIt httpOperation={putOperation} showMocking mockUrl="https://mock-todos.stoplight.io" />
        </PersistenceContextProvider>,
      );

      // enable mocking
      const mockingButton = screen.getByRole('button', { name: /mocking/i });
      userEvent.click(mockingButton);

      const enableItem = screen.getByText('Enabled');
      const responseCodeItem = screen.getByText('200');
      userEvent.click(enableItem);
      userEvent.click(responseCodeItem);

      // unmount (to make sure parameters are not simply stored in component state)
      rerender(
        <PersistenceContextProvider>
          <div />
        </PersistenceContextProvider>,
      );

      // mount a different instance

      rerender(
        <PersistenceContextProvider>
          <TryIt httpOperation={basicOperation} showMocking mockUrl="https://mock-todos.stoplight.io" />
        </PersistenceContextProvider>,
      );

      clickSend();
      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      expect(fetchMock).toBeCalledWith(
        'https://mock-todos.stoplight.io/todos',
        expect.objectContaining({
          method: 'get',
          headers: {
            Prefer: 'code=200',
          },
        }),
      );
    });
  });
});

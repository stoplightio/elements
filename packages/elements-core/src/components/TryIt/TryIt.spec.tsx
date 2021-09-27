import '@testing-library/jest-dom';

import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { HttpParamStyles, IHttpOperation } from '@stoplight/types';
import { screen, waitFor } from '@testing-library/dom';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import * as React from 'react';

import { httpOperation as base64FileUpload } from '../../__fixtures__/operations/base64-file-upload';
import { examplesRequestBody, singleExampleRequestBody } from '../../__fixtures__/operations/examples-request-body';
import { headWithRequestBody } from '../../__fixtures__/operations/head-todos';
import { httpOperation as multipartFormdataOperation } from '../../__fixtures__/operations/multipart-formdata-post';
import { httpOperation as sortedParameters } from '../../__fixtures__/operations/operation-parameters';
import { operation as operationWithoutServers } from '../../__fixtures__/operations/operation-without-servers';
import { patchWithRequestBody } from '../../__fixtures__/operations/patch-todos';
import { httpOperation as putOperation } from '../../__fixtures__/operations/put-todos';
import { httpOperation as referencedBody } from '../../__fixtures__/operations/referenced-body';
import { requestBody } from '../../__fixtures__/operations/request-body';
import { requestBodyEmptySchema } from '../../__fixtures__/operations/request-body-empty-schema';
import {
  duplicatedSecurityScheme,
  emptySecurityOperation,
  singleSecurityOperation,
} from '../../__fixtures__/operations/securedOperation';
import { operation as basicOperation } from '../../__fixtures__/operations/simple-get';
import { httpOperation as urlEncodedPostOperation } from '../../__fixtures__/operations/urlencoded-post';
import { operationWithUrlVariables } from '../../__fixtures__/operations/with-url-variables';
import { InlineRefResolverProvider } from '../../context/InlineRefResolver';
import { PersistenceContextProvider, withPersistenceBoundary } from '../../context/Persistence';
import { withMosaicProvider } from '../../hoc/withMosaicProvider';
import { chooseOption } from '../../utils/tests/chooseOption';
import { TryIt } from './index';

function clickSend() {
  const button = screen.getByRole('button', { name: /send/i });
  userEvent.click(button);
}

const TryItWithPersistence = withMosaicProvider(withPersistenceBoundary(TryIt));

describe('TryIt', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  it("Doesn't crash", () => {
    render(<TryItWithPersistence httpOperation={basicOperation} />);
  });

  it('Makes the correct basic request', async () => {
    render(<TryItWithPersistence httpOperation={basicOperation} />);

    clickSend();

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toBe('https://todos.stoplight.io/todos');
    const requestInit = fetchMock.mock.calls[0][1]!;
    expect(requestInit.method).toMatch(/^get$/i);
    const headers = new Headers(requestInit.headers);
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('uses cors proxy url, if provided', async () => {
    render(<TryItWithPersistence httpOperation={basicOperation} corsProxy="https://some.proxy.com/" />);

    clickSend();

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toBe('https://some.proxy.com/https://todos.stoplight.io/todos');
  });

  it('replaces url variables with default values when making request', async () => {
    render(<TryItWithPersistence httpOperation={operationWithUrlVariables} />);

    const button = screen.getByRole('button', { name: /send/i });
    userEvent.click(button);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toBe('ftp://default-namespace.stoplight.io/api/eu/todos');
  });

  it('makes request to origin URL if there is no URL in the document', async () => {
    render(<TryItWithPersistence httpOperation={operationWithoutServers} />);

    const button = screen.getByRole('button', { name: /send/i });
    userEvent.click(button);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost/todos');
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

  it('displays raw text response', async () => {
    fetchMock.mockResolvedValue(
      new Response('awesome response, but hardly a json one', {
        status: 200,
        statusText: 'OK',
        headers: [],
      }),
    );

    const { container } = render(<TryItWithPersistence httpOperation={basicOperation} />);

    clickSend();

    await screen.findByText('Response');

    expect(container).toHaveTextContent('awesome response, but hardly a json one');
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

  it('when embedded in markdown, shows request codegen', async () => {
    render(<TryItWithPersistence httpOperation={basicOperation} embeddedInMd />);

    const requestSamplePanel = await screen.findByText('Request Sample: Shell / cURL');
    expect(requestSamplePanel).toBeVisible();
  });

  describe('Credentials policy', () => {
    it('sets credentials correctly', async () => {
      render(<TryItWithPersistence httpOperation={basicOperation} tryItCredentialsPolicy="same-origin" />);

      const button = screen.getByRole('button', { name: /send/i });
      userEvent.click(button);

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());
      const requestInit = fetchMock.mock.calls[0][1]!;
      expect(requestInit.credentials).toEqual('same-origin');
    });

    it('use `omit` as default credentials policy', async () => {
      render(<TryItWithPersistence httpOperation={basicOperation} />);

      const button = screen.getByRole('button', { name: /send/i });
      userEvent.click(button);

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());
      const requestInit = fetchMock.mock.calls[0][1]!;
      expect(requestInit.credentials).toEqual('omit');
    });
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

    describe('Sorts parameters alphabetically', () => {
      it('by type and put required one on top for each type', () => {
        const names = [
          'todoId*',
          'anotherId',
          'bAnotherId',
          'limit*',
          'super_duper_long_parameter_name_with_unnecessary_text*',
          'completed',
          'items',
          'optional_value_with_default',
          'type',
          'value',
          'message-id*',
          'account-id',
          'b-account-id',
        ];
        render(<TryItWithPersistence httpOperation={sortedParameters} />);

        const params = screen.queryAllByTestId('param-label').map(element => element.textContent);
        expect(params).toEqual(names);
      });
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
      expect(limitField).toHaveTextContent('select an option');

      const typeField = screen.getByLabelText('type');
      expect(typeField).toHaveTextContent('something');

      const optionalWithDefaultField = screen.getByLabelText('optional_value_with_default') as HTMLInputElement;
      expect(optionalWithDefaultField).toHaveValue('');
      expect(optionalWithDefaultField.placeholder).toBe('example: some default value');

      const valueField = screen.getByLabelText('value');
      expect(valueField).toHaveTextContent('1');

      // header param

      const accountIdField = screen.getByLabelText('account-id') as HTMLInputElement;
      expect(accountIdField).toHaveValue('example id');
      expect(accountIdField.placeholder).toBe('example: example id');

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
      chooseOption(limitField, '3');

      const typeField = screen.getByLabelText('type');
      chooseOption(typeField, 'another');

      // header param

      const accountIdField = screen.getByLabelText('account-id');
      await userEvent.type(accountIdField, ' 1999');

      const messageIdField = screen.getByLabelText('message-id-select');
      chooseOption(messageIdField, 'example 2');

      // click send
      clickSend();

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());
      const url = new URL(fetchMock.mock.calls[0][0] as string);
      // assert that path params are passed
      expect(url.pathname.endsWith('123'));
      const queryParams = url.searchParams;
      // assert that query params are passed
      expect(queryParams.get('limit')).toBe('3');
      expect(queryParams.get('value')).toBe('1');
      expect(queryParams.get('type')).toBe('another');
      // assert that headers are passed
      const headers = new Headers(fetchMock.mock.calls[0][1]!.headers);
      expect(headers.get('Content-Type')).toBe('application/json');
      expect(headers.get('account-id')).toBe('example id 1999');
      expect(headers.get('message-id')).toBe('another example');
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

      const completedField = screen.getByLabelText('completed');
      expect(completedField).toBeInTheDocument();
    });

    const formDataCases: ReadonlyArray<[string, NewableFunction, IHttpOperation]> = [
      ['application/x-www-form-urlencoded', URLSearchParams, urlEncodedPostOperation],
      ['multipart/form-data', FormData, multipartFormdataOperation],
    ];

    describe.each(formDataCases)('Builds correct %p request', (mimeType, prototype, fixture) => {
      let body: URLSearchParams | FormData;
      let headers: Headers;
      beforeEach(async () => {
        const { getByRole } = render(<TryItWithPersistence httpOperation={fixture} />);

        // path param
        const nameField = getByRole('textbox', { name: 'name' }) as HTMLInputElement;
        await userEvent.type(nameField, 'some-name');

        // click send
        clickSend();

        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
        expect(fetchMock).toHaveBeenCalledTimes(1);
        body = fetchMock.mock.calls[0][1]!.body as URLSearchParams | FormData;
        headers = new Headers(fetchMock.mock.calls[0][1]!.headers);
        expect(body).toBeInstanceOf(prototype);
      });

      it('Sets correct content type', () => {
        expect(headers.get('Content-Type')).toBe(mimeType === 'multipart/form-data' ? null : mimeType);
      });

      it('Sends user input', () => {
        expect(body.get('name')).toBe('some-name');
      });

      it('Includes untouched fields', () => {
        expect(body.get('completed')).toBe('');
      });

      it('Sets untouched required enums to their first value', () => {
        expect(body.get('someRequiredEnum')).toBe('a');
      });
      it('Does not set untouched optional enums', () => {
        expect(body.get('someOptionalEnum')).toBe('');
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
    describe('is attached', () => {
      it('to operation with PATCH method', async () => {
        render(<TryItWithPersistence httpOperation={patchWithRequestBody} />);

        clickSend();

        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
        expect(fetchMock.mock.calls[0]![1]!.body).toEqual(expect.stringMatching(/{.*}/s));
      });
    });

    describe('is not attached', () => {
      it('to operation with HEAD method', async () => {
        render(<TryItWithPersistence httpOperation={headWithRequestBody} />);

        clickSend();

        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
        expect(typeof fetchMock.mock.calls[0]![1]!.body).not.toBe('string');
      });
    });

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

        expect(JSON.parse(screen.getByRole('textbox').textContent || '')).toEqual({ name: 'string', age: 0 });
      });

      it('does not generate request body from schema when schema is empty', () => {
        render(<TryItWithPersistence httpOperation={requestBodyEmptySchema} />);

        let bodyHeader = screen.queryByText('Body');
        expect(bodyHeader).toBeInTheDocument();

        expect(screen.getByRole('textbox')).toHaveTextContent('');
      });
    });

    describe('when there are request body examples', () => {
      let examplesItems = ['example-1', 'named example', 'example-3'];

      it("is populated to first example if there's one", () => {
        render(<TryItWithPersistence httpOperation={examplesRequestBody} />);
        expect(JSON.parse(screen.getByRole('textbox').textContent || '')).toEqual({
          name: 'Andrew',
          age: 19,
          trial: true,
        });
      });

      it('resets the textbox after httpOperation change', async () => {
        const { rerender } = render(<TryItWithPersistence httpOperation={examplesRequestBody} />);
        const textbox = screen.getByRole('textbox');
        userEvent.type(textbox, 'asd');
        rerender(<TryItWithPersistence httpOperation={requestBody} />);
        await waitFor(() =>
          expect(JSON.parse(screen.getByRole('textbox').textContent || '')).toEqual({
            name: 'string',
            age: 0,
          }),
        );
      });

      it('allows users to choose request body examples from spec using dropdown menu', () => {
        render(<TryItWithPersistence httpOperation={examplesRequestBody} />);
        let examplesButton = screen.getByRole('button', { name: 'Examples' });
        userEvent.click(examplesButton);

        let examples = screen.getAllByRole('menuitem').map(el => el.textContent);
        expect(examples).toEqual(examplesItems);

        userEvent.click(screen.getByRole('menuitem', { name: 'named example' }));
        expect(JSON.parse(screen.getByRole('textbox').textContent || '')).toEqual({
          name: 'Jane',
          age: 36,
          trial: false,
        });
      });

      it('restarts modified example in CodeEditor to initial value after choosing it again', () => {
        render(<TryItWithPersistence httpOperation={examplesRequestBody} />);
        let examplesButton = screen.getByRole('button', { name: 'Examples' });

        const bodyTextBox = screen.getByRole('textbox');

        userEvent.type(bodyTextBox, 'I broke the test. Oh noooo... :(');
        expect(bodyTextBox).toHaveTextContent('I broke the test. Oh noooo... :(');

        userEvent.click(examplesButton);
        userEvent.click(screen.getByRole('menuitem', { name: 'example-1' }));
        expect(JSON.parse(screen.getByRole('textbox').textContent || '')).toEqual({
          name: 'Andrew',
          age: 19,
          trial: true,
        });
      });

      it('sends a request with request body from example', async () => {
        const json = {
          name: 'Andrew',
          age: 19,
          trial: true,
        };

        render(<TryItWithPersistence httpOperation={examplesRequestBody} />);

        expect(JSON.parse(screen.getByRole('textbox').textContent || '')).toEqual(json);

        clickSend();

        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
        expect(JSON.parse(fetchMock.mock.calls[0]![1]!.body as string)).toEqual(json);
      });
    });

    describe('when there is only one example provided', () => {
      it('displays that only example body', () => {
        render(<TryItWithPersistence httpOperation={singleExampleRequestBody} />);
        expect(JSON.parse(screen.getByRole('textbox').textContent || '')).toEqual({
          name: 'Andrew',
          age: 19,
          trial: true,
        });
      });

      it('does not display select to choose examples', () => {
        render(<TryItWithPersistence httpOperation={singleExampleRequestBody} />);

        let examplesButton = screen.queryByRole('button', { name: 'Examples' });

        expect(examplesButton).not.toBeInTheDocument();
      });
    });
  });

  describe('Mocking', () => {
    it('Shows mock button', () => {
      render(<TryItWithPersistence httpOperation={basicOperation} mockUrl="https://mock-todos.stoplight.io" />);

      const mockingButton = screen.getByRole('button', { name: /mocking/i });
      expect(mockingButton).toBeInTheDocument();
    });

    it('Invokes request with mocked data', async () => {
      render(<TryItWithPersistence httpOperation={basicOperation} mockUrl="https://mock-todos.stoplight.io" />);

      const mockingButton = screen.getByRole('button', { name: /mocking/i });

      userEvent.click(mockingButton);

      // enable mocking
      let enableItem = await screen.getByRole('menuitemcheckbox', { name: 'Enabled' });
      expect(enableItem).toBeInTheDocument();
      userEvent.click(enableItem);

      // set response code
      const responseCodeItem = await screen.getByRole('menuitemcheckbox', { name: '200' });
      expect(responseCodeItem).toBeInTheDocument();
      userEvent.click(responseCodeItem);

      // and send
      clickSend();

      await waitFor(() => expect(screen.getByRole('button', { name: /send/i })).toBeEnabled());

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

      // disable mocking and send
      userEvent.click(mockingButton);
      enableItem = await screen.getByRole('menuitemcheckbox', { name: /enabled/i });
      userEvent.click(enableItem);

      clickSend();
      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock.mock.calls).toEqual([
        [
          'https://mock-todos.stoplight.io/todos',
          expect.objectContaining({
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Prefer: 'code=200',
            },
          }),
        ],
        [
          'https://todos.stoplight.io/todos',
          expect.objectContaining({
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }),
        ],
      ]);
    });

    it('Invokes request with no Prefer header if mock data is not selected', async () => {
      render(<TryItWithPersistence httpOperation={basicOperation} mockUrl="https://mock-todos.stoplight.io" />);

      const mockingButton = screen.getByRole('button', { name: /mocking/i });

      userEvent.click(mockingButton);

      let enableItem = await screen.getByRole('menuitemcheckbox', { name: 'Enabled' });
      expect(enableItem).toBeInTheDocument();
      userEvent.click(enableItem);

      clickSend();

      await waitFor(() => expect(screen.getByRole('button', { name: /send/i })).toBeEnabled());

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

      expect(fetchMock.mock.calls).toEqual([
        [
          'https://mock-todos.stoplight.io/todos',
          expect.objectContaining({
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }),
        ],
      ]);
    });

    it('Persists mocking options between operations', async () => {
      const { rerender } = render(
        <MosaicProvider>
          <PersistenceContextProvider>
            <TryIt httpOperation={putOperation} mockUrl="https://mock-todos.stoplight.io" />
          </PersistenceContextProvider>
        </MosaicProvider>,
      );

      // enable mocking
      const mockingButton = screen.getByRole('button', { name: /mocking/i });
      userEvent.click(mockingButton);

      // enable mocking
      let enableItem = await screen.getByRole('menuitemcheckbox', { name: 'Enabled' });
      expect(enableItem).toBeInTheDocument();
      userEvent.click(enableItem);

      // set response code
      const responseCodeItem = await screen.getByRole('menuitemcheckbox', { name: '200' });
      expect(responseCodeItem).toBeInTheDocument();
      userEvent.click(responseCodeItem);

      // and send
      clickSend();

      // unmount (to make sure parameters are not simply stored in component state)
      rerender(
        <MosaicProvider>
          <PersistenceContextProvider>
            <div />
          </PersistenceContextProvider>
        </MosaicProvider>,
      );

      // mount a different instance

      rerender(
        <MosaicProvider>
          <PersistenceContextProvider>
            <TryIt httpOperation={basicOperation} mockUrl="https://mock-todos.stoplight.io" />
          </PersistenceContextProvider>
        </MosaicProvider>,
      );

      clickSend();
      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      expect(fetchMock).toBeCalledWith(
        'https://mock-todos.stoplight.io/todos',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Prefer: 'code=200',
          },
        }),
      );
    });
  });

  describe('Authentication', () => {
    describe('Panel', () => {
      it('is displayed if operation has a security', () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        let authPanel = screen.getByText('Auth');
        expect(authPanel).toBeInTheDocument();
      });

      it('does not crash when operation security section is an empty array', () => {
        render(<TryItWithPersistence httpOperation={emptySecurityOperation} />);

        let authPanel = screen.queryByText('Auth');
        expect(authPanel).not.toBeInTheDocument();
      });

      it("does not show up the Security Schemes select if there's only one schema", () => {
        render(<TryItWithPersistence httpOperation={singleSecurityOperation} />);

        let securitySchemesMenu = screen.queryByText('Security Schemes');
        expect(securitySchemesMenu).not.toBeInTheDocument();
      });

      it('allows to select a security schemes from dropdown menu', () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        const securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);

        const securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'OAuth 2.0' });
        userEvent.click(securitySchemes);

        expect(securitySchemesButton).toHaveTextContent('OAuth 2.0');
      });

      it('preserves state when changing schemes', async () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        let APIKeyField = screen.getByLabelText('API Key');
        await userEvent.type(APIKeyField, '123');

        // switch to OAuth
        let securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);

        let securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'OAuth 2.0' });
        userEvent.click(securitySchemes);

        // switch back to API Key
        userEvent.click(securitySchemesButton);

        securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'API Key' });
        userEvent.click(securitySchemes);

        APIKeyField = screen.getByLabelText('API Key');
        expect(APIKeyField).toHaveValue('123');
      });

      it('preserves the state when rerendering component', async () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        let APIKeyField = screen.getByLabelText('API Key');
        await userEvent.type(APIKeyField, '123');

        cleanup();

        render(<TryItWithPersistence httpOperation={putOperation} />);

        APIKeyField = screen.getByLabelText('API Key');
        expect(APIKeyField).toHaveValue('123');
      });
    });

    describe('API Key component', () => {
      it('is displayed for security of that type', () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        const APIKeyName = screen.getByLabelText('API Key');
        expect(APIKeyName).toBeInTheDocument();
      });
      it('removes duplicated parameters', () => {
        render(<TryItWithPersistence httpOperation={duplicatedSecurityScheme} />);

        // check if query param with the same name as security is removed from OperationParameters (case insensitive)
        const queryParam = screen.queryByLabelText('api-key');
        expect(queryParam).not.toBeInTheDocument();

        // check if header with the same name as security is removed from OperationParameters (case insensitive)
        const header = screen.queryByLabelText('Api-KeY');
        expect(header).not.toBeInTheDocument();
      });

      it('attaches auth token as a query parameter', async () => {
        render(<TryItWithPersistence httpOperation={duplicatedSecurityScheme} />);

        const APIKeyField = screen.getByLabelText('API-Key');
        await userEvent.type(APIKeyField, '123');

        // click send
        clickSend();

        await waitFor(() => expect(fetchMock).toHaveBeenCalled());

        const url = new URL(fetchMock.mock.calls[0][0] as string);
        const queryParams = url.searchParams;
        const headers = new Headers(fetchMock.mock.calls[0][1]!.headers);

        // assert that query params are passed
        expect(queryParams.get('API-Key')).toBe('123');

        // make sure we don't attach security duplicated in Operation Parameters
        expect(queryParams.get('api-key')).toBeNull();
        expect(headers.get('Api-KeY')).toBeNull();
      });

      it('attaches auth token as a header', async () => {
        render(<TryItWithPersistence httpOperation={singleSecurityOperation} />);

        const APIKeyField = screen.getByLabelText('API-Key');
        await userEvent.type(APIKeyField, '123');

        // click send
        clickSend();

        await waitFor(() => expect(fetchMock).toHaveBeenCalled());

        const headers = new Headers(fetchMock.mock.calls[0][1]!.headers);
        expect(headers.get('API-Key')).toBe('123');
      });
    });

    describe('OAuth2 Component', () => {
      it('allows to send a OAuth2 request', async () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        const securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);

        const securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'OAuth 2.0' });
        userEvent.click(securitySchemes);

        const tokenInput = screen.getByLabelText('Token');

        await userEvent.type(tokenInput, 'Bearer 0a1b2c');

        const todoIdField = screen.getByLabelText('todoId');
        await userEvent.type(todoIdField, '123');

        clickSend();

        await waitFor(() => expect(fetchMock).toHaveBeenCalled());

        const headers = new Headers(fetchMock.mock.calls[0][1]!.headers);
        expect(headers.get('Authorization')).toBe('Bearer 0a1b2c');
      });

      it('does not include header parameters conflicting with OAuth2 scheme', async () => {
        render(<TryItWithPersistence httpOperation={duplicatedSecurityScheme} />);

        const header = screen.queryByLabelText('authorization');
        expect(header).not.toBeInTheDocument();
      });
    });

    describe('Basic Auth Component', () => {
      it('allows to send a Basic Auth request', async () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        const securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);

        const securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'Basic Auth (basicKey)' });
        userEvent.click(securitySchemes);

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');

        await userEvent.type(usernameInput, 'user');
        await userEvent.type(passwordInput, 'password');

        const todoIdField = screen.getByLabelText('todoId');
        await userEvent.type(todoIdField, '123');

        clickSend();

        await waitFor(() => expect(fetchMock).toHaveBeenCalled());

        const headers = new Headers(fetchMock.mock.calls[0][1]!.headers);
        expect(headers.get('Authorization')).toBe('Basic dXNlcjpwYXNzd29yZA==');
      });
    });

    describe('Bearer Auth Component', () => {
      it('allows to send a Bearer Auth request', async () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        const securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);

        const securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'Bearer Auth (bearerKey)' });
        userEvent.click(securitySchemes);

        const tokenInput = screen.getByLabelText('Token');

        await userEvent.type(tokenInput, '0a1b2c');

        const todoIdField = screen.getByLabelText('todoId');
        await userEvent.type(todoIdField, '123');

        clickSend();

        await waitFor(() => expect(fetchMock).toHaveBeenCalled());

        const headers = new Headers(fetchMock.mock.calls[0][1]!.headers);
        expect(headers.get('Authorization')).toBe('Bearer 0a1b2c');
      });
    });

    describe('Digest Auth Component', () => {
      it('allows to send a Digest Auth request', async () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        const securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);

        const securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'Digest Auth (digest)' });
        userEvent.click(securitySchemes);

        const authInput = screen.getByLabelText('Authorization');

        const digestContent = `Digest username="Mufasa",
            realm="testrealm@host.com",
            nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
            uri="/dir/index.html",
            qop=auth,
            nc=00000001,
            cnonce="0a4f113b",
            response="6629fae49393a05397450978507c4ef1",
            opaque="5ccc069c403ebaf9f0171e9517f40e41"
        `;

        const expectedDigestContent = `Digest username="Mufasa", realm="testrealm@host.com", nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093", uri="/dir/index.html", qop=auth, nc=00000001, cnonce="0a4f113b", response="6629fae49393a05397450978507c4ef1", opaque="5ccc069c403ebaf9f0171e9517f40e41"`;

        await userEvent.type(authInput, digestContent);

        const todoIdField = screen.getByLabelText('todoId');
        await userEvent.type(todoIdField, '123');

        clickSend();

        await waitFor(() => expect(fetchMock).toHaveBeenCalled());

        const headers = new Headers(fetchMock.mock.calls[0][1]!.headers);
        expect(headers.get('Authorization')).toBe(expectedDigestContent);
      });
    });
  });

  describe('Ref resolving', () => {
    it('generates sample body from refed parameter', async () => {
      render(
        <InlineRefResolverProvider document={referencedBody}>
          <TryItWithPersistence httpOperation={referencedBody} />
        </InlineRefResolverProvider>,
      );

      clickSend();

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());
      expect(JSON.parse(fetchMock.mock.calls[0]![1]!.body as string)).toEqual({ name: 'string', completed: true });
    });
  });

  describe('Multiple Servers', () => {
    it('shows select if there is more than one server available', () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      const serversSelect = screen.queryByLabelText('Servers');

      expect(serversSelect).toHaveTextContent('Server 1');
    });

    it('allows to choose other server', async () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      let serversSelect = await screen.findByLabelText('Servers');

      chooseOption(serversSelect, 'Development');

      serversSelect = await screen.findByLabelText('Servers');

      expect(serversSelect).toHaveTextContent('Development');
    });

    it('sends request to a chosen server url', async () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      const serversSelect = await screen.findByLabelText('Servers');

      chooseOption(serversSelect, 'Development');

      const todoIdField = screen.getByLabelText('todoId');
      await userEvent.type(todoIdField, '123');

      clickSend();

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      expect(fetchMock.mock.calls[0][0]).toContain('https://todos-dev.stoplight.io');
    });
  });

  describe('Validation', () => {
    it('does not show a warning message before sending the request', () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      expect(screen.queryByText("You didn't provide all of the required parameters!")).not.toBeInTheDocument();
    });

    it('shows a warning message if at least one parameter is required but empty', () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      clickSend();

      expect(screen.queryByText("You didn't provide all of the required parameters!")).toBeInTheDocument();
    });

    it('does not send a request if at least one parameter is required but empty', async () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      clickSend();

      // Fetching is called asynchronously, so I am waiting for it
      // to be actually called. Without that the test always passes.
      await Promise.resolve();

      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('does not show the message if required parameters are not empty', async () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      const todoIdField = screen.getByLabelText('todoId');
      await userEvent.type(todoIdField, '123');

      clickSend();

      expect(screen.queryByText("You didn't provide all of the required parameters!")).not.toBeInTheDocument();
    });
  });
});

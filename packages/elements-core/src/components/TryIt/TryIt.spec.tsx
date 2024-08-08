import '@testing-library/jest-dom';

import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { HttpParamStyles, IHttpOperation } from '@stoplight/types';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
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
import { httpOperation as basicSecurityOperation } from '../../__fixtures__/operations/security-basic';
import { httpOperation as bearerSecurityOperation } from '../../__fixtures__/operations/security-bearer';
import { operation as basicOperation } from '../../__fixtures__/operations/simple-get';
import { httpOperation as stringNumericEnumOperation } from '../../__fixtures__/operations/string-numeric-enums';
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
    expect(headers.get('Content-Type')).toBe(null);
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
          'default_style_items',
          'items',
          'items_not_exploded',
          'items_pipes',
          'items_pipes_not_exploded',
          'items_spaces',
          'items_spaces_not_exploded',
          'nested',
          'nested_not_exploded',
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
      expect(completedField).toHaveTextContent('select an option');

      // query params
      const limitField = screen.getByLabelText('limit');
      expect(limitField).toHaveTextContent('select an option (defaults to: 1)');

      const typeField = screen.getByLabelText('type');
      expect(typeField).toHaveTextContent('something');

      const optionalWithDefaultField = screen.getByLabelText('optional_value_with_default') as HTMLInputElement;
      expect(optionalWithDefaultField).toHaveValue('');
      expect(optionalWithDefaultField.placeholder).toBe('defaults to: some default value');

      const valueField = screen.getByLabelText('value');
      expect(valueField).toHaveTextContent('1');

      // header param

      const accountIdField = screen.getByLabelText('account-id') as HTMLInputElement;
      expect(accountIdField).toHaveValue('account-id-default');
      expect(accountIdField.placeholder).toBe('defaults to: account-id-default');

      const messageIdField = screen.getByLabelText('message-id');
      expect(messageIdField).toHaveValue('example value');
    });

    it('Passes all parameters to the request', async () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      // path param
      const todoIdField = screen.getByLabelText('todoId');
      userEvent.type(todoIdField, '123');

      // query params
      const limitField = screen.getByLabelText('limit');
      chooseOption(limitField, '3');

      const typeField = screen.getByLabelText('type');
      chooseOption(typeField, 'another');

      const pairsField = screen.getByLabelText('pairs');
      userEvent.type(pairsField, '{ "nestedKey": "nestedValue" }');

      const itemsField = screen.getByLabelText('items');
      userEvent.type(itemsField, '["first", "second"]');

      // header param

      const accountIdField = screen.getByLabelText('account-id');
      userEvent.type(accountIdField, ' 1999');

      const messageIdField = screen.getByLabelText('message-id-select');
      chooseOption(messageIdField, 'example 2');

      const quoteField = screen.getByLabelText('quote-select');
      chooseOption(quoteField, 'quote');

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
      expect(queryParams.get('optional_value_with_default')).toBeNull();
      expect(queryParams.get('nestedKey')).toBe('nestedValue');
      expect(queryParams.get('pairs')).toBeNull();
      expect(queryParams.getAll('items')).toEqual(['first', 'second']);
      // assert that headers are passed
      const headers = new Headers(fetchMock.mock.calls[0][1]!.headers);
      expect(headers.get('Content-Type')).toBe('application/json');
      expect(headers.get('account-id')).toBe('account-id-default 1999');
      expect(headers.get('message-id')).toBe('another example');
      expect(headers.get('optional_header')).toBeNull();

      // assert that quote is escaped
      expect(headers.get('quote')).toBe('\\"');
    });

    it('Persists parameter values between operations', async () => {
      const { rerender } = render(
        <PersistenceContextProvider>
          <TryIt httpOperation={putOperation} />
        </PersistenceContextProvider>,
      );

      // fill path param
      const todoIdField = screen.getByLabelText('todoId');
      userEvent.type(todoIdField, '123');

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
            id: '?http-server?',
            url: 'https://todos.stoplight.io',
          },
        ],
        request: {
          path: [
            {
              id: '?http-path-param-todoId?',
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

    it('Persists string enum types', () => {
      render(<TryItWithPersistence httpOperation={stringNumericEnumOperation} />);

      const cycleField = screen.getByLabelText('cycle');
      expect(cycleField).toHaveTextContent('00');

      userEvent.click(cycleField);

      userEvent.click(screen.getByRole('option', { name: '06' }));
      expect(cycleField).toHaveTextContent('06');
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

    it('allows to omit empty value', async () => {
      render(<TryItWithPersistence httpOperation={multipartFormdataOperation} />);

      const ageField = screen.getByRole('textbox', { name: 'age' }) as HTMLInputElement;
      await userEvent.type(ageField, '12');

      const checkboxName = screen.getByRole('checkbox', { name: 'age-checkbox' }) as HTMLInputElement;
      await userEvent.click(checkboxName);

      clickSend();
      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      const body = fetchMock.mock.calls[0][1]!.body as FormData;
      expect(body.has('age')).toBe(false);
      expect(body.has('name')).toBe(true);
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
        userEvent.type(nameField, 'some-name');

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

      const serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      expect(screen.getByRole('menuitemradio', { name: /mock server/i })).toBeInTheDocument();
    });

    it('Invokes request with mocked data', async () => {
      render(<TryItWithPersistence httpOperation={basicOperation} mockUrl="https://mock-todos.stoplight.io" />);

      let serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      // select mock server
      let enableItem = screen.getByRole('menuitemradio', { name: /mock server/i });
      userEvent.click(enableItem);

      // open mock dropdown
      const mockButton = screen.getByRole('button', { name: /mock settings/i });
      userEvent.click(mockButton);

      // set response code
      const responseCodeItem = await screen.getByRole('menuitemcheckbox', { name: '200' });
      expect(responseCodeItem).toBeInTheDocument();
      userEvent.click(responseCodeItem);

      // and send
      clickSend();

      await waitFor(() => expect(screen.getByRole('button', { name: /send/i })).toBeEnabled());

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

      // select regular server and send
      userEvent.click(serversButton);
      let server1 = screen.getByRole('menuitemradio', { name: /live server/i });
      userEvent.click(server1);

      clickSend();
      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock.mock.calls).toEqual([
        [
          'https://mock-todos.stoplight.io/todos',
          expect.objectContaining({
            method: 'GET',
            headers: {
              Prefer: 'code=200',
            },
          }),
        ],
        [
          'https://todos.stoplight.io/todos',
          expect.objectContaining({
            method: 'GET',
            headers: {},
          }),
        ],
      ]);
    });

    it('Invokes request with no Prefer header if mock data is not selected', async () => {
      render(<TryItWithPersistence httpOperation={basicOperation} mockUrl="https://mock-todos.stoplight.io" />);

      let serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      // select mock server
      let enableItem = screen.getByRole('menuitemradio', { name: /mock server/i });
      userEvent.click(enableItem);

      clickSend();

      await waitFor(() => expect(screen.getByRole('button', { name: /send/i })).toBeEnabled());

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

      expect(fetchMock.mock.calls).toEqual([
        [
          'https://mock-todos.stoplight.io/todos',
          expect.objectContaining({
            method: 'GET',
            headers: {},
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

      let serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      // select mock server
      let enableItem = screen.getByRole('menuitemradio', { name: /mock server/i });
      userEvent.click(enableItem);

      // open mock dropdown
      const mockButton = screen.getByRole('button', { name: /mock settings/i });
      userEvent.click(mockButton);

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
        expect(authPanel).toBeInTheDocument();

        let noAuthCount = screen.getAllByText('No auth selected').length;
        expect(noAuthCount).toBe(1);
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

        const securitySchemes = screen.getAllByRole('menuitemcheckbox', { name: 'OAuth 2.0' })[0];
        userEvent.click(securitySchemes);

        expect(securitySchemesButton).toHaveTextContent('OAuth 2.0');
      });

      it('preserves state when changing schemes', async () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        let APIKeyField = screen.getByLabelText('API Key');
        userEvent.type(APIKeyField, '123');

        // switch to OAuth
        let securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);

        let securitySchemes = screen.getAllByRole('menuitemcheckbox', { name: 'OAuth 2.0' })[0];
        userEvent.click(securitySchemes);

        // switch back to API Key
        userEvent.click(securitySchemesButton);

        securitySchemes = screen.getAllByRole('menuitemcheckbox', { name: 'API Key (api_key)' })[0];
        userEvent.click(securitySchemes);

        APIKeyField = screen.getByLabelText('API Key');
        expect(APIKeyField).toHaveValue('123');
      });

      it('preserves the state when rerendering component', async () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        let APIKeyField = screen.getByLabelText('API Key');
        userEvent.type(APIKeyField, '123');

        cleanup();

        render(<TryItWithPersistence httpOperation={putOperation} />);

        APIKeyField = screen.getByLabelText('API Key');
        expect(APIKeyField).toHaveValue('123');
      });

      it('invalidated unsupported security schemes between different operations', () => {
        const { rerender } = render(<TryItWithPersistence httpOperation={basicSecurityOperation} />);

        let usernameInput = screen.getByLabelText('Username');
        let passwordInput = screen.getByLabelText('Password');

        userEvent.type(usernameInput, 'user');
        userEvent.type(passwordInput, 'password');

        rerender(<TryItWithPersistence httpOperation={bearerSecurityOperation} />);

        const tokenInput = screen.getByLabelText('Token');
        userEvent.type(tokenInput, 'Bearer 1234');

        rerender(<TryItWithPersistence httpOperation={basicSecurityOperation} />);

        usernameInput = screen.getByLabelText('Username');
        passwordInput = screen.getByLabelText('Password');

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
      });

      it('keep security schemes between different operations', () => {
        const { rerender } = render(<TryItWithPersistence httpOperation={basicSecurityOperation} />);

        let usernameInput = screen.getByLabelText('Username');
        let passwordInput = screen.getByLabelText('Password');

        userEvent.type(usernameInput, 'user');
        userEvent.type(passwordInput, 'password');

        rerender(<TryItWithPersistence httpOperation={putOperation} />);

        usernameInput = screen.getByLabelText('Username');
        passwordInput = screen.getByLabelText('Password');

        expect(usernameInput).toHaveValue('user');
        expect(passwordInput).toHaveValue('password');
      });

      it('adds key value to menu items if multiple schemes of same security type', () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        let securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);

        let securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'API Key (api_key)' });
        userEvent.click(securitySchemes);

        // switch back to API Key
        userEvent.click(securitySchemesButton);

        securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'API Key (api_key2)' });
        userEvent.click(securitySchemes);
      });

      it('keeps distinct values for multiple schemes of same security type', () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        // Fill in 123 for API Key 1
        let APIKeyField = screen.getByLabelText('API Key');
        userEvent.type(APIKeyField, '123');

        // Fill in 456 for API Key 2
        let securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);
        let securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'API Key (api_key2)' });
        userEvent.click(securitySchemes);
        APIKeyField = screen.getByLabelText('API Key 2');
        userEvent.type(APIKeyField, '456');

        // switch back to API Key 1 confirm still 123
        userEvent.click(securitySchemesButton);
        securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'API Key (api_key)' });
        userEvent.click(securitySchemes);
        APIKeyField = screen.getByLabelText('API Key');
        expect(APIKeyField).toHaveValue('123');

        // switch back to API Key 2 confirm still 456
        userEvent.click(securitySchemesButton);
        securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'API Key (api_key2)' });
        userEvent.click(securitySchemes);
        APIKeyField = screen.getByLabelText('API Key 2');
        expect(APIKeyField).toHaveValue('456');
      });

      it('renders AND security correctly in menu item list, retaining values through rerender', () => {
        const { rerender } = render(<TryItWithPersistence httpOperation={putOperation} />);

        // Select AND security from menu
        let securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);
        let securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'API Key & Basic Auth' });
        userEvent.click(securitySchemes);

        // Fill in a value from each scheme
        let APIKeyField = screen.getByLabelText('API Key 2');
        userEvent.type(APIKeyField, '123');

        let usernameInput = screen.getByLabelText('Username');
        userEvent.type(usernameInput, 'user');

        // Rerender and confirm values
        rerender(<TryItWithPersistence httpOperation={putOperation} />);

        APIKeyField = screen.getByLabelText('API Key 2');
        usernameInput = screen.getByLabelText('Username');

        expect(usernameInput).toHaveValue('user');
        expect(APIKeyField).toHaveValue('123');
      });

      it('renders None in the menu if a Optional security auth {} is presented', () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        let securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);

        let securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'None' });
        userEvent.click(securitySchemes);
      });

      it('display No auth selected if user chooses None in the menu', () => {
        render(<TryItWithPersistence httpOperation={putOperation} />);

        let securitySchemesButton = screen.getByLabelText('security-schemes');
        userEvent.click(securitySchemesButton);

        let securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'OpenID Connect' });
        userEvent.click(securitySchemes);
        let noAuth = screen.queryByText('No auth selected');
        expect(noAuth).toBe(null);

        userEvent.click(securitySchemesButton);
        securitySchemes = screen.getByRole('menuitemcheckbox', { name: 'None' });
        userEvent.click(securitySchemes);
        let noAuthCount = screen.getAllByText('No auth selected').length;
        expect(noAuthCount).toBe(1);
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
        userEvent.type(APIKeyField, '123');

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
        userEvent.type(APIKeyField, '123');

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

        const securitySchemes = screen.getAllByRole('menuitemcheckbox', { name: 'OAuth 2.0' })[0];
        userEvent.click(securitySchemes);

        const tokenInput = screen.getByLabelText('Token');

        userEvent.type(tokenInput, 'Bearer 0a1b2c');

        const todoIdField = screen.getByLabelText('todoId');
        userEvent.type(todoIdField, '123');

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

        userEvent.type(usernameInput, 'user');
        userEvent.type(passwordInput, 'password');

        const todoIdField = screen.getByLabelText('todoId');
        userEvent.type(todoIdField, '123');

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

        userEvent.type(tokenInput, '0a1b2c');

        const todoIdField = screen.getByLabelText('todoId');
        userEvent.type(todoIdField, '123');

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

        userEvent.type(authInput, digestContent);

        const todoIdField = screen.getByLabelText('todoId');
        userEvent.type(todoIdField, '123');

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

      const serversButton = screen.getByRole('button', { name: /server/i });

      expect(serversButton).toHaveTextContent('Server 1');
    });

    it('allows to choose other server', async () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      const serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      const enableItem = screen.getByRole('menuitemradio', { name: /development/i });
      userEvent.click(enableItem);

      expect(serversButton).toHaveTextContent('Development');
    });

    it('shows server variables', async () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      const serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      const enableItem = screen.getByRole('menuitemradio', { name: /pr/i });
      userEvent.click(enableItem);

      expect(serversButton).toHaveTextContent('PR');

      const protoField = screen.getByLabelText('proto');
      expect(protoField).toBeInTheDocument();

      const prField = screen.getByLabelText('pr');
      expect(prField).toBeInTheDocument();
    });

    it('sends request to a chosen server url', async () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      const serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      const enableItem = screen.getByRole('menuitemradio', { name: /development/i });
      userEvent.click(enableItem);

      const todoIdField = screen.getByLabelText('todoId');
      userEvent.type(todoIdField, '123');

      clickSend();

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      expect(fetchMock.mock.calls[0][0]).toContain('https://todos-dev.stoplight.io');
    });

    it('sends a request using server variable default values', async () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      const serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      const enableItem = screen.getByRole('menuitemradio', { name: /pr/i });
      userEvent.click(enableItem);

      expect(serversButton).toHaveTextContent('PR');

      const todoIdField = screen.getByLabelText('todoId');
      userEvent.type(todoIdField, '123');

      clickSend();

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      expect(fetchMock.mock.calls[0][0]).toContain('http://x-1000.todos-pr.stoplight.io');
    });

    it('sends a request using server variable modified values', async () => {
      render(<TryItWithPersistence httpOperation={putOperation} />);

      const serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      const enableItem = screen.getByRole('menuitemradio', { name: /pr/i });
      userEvent.click(enableItem);

      expect(serversButton).toHaveTextContent('PR');

      const todoIdField = screen.getByLabelText('todoId');
      userEvent.type(todoIdField, '123');

      const prField = screen.getByLabelText('pr');
      userEvent.type(prField, '123');

      const protoField = screen.getByLabelText('proto');
      chooseOption(protoField, 'https');

      clickSend();

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      expect(fetchMock.mock.calls[0][0]).toContain('https://x-123.todos-pr.stoplight.io');
      fetchMock.mockClear();

      userEvent.clear(prField);
      clickSend();

      await waitFor(() => expect(fetchMock).toHaveBeenCalled());

      expect(fetchMock.mock.calls[0][0]).toContain('https://x-1000.todos-pr.stoplight.io');
    });

    it('Persists chosen server between renders of different operations if URL is the same', async () => {
      const operation1: IHttpOperation = {
        ...basicOperation,
        servers: [
          { id: '?http-server-a?', description: 'op 1 server a', url: 'http://url-A.com' },
          { id: '?http-server-b?', description: 'op 1 server b', url: 'http://url-B.com' },
          { id: '?http-server-c?', description: 'op 1 server c', url: 'http://url-C.com' },
        ],
      };

      const operation2: IHttpOperation = {
        ...basicOperation,
        servers: [
          { id: '?http-server-d?', description: 'op 2 server d', url: 'http://url-D.com' },
          { id: '?http-server-e?', description: 'op 2 server e', url: 'http://url-E.com' },
          { id: '?http-server-f?', description: 'op 2 server b', url: 'http://url-B.com' }, // same URL, should preserve this server
        ],
      };

      const { rerender } = render(
        <MosaicProvider>
          <PersistenceContextProvider>
            <TryIt httpOperation={operation1} />
          </PersistenceContextProvider>
        </MosaicProvider>,
      );

      let serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      // select server b
      let enableItem = screen.getByRole('menuitemradio', { name: /server b/i });
      userEvent.click(enableItem);

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
            <TryIt httpOperation={operation2} />
          </PersistenceContextProvider>
        </MosaicProvider>,
      );

      // should still have server b selected since URLs match up
      expect(screen.getByRole('button', { name: /server/i })).toHaveTextContent('op 2 server b');
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
      userEvent.type(todoIdField, '123');

      clickSend();

      await waitFor(() =>
        expect(screen.queryByText("You didn't provide all of the required parameters!")).not.toBeInTheDocument(),
      );
    });
  });
});

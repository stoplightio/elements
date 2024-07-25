import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { httpOperation as putTodosOperation } from '../../__fixtures__/operations/put-todos';
import { operationWithUrlVariables } from '../../__fixtures__/operations/with-url-variables';
import { withPersistenceBoundary } from '../../context/Persistence';
import { withMosaicProvider } from '../../hoc/withMosaicProvider';
import { chooseOption } from '../../utils/tests/chooseOption';
import { TryItWithRequestSamples as RawComponent } from './TryItWithRequestSamples';

const TryItWithRequestSamples = withMosaicProvider(withPersistenceBoundary(RawComponent));

describe('TryItWithRequestSamples', () => {
  it('displays RequestSamples and TryIt', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);

    expect(await screen.findByText('Request Sample: Shell / cURL')).toBeVisible();
    expect(await screen.findByRole('button', { name: /Send API Request/i })).toBeVisible();

    const codeViewer = await screen.findByLabelText(/curl/);
    expect(codeViewer).toHaveTextContent(/PUT/i);
  });

  it('RequestSamples hidden', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} hideSamples={true} />);

    await waitFor(() => expect(screen.queryByText('Request Sample: Shell / cURL')).not.toBeInTheDocument());
  });

  it('TryIt hidden', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} hideTryIt={true} />);

    await waitFor(() => expect(screen.queryByRole('button', { name: /Send API Request/i })).not.toBeInTheDocument());
  });

  it('reacts to parameter input', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);

    const todoIdField = await screen.findByLabelText('todoId');
    userEvent.type(todoIdField, '123456789');

    const codeViewer = await screen.findByLabelText(/curl/);
    await waitFor(() => expect(codeViewer).toHaveTextContent(/todos\/123456789/));
  });

  it('reacts to mocking', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} mockUrl="https://mock-todos.stoplight.io" />);

    const serversButton = screen.getByRole('button', { name: /server/i });
    act(() => userEvent.click(serversButton));

    // enable mocking
    let enableItem = screen.getByRole('menuitemradio', { name: /mock server/i });
    act(() => userEvent.click(enableItem));

    // open mock dropdown
    const mockButton = screen.getByRole('button', { name: /mock settings/i });
    act(() => userEvent.click(mockButton));

    // set response code
    const responseCodeItem = screen.getByRole('menuitemcheckbox', { name: '200' });
    act(() => userEvent.click(responseCodeItem));

    const codeViewer = await screen.findByLabelText(/curl/);
    expect(codeViewer).toHaveTextContent(/https:\/\/mock-todos\.stoplight\.io/);
    expect(codeViewer).toHaveTextContent(/Prefer: code=200/);
  });

  it('includes renders authentication data with suggested value initially', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);

    const codeViewer = await screen.findByLabelText(/curl/);
    await waitFor(() => expect(codeViewer).toHaveTextContent(/&API\+Key=123'/));

    const apiKeyField = await screen.findByLabelText('API Key');
    userEvent.type(apiKeyField, '123456789');

    await waitFor(() => expect(codeViewer).toHaveTextContent(/&API\+Key=123456789'/));

    userEvent.clear(apiKeyField);
    userEvent.type(apiKeyField, '23456789');

    await waitFor(() => expect(codeViewer).toHaveTextContent(/&API\+Key=23456789'/));

    userEvent.clear(apiKeyField);

    await waitFor(() => expect(codeViewer).toHaveTextContent(/&API\+Key=123'/));
  });

  it('displays parameter name for empty path parameter', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);

    const codeViewer = await screen.findByLabelText(/curl/);
    await waitFor(() => expect(codeViewer).toHaveTextContent(/todos\/{todoId}/));
  });

  it('displays base url correctly', async () => {
    render(<TryItWithRequestSamples httpOperation={operationWithUrlVariables} />);

    const codeViewer = await screen.findByLabelText(/curl/);
    expect(codeViewer).toHaveTextContent('ftp://default-namespace.stoplight.io/api/eu/todos');
  });

  it('by default displays 1st server url in request samples', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);

    const codeViewer = await screen.findByLabelText(/curl/);
    expect(codeViewer).toHaveTextContent('https://todos.stoplight.io');
  });

  it('changes request sample when changing server', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);

    const serversButton = screen.getByRole('button', { name: /server/i });
    act(() => userEvent.click(serversButton));

    let enableItem = screen.getByRole('menuitemradio', { name: /development/i });
    act(() => userEvent.click(enableItem));

    const codeViewer = await screen.findByLabelText(/curl/);
    expect(codeViewer).toHaveTextContent('https://todos-dev.stoplight.io');
  });

  it('changes request sample when changing server variables', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);

    const serversButton = screen.getByRole('button', { name: /server/i });
    userEvent.click(serversButton);

    let enableItem = screen.getByRole('menuitemradio', { name: /pr/i });
    userEvent.click(enableItem);

    const protoField = screen.getByLabelText('proto');
    chooseOption(protoField, 'https');

    const prField = screen.getByLabelText('pr');
    userEvent.type(prField, '123');

    const codeViewer = await screen.findByLabelText(/curl/);
    expect(codeViewer).toHaveTextContent('https://x-123.todos-pr.stoplight.io');
  });
});

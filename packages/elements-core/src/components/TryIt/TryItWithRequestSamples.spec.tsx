import { render, screen, waitFor } from '@testing-library/react';
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
  it('displays RequestSamples', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);

    expect(await screen.findByText('Request Sample: Shell / cURL')).toBeVisible();

    const codeViewer = await screen.findByLabelText(/curl/);

    expect(codeViewer).toHaveTextContent(/PUT/i);
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

    const mockingButton = screen.getByRole('button', { name: /mocking/i });

    userEvent.click(mockingButton);

    // enable mocking
    let enableItem = await screen.getByRole('menuitemcheckbox', { name: 'Enabled' });
    userEvent.click(enableItem);

    // set response code
    const responseCodeItem = await screen.getByRole('menuitemcheckbox', { name: '200' });
    userEvent.click(responseCodeItem);

    const codeViewer = await screen.findByLabelText(/curl/);
    expect(codeViewer).toHaveTextContent(/https:\/\/mock-todos\.stoplight\.io/);
    expect(codeViewer).toHaveTextContent(/Prefer: code=200/);
  });

  it('includes authentication data in request sample', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);
    const apiKeyField = await screen.findByLabelText('API Key');
    userEvent.type(apiKeyField, '123456789');
    const codeViewer = await screen.findByLabelText(/curl/);
    await waitFor(() => expect(codeViewer).toHaveTextContent(/123456789/));
  });

  it('displays parameter name for empty path parameter', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);
    const codeViewer = await screen.findByLabelText(/curl/);
    await waitFor(() => expect(codeViewer).toHaveTextContent(/todos\/todoId/));
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

    const serversSelect = await screen.findByLabelText('Servers');

    chooseOption(serversSelect, 'Development');

    const codeViewer = await screen.findByLabelText(/curl/);

    expect(codeViewer).toHaveTextContent('https://todos-dev.stoplight.io');
  });
});

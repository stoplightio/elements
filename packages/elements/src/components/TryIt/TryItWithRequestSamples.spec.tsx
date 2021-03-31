import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { httpOperation as putTodosOperation } from '../../__fixtures__/operations/put-todos';
import { withPersistenceBoundary } from '../../context/Persistence';
import { TryItWithRequestSamples as RawComponent } from './TryItWithRequestSamples';

const TryItWithRequestSamples = withPersistenceBoundary(RawComponent);

describe('TryItWithRequestSamples', () => {
  it('displays RequestSamples', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);

    expect(await screen.findByRole('heading', { name: /^request/i })).toBeVisible();

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

  it('includes authentication data in request sample', async () => {
    render(<TryItWithRequestSamples httpOperation={putTodosOperation} />);
    const apiKeyField = await screen.findByLabelText('API Key');
    userEvent.type(apiKeyField, '123456789');
    const codeViewer = await screen.findByLabelText(/curl/);
    await waitFor(() => expect(codeViewer).toHaveTextContent(/123456789/));
  });
});

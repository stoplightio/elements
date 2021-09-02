import '@testing-library/jest-dom';

import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { getResponseType, ResponseState, TryItResponse } from './Response';

describe('Response', () => {
  window.URL.createObjectURL = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('displays JSON response', async () => {
    const response: ResponseState = {
      status: 200,
      contentType: 'application/json',
      bodyText: '{"status":"200"}',
    };
    const { container } = render(<TryItResponse response={response} />);

    expect(container).toHaveTextContent('{ "status": "200"}');
  });

  it('displays XML response', async () => {
    const response: ResponseState = {
      status: 200,
      contentType: 'application/xml',
      bodyText: '<root><node/></root>',
    };
    const { container } = render(<TryItResponse response={response} />);

    expect(container).toHaveTextContent('<root> <node/></root>');
  });

  it('displays image response', async () => {
    const response: ResponseState = {
      status: 200,
      contentType: 'image/jpeg',
      blob: new Blob(),
    };
    render(<TryItResponse response={response} />);

    const image = screen.getByRole('img', { name: 'response image' });

    expect(image).toBeVisible();
  });

  it('displays JSON response formats correctly', () => {
    const response: ResponseState = {
      status: 200,
      contentType: 'application/json',
      bodyText: '{"status":"200"}',
    };
    render(
      <MosaicProvider>
        <TryItResponse response={response} />
      </MosaicProvider>,
    );

    const button = screen.getByRole('button', { name: /body format/i });

    userEvent.click(button);

    const previewItem = screen.getByRole('menuitem', { name: 'Preview' });
    const rawItem = screen.getByRole('menuitem', { name: 'Raw' });

    expect(previewItem).toBeVisible();
    expect(rawItem).toBeVisible();
  });

  it('displays XML response formats correctly', () => {
    const response: ResponseState = {
      status: 200,
      contentType: 'application/xml',
      bodyText: '<root><node/></root>',
    };
    render(
      <MosaicProvider>
        <TryItResponse response={response} />
      </MosaicProvider>,
    );

    const button = screen.getByRole('button', { name: /body format/i });

    userEvent.click(button);

    const previewItem = screen.getByRole('menuitem', { name: 'Preview' });
    const rawItem = screen.getByRole('menuitem', { name: 'Raw' });

    expect(previewItem).toBeVisible();
    expect(rawItem).toBeVisible();
  });

  it('does not display response format if there is only one', () => {
    const response: ResponseState = {
      status: 200,
      contentType: 'text/plain',
      bodyText: 'plain text',
    };
    render(
      <MosaicProvider>
        <TryItResponse response={response} />
      </MosaicProvider>,
    );

    const button = screen.queryByRole('button', { name: /body format/i });

    expect(button).not.toBeInTheDocument();
  });

  it.each([
    ['application/json', 'json'],
    [`application/json; charset='utf-8'`, 'json'],
    ['application/foo-json', 'json'],
    ['application/xml', 'xml'],
    ['application/html', 'xml'],
    ['text/xml', 'xml'],
    ['text/html', 'xml'],
    ['application/foo+xml', 'xml'],
    ['text/plain', 'text'],
    ['text/scv', 'text'],
    ['text/foo', 'text'],
    ['image/jpeg', 'image'],
    ['image/gif', 'image'],
    ['image/png', 'image'],
    ['image/svg', 'image'],
  ])('correctly maps %s mime type', (contentType, type) => {
    const responseType = getResponseType(contentType);
    expect(responseType).toEqual(type);
  });
});

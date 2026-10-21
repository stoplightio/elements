import '@testing-library/jest-dom';

import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { ResponseCodeViewer } from './ReponseCodeViewer';
import { getResponseType, ResponseState, TryItResponse } from './Response';

const codeViewerProps = vi.hoisted(() => vi.fn());

vi.mock('@stoplight/mosaic-code-viewer', async importOriginal => {
  const actual = await importOriginal<typeof import('@stoplight/mosaic-code-viewer')>();
  const React = await import('react');
  return {
    ...actual,
    CodeViewer: (props: Record<string, unknown>) => {
      codeViewerProps(props);
      return React.createElement(actual.CodeViewer as React.ElementType, props);
    },
  };
});

describe('Response', () => {
  window.URL.createObjectURL = vi.fn();

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('shows raw code view with large text', () => {
    const body = JSON.stringify(
      Object.fromEntries(new Array(10001).fill(0).map((_, i) => [`prop-${i + 1}`, i + 1])),
      null,
      4,
    );
    render(<ResponseCodeViewer language="json" value={body} />);
    expect(codeViewerProps.mock.lastCall?.[0].showAsRaw).toBe(true);
  });
  it('shows highlighted code view with normal text', () => {
    const body = JSON.stringify(
      Object.fromEntries(new Array(250).fill(0).map((_, i) => [`prop-${i + 1}`, i + 1])),
      null,
      4,
    );
    render(<ResponseCodeViewer language="json" value={body} />);
    expect(codeViewerProps.mock.lastCall?.[0].showAsRaw).not.toBe(true);
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

  it('displays JSON response formats correctly', async () => {
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

    await userEvent.click(button);

    const previewItem = screen.getByRole('menuitem', { name: 'Preview' });
    const rawItem = screen.getByRole('menuitem', { name: 'Raw' });

    expect(previewItem).toBeVisible();
    expect(rawItem).toBeVisible();
  });

  it('displays XML response formats correctly', async () => {
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

    await userEvent.click(button);

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

  it('does not display "No supported" message if there is no body', () => {
    const response: ResponseState = {
      status: 200,
      contentType: 'text/plain',
      bodyText: '',
    };
    const { container } = render(<TryItResponse response={response} />);
    expect(container).not.toHaveTextContent('No supported response body returned');
  });

  it.each([
    ['application/json', 'json'],
    [`application/json; charset='utf-8'`, 'json'],
    ['application/example.com.kontakt+json;version=10;charset=UTF-8', 'json'],
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
    const timerStart = Date.now();
    const responseType = getResponseType(contentType);
    const timerEnd = Date.now();

    expect(responseType).toEqual(type);

    // checking if regex is not too slow (https://github.com/stoplightio/platform-internal/issues/9446)
    expect(timerEnd - timerStart).toBeLessThan(5000);
  });
});

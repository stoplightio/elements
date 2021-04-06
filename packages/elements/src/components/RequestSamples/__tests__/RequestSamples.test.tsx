import '@testing-library/jest-dom';

import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { screen } from '@testing-library/dom';
import { cleanup, render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import * as React from 'react';

import { withPersistenceBoundary } from '../../../context/Persistence';
import { RequestSamples as RequestSamplesWithoutPersistence, RequestSamplesProps } from '../RequestSamples';

const RequestSamples_ = withPersistenceBoundary(RequestSamplesWithoutPersistence);

const RequestSamples = (props: RequestSamplesProps) => (
  <MosaicProvider>
    <RequestSamples_ {...props} />
  </MosaicProvider>
);

const sampleRequest = {
  method: 'POST',
  url: 'https://google.com',
  httpVersion: 'HTTP/1.1',
  headers: [
    {
      name: 'Cache-Control',
      value: 'max-age=0',
    },
  ],
  queryString: [],
  cookies: [],
  headersSize: 678,
  bodySize: 0,
};

async function chooseOption(select: TargetElement, option: string) {
  userEvent.click(select);
  await userEvent.selectOptions(screen.getByRole('listbox'), screen.getByRole('option', { name: option }));
}

describe('RequestSend', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Displays basic CURL request', () => {
    const { container } = render(<RequestSamples request={sampleRequest} />);

    expect(container).toHaveTextContent('curl');
    expect(container).toHaveTextContent('POST');
    expect(container).toHaveTextContent('https://google.com');
    expect(container).toHaveTextContent('max-age=0');
  });

  it('Allows language switching', async () => {
    const { container } = render(<RequestSamples request={sampleRequest} />);
    const langSelector = screen.getByText('Request Sample: Shell / cURL');
    await chooseOption(langSelector, 'JavaScript / Axios');

    expect(container).toHaveTextContent('axios');
    expect(container).toHaveTextContent('POST');
    expect(container).toHaveTextContent('https://google.com');
    expect(container).toHaveTextContent('max-age=0');
  });

  it('preserves language and library between renders', async () => {
    render(<RequestSamples request={sampleRequest} />);
    const langSelector = screen.getByText('Request Sample: Shell / cURL');
    await chooseOption(langSelector, 'JavaScript / Axios');

    cleanup();

    const { container } = render(<RequestSamples request={sampleRequest} />);
    const secondLangSelector = screen.getByText('Request Sample: JavaScript / Axios');
    expect(secondLangSelector).toBeInTheDocument();
    expect(container).toHaveTextContent('axios');
  });

  it('allows to change lang/lib after rerender', async () => {
    render(<RequestSamples request={sampleRequest} />);
    const langSelector = screen.getByText('Request Sample: Shell / cURL');
    await chooseOption(langSelector, 'JavaScript / Axios');

    cleanup();

    render(<RequestSamples request={sampleRequest} />);
    const secondLangSelector = screen.getByText('Request Sample: JavaScript / Axios');
    await chooseOption(secondLangSelector, 'JavaScript / Fetch');

    expect(secondLangSelector).toHaveTextContent('Request Sample: JavaScript / Fetch');
  });

  it('switches to language with no library', async () => {
    const { container } = render(<RequestSamples request={sampleRequest} />);
    const langSelector = screen.getByText('Request Sample: Shell / cURL');
    await chooseOption(langSelector, 'Obj-C');

    expect(langSelector).toHaveTextContent('Request Sample: Obj-C');
    expect(container).toHaveTextContent('#import <Foundation/Foundation.h>');
  });
});

import '@testing-library/jest-dom';

import { screen } from '@testing-library/dom';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { withPersistenceBoundary } from '../../../context/Persistence';
import { withMosaicProvider } from '../../../hoc/withMosaicProvider';
import { RequestSamples as RequestSamplesWithoutPersistence } from '../RequestSamples';

const RequestSamples = withMosaicProvider(withPersistenceBoundary(RequestSamplesWithoutPersistence));

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
    await chooseLanguage('JavaScript', 'Axios');

    expect(container).toHaveTextContent('axios');
    expect(container).toHaveTextContent('POST');
    expect(container).toHaveTextContent('https://google.com');
    expect(container).toHaveTextContent('max-age=0');
  });

  it('preserves language and library between renders', async () => {
    render(<RequestSamples request={sampleRequest} />);
    await chooseLanguage('JavaScript', 'Axios');

    cleanup();

    const { container } = render(<RequestSamples request={sampleRequest} />);
    const langSelector = getLanguageSelectorButton();
    expect(langSelector).toHaveTextContent(/axios/i);
    expect(container).toHaveTextContent('axios');
  });

  it('allows to change lang/lib after rerender', async () => {
    render(<RequestSamples request={sampleRequest} />);
    await chooseLanguage('JavaScript', 'Axios');

    cleanup();

    render(<RequestSamples request={sampleRequest} />);
    const langSelector = getLanguageSelectorButton();
    await chooseLanguage('JavaScript', 'Fetch');

    expect(langSelector).toHaveTextContent(/javascript/i);
    expect(langSelector).toHaveTextContent(/fetch/i);
  });

  it('switches to language with no library', async () => {
    const { container } = render(<RequestSamples request={sampleRequest} />);
    const langSelector = getLanguageSelectorButton();
    await chooseLanguage('Obj-C');

    expect(langSelector).toHaveTextContent(/obj-c/i);
    expect(container).toHaveTextContent('#import <Foundation/Foundation.h>');
  });
});

function getLanguageSelectorButton() {
  return screen.getByRole('button', { name: /Request Sample/i });
}

async function chooseLanguage(language: string, library?: string) {
  const langSelector = getLanguageSelectorButton();
  userEvent.click(langSelector);

  const menuItem = await screen.findByRole('menuitemcheckbox', { name: language });
  if (!library) {
    userEvent.click(menuItem);
  } else {
    userEvent.hover(menuItem);
    const subMenuItem = await screen.findByRole('menuitemcheckbox', { name: library });
    userEvent.click(subMenuItem);
  }
}

import '@testing-library/jest-dom/extend-expect';

import { text } from '@storybook/addon-knobs';
import { render } from '@testing-library/react';
import * as React from 'react';

import { API } from '../API';

const apiDescriptionUrl = () =>
  text(
    'apiDescriptionUrl',
    'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml',
  );

test('sidebar layout renders without crashing', () => {
  const { getByTestId } = render(<API apiDescriptionUrl={apiDescriptionUrl()} />);
  expect(getByTestId('APIComponent').firstElementChild).toHaveClass('sl-elements');
});

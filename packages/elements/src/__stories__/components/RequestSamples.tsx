import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Request as HarFormatRequest } from 'har-format';
import * as React from 'react';

import { RequestSamples } from '../../components/RequestSamples/RequestSamples';

const initialRequest = {
  url: 'https://google.com',
  method: 'post',
} as HarFormatRequest;

const request = () => text('httpOperation', JSON.stringify(initialRequest));

storiesOf('Internal/RequestSamples', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Playground', () => {
    return (
      <div className="m-5">
        <RequestSamples request={JSON.parse(request())} />
      </div>
    );
  });

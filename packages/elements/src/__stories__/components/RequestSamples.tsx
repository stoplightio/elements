import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { RequestSamples } from '../../components/RequestSamples/RequestSamples';

const requestType = () => text('requestType', 'cURL');
const request = () => text('request', 'curl http://www.example.org:1234/');

storiesOf('Internal/RequestSamples', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Playground', () => {
    return (
        <div className="m-5">
            <RequestSamples requestType={requestType()}>
                {request()}
            </RequestSamples>
        </div>
    );
  });

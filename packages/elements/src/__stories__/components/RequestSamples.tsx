import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { RequestSamples } from '../../components/RequestSamples/RequestSamples';

storiesOf('Internal/RequestSamples', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Playground', () => {
    return (
        <div className="m-5">
            <RequestSamples requestType="cURL">
                curl http://www.example.org:1234/
            </RequestSamples>
        </div>
    );
  });

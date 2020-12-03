import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Request } from 'har-format';
import * as React from 'react';
import { SupportedRequestType } from '../../components/RequestSamples/requestConverters';
import { RequestSamples } from '../../components/RequestSamples/RequestSamples';

const initialRequest = {
  url: 'https://google.com',
  method: 'post'
} as Request;

const requestType = () => text('requestType', 'cURL');
const request = () => text('httpOperation', JSON.stringify(initialRequest));

storiesOf('Internal/RequestSamples', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Playground', () => {
    return (
        <div className="m-5">
            <RequestSamples 
              requestType={requestType() as SupportedRequestType} 
              request={JSON.parse(request())} 
            />
        </div>
    );
  });

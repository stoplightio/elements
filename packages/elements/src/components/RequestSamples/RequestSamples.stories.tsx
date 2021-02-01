import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import { RequestSamples, RequestSamplesProps } from './RequestSamples';

export default {
  title: 'Internal/RequestSamples',
  component: RequestSamples,
} as Meta<RequestSamplesProps>;

const Template: Story<RequestSamplesProps> = args => <RequestSamples {...args} />;

export const HoistedStory = Template.bind({});

HoistedStory.args = {
  request: {
    url: 'https://google.com',
    method: 'post',
    bodySize: -1,
    cookies: [],
    headers: [],
    headersSize: -1,
    httpVersion: '1.1',
    queryString: [],
  },
};
HoistedStory.storyName = 'RequestSamples';

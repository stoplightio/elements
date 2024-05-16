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

export const RequestSampleWithOverrides = Template.bind({});

RequestSampleWithOverrides.args = {
  codeSampleOverrides: [
    {
      lang: 'shell',
      label: 'cURL',
      source: 'echo "Hello, World from cURL!"',
    },
    {
      lang: 'shell',
      label: 'Wget',
      source: 'echo "Hello, World from Wget!"',
    },
  ],
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
RequestSampleWithOverrides.storyName = 'RequestSampleWithOverrides';

import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import { httpOperation } from '../../__fixtures__/operations/operation-with-examples';
import { ResponseExamples, ResponseExamplesProps } from './ResponseExamples';

export default {
  title: 'Internal/ResponseExamples',
  component: ResponseExamples,
} as Meta<ResponseExamplesProps>;

const Template: Story<ResponseExamplesProps> = args => <ResponseExamples {...args} />;

export const HoistedStory = Template.bind({});

HoistedStory.args = {
  httpOperation,
  responseStatusCode: '200',
  responseMediaType: 'application/json',
};
HoistedStory.storyName = 'ResponseExamples';

import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import { httpOperation as putTodosOperation } from '../../__fixtures__/operations/put-todos';
import { TryItWithRequestSamples, TryItWithRequestSamplesProps } from './TryItWithRequestSamples';

export default {
  title: 'Internal/TryItWithRequestSamples',
  component: TryItWithRequestSamples,
} as Meta<TryItWithRequestSamplesProps>;

const Template: Story<TryItWithRequestSamplesProps> = args => <TryItWithRequestSamples {...args} />;

export const WithParameters = Template.bind({});
WithParameters.args = {
  httpOperation: putTodosOperation,
};
WithParameters.storyName = 'TryItWithRequestSamples';

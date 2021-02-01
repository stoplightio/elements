import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import { httpOperation as multipartOperation } from '../../__fixtures__/operations/multipart-formdata-post';
import { httpOperation as putTodosOperation } from '../../__fixtures__/operations/put-todos';
import { operation as simpleGetOperation } from '../../__fixtures__/operations/simple-get';
import { httpOperation as urlEncodedOperation } from '../../__fixtures__/operations/urlencoded-post';
import { TryIt, TryItProps } from './TryIt';

export default {
  title: 'Internal/TryIt Component',
  component: TryIt,
} as Meta<TryItProps>;

const Template: Story<TryItProps> = args => <TryIt {...args} />;

export const SimpleGET = Template.bind({});
SimpleGET.args = {
  httpOperation: simpleGetOperation,
};

export const WithParameters = Template.bind({});
WithParameters.args = {
  httpOperation: putTodosOperation,
};

export const UrlEncoded = Template.bind({});
UrlEncoded.args = {
  httpOperation: urlEncodedOperation,
};
UrlEncoded.storyName = 'application/x-www-form-urlencoded';

export const Multipart = Template.bind({});
Multipart.args = {
  httpOperation: multipartOperation,
};
Multipart.storyName = 'multipart/form-data (with file upload)';

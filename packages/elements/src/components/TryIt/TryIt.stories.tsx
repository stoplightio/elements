import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import { examplesRequestBody } from '../../__fixtures__/operations/examples-request-body';
import { httpOperation as multipartOperation } from '../../__fixtures__/operations/multipart-formdata-post';
import { httpOperation as putTodosOperation } from '../../__fixtures__/operations/put-todos';
import { requestBody } from '../../__fixtures__/operations/request-body';
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

export const RequestBodySchema = Template.bind({});
RequestBodySchema.args = {
  httpOperation: requestBody,
};
RequestBodySchema.storyName = 'Request Body From Schema';

export const RequestBodyExamples = Template.bind({});
RequestBodyExamples.args = {
  httpOperation: examplesRequestBody,
};
RequestBodyExamples.storyName = 'Request Body from Examples';

export const TryItAuth = Template.bind({});
TryItAuth.args = {
  httpOperation: putTodosOperation,
};
TryItAuth.storyName = 'TryIt Auth';

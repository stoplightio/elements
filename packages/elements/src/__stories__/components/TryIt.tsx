import { object, text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { httpOperation } from '../../__fixtures__/operations/bundled-parameter';
import multipartOperation from '../../__fixtures__/operations/multipart-formdata-post';
import putOperation from '../../__fixtures__/operations/put-todos';
import { operation } from '../../__fixtures__/operations/simple-get';
import urlEncodedOperation from '../../__fixtures__/operations/urlencoded-post';
import { TryIt } from '../../components/TryIt/index';

export const darkMode = () => boolean('dark mode', false);
export const mockUrl = () => text('mockUrl', '');
export const nodeData = () => object('nodeData', httpOperation);

storiesOf('Internal/TryIt', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Basic Send', () => <TryIt httpOperation={operation} />)
  .add('Operation Parameters', () => <TryIt httpOperation={putOperation} />)
  .add('Form data body - urlencoded', () => <TryIt httpOperation={urlEncodedOperation} />)
  .add('Form data body - multipart', () => <TryIt httpOperation={multipartOperation} />);

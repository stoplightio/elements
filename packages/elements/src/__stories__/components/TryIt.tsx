import { object, text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { httpOperation } from '../../__fixtures__/operations/bundled-parameter';
import examplesRequestBody from '../../__fixtures__/operations/examples-request-body';
import multipartOperation from '../../__fixtures__/operations/multipart-formdata-post';
import putOperation from '../../__fixtures__/operations/put-todos';
import requestBodyOperation from '../../__fixtures__/operations/request-body';
import { operation } from '../../__fixtures__/operations/simple-get';
import urlEncodedOperation from '../../__fixtures__/operations/urlencoded-post';
import { TryIt } from '../../components/TryIt';
import { withPersistenceBoundary } from '../../context/Persistence';

export const darkMode = () => boolean('dark mode', false);
export const mockUrl = () => text('mockUrl', '');
export const nodeData = () => object('nodeData', httpOperation);

const TryItWithPersistence = withPersistenceBoundary(TryIt);

storiesOf('Internal/TryIt', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Basic Send', () => <TryItWithPersistence httpOperation={operation} />)
  .add('Operation Parameters', () => <TryItWithPersistence httpOperation={putOperation} />)
  .add('Form data body - urlencoded', () => <TryItWithPersistence httpOperation={urlEncodedOperation} />)
  .add('Form data body - multipart', () => <TryItWithPersistence httpOperation={multipartOperation} />)
  .add('Example Request Body', () => <TryItWithPersistence httpOperation={examplesRequestBody} />);

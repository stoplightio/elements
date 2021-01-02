import { object, text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { httpOperation } from '../../__fixtures__/operations/bundled-parameter';
import putOperation from '../../__fixtures__/operations/put-todos';
import { operation } from '../../__fixtures__/operations/simple-get';
import urlEncodedOperation from '../../__fixtures__/operations/urlencoded-post';
import { TryIt } from '../../components/TryIt';
import { BasicSend } from '../../components/TryIt/BasicSend';
import { Provider } from '../../containers/Provider';

export const darkMode = () => boolean('dark mode', false);
export const mockUrl = () => text('mockUrl', '');
export const nodeData = () => object('nodeData', httpOperation);

storiesOf('Internal/TryIt', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Playground', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <TryIt nodeType="http_operation" nodeData={nodeData()} mockUrl={mockUrl()} />
        </Provider>
      </div>
    );
  })
  .add('Basic Send', () => <BasicSend httpOperation={operation} />)
  .add('Operation Parameters', () => <BasicSend httpOperation={putOperation} />)
  .add('Form data body', () => <BasicSend httpOperation={urlEncodedOperation} />);

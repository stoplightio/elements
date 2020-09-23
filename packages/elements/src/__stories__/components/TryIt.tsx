import { object, text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { httpOperation } from '../../__fixtures__/operations/bundled-parameter';
import { TryIt } from '../../components/TryIt';
import { Provider } from '../../containers/Provider';

const article = require('../../__fixtures__/articles/kitchen-sink.md').default;

export const darkMode = () => boolean('dark mode', false);
export const mockUrl = () => text('mockUrl', '');
export const nodeData = () => object('nodeData', httpOperation);

storiesOf('Components/Internal/TryIt', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Playground', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <TryIt nodeType="http_operation" nodeData={nodeData()} mockUrl={mockUrl()} />
        </Provider>
      </div>
    );
  });

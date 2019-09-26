import { IHttpOperation, NodeType } from '@stoplight/types';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

const httpOperation: IHttpOperation = require('../../__fixtures__/operations/put-todos.json');
import { Page } from '../../components/Page';

export const darkMode = () => boolean('dark mode', false);

storiesOf('components/HttpOperation', module)
  .addDecorator(withKnobs)
  .add('Update Todo', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          data={httpOperation}
          name={httpOperation.summary || httpOperation.path}
          version="1.0"
          type={NodeType.HttpOperation}
        />
      </div>
    );
  })
  .add('error boundary', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          data={null}
          name={httpOperation.summary || httpOperation.path}
          version="1.0"
          type={NodeType.HttpOperation}
        />
      </div>
    );
  });

import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { NodeType } from '@stoplight/types';
import { NodeTab, Page } from '../../components/Page';

export const darkMode = () => boolean('dark mode', false);

storiesOf('components/Dependencies', module)
  .addDecorator(withKnobs)
  .add('Basic', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          type={NodeType.Model}
          srn=""
          name="Example Model"
          data={require('../../__fixtures__/schemas/local-refs.json')}
          tabs={{
            [NodeType.Model]: [NodeTab.Docs, NodeTab.Dependencies],
          }}
        />
      </div>
    );
  })
  .add('Stress Test', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          type={NodeType.Model}
          srn=""
          name="Example Model"
          data={require('../../__fixtures__/schemas/stress-test.json')}
          tabs={{
            [NodeType.Model]: [NodeTab.Docs, NodeTab.Dependencies],
          }}
        />
      </div>
    );
  });

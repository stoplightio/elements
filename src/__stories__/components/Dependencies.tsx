import { NodeType } from '@stoplight/types';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import { graph as todoFullInboundGraph } from '../../__fixtures__/dependencies/inbound/todo-full';
import { graph as todoFullOutboundGraph } from '../../__fixtures__/dependencies/outbound/todo-full';
import { InboundDependencies } from '../../components/Dependencies/Inbound';
import { OutboundDependencies } from '../../components/Dependencies/Outbound';

export const darkMode = () => boolean('dark mode', false);

storiesOf('components/Dependencies', module)
  .addDecorator(withKnobs)
  .add('Inbound', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <InboundDependencies
          node={{
            id: 9,
            type: NodeType.Model,
            srn: 'gh/stoplightio/studio-demo/reference/models/todo-full.v1.json',
            name: 'Todo Full',
            data: require('../../__fixtures__/schemas/todo-full.v1.json'),
          }}
          graph={todoFullInboundGraph}
          padding="12"
        />
      </div>
    );
  })
  .add('Outbound', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <OutboundDependencies
          node={{
            id: 9,
            type: NodeType.Model,
            srn: 'gh/stoplightio/studio-demo/reference/models/todo-full.v1.json',
            name: 'Todo Full',
            data: require('../../__fixtures__/schemas/todo-full.v1.json'),
          }}
          graph={todoFullOutboundGraph}
          padding="12"
        />
      </div>
    );
  });

import { NodeType } from '@stoplight/types';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import { Dependencies } from '../../components/Dependencies';
import { Page } from '../../components/Page';

export const darkMode = () => boolean('dark mode', false);

storiesOf('components/Dependencies', module)
  .addDecorator(withKnobs)
  .add('MediaEntry', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Dependencies
          node={{
            type: NodeType.Model,
            srn: 'gh/stoplightio/elements/__fixtures__/schemas/media-entry.json',
            name: 'MediaEntry',
            data: require('../../__fixtures__/schemas/media-entry.json'),
          }}
          padding="12"
        />
      </div>
    );
  })
  .add('Simple', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          className="h-full"
          node={{
            type: NodeType.Model,
            srn: 'gh/stoplightio/elements/__fixtures__/schemas/simple.json',
            name: 'Example Model',
            data: require('../../__fixtures__/schemas/simple.json'),
          }}
          tabs={({ node }) => [
            {
              title: 'Docs',
              content: <Dependencies node={node} />,
            },
          ]}
        />
      </div>
    );
  })
  .add('Circular', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Dependencies
          node={{
            type: NodeType.Model,
            srn: 'gh/stoplightio/elements/__fixtures__/schemas/circular.json',
            name: 'Circular Model',
            data: require('../../__fixtures__/schemas/circular'),
          }}
          padding="12"
        />
      </div>
    );
  });

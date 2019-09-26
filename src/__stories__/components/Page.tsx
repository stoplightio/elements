import { NodeType } from '@stoplight/types';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import { NodeTab, Page } from '../../components/Page';

export const darkMode = () => boolean('dark mode', false);

const data = require('../../__fixtures__/models/basic.json');

storiesOf('components/Page', module)
  .addDecorator(withKnobs)
  .add('Model with changelog', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          type={NodeType.Model}
          name="Error"
          data={data}
          tabs={{
            [NodeType.Model]: [NodeTab.Docs, NodeTab.Changelog],
          }}
          changes={[
            {
              createdAt: '1569423416682',
              message: 'updated description',
              semver: 'PATCH',
            },
            {
              createdAt: '1569423416681',
              message: 'removed property foo of type number at /path',
              semver: 'major',
            },
            {
              createdAt: '1569385720974',
              message: 'added description',
              semver: 'PATCH',
            },
            {
              createdAt: '1569385720973',
              message: 'added property bar of type string at /allOf/0',
              semver: 'MINOR',
            },
            {
              createdAt: '1569385720971',
              message: 'added model',
              semver: 'major',
            },
          ]}
        />
      </div>
    );
  });

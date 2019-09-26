import { NodeType } from '@stoplight/types';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

const article: string = require('../../__fixtures__/articles/kitchen-sink.md');
import { Page } from '../../components/Page';

export const darkMode = () => boolean('dark mode', false);
export const showToc = () => boolean('table of contents?', false);

storiesOf('components/Article', module)
  .addDecorator(withKnobs)
  .add('spectral reference', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page data={article} type={NodeType.Article} padding="24" />
      </div>
    );
  });

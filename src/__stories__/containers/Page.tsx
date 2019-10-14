import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { Docs } from '../../components/Docs';
import { Page } from '../../containers/Page';
import { Provider } from '../../containers/Provider';
import { providerKnobs } from './Provider';

export const darkMode = () => boolean('dark mode', false);

export const pageKnobs = () => ({
  srn: text('srn', 'gh/stoplightio/studio-demo/docs/markdown/stoplight-flavored-markdown.md', 'Page'),
  scrollInnerContainer: boolean('scrollInnerContainer', true, 'Page'),
});

storiesOf('containers/Page', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
      <Provider {...providerKnobs()}>
        <Page
          {...pageKnobs()}
          padding="16"
          tabs={({ node }) => [{ title: 'Docs', content: <Docs node={node} padding="16" /> }]}
        />
      </Provider>
    </div>
  ));

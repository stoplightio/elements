import { NodeType } from '@stoplight/types';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import { Changelog } from '../../components/Changelog';
import { Dependencies } from '../../components/Dependencies';
import { Docs } from '../../components/Docs';
import { TryIt } from '../../components/TryIt';
import { Page } from '../../containers/Page';
import { Provider } from '../../containers/Provider';
import { providerKnobs } from './Provider';

export const darkMode = () => boolean('dark mode', false);

export const pageKnobs = () => ({
  srn: text('srn', 'gh/stoplightio/sample-specs/reference/instagram/instagram.yaml/definitions/MediaEntry'),
  group: text('group', undefined),
  scrollInnerContainer: boolean('scrollInnerContainer', true),
});

storiesOf('containers/Page', module)
  .addDecorator(withKnobs)
  .add('Playground', () => (
    <div className={cn('absolute inset-0', { 'bp3-dark bg-gray-8': darkMode() })}>
      <Provider {...providerKnobs()}>
        <Page
          {...pageKnobs()}
          className="h-full"
          padding="16"
          tabs={({ node }) => {
            const tabs = [{ title: 'Docs', content: <Docs node={node} padding="16" /> }];

            if (node.type === NodeType.HttpOperation) {
              tabs.push({
                title: 'Try It',
                content: <TryIt value={node.data} padding="16" />,
              });
            } else if (node.type === NodeType.Model) {
              tabs.push({
                title: 'Dependencies',
                content: <Dependencies className="h-screen" node={node} padding="16" />,
              });
            }

            tabs.push({
              title: 'Changelog',
              content: <Changelog changes={node.changes} padding="16" />,
            });

            return tabs;
          }}
        />
      </Provider>
    </div>
  ));

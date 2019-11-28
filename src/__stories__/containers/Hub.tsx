import { NodeType } from '@stoplight/types';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import { Docs } from '../../components/Docs';
import { TryIt } from '../../components/TryIt';
import { Hub } from '../../containers/Hub';
import { Provider } from '../../containers/Provider';
import { providerKnobs } from './Provider';

export const darkMode = () => boolean('dark mode', false);

export const knobs = () => ({
  srn: text('srn', 'gh/stoplightio/studio-demo/docs/markdown/stoplight-flavored-markdown.md'),
  group: text('group', undefined),
});

storiesOf('containers/Hub', module)
  .addDecorator(withKnobs)
  .add('Playground', () => (
    <div
      className={cn('bg-gray-1 dark:bg-gray-8 absolute bottom-0 left-0 right-0 top-0 p-4', {
        'bp3-dark': darkMode(),
      })}
    >
      <Wrapper providerProps={{ ...providerKnobs() }} hubProps={{ ...knobs() }} />
    </div>
  ));

const Wrapper = ({ providerProps, hubProps }: any) => {
  const [srn, setSrn] = React.useState(hubProps.srn);

  return (
    <Provider
      {...providerProps}
      components={{
        link: (props, key) => {
          return (
            <a
              key={key}
              title={props.node.title}
              className={props.node.className}
              onClick={e => {
                e.preventDefault();
                setSrn(props.node.url);
              }}
            >
              {props.children}
            </a>
          );
        },
      }}
    >
      <Hub
        {...hubProps}
        className="h-full"
        srn={srn}
        padding="16"
        tabs={({ node }) => {
          const tabs = [{ title: 'Docs', content: <Docs node={node} padding="16" /> }];

          if (node.type === NodeType.HttpOperation) {
            tabs.push({ title: 'Try It', content: <TryIt value={node.data} padding="16" /> });
          }

          return tabs;
        }}
      />
    </Provider>
  );
};

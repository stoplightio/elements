import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import { JSONSchema4 } from 'json-schema';
import * as React from 'react';

import { Dependencies } from '../../components/Dependencies';
import { Page } from '../../containers/Page';
import { Provider } from '../../containers/Provider';
import { providerKnobs } from '../containers/Provider';

const schema: JSONSchema4 = require('../../__fixtures__/schemas/local-refs.json');

export const darkMode = () => boolean('dark mode', false);

storiesOf('components/Dependencies', module)
  .addDecorator(withKnobs)
  .add('Dependencies', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Dependencies schema={schema} srn="gh/stoplightio/bear/__fixtures__/schemas/local-refs.json" />
      </div>
    );
  })
  .add('As a Page', () => {
    return <Component />;
  });

const Component = () => {
  const defaultSrn = 'gh/stoplightio/studio-demo/reference/todos/models/todo-full.json';
  const [srn, setSrn] = React.useState(defaultSrn);

  return (
    <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
      <Provider
        {...providerKnobs()}
        components={{
          link: ({ node, children }, key) => {
            if (node.url === 'root') return null;

            return (
              <a
                key={key}
                title={node.title}
                className={node.className}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation(); // prevent collapse/expand from being called when clicked

                  console.log(node.url);

                  // process the node URL and turn it into an SRN
                  // then call setSrn
                }}
              >
                {children}
              </a>
            );
          },
        }}
      >
        <Page srn={srn} />
      </Provider>
    </div>
  );
};

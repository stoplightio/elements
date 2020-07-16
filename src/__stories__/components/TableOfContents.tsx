import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { nodes } from '../../__fixtures__/table-of-contents/studio';
import { TableOfContents } from '../../components/TableOfContents';
import { Provider } from '../../containers/Provider';

const styles = {
  height: '100%',
  borderRight: '1px solid #E6ECF1',
  backgroundColor: '#F5F7F9',
  paddingTop: 24,
  paddingLeft: 24,
  width: 350,
};

storiesOf('components/TableOfContents', module)
  .addDecorator(withKnobs)
  .add('Playground', () => {
    return <TocStory />;
  });

const TocStory: React.FC = () => {
  const [node, setNode] = React.useState('');

  return (
    <div className="flex flex-row">
      <div style={styles}>
        <Provider
          host="https://meta.stoplight.io"
          workspace="meta"
          project="studio-demo"
          node={node}
          components={{
            link: ({ children, node: { url } }) => {
              return (
                <a
                  className="no-underline"
                  href={url}
                  onClick={e => {
                    setNode(url);
                    e.preventDefault();
                  }}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          <TableOfContents className="h-full" nodes={object('nodes', nodes)} />
        </Provider>
      </div>
      <div className="flex-grow p-5">
        <h2>Docs go here</h2>
        <p>{node}</p>
      </div>
    </div>
  );
};

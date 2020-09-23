import { DefaultRow, TableOfContents } from '@stoplight/ui-kit';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { tree } from '../../__fixtures__/table-of-contents/studio';
import { TableOfContents as TocContainer } from '../../containers/TableOfContents';
import { useTocContents } from '../../hooks/useTocContents';

const styles = {
  height: '100%',
  borderRight: '1px solid #E6ECF1',
  backgroundColor: '#F5F7F9',
  paddingTop: 24,
  paddingLeft: 24,
  width: 350,
};

storiesOf('Internal/TableOfContents', module)
  .addDecorator(withKnobs)
  .add('Component', () => {
    return <TocStory />;
  })
  .add('Container', () => {
    return <TocStoryContainer />;
  });

const TocStory: React.FC = () => {
  const [node, setNode] = React.useState('');
  const tocTree = object('tree', tree);
  const contents = useTocContents(tocTree).map(item => ({
    ...item,
    onClick: () => {
      setNode(item.to);
    },
  }));

  return (
    <div className="flex flex-row">
      <div style={styles}>
        <TableOfContents className="h-full" contents={contents} />
      </div>
      <div className="flex-grow p-5">
        <h2>Docs go here</h2>
        <p>{node}</p>
      </div>
    </div>
  );
};

const TocStoryContainer: React.FC = () => {
  const [node, setNode] = React.useState('');

  return (
    <div className="flex flex-row">
      <div style={styles}>
        <TocContainer
          className="h-full"
          workspaceUrl={text('workspaceUrl', 'https://elements.stoplight.io')}
          projectSlug={text('projectSlug', 'studio-demo')}
          rowComponent={({ item, ...rest }) => {
            return (
              <DefaultRow
                item={{
                  ...item,
                  onClick: () => {
                    setNode(item.to);
                  },
                }}
                {...rest}
              />
            );
          }}
        />
      </div>
      <div className="flex-grow p-5">
        <h2>Docs go here</h2>
        <p>{node}</p>
      </div>
    </div>
  );
};

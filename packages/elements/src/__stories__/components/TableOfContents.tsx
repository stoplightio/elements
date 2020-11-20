import { DefaultRow, TableOfContents } from '@stoplight/ui-kit';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { projectTree, tree } from '../../__fixtures__/table-of-contents/studio';
import { TableOfContents as TocContainer } from '../../containers/TableOfContents';
import { useTocContents } from '../../hooks/useTocContents';
import { ITableOfContentsTree } from '../../types';

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
    const tocTree = object('tree', tree);
    return <TocStory tree={tocTree} />;
  })
  .add('Container', () => {
    return <TocStoryContainer />;
  })
  .add('Project ToC', () => {
    const tocTree = object('tree', projectTree);
    return <TocStory tree={tocTree} />;
  });

const TocStory: React.FC<{ tree: ITableOfContentsTree }> = ({ tree }) => {
  const [node, setNode] = React.useState('');
  const contents = useTocContents(tree).map(item => ({
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
          workspaceSlug={text('workspaceSlug', 'elements')}
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

import { DefaultRow } from '@stoplight/ui-kit';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import { ITableOfContents, TableOfContents } from './TableOfContents';

export default {
  title: 'Internal/TableOfContents',
  component: TableOfContents,
  argTypes: {
    rowComponentExtraProps: { table: { disable: true } },
  },
} as Meta<ITableOfContents<{}>>;

const TocStoryContainer: React.FC<any> = props => {
  const [node, setNode] = React.useState('');

  return (
    <div className="flex flex-row">
      <div
        style={{
          height: '100%',
          borderRight: '1px solid #E6ECF1',
          backgroundColor: '#F5F7F9',
          paddingTop: 24,
          paddingLeft: 24,
          width: 350,
        }}
      >
        <TableOfContents
          className="h-full"
          {...props}
          rowComponent={({ item, ...rest }) => {
            return (
              <DefaultRow
                item={{
                  ...item,
                  isSelected: item.to === node,
                  onClick: () => {
                    setNode(item.to ?? '');
                  },
                }}
                {...rest}
              />
            );
          }}
        />
      </div>
      <div className="flex-grow p-5">
        <h2>Docs will be displayed here</h2>
        <p>
          Current path: <em>{node}</em>
        </p>
      </div>
    </div>
  );
};

export const TocStory: Story<ITableOfContents<{}>> = args => <TocStoryContainer {...args} />;
TocStory.storyName = 'TableOfContents';
TocStory.args = {
  workspaceSlug: 'elements-examples',
  projectSlug: 'studio-demo',
};

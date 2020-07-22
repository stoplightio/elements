import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import * as React from 'react';

import { IBranchNode, INodeFilter } from '../../types';
import { matchesNodeFilter } from '../../utils/node';

export interface IContentProps {
  node: IBranchNode;
}

export interface IContentTabProps {
  title: string;
  filter?: INodeFilter;
  className?: string;
}

export const Content: React.FC<IContentProps> = ({ node, children }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const onSelect = React.useCallback((i: number) => setSelectedTab(i), [setSelectedTab]);

  const tabTitles: React.ReactNode[] = [];
  const tabPanels: React.ReactNode[] = [];

  React.Children.forEach(children, (child, index) => {
    if (isElementOfType<IContentTabProps>(child, ContentTab)) {
      if (matchesNodeFilter(node, child.props.filter)) {
        tabTitles.push(
          <SimpleTab key={index} id={`content-${child.props.title}`} className="ContentTabs-tab">
            {child.props.title}
          </SimpleTab>,
        );

        tabPanels.push(child);
      }
    } else {
      tabTitles.push(child);
    }
  });

  return (
    <SimpleTabs
      id="ContentTabs"
      className="flex flex-col flex-1 ContentTabs"
      selectedIndex={selectedTab >= tabPanels.length ? tabPanels.length - 1 : selectedTab}
      onSelect={onSelect}
    >
      <SimpleTabList className={cn('ContentTabs-list mt-6')}>{tabTitles}</SimpleTabList>

      {tabPanels}
    </SimpleTabs>
  );
};

export const ContentTab: React.FC<IContentTabProps> = ({ children }) => {
  return <SimpleTabPanel className="ContentTabs-panel">{children}</SimpleTabPanel>;
};

function isElementOfType<P = {}>(
  element: any,
  ComponentType: React.ComponentType<P>,
): element is React.ReactElement<P> {
  return (
    element != null &&
    element.type != null &&
    element.type.displayName != null &&
    element.type.displayName === ComponentType.displayName
  );
}

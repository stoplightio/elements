import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import * as React from 'react';
import { INodeInfo } from '../types';
import { ScrollContainerWrapper } from './ScrollContainerWrapper';

export interface IPageTab {
  title: string;
  content: React.ReactElement | null;
}

export interface IPageTabs {
  node: INodeInfo;
  tabs: IPageTab[];
  padding?: string;
  scrollInnerContainer?: boolean;
}

export const PageTabs: React.FC<IPageTabs> = ({ node, tabs, padding, scrollInnerContainer }) => {
  // Control tab state
  const [selectedTab, setSelectedTab] = React.useState(0);
  const onSelect = React.useCallback((i: number) => setSelectedTab(i), [setSelectedTab]);

  return (
    <SimpleTabs
      id="Page__tabs"
      className="Page__tabs flex flex-col flex-1"
      selectedIndex={selectedTab >= tabs.length ? tabs.length - 1 : selectedTab}
      onSelect={onSelect}
    >
      <SimpleTabList className={cn('Page__tabs-list mt-6', `px-${padding}`)}>
        {tabs.map((tab, index) => (
          <SimpleTab key={index} id={tab.title} className="Page__tab">
            {tab.title}
          </SimpleTab>
        ))}
      </SimpleTabList>

      {tabs.map((tab, index) => (
        <SimpleTabPanel key={index} className="Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0">
          <ScrollContainerWrapper id={node.srn} scrollInnerContainer={scrollInnerContainer} shadows>
            {tab.content}
          </ScrollContainerWrapper>
        </SimpleTabPanel>
      ))}
    </SimpleTabs>
  );
};

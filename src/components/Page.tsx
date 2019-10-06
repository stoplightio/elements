import { Dictionary, NodeType } from '@stoplight/types';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { useParsedData } from '../hooks/useParsedData';
import { Changelog, IChange } from './Changelog';
import { Docs } from './Docs';
import { IPageHeader, PageHeader } from './PageHeader';
import { TryIt } from './TryIt';

export interface IPage extends IErrorBoundary {
  type: NodeType;
  data: any;
  srn: string;

  name?: string;
  changes?: IChange[];
  tabs?: {
    [type in NodeType]?: NodeTab[];
  };
  actions?: IPageHeader['actions'];

  padding?: string;
  className?: string;
  shadows?: boolean;
  scrollInnerContainer?: boolean;
}

const ElementPage: React.FunctionComponent<IPage> = ({
  type,
  data,

  srn,
  name,
  changes,
  tabs,
  actions,

  padding = '12',
  className,
  shadows,
  scrollInnerContainer,
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const onSelect = React.useCallback((i: number) => setSelectedTab(i), [setSelectedTab]);

  const parsedData = useParsedData(type, data);

  const nodeTabs =
    {
      ...NodeTabs,
      ...tabs,
    }[type] || [];

  const pageHeader = name && (
    <PageHeader
      className={cn(`Page__header px-${padding} pt-${padding}`)}
      type={type}
      name={name}
      srn={srn}
      data={parsedData}
      actions={actions}
    />
  );

  let contentElem;
  if (nodeTabs && nodeTabs.length > 1) {
    contentElem = (
      <>
        {pageHeader}

        <SimpleTabs
          id="Page__tabs"
          className={cn('Page__tabs flex flex-col flex-1')}
          selectedIndex={selectedTab >= nodeTabs.length ? nodeTabs.length - 1 : selectedTab}
          onSelect={onSelect}
        >
          <SimpleTabList className={cn('Page__tabs-list mt-6', `px-${padding}`)}>
            {nodeTabs.includes(NodeTab.Docs) && (
              <SimpleTab id="docs" className="Page__tab">
                Docs
              </SimpleTab>
            )}

            {nodeTabs.includes(NodeTab.TryIt) && (
              <SimpleTab id="tryit" className="Page__tab">
                Try It
              </SimpleTab>
            )}

            {nodeTabs.includes(NodeTab.Changelog) && (
              <SimpleTab id="changelog" className="Page__tab">
                Changelog
              </SimpleTab>
            )}
          </SimpleTabList>

          {nodeTabs.includes(NodeTab.Docs) && (
            <SimpleTabPanel className={cn('Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows srn={srn}>
                <Docs srn={srn} type={type} data={parsedData} padding={padding} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}

          {nodeTabs.includes(NodeTab.TryIt) && (
            <SimpleTabPanel className={cn('Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows srn={srn}>
                <TryIt className={`Page__content p-${padding}`} value={parsedData} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}

          {nodeTabs.includes(NodeTab.Changelog) && (
            <SimpleTabPanel className={cn('Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows srn={srn}>
                <Changelog className={`Page__content p-${padding}`} changes={changes} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}
        </SimpleTabs>
      </>
    );
  } else {
    contentElem = (
      <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows={shadows} srn={srn}>
        {pageHeader}

        <Docs srn={srn} type={type} data={parsedData} padding={padding} />
      </ScrollContainerWrapper>
    );
  }

  return (
    <div
      className={cn('Page', className, 'flex flex-col bg-white dark:bg-transparent', {
        'overflow-hidden': scrollInnerContainer && nodeTabs && nodeTabs.length > 1,
      })}
    >
      {contentElem}
    </div>
  );
};

export const Page = withErrorBoundary<IPage>(ElementPage, ['data'], 'ElementPage');

const ScrollContainerWrapper: React.FunctionComponent<{
  scrollInnerContainer?: boolean;
  shadows?: boolean;
  srn?: string;
}> = ({ scrollInnerContainer, children, shadows = false, srn }) => {
  const [scrollbarInstance, setScrollbarInstance] = React.useState();

  React.useEffect(() => {
    if (scrollbarInstance) {
      scrollbarInstance.scrollToTop();
    }
  }, [scrollbarInstance, srn]);

  if (!scrollInnerContainer) {
    return <>{children}</>;
  }

  return (
    <ScrollContainer ref={ref => setScrollbarInstance(ref)} shadows={shadows}>
      {children}
    </ScrollContainer>
  );
};

export enum NodeTab {
  Docs = 'Docs',
  TryIt = 'TryIt',
  Changelog = 'Changelog',
}

export const NodeTabs: Dictionary<NodeTab[], NodeType> = {
  [NodeType.Article]: [NodeTab.Docs],
  [NodeType.Model]: [NodeTab.Docs],
  [NodeType.HttpOperation]: [NodeTab.Docs, NodeTab.TryIt],
  [NodeType.HttpService]: [NodeTab.Docs],
  [NodeType.HttpServer]: [NodeTab.Docs],
  [NodeType.Unknown]: [],
};

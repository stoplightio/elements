import { NodeType } from '@stoplight/types';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { Changelog } from './Changelog';
import { Dependencies } from './Dependencies';
import { Docs } from './Docs';
import { PageHeader } from './PageHeader';
import { TryIt } from './TryIt';

export interface IPage extends IErrorBoundary {
  type: NodeType;
  data: any;

  name?: string;
  srn?: string;
  version?: string;
  versions?: string[];

  padding?: string;
  className?: string;
  shadows?: boolean;
  scrollInnerContainer?: boolean;
  tabs?: {
    [type in NodeType]: string[];
  };
}

export enum IPageTabType {
  Docs = 'Docs',
  Dependencies = 'Dependencies',
  TryIt = 'TryIt',
  Changelog = 'Changelog',
}

const ElementPage: React.FunctionComponent<IPage> = ({
  type,
  name,
  srn,
  version,
  versions,
  data,
  className,
  padding = '12',
  shadows,
  scrollInnerContainer,
  tabs = {
    [NodeType.Article]: [IPageTabType.Docs],
    [NodeType.Model]: [IPageTabType.Docs, IPageTabType.Dependencies],
    [NodeType.HttpOperation]: [IPageTabType.Docs, IPageTabType.TryIt],
    [NodeType.HttpService]: [IPageTabType.Docs],
    [NodeType.HttpServer]: [IPageTabType.Docs],
  },
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const onSelect = React.useCallback((i: number) => setSelectedTab(i), [setSelectedTab]);

  const nodeTabs = tabs[type];

  const pageHeader = name && (
    <PageHeader
      className={cn(`Page__header px-${padding} pt-${padding}`)}
      type={type}
      name={name}
      srn={srn}
      version={version}
      versions={versions}
      data={data}
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
          selectedIndex={selectedTab}
          onSelect={onSelect}
        >
          <SimpleTabList className={cn('Page__tabs-list mt-6', `px-${padding}`)}>
            {nodeTabs.includes(IPageTabType.Docs) && (
              <SimpleTab id="docs" className="Page__tab">
                Docs
              </SimpleTab>
            )}

            {nodeTabs.includes(IPageTabType.Dependencies) && (
              <SimpleTab id="dependencies" className="Page__tab">
                Dependencies
              </SimpleTab>
            )}

            {nodeTabs.includes(IPageTabType.Changelog) && (
              <SimpleTab id="changelog" className="Page__tab">
                Changelog
              </SimpleTab>
            )}

            {nodeTabs.includes(IPageTabType.TryIt) && (
              <SimpleTab id="tryit" className="Page__tab">
                Try It
              </SimpleTab>
            )}
          </SimpleTabList>

          {nodeTabs.includes(IPageTabType.Docs) && (
            <SimpleTabPanel className={cn('Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows srn={srn}>
                <Docs padding={padding} type={type} data={data} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}

          {nodeTabs.includes(IPageTabType.Dependencies) && (
            <SimpleTabPanel className={cn('Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows>
                <Dependencies className={`Page__content p-${padding}`} schema={data} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}

          {nodeTabs.includes(IPageTabType.Changelog) && (
            <SimpleTabPanel className={cn('Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows srn={srn}>
                <Changelog className={`Page__content p-${padding}`} changes={[]} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}

          {nodeTabs.includes(IPageTabType.TryIt) && (
            <SimpleTabPanel className={cn('Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows srn={srn}>
                <TryIt className={`Page__content p-${padding}`} value={data} />
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

        <Docs padding={padding} type={type} data={data} />
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

import { NodeType } from '@stoplight/types';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { Changelog } from './Changelog';
import { Docs } from './Docs';
import { PageHeader } from './PageHeader';
import { TryIt } from './TryIt';

export interface IPage extends IErrorBoundary {
  type: NodeType;
  data: any;

  name?: string;
  srn?: string;

  padding?: string;
  className?: string;
  shadows?: boolean;
  scrollInnerContainer?: boolean;
}

const ElementPage: React.FunctionComponent<IPage> = ({
  type,
  name,
  srn,
  data,
  className,
  padding = '12',
  shadows,
  scrollInnerContainer,
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const onSelect = React.useCallback((i: number) => setSelectedTab(i), [setSelectedTab]);

  const nodeTabs = NodeTypeTabs[type];

  const pageHeader = name && (
    <PageHeader className={cn(`Page__header px-${padding}`)} type={type} name={name} data={data} />
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
            {nodeTabs.includes('Docs') && (
              <SimpleTab id="docs" className="Page__tab">
                Docs
              </SimpleTab>
            )}

            {nodeTabs.includes('Changelog') && (
              <SimpleTab id="changelog" className="Page__tab">
                Changelog
              </SimpleTab>
            )}

            {nodeTabs.includes('TryIt') && (
              <SimpleTab id="tryit" className="Page__tab">
                Try It
              </SimpleTab>
            )}
          </SimpleTabList>

          {nodeTabs.includes('Docs') && (
            <SimpleTabPanel className={cn('Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows srn={srn}>
                <Docs padding={padding} type={type} data={data} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}

          {nodeTabs.includes('Changelog') && (
            <SimpleTabPanel className={cn('Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows srn={srn}>
                <Changelog className={`Page__content p-${padding}`} changes={[]} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}

          {nodeTabs.includes('TryIt') && (
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

// TODO (CL): Allow to configure which tabs are shown
const NodeTypeTabs = {
  [NodeType.Article]: ['Docs'],
  [NodeType.Model]: ['Docs'],
  [NodeType.HttpOperation]: ['Docs', 'TryIt'],
  [NodeType.HttpService]: ['Docs'],
  [NodeType.HttpServer]: ['Docs'],
};

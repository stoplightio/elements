import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { useParsedData } from '../hooks/useParsedData';
import { INodeInfo } from '../types';
import { IPageHeader, PageHeader } from './PageHeader';
import { IPageTab, PageTabs } from './PageTabs';
import { ScrollContainerWrapper } from './ScrollContainerWrapper';

export interface IPage extends IErrorBoundary {
  node: INodeInfo;
  tabs(props: { node: INodeInfo }): IPageTab[];

  actions?: IPageHeader['actions'];
  padding?: string;
  className?: string;
  shadows?: boolean;
  scrollInnerContainer?: boolean;
}

const PageComponent: React.FC<IPage> = ({
  node,
  tabs,

  actions,
  padding = '12',
  className,
  shadows,
  scrollInnerContainer,
}) => {
  // Parse YAML/JSON string to an object
  const parsedData = useParsedData(node.type, node.data);
  const parsedNode = { ...node, data: parsedData };
  const pageTabs = tabs({ node: parsedNode });

  const pageHeader = (
    <PageHeader className={`Page__header px-${padding} pt-${padding}`} node={parsedNode} actions={actions} />
  );

  return (
    <div
      className={cn('Page', className, 'flex flex-col bg-white dark:bg-transparent', {
        'overflow-hidden': scrollInnerContainer && tabs && tabs.length > 1,
      })}
    >
      {pageTabs.length > 1 ? (
        <>
          {pageHeader}

          <PageTabs node={node} tabs={pageTabs} padding={padding} scrollInnerContainer={scrollInnerContainer} />
        </>
      ) : (
        <ScrollContainerWrapper id={parsedNode.srn} scrollInnerContainer={scrollInnerContainer} shadows={shadows}>
          {pageHeader}

          {tabs[0].content}
        </ScrollContainerWrapper>
      )}
    </div>
  );
};

export const Page = withErrorBoundary<IPage>(PageComponent, ['node'], 'PageComponent');

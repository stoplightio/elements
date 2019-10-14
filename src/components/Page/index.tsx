import { NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { useParsedData } from '../../hooks/useParsedData';
import { INodeInfo } from '../../types';
import { PageContainer } from './Container';
import { IPageHeader, PageHeader } from './Header';
import { IPageTab, PageTabs } from './Tabs';

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

  return (
    <div
      className={cn('Page', className, 'flex flex-col bg-white dark:bg-transparent', {
        'overflow-hidden': scrollInnerContainer && tabs && tabs.length > 1,
      })}
    >
      {pageTabs.length > 1 ? (
        <>
          <PageHeader className={`Page__header px-${padding} pt-${padding}`} node={parsedNode} actions={actions} />

          <PageTabs node={node} tabs={pageTabs} padding={padding} scrollInnerContainer={scrollInnerContainer} />
        </>
      ) : (
        <PageContainer id={parsedNode.srn} scrollInnerContainer={scrollInnerContainer} shadows={shadows}>
          {parsedNode.type !== NodeType.Article && (
            <PageHeader className={`Page__header px-${padding} pt-${padding}`} node={parsedNode} actions={actions} />
          )}

          {pageTabs[0].content}
        </PageContainer>
      )}
    </div>
  );
};

export const Page = withErrorBoundary<IPage>(PageComponent, ['node'], 'Page');

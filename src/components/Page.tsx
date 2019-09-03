import { NodeType } from '@stoplight/types';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { Changelog } from './Changelog';
import { Docs, IDocs } from './Docs';
import { PageHeader } from './PageHeader';
import { TryIt } from './TryIt';

export interface IPage extends IErrorBoundary {
  type: NodeType;
  data: any;

  name?: string;
  docs?: Pick<IDocs, 'className' | 'toc' | 'content'>;
  srn?: string;
  version?: string;
  versions?: string[];

  padding?: string;
  className?: string;
  shadows?: boolean;
  scrollInnerContainer?: boolean;
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
  docs,
  scrollInnerContainer,
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const onSelect = React.useCallback((i: number) => setSelectedTab(i), [setSelectedTab]);

  const nodeTabs = NodeTypeTabs[type];

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
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows>
                <Docs
                  className={docs && docs.className}
                  content={
                    docs
                      ? { ...docs.content, className: `Page__content p-${padding} w-full` }
                      : { className: `Page__content p-${padding} w-full` }
                  }
                  type={type}
                  data={data}
                  toc={docs && docs.toc}
                />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}

          {nodeTabs.includes('Changelog') && (
            <SimpleTabPanel className={cn('Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows>
                <Changelog className={`Page__content p-${padding}`} changes={[]} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}

          {nodeTabs.includes('TryIt') && (
            <SimpleTabPanel className={cn('Page__tab-panel flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows>
                <TryIt className={`Page__content p-${padding}`} value={data} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}
        </SimpleTabs>
      </>
    );
  } else {
    contentElem = (
      <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer} shadows={shadows}>
        {pageHeader}

        <Docs
          className={docs && docs.className}
          content={{ className: `Page__content p-${padding} w-full` }}
          type={type}
          data={data}
          toc={docs && docs.toc}
        />
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

const ScrollContainerWrapper: React.FunctionComponent<{ scrollInnerContainer?: boolean; shadows?: boolean }> = ({
  scrollInnerContainer,
  children,
  shadows = false,
}) => {
  if (!scrollInnerContainer) {
    return <>{children}</>;
  }

  return <ScrollContainer shadows={shadows}>{children}</ScrollContainer>;
};

// TODO (CL): Allow to configure which tabs are shown
const NodeTypeTabs = {
  [NodeType.Article]: ['Docs'],
  [NodeType.Model]: ['Docs'],
  [NodeType.HttpOperation]: ['Docs', 'TryIt'],
  [NodeType.HttpService]: ['Docs'],
  [NodeType.HttpServer]: ['Docs'],
};

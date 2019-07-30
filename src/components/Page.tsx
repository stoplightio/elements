import { NodeType } from '@stoplight/types';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import * as React from 'react';
import { Changelog } from './Changelog';
import { Docs } from './Docs';
import { PageHeader } from './PageHeader';
import { TryIt } from './TryIt';

export interface IPage {
  type: NodeType;
  name: string;
  data: any;

  srn?: string;
  version?: string;
  versions?: string[];

  padding?: string;
  className?: string;
  scrollInnerContainer?: boolean;
}

export const Page: React.FunctionComponent<IPage> = ({
  type,
  name,
  srn,
  version,
  versions,
  data,
  className,
  padding = '10',
  scrollInnerContainer,
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const onSelect = React.useCallback((i: number) => setSelectedTab(i), [setSelectedTab]);

  const nodeTabs = NodeTypeTabs[type];

  return (
    <div
      className={cn('Page', className, 'flex flex-col bg-white dark:bg-transparent', {
        'overflow-hidden': scrollInnerContainer && nodeTabs && nodeTabs.length > 1,
      })}
    >
      <PageHeader
        className={cn(`px-${padding} pt-${padding}`)}
        type={type}
        name={name}
        srn={srn}
        version={version}
        versions={versions}
        data={data}
      />

      {nodeTabs && nodeTabs.length > 1 ? (
        <SimpleTabs
          id="Page__Tabs"
          className={cn('Page__Tabs flex flex-col flex-1')}
          selectedIndex={selectedTab}
          onSelect={onSelect}
        >
          <SimpleTabList className={cn('mt-6', `px-${padding}`)}>
            {nodeTabs.includes('Docs') && <SimpleTab id="Page__Tabs-docs">Docs</SimpleTab>}

            {nodeTabs.includes('Changelog') && <SimpleTab id="Page__Tabs-changelog">Changelog</SimpleTab>}

            {nodeTabs.includes('TryIt') && <SimpleTab id="Page__Tabs-try-it">Try It</SimpleTab>}
          </SimpleTabList>

          {nodeTabs.includes('Docs') && (
            <SimpleTabPanel className={cn('flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer}>
                <Docs className={`p-${padding}`} type={type} data={data} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}

          {nodeTabs.includes('Changelog') && (
            <SimpleTabPanel className={cn('flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer}>
                <Changelog className={`p-${padding}`} changes={[]} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}

          {nodeTabs.includes('TryIt') && (
            <SimpleTabPanel className={cn('flex-1 border-l-0 border-r-0 border-b-0')}>
              <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer}>
                <TryIt className={`p-${padding}`} value={data} />
              </ScrollContainerWrapper>
            </SimpleTabPanel>
          )}
        </SimpleTabs>
      ) : (
        <ScrollContainerWrapper scrollInnerContainer={scrollInnerContainer}>
          <Docs className={cn(`p-${padding}`)} type={type} data={data} />
        </ScrollContainerWrapper>
      )}
    </div>
  );
};

const ScrollContainerWrapper: React.FunctionComponent<{ scrollInnerContainer?: boolean }> = ({
  scrollInnerContainer,
  children,
}) => {
  if (!scrollInnerContainer) {
    return <>{children}</>;
  }

  return <ScrollContainer>{children}</ScrollContainer>;
};

// TODO (CL): Allow to configure which tabs are shown
const NodeTypeTabs = {
  [NodeType.Article]: ['Docs'],
  [NodeType.Model]: ['Docs'],
  [NodeType.HttpOperation]: ['Docs', 'TryIt'],
  [NodeType.HttpService]: ['Docs'],
  [NodeType.HttpServer]: ['Docs'],
};

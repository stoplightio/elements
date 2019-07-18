import { NodeType } from '@stoplight/types';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import * as React from 'react';
import { Changelog } from './Changelog';
import { Docs } from './Docs';
import { PageHeader } from './PageHeader';

export interface IPage {
  srn: string;
  type: NodeType;
  name: string;
  summary: string;
  version: string;
  data: any;

  className?: string;
}

export const Page: React.FunctionComponent<IPage> = ({ type, name, version, data, className }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const onSelect = React.useCallback((i: number) => setSelectedTab(i), [setSelectedTab]);

  const nodeTabs = NodeTypeTabs[type];

  return (
    <div
      className={cn('Page', className, 'bg-white dark:bg-transparent', {
        'overflow-auto': !nodeTabs.length,
      })}
    >
      {nodeTabs.length > 0 ? (
        <>
          <PageHeader className="py-12 px-20" name={name} version={version} />

          <SimpleTabs
            id="page-tabs"
            className="Page-tabs flex flex-col flex-1"
            selectedIndex={selectedTab}
            onSelect={onSelect}
          >
            <SimpleTabList className="mx-20">
              {nodeTabs.includes('Docs') && <SimpleTab id="docs-tab">Docs</SimpleTab>}

              {nodeTabs.includes('Changelog') && <SimpleTab id="changelog-tab">Changelog</SimpleTab>}
            </SimpleTabList>

            {nodeTabs.includes('Docs') && (
              <SimpleTabPanel className="flex-1 border-l-0 border-r-0 border-b-0 h-full overflow-auto">
                <Docs className="pt-10 px-20" type={type} data={data} />
              </SimpleTabPanel>
            )}

            {nodeTabs.includes('Changelog') && (
              <SimpleTabPanel className="flex-1 border-l-0 border-r-0 border-b-0 h-full overflow-auto">
                <Changelog className="pt-10 px-20" changes={[]} />
              </SimpleTabPanel>
            )}
          </SimpleTabs>
        </>
      ) : (
        <Docs className="py-12 px-20" type={type} data={data} />
      )}
    </div>
  );
};

const NodeTypeTabs = {
  [NodeType.HttpOperation]: ['Docs', 'Changelog'],
  [NodeType.Model]: ['Docs', 'Changelog'],
  [NodeType.HttpService]: ['Docs', 'Changelog'],
  [NodeType.Article]: [],
  [NodeType.HttpServer]: [],
};

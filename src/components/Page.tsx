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
    <div className={cn('Page', className, 'bg-white dark:bg-transparent')}>
      {nodeTabs.length > 0 ? (
        <>
          <PageHeader className="pt-16 px-16" name={name} version={version} />

          <SimpleTabs
            id="page-tabs"
            className="Page-tabs flex flex-col flex-1 mt-6"
            selectedIndex={selectedTab}
            onSelect={onSelect}
          >
            <SimpleTabList className="mx-16">
              {nodeTabs.includes('Docs') && <SimpleTab id="docs-tab">Docs</SimpleTab>}

              {nodeTabs.includes('Changelog') && <SimpleTab id="changelog-tab">Changelog</SimpleTab>}
            </SimpleTabList>

            {nodeTabs.includes('Docs') && (
              <SimpleTabPanel className="flex-1 border-l-0 border-r-0 border-b-0">
                <Docs className="p-16" type={type} data={data} />
              </SimpleTabPanel>
            )}

            {nodeTabs.includes('Changelog') && (
              <SimpleTabPanel className="flex-1 border-l-0 border-r-0 border-b-0">
                <Changelog className="p-16" changes={[]} />
              </SimpleTabPanel>
            )}
          </SimpleTabs>
        </>
      ) : (
        <Docs className="p-16" type={type} data={data} />
      )}
    </div>
  );
};

const NodeTypeTabs = {
  [NodeType.HttpOperation]: ['Docs', 'Changelog'],
  [NodeType.Model]: ['Docs', 'Changelog'],
  [NodeType.HttpService]: [],
  [NodeType.Article]: [],
  [NodeType.HttpServer]: [],
};

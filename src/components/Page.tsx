import { NodeType } from '@stoplight/types';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import * as React from 'react';
import { Changelog } from './Changelog';
import { Docs } from './Docs';
import { PageHeader } from './PageHeader';

export interface IPage {
  type: NodeType;
  srn: string;
  name: string;
  version: string;
  data: any;

  versions?: string[];
  tabs?: boolean | string[];
  className?: string;
}

export const Page: React.FunctionComponent<IPage> = ({ type, name, version, versions, data, className, tabs }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const onSelect = React.useCallback((i: number) => setSelectedTab(i), [setSelectedTab]);

  const nodeTabs = NodeTypeTabs[type];

  return (
    <div className={cn('Page', className, 'bg-white dark:bg-transparent')}>
      <PageHeader className="mt-12 mx-20" type={type} name={name} version={version} versions={versions} data={data} />

      {tabs ? (
        <SimpleTabs
          id="page-tabs"
          className="Page-tabs flex flex-col flex-1"
          selectedIndex={selectedTab}
          onSelect={onSelect}
        >
          <SimpleTabList className="m-20">
            {nodeTabs.includes('Docs') && <SimpleTab id="docs-tab">Docs</SimpleTab>}

            {nodeTabs.includes('Changelog') && <SimpleTab id="changelog-tab">Changelog</SimpleTab>}
          </SimpleTabList>

          {nodeTabs.includes('Docs') && (
            <SimpleTabPanel className="flex-1 border-l-0 border-r-0 border-b-0 border-t-0 h-full">
              <Docs className="my-12 mx-20" type={type} data={data} />
            </SimpleTabPanel>
          )}

          {nodeTabs.includes('Changelog') && (
            <SimpleTabPanel className="flex-1 border-l-0 border-r-0 border-b-0 border-t-0 h-full">
              <Changelog className="my-12 mx-20" changes={[]} />
            </SimpleTabPanel>
          )}
        </SimpleTabs>
      ) : (
        <Docs className="my-12 mx-20" type={type} data={data} />
      )}
    </div>
  );
};

// TODO (CL): Add Docs, Changelog, and Try It Out tabs
const NodeTypeTabs = {
  [NodeType.Article]: ['Docs'],
  [NodeType.Model]: ['Docs'],
  [NodeType.HttpOperation]: ['Docs'],
  [NodeType.HttpService]: ['Docs'],
  [NodeType.HttpServer]: ['Docs'],
};

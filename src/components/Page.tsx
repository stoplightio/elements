import { NodeType } from '@stoplight/types';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import * as React from 'react';
import { Changelog } from './Changelog';
import { Docs } from './Docs';
import { HttpRequest } from './HttpRequest';
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
      <PageHeader
        className="mt-10 mx-10 px-10 max-w-6xl"
        type={type}
        name={name}
        version={version}
        versions={versions}
        data={data}
      />

      {nodeTabs && nodeTabs.length > 1 ? (
        <SimpleTabs
          id="page-tabs"
          className="Page-tabs flex flex-col flex-1"
          selectedIndex={selectedTab}
          onSelect={onSelect}
        >
          <SimpleTabList className="mt-6 mx-10 px-10">
            {nodeTabs.includes('Docs') && <SimpleTab id="docs-tab">Docs</SimpleTab>}

            {nodeTabs.includes('Changelog') && <SimpleTab id="changelog-tab">Changelog</SimpleTab>}

            {nodeTabs.includes('Try It') && <SimpleTab id="try-it-tab">Try It</SimpleTab>}
          </SimpleTabList>

          {nodeTabs.includes('Docs') && (
            <SimpleTabPanel className="flex-1 border-l-0 border-r-0 border-b-0">
              <Docs className="my-12 mx-10 px-10 max-w-6xl" type={type} data={data} />
            </SimpleTabPanel>
          )}

          {nodeTabs.includes('Changelog') && (
            <SimpleTabPanel className="flex-1 border-l-0 border-r-0 border-b-0">
              <Changelog className="my-12 mx-10 px-10 max-w-6xl" changes={[]} />
            </SimpleTabPanel>
          )}

          {nodeTabs.includes('Try It') && (
            <SimpleTabPanel className="flex-1 border-l-0 border-r-0 border-b-0">
              <HttpRequest className="my-12 mx-10 px-10 max-w-6xl" value={data} />
            </SimpleTabPanel>
          )}
        </SimpleTabs>
      ) : (
        <Docs className="my-12 mx-10 px-10 max-w-6xl" type={type} data={data} />
      )}
    </div>
  );
};

// TODO (CL): Add Docs, Changelog, and Try It Out tabs
const NodeTypeTabs = {
  [NodeType.Article]: ['Docs'],
  [NodeType.Model]: ['Docs'],
  [NodeType.HttpOperation]: ['Docs', 'Try It'],
  [NodeType.HttpService]: ['Docs'],
  [NodeType.HttpServer]: ['Docs'],
};

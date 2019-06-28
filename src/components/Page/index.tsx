import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import * as React from 'react';

import { NodeType } from '../../utils/node';
import { Changelog } from '../Changelog';
import { Docs } from '../Docs';
import { PageHeader } from '../PageHeader';

export interface IPage {
  srn: string;
  type: NodeType;
  name: string;
  summary: string;
  version: string;
  data: any;
  tabs: Array<'Docs' | 'Changelog'>;

  className?: string;
}

export const Page: React.FunctionComponent<IPage> = ({
  srn,
  type,
  name,
  summary,
  version,
  data,
  className,
  tabs = [],
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  return (
    <div className={className}>
      <PageHeader className="px-10" type={type} name={name} summary={summary} version={version} data={data} />

      {tabs && tabs.length > 0 && (
        <SimpleTabs
          id="page-tabs"
          className="Page-tabs flex flex-col flex-1 mt-6"
          selectedIndex={selectedTab}
          onSelect={(i: number) => setSelectedTab(i)}
        >
          <SimpleTabList className="mx-10">
            {tabs.includes('Docs') && <SimpleTab id="docs-tab">Docs</SimpleTab>}

            {tabs.includes('Changelog') && <SimpleTab id="changelog-tab">Changelog</SimpleTab>}
          </SimpleTabList>

          {tabs.includes('Docs') && (
            <SimpleTabPanel className="flex-1 border-l-0 border-r-0 border-b-0">
              <ScrollContainer className="bg-white dark:bg-transparent h-full">
                <Docs className="m-10" type={type} data={data} />
              </ScrollContainer>
            </SimpleTabPanel>
          )}

          {tabs.includes('Changelog') && (
            <SimpleTabPanel className="flex-1 border-l-0 border-r-0 border-b-0">
              <Changelog className="m-10" changes={[]} />
            </SimpleTabPanel>
          )}
        </SimpleTabs>
      )}
    </div>
  );
};

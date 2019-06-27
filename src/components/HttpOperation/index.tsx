import { IHttpOperation } from '@stoplight/types';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { Changelog } from '../Changelog';
import { Info } from './Info';
import { Request } from './Request';
import { Responses } from './Responses';

export interface IHttpOperationProps extends IErrorBoundary {
  className?: string;
  value: IHttpOperation;
}

const HttpOperationComponent: React.FunctionComponent<IHttpOperationProps> = ({ className, value }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  if (typeof value !== 'object' || value === null) {
    throw new TypeError(
      `Expected http operation value to be an object but received ${value === null ? 'null' : typeof value}`,
    );
  }

  return (
    <div className={cn('HttpOperation flex flex-col h-full bg-gray-1', className)}>
      <Info
        method={value.method}
        path={value.path}
        summary={value.summary}
        description={value.description}
        servers={value.servers}
      />

      <SimpleTabs
        id="node-tabs"
        className="NodeReadView-tabs flex flex-col flex-1 -mx-10 mt-6"
        selectedIndex={selectedTab}
        onSelect={(index: number) => setSelectedTab(index)}
      >
        <SimpleTabList className="ml-10">
          <SimpleTab id="docs-tab">Docs</SimpleTab>
          <SimpleTab id="changelog-tab">Changelog</SimpleTab>
        </SimpleTabList>

        <SimpleTabPanel className="flex-1">
          <ScrollContainer className="bg-white dark:bg-transparent h-full">
            <div className="px-10 pb-10">
              <Request request={value.request} />

              <Responses responses={value.responses} />
            </div>
          </ScrollContainer>
        </SimpleTabPanel>

        <SimpleTabPanel className="flex-1">
          <Changelog className="p-10" changes={[]} />
        </SimpleTabPanel>
      </SimpleTabs>
    </div>
  );
};
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<IHttpOperationProps>(HttpOperationComponent, ['value'], 'HttpOperation');

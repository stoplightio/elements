import { NonIdealState } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';
import { IPage, Page as PageComponent } from '../components/Page';
import { PageSkeleton } from '../components/Page/Skeleton';
import { useNodeInfo } from '../hooks/useNodeInfo';

export interface IPageContainer {
  srn: string;
  tabs: IPage['tabs'];

  group?: string;
  version?: string;
  actions?: IPage['actions'];
  padding?: string;
  className?: string;
  shadows?: boolean;
  scrollInnerContainer?: boolean;
}

export const Page: React.FC<IPageContainer> = ({
  srn,
  tabs,

  group,
  version,
  actions,
  padding = '12',
  shadows,
  className,
  scrollInnerContainer,
}) => {
  const { isValidating, error, data } = useNodeInfo(srn, { group, version });
  const containerClassName = cn(className, 'flex flex-col h-full');

  if (isValidating) {
    return <PageSkeleton className={className} padding={padding} />;
  }

  if (error) {
    console.error('Error getting page data for srn:', srn, error);

    // Only show error message if we don't have any cached data
    if (!data) {
      return (
        <div className={containerClassName}>
          <NonIdealState
            icon="error"
            title="Something went wrong!"
            description={error ? error.message : String(error)}
          />
        </div>
      );
    }
  }

  if (!data) {
    return (
      <div className={containerClassName}>
        <NonIdealState icon="help" title="404 Not Found" description="It looks like this page doesn't exist" />
      </div>
    );
  }

  return (
    <PageComponent
      node={data}
      group={group}
      tabs={tabs}
      actions={actions}
      padding={padding}
      shadows={shadows}
      className={containerClassName}
      scrollInnerContainer={scrollInnerContainer}
    />
  );
};

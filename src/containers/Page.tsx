import { NonIdealState } from '@blueprintjs/core';
import { safeParse } from '@stoplight/json';
import cn from 'classnames';
import * as React from 'react';
import { IPage, Page as PageComponent } from '../components/Page';
import { PageSkeleton } from '../components/PageSkeleton';
import { useNodeInfo } from '../hooks/useNodeInfo';

export interface IPageContainer {
  srn: string;

  tabs?: IPage['tabs'];
  actions?: IPage['actions'];
  padding?: string;
  className?: string;
  shadows?: boolean;
  scrollInnerContainer?: boolean;
}

export const Page: React.FunctionComponent<IPageContainer> = ({
  srn,
  tabs,
  actions,
  padding = '12',
  className,
  shadows,
  scrollInnerContainer,
}) => {
  const { isLoading, error, data } = useNodeInfo(srn);
  const containerClassName = cn(className, 'flex flex-col h-full');

  if (isLoading) {
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

  const { type, name, data: nodeData } = data;

  return (
    <PageComponent
      srn={srn}
      type={type}
      name={name}
      data={safeParse(nodeData) || nodeData}
      tabs={tabs}
      actions={actions}
      padding={padding}
      className={containerClassName}
      shadows={shadows}
      scrollInnerContainer={scrollInnerContainer}
    />
  );
};

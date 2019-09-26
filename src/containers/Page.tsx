import { NonIdealState } from '@blueprintjs/core';
import { safeParse } from '@stoplight/json';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';
import { NodeTab, Page as PageComponent } from '../components/Page';
import { PageSkeleton } from '../components/PageSkeleton';
import { useNodeInfo } from '../hooks/useNodeInfo';

export interface IPage {
  srn: string;

  scrollInnerContainer?: boolean;
  className?: string;
  padding?: string;
  tabs?: {
    [type in NodeType]?: NodeTab[];
  };
}

export const Page: React.FunctionComponent<IPage> = ({ srn, className, scrollInnerContainer, padding = '12' }) => {
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
      className={containerClassName}
      srn={srn}
      type={type}
      name={name}
      data={safeParse(nodeData) || nodeData}
      scrollInnerContainer={scrollInnerContainer}
      padding={padding}
    />
  );
};

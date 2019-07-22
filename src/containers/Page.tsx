import { Classes } from '@blueprintjs/core';
import { safeParse } from '@stoplight/json';
import cn from 'classnames';
import * as React from 'react';

import { Page as PageComponent } from '../components/Page';
import { useNodeInfo } from '../hooks/useNodeInfo';

export interface IPage {
  srn: string;

  version?: string;
  className?: string;
}

export const Page: React.FunctionComponent<IPage> = ({ srn, version: semver, className }) => {
  const res = useNodeInfo(srn, semver);
  const containerClassName = cn(className, 'flex flex-col h-full');

  if (res.isLoading || res.error) {
    console.error(res.error);
    return <PageSkeleton className={className} />;
  }

  if (!res.data) {
    return <div className={containerClassName}>Not Found</div>;
  }

  const { type, name, summary, version, data } = res.data;

  return (
    <PageComponent
      className={containerClassName}
      srn={srn}
      type={type}
      name={name}
      summary={summary}
      version={version}
      data={safeParse(data) || data}
    />
  );
};

export const PageSkeleton: React.FunctionComponent<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('PageSkeleton', className, 'flex flex-col h-full p-10')}>
      <div className={cn(Classes.SKELETON, 'h-12 w-1/5')} />
      <div className={cn(Classes.SKELETON, 'h-12 my-6')} />
      <div className={cn(Classes.SKELETON, 'flex-1 my-6')} />
    </div>
  );
};

import { Classes } from '@blueprintjs/core';
import { safeParse } from '@stoplight/json';
import cn from 'classnames';
import * as React from 'react';

import { Page as Component } from '../components/Page';
import { useNodeInfo } from '../hooks/useNodeInfo';

export interface IPage {
  srn: string;

  scrollInnerContainer?: boolean;
  version?: string;
  className?: string;
  padding?: string;
}

export const PageComponent = Component;

export const Page: React.FunctionComponent<IPage> = ({
  srn,
  version: semver,
  className,
  scrollInnerContainer,
  padding = '10',
}) => {
  const res = useNodeInfo(srn, semver);
  const containerClassName = cn(className, 'flex flex-col h-full');

  if (res.isLoading || res.error) {
    console.error(res.error);
    return <PageSkeleton className={className} padding={padding} />;
  }

  if (!res.data) {
    return <div className={containerClassName}>Not Found</div>;
  }

  const { type, name, version, versions, data } = res.data;

  return (
    <PageComponent
      className={containerClassName}
      srn={srn}
      type={type}
      name={name}
      version={version}
      versions={versions}
      data={safeParse(data) || data}
      scrollInnerContainer={scrollInnerContainer}
      padding={padding}
    />
  );
};

export const PageSkeleton: React.FunctionComponent<{ className?: string; padding?: string }> = ({
  className,
  padding = '10',
}) => {
  return (
    <div className={cn('PageSkeleton', className, `p-${padding}`, 'flex flex-col h-full')}>
      <div className={cn(Classes.SKELETON, 'h-12 w-1/5')} />
      <div className={cn(Classes.SKELETON, 'h-12 my-6')} />
      <div className={cn(Classes.SKELETON, 'flex-1 my-6')} />
    </div>
  );
};

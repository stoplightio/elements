import { NonIdealState } from '@blueprintjs/core';
import { safeParse } from '@stoplight/json';
import cn from 'classnames';
import * as React from 'react';
import { Page as PageComponent } from '../components/Page';
import { PageSkeleton } from '../components/PageSkeleton';
import { PageToc } from '../components/PageToc';
import { useNodeInfo } from '../hooks/useNodeInfo';
import { computePageToc } from '../utils/toc';

export interface IPage {
  srn: string;

  scrollInnerContainer?: boolean;
  version?: string;
  className?: string;
  padding?: string;
  toc?: boolean;
}

export const Page: React.FunctionComponent<IPage> = ({
  srn,
  version: semver,
  className,
  scrollInnerContainer,
  padding = '10',
  toc = true,
}) => {
  const { isLoading, error, data } = useNodeInfo(srn, semver);
  const containerClassName = cn(className, 'flex h-full');

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

  const { type, name, version, versions, data: nodeData } = data;
  const headings = computePageToc(nodeData);

  return (
    <div className={containerClassName}>
      <PageComponent
        className="flex flex-1 flex-col h-full"
        srn={srn}
        type={type}
        name={name}
        version={version}
        versions={versions}
        data={safeParse(nodeData) || nodeData}
        scrollInnerContainer={scrollInnerContainer}
        padding={padding}
      />
      {toc && !!headings.length && <PageToc headings={headings} />}
    </div>
  );
};

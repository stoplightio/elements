import { NonIdealState } from '@blueprintjs/core';
import { safeParse } from '@stoplight/json';
import cn from 'classnames';
import * as React from 'react';
import { IDocs, IDocsToc } from '..';
import { PageSkeleton } from '..';
import { useNodeInfo } from '..';
import { Page as PageComponent } from '../components/Page';

export interface IPage {
  srn: string;

  scrollInnerContainer?: boolean;
  version?: string;
  className?: string;
  padding?: string;

  docs?: Pick<IDocs, 'className'>;
  docsToc?: IDocsToc;
}

export const Page: React.FunctionComponent<IPage> = ({
  srn,
  version: semver,
  className,
  scrollInnerContainer,
  padding = '12',
  docs,
  docsToc,
}) => {
  const { isLoading, error, data } = useNodeInfo(srn, semver);
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

  const { type, name, version, versions, data: nodeData } = data;

  return (
    <PageComponent
      className={containerClassName}
      srn={srn}
      type={type}
      name={name}
      version={version}
      versions={versions}
      data={safeParse(nodeData) || nodeData}
      scrollInnerContainer={scrollInnerContainer}
      padding={padding}
      docs={docs}
      docsToc={docsToc}
    />
  );
};

import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { NodeType } from '../../utils/node';
import { Info } from '../HttpOperation/Info';

export interface IPageHeader {
  type: NodeType;
  name: string;
  data: any;
  version: string;

  summary?: string;
  className?: string;
}

export const PageHeader: React.FunctionComponent<IPageHeader> = ({ type, name, summary, version, data, className }) => {
  if (type === 'http_operation') {
    return (
      <div className={className}>
        <Info
          method={data.method}
          path={data.path}
          summary={data.summary}
          description={data.description}
          servers={data.servers}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className={cn(Classes.HEADING, 'mt-4')}>{name}</h2>

      <div className={cn(Classes.TEXT_MUTED, 'pb-4')}>{summary}</div>
    </div>
  );
};

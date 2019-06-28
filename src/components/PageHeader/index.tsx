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
  return (
    <div className={cn(className, 'mt-4')} style={{ maxWidth: 1000 }}>
      {type === 'http_operation' ? (
        <Info
          method={data.method}
          path={data.path}
          summary={data.summary}
          description={data.description}
          servers={data.servers}
        />
      ) : (
        <>
          <h2 className={cn(Classes.HEADING)}>{name}</h2>

          <div className={cn(Classes.TEXT_MUTED, 'pb-4')}>{summary}</div>
        </>
      )}
    </div>
  );
};

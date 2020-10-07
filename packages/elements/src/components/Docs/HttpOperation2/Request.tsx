import { HttpSecurityScheme } from '@stoplight/types';
import cn from 'classnames';
import { flatten } from 'lodash';
import * as React from 'react';

import { IRequest } from '../../../AST/Request';
import { HttpSecuritySchemes } from '../HttpSecuritySchemes';
import { Body } from './Body';
import { Parameters } from './Parameters';
import { useSelection } from './utils';

export interface IRequestProps {
  data?: IRequest;
  security?: HttpSecurityScheme[][];
  className?: string;
}

export const Request: React.FunctionComponent<IRequestProps> = ({ data, security, className }) => {
  const selection = useSelection(data);
  if (!data) return null;

  return (
    <div className={cn('HttpOperation__Request', className)} {...selection}>
      <HttpSecuritySchemes className="mb-10" title="Authorization" securities={flatten(security)} />
      {data.children.map(child => {
        switch (child.type) {
          case 'pathParams':
          case 'queryParams':
          case 'cookieParams':
          case 'headerParams':
            return <Parameters data={child} />;
          case 'requestBody':
            return <Body className="mb-10" body={child} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
Request.displayName = 'HttpOperation.Request';

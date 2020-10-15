import { HttpSecurityScheme, IHttpOperationRequest } from '@stoplight/types';
import cn from 'classnames';
import { flatten } from 'lodash';
import * as React from 'react';

import { editHandle } from '../../../constants';
import { useClick } from '../../../hooks/useClick';
import { WithIds } from '../../../YAST/YjsifyClassic';
import { HttpSecuritySchemes } from '../HttpSecuritySchemes';
import { Body } from './Body';
import { Parameters } from './Parameters';

export interface IRequestProps {
  request?: WithIds<IHttpOperationRequest>;
  security?: HttpSecurityScheme[][];
  className?: string;
}

export const Request: React.FunctionComponent<IRequestProps> = ({ request, security, className }) => {
  const onClick = useClick(request || {});
  const onPathClick = useClick(request || {}, 'path');
  const onQueryClick = useClick(request || {}, 'query');
  const onCookieClick = useClick(request || {}, 'cookie');
  const onHeadersClick = useClick(request || {}, 'headers');
  if (!request || typeof request !== 'object') return null;

  const { path, headers, query, cookie, body } = request;

  return (
    <div className={cn('HttpOperation__Request', className)} {...editHandle(request)} onClick={onClick}>
      <HttpSecuritySchemes className="mb-10" title="Authorization" securities={flatten(security)} />

      <Parameters
        className="mb-10"
        title="Path Parameters"
        parameterType="path"
        parameters={path}
        onClick={onPathClick}
      />
      <Parameters
        className="mb-10"
        title="Query Parameters"
        parameterType="query"
        parameters={query}
        onClick={onQueryClick}
      />
      <Parameters
        className="mb-10"
        title="Cookie Parameters"
        parameterType="cookie"
        parameters={cookie}
        onClick={onCookieClick}
      />
      <Parameters
        className="mb-10"
        title="Header Parameters"
        parameterType="header"
        parameters={headers}
        onClick={onHeadersClick}
      />

      {body && <Body className="mb-10" body={body} />}
    </div>
  );
};
Request.displayName = 'HttpOperation.Request';

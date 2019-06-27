import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpOperation } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

export const HttpMethodColors: { [method: string]: string } = {
  get: 'success',
  post: 'primary',
  put: 'warning',
  patch: 'warning',
  delete: 'danger',
};

export interface IInfoProps extends Pick<IHttpOperation, 'method' | 'path' | 'summary' | 'description' | 'servers'> {
  className?: string;
}

export const Info: React.FunctionComponent<IInfoProps> = ({
  method,
  path,
  summary,
  description,
  servers,
  className,
}) => {
  if (!servers || !servers.length) return null;

  // TODO (CL): Support multiple servers
  const host = servers[0] && servers[0].url;
  return (
    <div className={className}>
      <div className="flex items-center">
        <Method className="mr-4" method={method} />

        {summary ? (
          <div title={summary} className="flex-1 text-2xl text-semibold truncate select-all">
            {summary}
          </div>
        ) : (
          <Path host={host} path={path} />
        )}
      </div>

      {summary && <Path className="mt-6" host={host} path={path} />}

      {description && <MarkdownViewer className="mt-10" markdown={description} />}
    </div>
  );
};
Info.displayName = 'HttpOperation.Info';

export const Method: React.FunctionComponent<{ className?: string; method: string }> = ({ className, method }) => {
  return (
    <span
      className={cn(
        className,
        'bp3-tag bp3-round',
        HttpMethodColors[method] ? `bp3-intent-${HttpMethodColors[method]}` : '',
      )}
    >
      <span className="bp3-text-overflow-ellipsis bp3-fill flex items-center text-xl p-2">{method.toUpperCase()}</span>
    </span>
  );
};

export const Path: React.FunctionComponent<{ className?: string; host?: string; path: string }> = ({
  className,
  host,
  path,
}) => {
  if (!host && !path) return null;

  return (
    <div className={cn(className, 'inline-flex items-center bg-darken-2 py-2 px-3 rounded select-all')}>
      {host && <div className="text-darken-7 dark:text-gray-6 mr-1">{host}</div>}
      <div className="font-semibold">{path}</div>
    </div>
  );
};

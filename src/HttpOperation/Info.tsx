import * as React from 'react';

import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpOperation } from '@stoplight/types';

export const HttpMethodColors: { [method: string]: string } = {
  get: 'success',
  post: 'info',
  put: 'gray',
  patch: 'warning',
  delete: 'danger',
};

export interface IInfoProps extends Pick<IHttpOperation, 'method' | 'path' | 'summary' | 'description' | 'servers'> {}

export const Info: React.FunctionComponent<IInfoProps> = ({ method, path, summary, description, servers }) => {
  if (!servers || !servers.length) return null;

  // TODO (CL): Support multiple servers
  const host = servers[0].url;
  return (
    <div>
      <div className="flex items-center">
        <span className={`bp3-tag bp3-round mr-4 bg-${HttpMethodColors[method] || 'gray'}`}>
          <span className="bp3-text-overflow-ellipsis bp3-fill flex items-center text-xl p-2">
            {method.toUpperCase()}
          </span>
        </span>

        <div title={summary} className="flex-1 text-2xl text-semibold truncate select-all">
          {summary}
        </div>
      </div>

      <div className="inline-flex items-center mt-6 bg-darken-2 py-2 px-3 rounded select-all">
        <div className="text-darken-7 mr-1">{host}</div>
        <div className="font-semibold">{path}</div>
      </div>

      {description && <MarkdownViewer className="mt-10" markdown={description} />}
    </div>
  );
};
Info.displayName = 'HttpOperation.Info';

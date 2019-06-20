import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpService } from '@stoplight/types';
import { HTMLTable } from '@stoplight/ui-kit';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

export interface IHttpServiceProps extends IErrorBoundary {
  className?: string;
  value: IHttpService;
}

export const HttpServiceComponent: React.FunctionComponent<IHttpServiceProps> = ({ className, value }) => {
  if (!value) return null;

  return (
    <div className={cn('HttpService', className)}>
      <div className="flex items-center">
        {value.version && (
          <div className="bp3-tag bg-blue text-xl text-semibold truncate p-2 select-all">{value.version}</div>
        )}

        <div className="ml-4 flex-1 text-2xl text-semibold truncate select-all">{value.name || 'Http Service'}</div>
      </div>

      {value.description && <MarkdownViewer className="mt-6" markdown={value.description} />}

      {value.servers && value.servers.length > 0 ? (
        <HTMLTable className="mt-10" striped>
          <thead>
            <tr>
              <th className="select-none">Servers</th>
            </tr>
          </thead>

          <tbody>
            {value.servers.map((server, index) => (
              <tr key={index}>
                <td>
                  <a href={server.url} target="_blank">
                    {server.url}
                  </a>
                </td>

                {server.name && (
                  <td>
                    <div className="text-right">
                      <div className="bp3-tag bp3-minimal select-all">{server.name}</div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      ) : null}

      {value.securitySchemes && <div className="mt-10 text-lg font-semibold select-none">Security Schemes</div>}

      {value.contact && (
        <div className="mt-10">
          <div className="text-lg font-semibold select-none">Contact</div>

          <div className="mt-4">
            <a href={`mailto:${value.contact.email}`}>{value.contact.email}</a>
          </div>

          <div className="mt-4">{value.contact.url && <a href={value.contact.url}> {value.contact.url}</a>}</div>
        </div>
      )}

      {value.license && (
        <div className="mt-4">
          Licensed under{' '}
          {value.license.url ? (
            <a href={value.license.url}>{value.license.name || value.license.url}</a>
          ) : (
            <span>{value.license.name}</span>
          )}
        </div>
      )}
    </div>
  );
};
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<IHttpServiceProps>(HttpServiceComponent, ['value'], 'HttpService');

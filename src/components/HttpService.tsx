import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpService } from '@stoplight/types';
import { Card, HTMLTable } from '@stoplight/ui-kit';
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
      {value.description && <MarkdownViewer className="mb-12" markdown={value.description} />}

      {value.servers && value.servers.length > 0 ? (
        <div className="mb-12">
          <div className="text-xl font-semibold select-none mb-6">Servers</div>

          <div className="flex items-center">
            {value.servers.map((server, index) => (
              <a className="mr-6 text-center" href={server.url} target="_blank">
                <Card interactive key={index}>
                  <div className="font-semibold">{server.name}</div>
                  <div className="mt-2">{server.description}</div>
                  <div className="mt-2">{server.url}</div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {value.securitySchemes && <div className="mb-12 text-xl font-semibold select-none">Security Schemes</div>}

      {value.contact && (
        <div className="mb-12">
          <div className="text-xl font-semibold select-none">Contact</div>

          <div className="mt-4">
            <a href={`mailto:${value.contact.email}`}>{value.contact.email}</a>
          </div>

          {value.contact.url && (
            <a className="block mt-4" href={value.contact.url}>
              {' '}
              {value.contact.url}
            </a>
          )}
        </div>
      )}

      {value.license && (
        <div>
          <div className="text-xl font-semibold select-none mb-4">License</div>

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

import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpService, NodeType } from '@stoplight/types';
import { Card } from '@stoplight/ui-kit';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { useResolver } from '../hooks/useResolver';

export interface IHttpServiceProps extends IErrorBoundary {
  className?: string;
  value: any;
}

export const HttpServiceComponent: React.FunctionComponent<IHttpServiceProps> = ({ className, value }) => {
  const { result } = useResolver<IHttpService>(NodeType.HttpService, value);

  if (!result) return null;

  return (
    <div className={cn('HttpService', className)}>
      {result.description && <MarkdownViewer className="mb-12" markdown={result.description} />}

      {result.servers && result.servers.length > 0 ? (
        <div className="mb-12">
          <div className="text-xl font-semibold select-none mb-6">Servers</div>

          <div className="flex items-center">
            {result.servers.map((server, index) => (
              <a key={index} className="mr-6 text-center" href={server.url} target="_blank">
                <Card>
                  <div className="font-semibold">{server.name}</div>
                  <div className="mt-2">{server.description}</div>
                  <div className="mt-2">{server.url}</div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {result.securitySchemes && <div className="mb-12 text-xl font-semibold select-none">Security Schemes</div>}

      {result.contact && (result.contact.email || result.contact.url) && (
        <div className="mb-12">
          <div className="text-xl font-semibold select-none">Contact</div>

          {result.contact.email && (
            <div className="mt-4">
              <a href={`mailto:${result.contact.email}`}>{result.contact.email}</a>
            </div>
          )}

          {result.contact.url && (
            <a className="block mt-4" href={result.contact.url}>
              {' '}
              {result.contact.url}
            </a>
          )}
        </div>
      )}

      {result.license && (
        <div>
          <div className="text-xl font-semibold select-none mb-4">License</div>

          {result.license.url ? (
            <a href={result.license.url}>{result.license.name || result.license.url}</a>
          ) : (
            <span>{result.license.name}</span>
          )}
        </div>
      )}
    </div>
  );
};
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<IHttpServiceProps>(HttpServiceComponent, ['value'], 'HttpService');

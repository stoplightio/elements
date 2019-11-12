import { Icon } from '@blueprintjs/core';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpService, NodeType } from '@stoplight/types';
import { Card } from '@stoplight/ui-kit';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { useResolver } from '../../hooks/useResolver';

export interface IHttpServiceProps extends IErrorBoundary {
  className?: string;
  value: any;
}

const HttpServiceComponent: React.FunctionComponent<IHttpServiceProps> = ({ className, value }) => {
  const { result } = useResolver<IHttpService>(NodeType.HttpService, value);
  if (!result) return null;

  return (
    <div className={cn('HttpService', className)}>
      {result.description && <MarkdownViewer className="mb-12" markdown={result.description} />}

      {result.servers && result.servers.length > 0 ? (
        <div className="mb-12">
          <div className="text-xl font-semibold select-none mb-4">Servers</div>

          {result.servers.map((server, index) => (
            <div className="mt-4 flex-1 flex items-center" key={index}>
              {server.name && <div>{server.name} - </div>}
              {server.description && <div>{server.description} - </div>}

              <a href={server.url} target="_blank" rel="noopener noreferrer">
                {server.url}
              </a>
            </div>
          ))}
        </div>
      ) : null}

      {result.contact && (result.contact.email || result.contact.url) && (
        <div className="mb-12">
          <div className="text-xl font-semibold select-none mb-4">Contact</div>

          {result.contact.name && <div>{result.contact.name}</div>}

          {result.contact.email && result.contact.url && (
            <div className="mt-2 flex items-center">
              {result.contact.email && (
                <a
                  className="mr-4 flex items-center"
                  href={`mailto:${result.contact.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon="envelope" className="mr-2" iconSize={12} />
                  Email
                </a>
              )}

              {result.contact.url && (
                <a className="flex items-center" href={result.contact.url} target="_blank" rel="noopener noreferrer">
                  <Icon icon="link" className="mr-2" iconSize={12} /> URL
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {result.termsOfService && (
        <div className="mb-12">
          <div className="text-xl font-semibold select-none mb-4">Terms of Service</div>

          <a href={result.termsOfService} target="_blank" rel="noopener noreferrer">
            {result.termsOfService}
          </a>
        </div>
      )}

      {result.license && (
        <div>
          <div className="text-xl font-semibold select-none mb-4">License</div>

          {result.license.url ? (
            <a href={result.license.url} target="_blank" rel="noopener noreferrer">
              {result.license.name || result.license.url}
            </a>
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

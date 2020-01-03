import { Icon } from '@blueprintjs/core';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpService, NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { useResolver } from '../../hooks/useResolver';
import { HttpSecuritySchemes } from '../HttpSecuritySchemes';

export interface IHttpServiceProps extends IErrorBoundary {
  className?: string;
  value: any;
}

const HttpServiceComponent: React.FunctionComponent<IHttpServiceProps> = ({ className, value }) => {
  const { result } = useResolver<IHttpService>(NodeType.HttpService, value);
  if (!result) return null;

  return (
    <div className={cn('HttpService', className)}>
      {result.description && <MarkdownViewer className="mb-10" markdown={result.description} />}

      {result.servers && result.servers.length > 0 ? (
        <div className="mb-10">
          <div className="mb-4 text-lg font-semibold select-none">Servers</div>

          {result.servers.map((server, index) => (
            <div className="flex items-center flex-1 mt-4" key={index}>
              {server.name && <div>{server.name} - </div>}
              {server.description && <div>{server.description} - </div>}

              <a href={server.url} target="_blank" rel="noopener noreferrer">
                {server.url}
              </a>
            </div>
          ))}
        </div>
      ) : null}

      {result.security && (
        <HttpSecuritySchemes className="mb-10" title="Global Securities" securities={result.security} />
      )}

      {result.securitySchemes && (
        <HttpSecuritySchemes className="mb-10" title="Security Schemes" securities={result.securitySchemes} />
      )}

      {result.contact && (result.contact.email || result.contact.url) && (
        <div className="mb-10">
          <div className="mb-4 text-lg font-semibold select-none">Contact</div>

          {result.contact.name && <div>{result.contact.name}</div>}

          {result.contact.email && result.contact.url && (
            <div className="flex items-center mt-2">
              {result.contact.email && (
                <a
                  className="flex items-center mr-4"
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
        <div className="mb-10">
          <div className="mb-4 text-lg font-semibold select-none">Terms of Service</div>

          <a href={result.termsOfService} target="_blank" rel="noopener noreferrer">
            {result.termsOfService}
          </a>
        </div>
      )}

      {result.license && (result.license.url || result.license.name) && (
        <div>
          <div className="mb-4 text-lg font-semibold select-none">License</div>

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

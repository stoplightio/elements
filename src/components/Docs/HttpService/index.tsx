import { Icon } from '@blueprintjs/core';
import { IHttpService } from '@stoplight/types';
import { withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { MarkdownViewer } from '../../MarkdownViewer';
import { HttpSecuritySchemes } from '../HttpSecuritySchemes';

export type HttpServiceProps = IDocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(({ className, data }) => {
  return (
    <div className={cn('HttpService', className)}>
      {data.description && <MarkdownViewer className="mb-10" markdown={data.description} />}

      {data.servers && data.servers.length > 0 ? (
        <div className="mb-10">
          <div className="mb-4 text-lg font-semibold select-none">Servers</div>

          {data.servers.map((server, index) => (
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

      {data.security && <HttpSecuritySchemes className="mb-10" title="Global Securities" securities={data.security} />}

      {data.securitySchemes && (
        <HttpSecuritySchemes className="mb-10" title="Security Schemes" securities={data.securitySchemes} />
      )}

      {data.contact && (data.contact.email || data.contact.url) && (
        <div className="mb-10">
          <div className="mb-4 text-lg font-semibold select-none">Contact</div>

          {data.contact.name && <div>{data.contact.name}</div>}

          {data.contact.email && data.contact.url && (
            <div className="flex items-center mt-2">
              {data.contact.email && (
                <a
                  className="flex items-center mr-4"
                  href={`mailto:${data.contact.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon="envelope" className="mr-2" iconSize={12} />
                  Email
                </a>
              )}

              {data.contact.url && (
                <a className="flex items-center" href={data.contact.url} target="_blank" rel="noopener noreferrer">
                  <Icon icon="link" className="mr-2" iconSize={12} /> URL
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {data.termsOfService && (
        <div className="mb-10">
          <div className="mb-4 text-lg font-semibold select-none">Terms of Service</div>

          <a href={data.termsOfService} target="_blank" rel="noopener noreferrer">
            {data.termsOfService}
          </a>
        </div>
      )}

      {data.license && (data.license.url || data.license.name) && (
        <div>
          <div className="mb-4 text-lg font-semibold select-none">License</div>

          {data.license.url ? (
            <a href={data.license.url} target="_blank" rel="noopener noreferrer">
              {data.license.name || data.license.url}
            </a>
          ) : (
              <span>{data.license.name}</span>
            )}
        </div>
      )}
    </div>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, ['data'], 'HttpService');

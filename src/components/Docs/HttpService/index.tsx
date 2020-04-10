import { Icon } from '@blueprintjs/core';
import { IHttpService } from '@stoplight/types';
import { Classes } from '@stoplight/ui-kit';
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
      {data.name && <h2 className={cn(Classes.HEADING, 'mb-10')}>{data.name}</h2>}

      <div className="MarkdownViewer flex">
        {data?.contact?.email && (
          <a
            className="flex items-center mr-4"
            href={`mailto:${data.contact.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="envelope" className="mr-2" iconSize={12} />
            {data.contact.email ? data.contact.email : 'Email'}
          </a>
        )}

        {data?.contact?.url && (
          <a className="flex items-center mr-4" href={data.contact.url} target="_blank" rel="noopener noreferrer">
            <Icon icon="link" className="mr-2" iconSize={12} /> URL
          </a>
        )}

        {data.license && (data.license.url || data.license.name) && (
          <div className="mr-4">
            {data.license.url ? (
              <a href={data.license.url} target="_blank" rel="noopener noreferrer">
                {data.license.name || 'Licence'}
              </a>
            ) : (
              <span>{data.license.name}</span>
            )}
          </div>
        )}

        {data.termsOfService && (
          <a href={data.termsOfService} target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
        )}
      </div>

      {data.description && <MarkdownViewer className="mb-10 mt-4" markdown={data.description} />}

      {data.servers && data.servers.length > 0 ? (
        <div className="mb-10">
          <h3 className={cn(Classes.HEADING, 'font-normal', 'mb-6')}>Servers</h3>

          {data.servers.map((server, index) => (
            <div className="MarkdownViewer flex items-center flex-1 mt-4" key={server.name}>
              {server.name && <div className="mr-2">{server.name}</div>}
              {server.description && <div className="mr-2">{server.description}</div>}

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
    </div>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, ['data'], 'HttpService');

import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
import { Classes, FAIcon } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionTitle } from '../HttpOperation/SectionTitle';
import { HttpSecuritySchemes } from '../HttpSecuritySchemes';

export type HttpServiceProps = IDocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(({ className, data }) => {
  return (
    <div className={cn('HttpService MarkdownViewer', className)}>
      {data.name !== void 0 && <h1 className={Classes.HEADING}>{data.name}</h1>}

      <div className="MarkdownViewer flex mb-10">
        {data?.contact?.email && (
          <a
            className="flex items-center mr-4"
            href={`mailto:${data.contact.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FAIcon icon="envelope" className="mr-2" />
            {data.contact.email ? data.contact.email : 'Email'}
          </a>
        )}

        {data?.contact?.url && (
          <a className="flex items-center mr-4" href={data.contact.url} target="_blank" rel="noopener noreferrer">
            <FAIcon icon="link" className="mr-2" /> URL
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

      {data.description && <MarkdownViewer className="mb-10" markdown={data.description} />}

      {data.servers && data.servers.length > 0 ? (
        <div className="mb-10">
          <SectionTitle title="Servers" />

          {data.servers.map((server, index) => (
            <div key={index} className="MarkdownViewer flex items-center flex-1 mt-4">
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
    </div>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });

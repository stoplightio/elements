import { Heading } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { MarkdownViewer } from '../../MarkdownViewer';
import { Badge } from '../HttpOperation/Badges';
import { ServerInfo } from './ServerInfo';

const enhanceVersionString = (version: string): string => {
  if (version[0] === 'v') return version;

  return `v${version}`;
};

export type HttpServiceProps = IDocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(({ className, data, mockUrl }) => {
  return (
    // <div className={className + ' flex items-start'}>
    <div className="grid grid-cols-2">
      <div>
        {data.name && (
          <Heading className="mb-5" fontWeight="medium" size={1}>
            {data.name}
          </Heading>
        )}
        <div className="mb-12">
          {data.version && <Badge className="bg-gray-6">{enhanceVersionString(data.version)}</Badge>}
        </div>
      </div>
      <div></div>
      <div>{data.description && <MarkdownViewer className="mb-10" markdown={data.description} />}</div>
      <div>
        <ServerInfo serverUrl={data.servers} mockUrl={mockUrl} />
      </div>
    </div>
    // </div>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });

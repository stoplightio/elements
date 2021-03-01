import { Heading } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { MarkdownViewer } from '../../MarkdownViewer';
import { Badge } from '../HttpOperation/Badges';

const enhanceVersionString = (version: string): string => {
  if (version[0] === 'v') return version;

  return `v${version}`;
};

export type HttpServiceProps = IDocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(({ className, data }) => {
  return (
    <div className={className}>
      {data.name && (
        <Heading className="mb-5" fontWeight="medium" size={1}>
          {data.name}
        </Heading>
      )}

      <div className="mb-12">
        {data.version && <Badge className="bg-gray-6">{enhanceVersionString(data.version)}</Badge>}
      </div>

      {data.description && <MarkdownViewer className="mb-10" markdown={data.description} />}
    </div>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });

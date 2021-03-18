import { Heading } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { MarkdownViewer } from '../../MarkdownViewer';
import { Badge } from '../HttpOperation/Badges';
import { SecuritySchemes } from './SecuritySchemes';

const enhanceVersionString = (version: string): string => {
  if (version[0] === 'v') return version;

  return `v${version}`;
};

export type HttpServiceProps = IDocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(({ className, data }) => {
  return (
    <div className={cn('w-full', className)}>
      {data.name && (
        <Heading className="mb-5" fontWeight="medium" size={1}>
          {data.name}
        </Heading>
      )}
      <div className="flex justify-between">
        <div className="mr-2">
          <div className="mb-12">
            {data.version && <Badge className="bg-gray-6">{enhanceVersionString(data.version)}</Badge>}
          </div>

          {data.description && <MarkdownViewer className="mb-10" markdown={data.description} />}
        </div>
        <div className="w-1/3">
          {data.securitySchemes?.length && <SecuritySchemes schemes={data.securitySchemes} />}
        </div>
      </div>
    </div>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });

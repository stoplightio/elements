import { Box, Heading } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { StoplightProjectContext } from '../../../containers/Provider';
import { MarkdownViewer } from '../../MarkdownViewer';
import { Badge } from '../HttpOperation/Badges';
import { ServerInfo } from './ServerInfo';

const enhanceVersionString = (version: string): string => {
  if (version[0] === 'v') return version;

  return `v${version}`;
};

export type HttpServiceProps = IDocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(({ className, data, headless }) => {
  const context = React.useContext(StoplightProjectContext);
  return (
    <Box className={className} bg="transparent" w="full">
      {data.name && (
        <Heading className="mb-5" fontWeight="medium" size={1}>
          {data.name}
        </Heading>
      )}
      <div className="mb-12">
        {data.version && <Badge className="bg-gray-6">{enhanceVersionString(data.version)}</Badge>}
      </div>
      {!headless ? (
        <div className="flex flex-rows">
          {data.description && <MarkdownViewer className="mb-10" markdown={data.description} />}
          {(data.servers ?? context.mockUrl?.servicePath) && (
            <div className="w-2/5 relative ml-10">
              <div className="inset-0 overflow-auto">
                <ServerInfo servers={data.servers} mockUrl={context.mockUrl?.servicePath} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-10">
          {data.description && <MarkdownViewer className="mb-10" markdown={data.description} />}
          {(data.servers ?? context.mockUrl?.servicePath) && (
            <ServerInfo servers={data.servers} mockUrl={context.mockUrl?.servicePath} />
          )}
        </div>
      )}
    </Box>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });

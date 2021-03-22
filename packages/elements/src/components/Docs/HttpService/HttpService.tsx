import { Box, Flex, Heading } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { IDocsComponentProps } from '..';
import { StoplightProjectContext } from '../../../containers/Provider';
import { MarkdownViewer } from '../../MarkdownViewer';
import { Badge } from '../HttpOperation/Badges';
import { SecuritySchemes } from './SecuritySchemes';
import { ServerInfo } from './ServerInfo';

const enhanceVersionString = (version: string): string => {
  if (version[0] === 'v') return version;

  return `v${version}`;
};

export type HttpServiceProps = IDocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(({ className, data, headless }) => {
  const context = React.useContext(StoplightProjectContext);
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const description = data.description && <MarkdownViewer className="sl-mb-10" markdown={data.description} />;

  const rightPanel = (
    <>
      {(data.servers ?? context.mockUrl?.servicePath) && (
        <ServerInfo servers={data.servers} mockUrl={context.mockUrl?.servicePath} />
      )}
      <Box mt={4}>
        {data.securitySchemes?.length && (
          <SecuritySchemes schemes={data.securitySchemes} defaultScheme={query.get('security') || undefined} />
        )}
      </Box>
    </>
  );

  return (
    <Box className={className} bg="transparent" w="full">
      {data.name && (
        <Heading mb={5} fontWeight="medium" size={1}>
          {data.name}
        </Heading>
      )}
      <Box mb={12}>{data.version && <Badge className="sl-bg-gray-6">{enhanceVersionString(data.version)}</Badge>}</Box>
      {!headless ? (
        <Flex justifyContent="between">
          <Box mr={2}>{description}</Box>
          <Box w="1/3">{rightPanel}</Box>
        </Flex>
      ) : (
        <Box mb={10}>
          {description}
          {rightPanel}
        </Box>
      )}
    </Box>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });

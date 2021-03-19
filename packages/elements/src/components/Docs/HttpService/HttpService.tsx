import { Box, Flex, Heading } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
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
    <Box w="full" className={className}>
      {data.name && (
        <Heading mb={5} fontWeight="medium" size={1}>
          {data.name}
        </Heading>
      )}
      <Flex justifyContent="between">
        <Box mr={2}>
          <Box mb={12}>
            {data.version && <Badge className="sl-bg-gray-6">{enhanceVersionString(data.version)}</Badge>}
          </Box>

          {data.description && <MarkdownViewer className="sl-mb-10" markdown={data.description} />}
        </Box>
        <Box w="1/3">{data.securitySchemes?.length && <SecuritySchemes schemes={data.securitySchemes} />}</Box>
      </Flex>
    </Box>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });

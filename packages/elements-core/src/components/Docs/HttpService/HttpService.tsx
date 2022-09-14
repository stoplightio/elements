import { Box, Flex, Heading, NodeAnnotation, VStack } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
import * as React from 'react';

import { MockingContext } from '../../../containers/MockingProvider';
import { useResolvedObject } from '../../../context/InlineRefResolver';
import { useOptionsCtx } from '../../../context/Options';
import { MarkdownViewer } from '../../MarkdownViewer';
import { PoweredByLink } from '../../PoweredByLink';
import { DocsComponentProps } from '..';
import { VersionBadge } from '../HttpOperation/Badges';
import { AdditionalInfo } from './AdditionalInfo';
import { ExportButton } from './ExportButton';
import { SecuritySchemes } from './SecuritySchemes';
import { ServerInfo } from './ServerInfo';

export type HttpServiceProps = DocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(
  ({ data: unresolvedData, location = {}, layoutOptions, exportProps }) => {
    const { nodeHasChanged } = useOptionsCtx();
    const data = useResolvedObject(unresolvedData) as IHttpService;

    const { search, pathname } = location;
    const mocking = React.useContext(MockingContext);
    const query = new URLSearchParams(search);

    const nameChanged = nodeHasChanged?.({ nodeId: data.id, attr: 'name' });
    const versionChanged = nodeHasChanged?.({ nodeId: data.id, attr: 'version' });
    const descriptionChanged = nodeHasChanged?.({ nodeId: data.id, attr: 'description' });

    return (
      <Box mb={10}>
        {data.name && !layoutOptions?.noHeading && (
          <Flex justifyContent="between" alignItems="center">
            <Box pos="relative">
              <Heading size={1} mb={4} fontWeight="semibold">
                {data.name}
              </Heading>
              <NodeAnnotation change={nameChanged} />
            </Box>

            {exportProps && !layoutOptions?.hideExport && <ExportButton {...exportProps} />}
          </Flex>
        )}

        {data.version && (
          <Box mb={5} pos="relative">
            <VersionBadge value={data.version} />
            <NodeAnnotation change={versionChanged} />
          </Box>
        )}

        {pathname && layoutOptions?.showPoweredByLink && (
          <PoweredByLink source={data.name ?? 'no-title'} pathname={pathname} packageType="elements" layout="stacked" />
        )}

        <VStack spacing={6}>
          <ServerInfo servers={data.servers ?? []} mockUrl={mocking.mockUrl} />

          <Box>
            {data.securitySchemes?.length ? (
              <SecuritySchemes schemes={data.securitySchemes} defaultScheme={query.get('security') || undefined} />
            ) : null}
          </Box>

          <Box>
            {(data.contact?.email || data.license || data.termsOfService) && (
              <AdditionalInfo
                id={data.id}
                contact={data.contact}
                license={data.license}
                termsOfService={data.termsOfService}
              />
            )}
          </Box>
        </VStack>

        {data.description && (
          <Box pos="relative">
            <MarkdownViewer className="sl-my-5" markdown={data.description} />
            <NodeAnnotation change={descriptionChanged} />
          </Box>
        )}
      </Box>
    );
  },
);
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });

import { Box, Flex, Heading, VStack } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { MockingContext } from '../../../containers/MockingProvider';
import { MarkdownViewer } from '../../MarkdownViewer';
import { PoweredByLink } from '../../PoweredByLink';
import { DocsComponentProps } from '..';
import { VersionBadge } from '../HttpOperation/Badges';
import { TwoColumnLayout } from '../TwoColumnLayout';
import { ExportButton } from './ExportButton';
import { SecuritySchemes } from './SecuritySchemes';
import { ServerInfo } from './ServerInfo';

export type HttpServiceProps = DocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(
  ({ className, data, location = {}, layoutOptions, exportProps }) => {
    const { search, pathname } = location;
    const mocking = React.useContext(MockingContext);
    const query = new URLSearchParams(search);

    const shouldDisplayHeader = data.name && !layoutOptions?.noHeading;

    const header = (shouldDisplayHeader || data.version) && (
      <>
        {shouldDisplayHeader && (
          <Flex justifyContent="between" alignItems="center">
            <Heading size={1} mb={4} fontWeight="semibold">
              {data.name}
            </Heading>
            {exportProps && !layoutOptions?.hideExport && <ExportButton {...exportProps} />}
          </Flex>
        )}

        {data.version && (
          <Box mb={5}>
            <VersionBadge value={data.version} />
          </Box>
        )}
      </>
    );

    const description = data.description && <MarkdownViewer className="sl-mb-5" markdown={data.description} />;

    const dataPanel = (
      <VStack spacing={6}>
        <ServerInfo servers={data.servers ?? []} mockUrl={mocking.mockUrl} />
        <Box>
          {data.securitySchemes?.length && (
            <SecuritySchemes schemes={data.securitySchemes} defaultScheme={query.get('security') || undefined} />
          )}
        </Box>
      </VStack>
    );

    if (layoutOptions?.showPoweredByLink) {
      return (
        <Box mb={10}>
          {header}
          {description}
          {pathname && (
            <PoweredByLink
              source={data.name ?? 'no-title'}
              pathname={pathname}
              packageType="elements"
              layout="stacked"
            />
          )}
          {dataPanel}
        </Box>
      );
    }

    return (
      <TwoColumnLayout className={cn('HttpService', className)} header={header} left={description} right={dataPanel} />
    );
  },
);
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });

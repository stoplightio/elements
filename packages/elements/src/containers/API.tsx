import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import {
  InlineRefResolverProvider,
  NonIdealState,
  RoutingProps,
  useBundleRefsIntoDocument,
  useParsedValue,
  useResponsiveLayout,
  withMosaicProvider,
  withPersistenceBoundary,
  withQueryClientProvider,
  withRouter,
  withStyles,
} from '@stoplight/elements-core';
import { ExtensionAddonRenderer } from '@stoplight/elements-core/components/Docs';
import { Box, Flex, Icon } from '@stoplight/mosaic';
import { flow } from 'lodash';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { APIWithResponsiveSidebarLayout } from '../components/API/APIWithResponsiveSidebarLayout';
import { APIWithSidebarLayout } from '../components/API/APIWithSidebarLayout';
import { APIWithStackedLayout } from '../components/API/APIWithStackedLayout';
import { useExportDocumentProps } from '../hooks/useExportDocumentProps';
import { isOas2, transformOasToServiceNode } from '../utils/oas';

export type APIProps = APIPropsWithDocument | APIPropsWithUrl;

export type APIPropsWithUrl = {
  /**
   * Specify the URL of the input OAS2/3 document here.
   *
   * Mutually exclusive with `apiDescriptionDocument`.
   */
  apiDescriptionUrl: string;
} & CommonAPIProps;
export type APIPropsWithDocument = {
  /**
   * You can specify the input OAS2/3 document here directly in JSON or YAML format.
   *
   * Mutually exclusive with `apiDescriptionUrl`.
   */
  apiDescriptionDocument: string | object;
  apiDescriptionUrl?: string;
} & CommonAPIProps;

export interface CommonAPIProps extends RoutingProps {
  /**
   * The API component supports two layout options.
   *
   * - Sidebar: Navigation on the left side, resembles Stoplight Platform.
   * - Stacked: No sidebar, resembles the structure of Swagger UI.
   *
   * @default "sidebar"
   */
  layout?: 'sidebar' | 'stacked' | 'responsive';
  logo?: string;

  hideTryIt?: boolean;
  /**
   * Allows to hide RequestSamples component
   * @default false
   */

  hideSamples?: boolean;
  /**
   * Shows only operation document without right column
   * @default false
   */

  hideTryItPanel?: boolean;

  /**
   * Allows hiding the Security info section
   */
  hideSecurityInfo?: boolean;

  /**
   * Allows hiding the Server info section
   */
  hideServerInfo?: boolean;

  /**
   * Hides schemas from being displayed in Table of Contents
   */
  hideSchemas?: boolean;

  /**
   * Hides models and operations marked as internal
   * @default false
   */
  hideInternal?: boolean;

  /**
   * Hides export button from being displayed in overview page
   * @default false
   */
  hideExport?: boolean;

  /**
   * Fetch credentials policy for TryIt component
   * For more information: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * @default "omit"
   */

  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';

  /**
   * Url of a CORS proxy that will be used to send requests in TryIt.
   * Provided url will be prepended to an URL of an actual request.
   * @default false
   */
  tryItCorsProxy?: string;

  /**
   * Whether to include CORS credentials (cookies, authorization headers, TLS client certificates)
   * in remote ref requests
   * @default: false
   */
  withCredentials?: boolean;

  /**
   * Whether to use invert or default theme for sidebar
   */
  sidebarTheme?: 'invert' | 'default';

  /**
   * Add custom header in sidebar
   */
  sidebarHeader?: React.ReactNode;

  /** The amount of references deep should be presented.
   * @default undefined
   */
  maxRefDepth?: number;

  /**
   * Allows to define renderers for vendor extensions
   */
  renderExtensionAddon?: ExtensionAddonRenderer;
}

const propsAreWithDocument = (props: APIProps): props is APIPropsWithDocument => {
  return props.hasOwnProperty('apiDescriptionDocument');
};

export const APIImpl: React.FC<APIProps> = props => {
  const {
    layout = 'sidebar',
    apiDescriptionUrl = '',
    logo,
    hideTryItPanel,
    hideTryIt,
    hideSamples,
    hideSecurityInfo,
    hideServerInfo,
    hideSchemas,
    hideInternal,
    hideExport,
    tryItCredentialsPolicy,
    tryItCorsProxy,
    withCredentials,
    sidebarTheme,
    sidebarHeader,
    maxRefDepth,
    renderExtensionAddon,
  } = props;
  const location = useLocation();
  const apiDescriptionDocument = propsAreWithDocument(props) ? props.apiDescriptionDocument : undefined;
  const { isResponsiveLayoutEnabled } = useResponsiveLayout();

  const { data: fetchedDocument, error } = useQuery(
    [apiDescriptionUrl],
    () =>
      fetch(apiDescriptionUrl).then(res => {
        if (res.ok) {
          return res.text();
        }
        throw new Error(`Unable to load description document, status code: ${res.status}`);
      }),
    {
      enabled: apiDescriptionUrl !== '' && !apiDescriptionDocument,
    },
  );

  const document = apiDescriptionDocument || fetchedDocument || '';
  const parsedDocument = useParsedValue(document);
  if (isOas2(parsedDocument)) {
    parsedDocument.host = parsedDocument.host ?? window.location.host;
    parsedDocument.schemes = parsedDocument.schemes ?? [window.location.protocol.replace(':', '')];
  }

  const bundledDocument = useBundleRefsIntoDocument(parsedDocument, { baseUrl: apiDescriptionUrl, withCredentials });
  const serviceNode = React.useMemo(() => transformOasToServiceNode(bundledDocument), [bundledDocument]);
  const exportProps = useExportDocumentProps({ originalDocument: document, bundledDocument });

  if (error) {
    return (
      <Flex justify="center" alignItems="center" w="full" minH="screen">
        <NonIdealState
          title="Document could not be loaded"
          description="The API description document could not be fetched. This could indicate connectivity problems, or issues with the server hosting the spec."
          icon="exclamation-triangle"
        />
      </Flex>
    );
  }

  if (!bundledDocument) {
    return (
      <Flex justify="center" alignItems="center" w="full" minH="screen" color="light">
        <Box as={Icon} icon={faCircleNotch} size="3x" spin />
      </Flex>
    );
  }

  if (!serviceNode) {
    return (
      <Flex justify="center" alignItems="center" w="full" minH="screen">
        <NonIdealState
          title="Failed to parse OpenAPI file"
          description="Please make sure your OpenAPI file is valid and try again"
        />
      </Flex>
    );
  }

  return (
    <InlineRefResolverProvider document={parsedDocument} maxRefDepth={maxRefDepth}>
      {layout === 'stacked' && (
        <APIWithStackedLayout
          serviceNode={serviceNode}
          hideTryIt={hideTryIt}
          hideSamples={hideSamples}
          hideTryItPanel={hideTryItPanel}
          hideSecurityInfo={hideSecurityInfo}
          hideServerInfo={hideServerInfo}
          hideExport={hideExport}
          exportProps={exportProps}
          tryItCredentialsPolicy={tryItCredentialsPolicy}
          tryItCorsProxy={tryItCorsProxy}
          renderExtensionAddon={renderExtensionAddon}
          location={location}
        />
      )}
      {layout === 'sidebar' && (
        <APIWithSidebarLayout
          logo={logo}
          serviceNode={serviceNode}
          hideTryItPanel={hideTryItPanel}
          hideTryIt={hideTryIt}
          hideSamples={hideSamples}
          hideSecurityInfo={hideSecurityInfo}
          hideServerInfo={hideServerInfo}
          hideSchemas={hideSchemas}
          hideInternal={hideInternal}
          hideExport={hideExport}
          exportProps={exportProps}
          tryItCredentialsPolicy={tryItCredentialsPolicy}
          tryItCorsProxy={tryItCorsProxy}
          sidebarTheme={sidebarTheme}
          sidebarHeader={sidebarHeader}
          renderExtensionAddon={renderExtensionAddon}
        />
      )}
      {layout === 'responsive' && (
        <APIWithResponsiveSidebarLayout
          logo={logo}
          serviceNode={serviceNode}
          hideTryItPanel={hideTryItPanel}
          hideTryIt={hideTryIt}
          hideSamples={hideSamples}
          hideSecurityInfo={hideSecurityInfo}
          hideServerInfo={hideServerInfo}
          hideSchemas={hideSchemas}
          hideInternal={hideInternal}
          hideExport={hideExport}
          exportProps={exportProps}
          tryItCredentialsPolicy={tryItCredentialsPolicy}
          tryItCorsProxy={tryItCorsProxy}
          renderExtensionAddon={renderExtensionAddon}
          compact={isResponsiveLayoutEnabled}
        />
      )}
    </InlineRefResolverProvider>
  );
};

export const API = flow(
  withRouter,
  withStyles,
  withPersistenceBoundary,
  withMosaicProvider,
  withQueryClientProvider,
)(APIImpl);

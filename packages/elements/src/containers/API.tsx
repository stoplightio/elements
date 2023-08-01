import {
  InlineRefResolverProvider,
  NonIdealState,
  RoutingProps,
  useBundleRefsIntoDocument,
  useParsedValue,
  withMosaicProvider,
  withPersistenceBoundary,
  withQueryClientProvider,
  withRouter,
  withStyles,
} from '@abbudao/elements-core';
import { Box, Flex, Icon } from '@stoplight/mosaic';
import { flow } from 'lodash';
import * as React from 'react';
import { useQuery } from 'react-query';

import { APIWithSidebarLayout } from '../components/API/APIWithSidebarLayout';
import { APIWithStackedLayout } from '../components/API/APIWithStackedLayout';
import { useExportDocumentProps } from '../hooks/useExportDocumentProps';
import { transformOasToServiceNode } from '../utils/oas';

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
  layout?: 'sidebar' | 'stacked';
  logo?: string;

  /**
   * Allows hiding the TryIt component
   */
  hideTryIt?: boolean;

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
   * Allows overriding the default documentation, by passing an object with the operationId as key and the documentation as value.
   */
  customDocs?: Record<string, string>;
}

const propsAreWithDocument = (props: APIProps): props is APIPropsWithDocument => {
  return props.hasOwnProperty('apiDescriptionDocument');
};

export const APIImpl: React.FC<APIProps> = props => {
  const {
    layout,
    apiDescriptionUrl = '',
    logo,
    hideTryIt,
    hideSchemas,
    hideInternal,
    hideExport,
    tryItCredentialsPolicy,
    tryItCorsProxy,
    customDocs,
  } = props;
  const apiDescriptionDocument = propsAreWithDocument(props) ? props.apiDescriptionDocument : undefined;

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
  const bundledDocument = useBundleRefsIntoDocument(parsedDocument, { baseUrl: apiDescriptionUrl });
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
        <Box as={Icon} icon={['fal', 'circle-notch']} size="3x" spin />
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
    <InlineRefResolverProvider document={parsedDocument}>
      {layout === 'stacked' ? (
        <APIWithStackedLayout
          serviceNode={serviceNode}
          hideTryIt={hideTryIt}
          hideExport={hideExport}
          exportProps={exportProps}
          tryItCredentialsPolicy={tryItCredentialsPolicy}
          tryItCorsProxy={tryItCorsProxy}
        />
      ) : (
        <APIWithSidebarLayout
          logo={logo}
          serviceNode={serviceNode}
          hideTryIt={hideTryIt}
          hideSchemas={hideSchemas}
          hideInternal={hideInternal}
          hideExport={hideExport}
          exportProps={exportProps}
          tryItCredentialsPolicy={tryItCredentialsPolicy}
          tryItCorsProxy={tryItCorsProxy}
          customDocs={customDocs}
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

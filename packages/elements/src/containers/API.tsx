import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InlineRefResolverProvider } from '@stoplight/elements-core/context/InlineRefResolver';
import { withPersistenceBoundary } from '@stoplight/elements-core/context/Persistence';
import { withMosaicProvider } from '@stoplight/elements-core/hoc/withMosaicProvider';
import { withQueryClientProvider } from '@stoplight/elements-core/hoc/withQueryClientProvider';
import { withRouter } from '@stoplight/elements-core/hoc/withRouter';
import { useBundleRefsIntoDocument } from '@stoplight/elements-core/hooks/useBundleRefsIntoDocument';
import { useParsedValue } from '@stoplight/elements-core/hooks/useParsedValue';
import { withStyles } from '@stoplight/elements-core/styled';
import { RoutingProps } from '@stoplight/elements-core/types';
import { Box, Flex, Icon } from '@stoplight/mosaic';
import { NonIdealState } from '@stoplight/ui-kit';
import { pipe } from 'lodash/fp';
import * as React from 'react';
import { useQuery } from 'react-query';

import { APIWithSidebarLayout } from '../components/API/APIWithSidebarLayout';
import { APIWithStackedLayout } from '../components/API/APIWithStackedLayout';
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
}

const propsAreWithDocument = (props: APIProps): props is APIPropsWithDocument => {
  return props.hasOwnProperty('apiDescriptionDocument');
};

const APIImpl: React.FC<APIProps> = props => {
  const { layout, apiDescriptionUrl = '', logo } = props;
  const apiDescriptionDocument = propsAreWithDocument(props) ? props.apiDescriptionDocument : undefined;

  const { data: fetchedDocument, error } = useQuery(
    [apiDescriptionUrl],
    () => fetch(apiDescriptionUrl).then(res => res.text()),
    {
      enabled: apiDescriptionUrl !== '' && !apiDescriptionDocument,
    },
  );

  React.useEffect(() => {
    if (error) {
      console.error('Could not fetch spec', error);
    }
  }, [error]);

  const parsedDocument = useParsedValue(apiDescriptionDocument || fetchedDocument);
  const bundledDocument = useBundleRefsIntoDocument(parsedDocument, { baseUrl: apiDescriptionUrl });
  const serviceNode = React.useMemo(() => transformOasToServiceNode(bundledDocument), [bundledDocument]);

  if (error) {
    return (
      <Flex justify="center" alignItems="center" w="full" minH="screen">
        <NonIdealState
          title="Something went wrong"
          description={String(error)}
          icon={<FontAwesomeIcon icon={faExclamationTriangle} />}
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
          icon={<FontAwesomeIcon icon={faExclamationTriangle} />}
        />
      </Flex>
    );
  }

  return (
    <InlineRefResolverProvider document={parsedDocument}>
      {layout === 'stacked' ? (
        <APIWithStackedLayout serviceNode={serviceNode} />
      ) : (
        <APIWithSidebarLayout logo={logo} serviceNode={serviceNode} />
      )}
    </InlineRefResolverProvider>
  );
};

export const API = pipe(
  withRouter,
  withStyles,
  withPersistenceBoundary,
  withMosaicProvider,
  withQueryClientProvider,
)(APIImpl);

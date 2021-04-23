import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Flex, Icon } from '@stoplight/mosaic';
import { NonIdealState } from '@stoplight/ui-kit';
import axios from 'axios';
import { pipe } from 'lodash/fp';
import * as React from 'react';
import useSwr from 'swr';

import { SidebarLayout } from '../components/API/SidebarLayout';
import { StackedLayout } from '../components/API/StackedLayout';
import { InlineRefResolverProvider } from '../context/InlineRefResolver';
import { withPersistenceBoundary } from '../context/Persistence';
import { withRouter } from '../hoc/withRouter';
import { useBundleRefsIntoDocument } from '../hooks/useBundleRefsIntoDocument';
import { useParsedValue } from '../hooks/useParsedValue';
import { withStyles } from '../styled';
import { RoutingProps } from '../types';
import { transformOasToServiceNode } from '../utils/oas';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

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
}

const propsAreWithDocument = (props: APIProps): props is APIPropsWithDocument => {
  return props.hasOwnProperty('apiDescriptionDocument');
};

const APIImpl: React.FC<APIProps> = props => {
  const { layout, apiDescriptionUrl } = props;
  const apiDescriptionDocument = propsAreWithDocument(props) ? props.apiDescriptionDocument : undefined;

  const documentShouldBeFetched = apiDescriptionUrl && !apiDescriptionDocument;
  const { data: fetchedDocument, error } = useSwr(documentShouldBeFetched ? apiDescriptionUrl! : null, fetcher);

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
          description={error.message}
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
      {layout === 'stacked' ? <StackedLayout serviceNode={serviceNode} /> : <SidebarLayout serviceNode={serviceNode} />}
    </InlineRefResolverProvider>
  );
};

export const API = pipe(withRouter, withStyles, withPersistenceBoundary)(APIImpl);

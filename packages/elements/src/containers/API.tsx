import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateApiToC } from '@stoplight/elements-utils';
import { IHttpService } from '@stoplight/types';
import { NonIdealState } from '@stoplight/ui-kit';
import axios from 'axios';
import { pipe } from 'lodash/fp';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import useSwr from 'swr';

import { SidebarLayout } from '../components/API/SidebarLayout';
import { StackedLayout } from '../components/API/StackedLayout';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { InlineRefResolverProvider } from '../context/InlineRefResolver';
import { withPersistenceBoundary } from '../context/Persistence';
import { withMosaicProvider } from '../hoc/withMosaicProvider';
import { withRouter } from '../hoc/withRouter';
import { useBundleRefsIntoDocument } from '../hooks/useBundleRefsIntoDocument';
import { useParsedValue } from '../hooks/useParsedValue';
import { withStyles } from '../styled';
import { RoutingProps } from '../types';
import { computeNodeData, isOas2, isOas3, IUriMap } from '../utils/oas';
import { computeOas2UriMap } from '../utils/oas/oas2';
import { computeOas3UriMap } from '../utils/oas/oas3';

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

  const { pathname } = useLocation();

  const documentShouldBeFetched = apiDescriptionUrl && !apiDescriptionDocument;
  const { data: fetchedDocument, error } = useSwr(documentShouldBeFetched ? apiDescriptionUrl! : null, fetcher);

  React.useEffect(() => {
    if (error) {
      console.error('Could not fetch spec', error);
    }
  }, [error]);

  const document = useParsedValue(apiDescriptionDocument || fetchedDocument);
  const bundledDocument = useBundleRefsIntoDocument(document, { baseUrl: apiDescriptionUrl });

  const { tree, uriMap } = React.useMemo(() => getToCFromOpenApiDocument(bundledDocument), [bundledDocument]);

  const nodeData = uriMap[pathname] || uriMap['/'];

  if (error) {
    return (
      <div className="flex min-h-screen justify-center items-center w-full">
        <NonIdealState
          title="Something went wrong"
          description={error.message}
          icon={<FontAwesomeIcon icon={faExclamationTriangle} />}
        />
      </div>
    );
  }

  if (!nodeData) {
    return <DocsSkeleton />;
  }

  return (
    <InlineRefResolverProvider document={document}>
      {layout === 'stacked' ? (
        <StackedLayout uriMap={uriMap} tree={tree} />
      ) : (
        <SidebarLayout pathname={pathname} tree={tree} uriMap={uriMap} />
      )}
    </InlineRefResolverProvider>
  );
};

export const API = pipe(withRouter, withStyles, withPersistenceBoundary, withMosaicProvider)(APIImpl);

export function getToCFromOpenApiDocument(apiDescriptionDocument: unknown) {
  let uriMap: IUriMap = {};
  let documentTags: string[] | undefined;

  if (isOas3(apiDescriptionDocument)) {
    uriMap = computeOas3UriMap(apiDescriptionDocument);
    documentTags = apiDescriptionDocument.tags?.map(tag => tag.name) || [];
  } else if (isOas2(apiDescriptionDocument)) {
    uriMap = computeOas2UriMap(apiDescriptionDocument);
    documentTags = apiDescriptionDocument.tags?.map(tag => tag.name) || [];
  } else {
    console.error('Document type is unknown');
  }

  const nodes = computeNodeData(uriMap, documentTags);
  const tree = generateApiToC(nodes, uriMap['/'] as IHttpService);

  return { tree, uriMap };
}

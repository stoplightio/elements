import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateApiToC } from '@stoplight/elements-utils';
import { NonIdealState } from '@stoplight/ui-kit';
import axios from 'axios';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import useSwr from 'swr';

import { SidebarLayout } from '../components/API/SidebarLayout';
import { StackedLayout } from '../components/API/StackedLayout';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { InlineRefResolverProvider } from '../context/InlineRefResolver';
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

export type APIPropsWithUrl = { apiDescriptionUrl: string } & CommonAPIProps;
export type APIPropsWithDocument = {
  apiDescriptionDocument: string | object;
  apiDescriptionUrl?: string;
} & CommonAPIProps;

export interface CommonAPIProps extends RoutingProps {
  layout?: 'sidebar' | 'stacked';
}

const propsAreWithDocument = (props: APIProps): props is APIPropsWithDocument => {
  return props.hasOwnProperty('apiDescriptionDocument');
};

const APIImpl = withRouter<APIProps>(function API(props) {
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

  const uriMap = React.useMemo(() => {
    let map: IUriMap = {};
    if (bundledDocument) {
      if (isOas3(bundledDocument)) {
        map = computeOas3UriMap(bundledDocument);
      } else if (isOas2(bundledDocument)) {
        map = computeOas2UriMap(bundledDocument);
      } else {
        console.warn('Document type is unknown');
      }
    }
    return map;
  }, [bundledDocument]);

  const nodes = computeNodeData(uriMap);
  const tree = generateApiToC(nodes);
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
      <div className="APIComponent flex flex-row">
        {layout === 'stacked' ? (
          <StackedLayout uriMap={uriMap} tree={tree} />
        ) : (
          <SidebarLayout pathname={pathname} tree={tree} uriMap={uriMap} />
        )}
      </div>
    </InlineRefResolverProvider>
  );
});

export const API = withStyles(APIImpl);

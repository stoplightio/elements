import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateToC } from '@stoplight/elements-utils';
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
import { LinkComponentType, RoutingProps } from '../types';
import { computeNodeData, isOas2, isOas3, IUriMap } from '../utils/oas';
import { computeOas2UriMap } from '../utils/oas/oas2';
import { computeOas3UriMap } from '../utils/oas/oas3';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export interface APIProps extends RoutingProps {
  apiDescriptionUrl?: string;
  apiDescriptionDocument?: string | object;
  linkComponent?: LinkComponentType;
  layout?: 'sidebar' | 'stacked';
}

const APIImpl = withRouter<APIProps>(function API({
  apiDescriptionUrl,
  apiDescriptionDocument,
  linkComponent,
  layout,
}) {
  const { pathname } = useLocation();

  const { data, error } = useSwr(apiDescriptionUrl || null, fetcher);

  React.useEffect(() => {
    if (apiDescriptionUrl && apiDescriptionDocument) {
      console.warn(
        `Both 'apiDescriptionUrl' and 'apiDescriptionDocument' props were provided, so 'apiDescriptionDocument' took precedence.`,
      );
    }
  }, [apiDescriptionUrl, apiDescriptionDocument]);

  React.useEffect(() => {
    if (error) {
      console.error('Could not fetch spec', error);
    }
  }, [error]);

  const document = useParsedValue(apiDescriptionDocument || data);
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
  const tree = generateToC(nodes);
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
          <SidebarLayout pathname={pathname} tree={tree} uriMap={uriMap} linkComponent={linkComponent} />
        )}
      </div>
    </InlineRefResolverProvider>
  );
});

export const API = withStyles(APIImpl);

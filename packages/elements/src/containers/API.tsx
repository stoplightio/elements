import { generateToC } from '@stoplight/elements-utils';
import { FAIcon, NonIdealState } from '@stoplight/ui-kit';
import axios from 'axios';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import useSwr from 'swr';

import { SidebarLayout } from '../components/API/SidebarLayout';
import { StackedLayout } from '../components/API/StackedLayout';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { withRouter } from '../hoc/withRouter';
import { useBundledData } from '../hooks/useBundledData';
import { useParsedValue } from '../hooks/useParsedValue';
import { withStyles } from '../styled';
import { LinkComponentType, RoutingProps } from '../types';
import { computeNodeData, getNodeType, isOas2, isOas3, IUriMap } from '../utils/oas';
import { computeOas2UriMap } from '../utils/oas/oas2';
import { computeOas3UriMap } from '../utils/oas/oas3';
import { InlineRefResolverProvider } from './Provider';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export interface APIProps extends RoutingProps {
  apiDescriptionUrl: string;
  linkComponent?: LinkComponentType;
  layout?: 'sidebar' | 'stacked';
}

const APIImpl = withRouter<APIProps>(function API({ apiDescriptionUrl, linkComponent, layout }) {
  const { pathname } = useLocation();

  const { data, error } = useSwr(apiDescriptionUrl, fetcher);

  React.useEffect(() => {
    if (error) {
      console.error('Could not fetch spec', error);
    }
  }, [error]);

  const document = useParsedValue(data);

  const uriMap = React.useMemo(() => {
    let map: IUriMap = {};
    if (document) {
      if (isOas3(document)) {
        map = computeOas3UriMap(document);
      } else if (isOas2(document)) {
        map = computeOas2UriMap(document);
      } else {
        console.warn('Document type is unknown');
      }
    }
    return map;
  }, [document]);

  const nodes = computeNodeData(uriMap);
  const tree = generateToC(nodes);
  const nodeData = uriMap[pathname] || uriMap['/'];
  const nodeType = getNodeType(pathname);
  const bundledNodeData = useBundledData(nodeType, nodeData, { baseUrl: apiDescriptionUrl });

  if (error) {
    return (
      <div className="flex min-h-screen justify-center items-center w-full">
        <NonIdealState
          title="Something went wrong"
          description={error.message}
          icon={<FAIcon icon={['fad', 'exclamation-triangle']} />}
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
          <StackedLayout uriMap={uriMap} tree={tree} bundledNodeData={bundledNodeData} />
        ) : (
          <SidebarLayout
            pathname={pathname}
            tree={tree}
            bundledNodeData={bundledNodeData}
            linkComponent={linkComponent}
          />
        )}
      </div>
    </InlineRefResolverProvider>
  );
});

export const API = withStyles(APIImpl);

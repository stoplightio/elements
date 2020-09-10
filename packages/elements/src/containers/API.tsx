import { FAIcon, NonIdealState, TableOfContents } from '@stoplight/ui-kit';
import axios from 'axios';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import useSwr from 'swr';

import { Docs } from '../components/Docs';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { StackLayout } from '../components/Stack';
import { Row } from '../components/TableOfContents/Row';
import { TryIt } from '../components/TryIt';
import { TryItHeader } from '../components/TryIt/header';
import { withRouter } from '../hoc/withRouter';
import { useParsedValue } from '../hooks/useParsedValue';
import { useTocContents } from '../hooks/useTocContents';
import { IAPI } from '../types';
import { computeTocTree, getNodeType, isOas2, isOas3, isOperation, IUriMap } from '../utils/oas';
import { computeOas2UriMap } from '../utils/oas/oas2';
import { computeOas3UriMap } from '../utils/oas/oas3';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const API = withRouter<IAPI>(({ apiDescriptionUrl, linkComponent: LinkComponent, layout }) => {
  const { pathname } = useLocation();

  const { data, error } = useSwr(apiDescriptionUrl, fetcher);

  React.useEffect(() => {
    if (error) {
      console.error('Could not fetch spec', error);
    }
  }, [error]);

  const document = useParsedValue(data);
  const showTryIt = isOperation(pathname);

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

  const tree = computeTocTree(uriMap);
  const contents = useTocContents(tree).map(item => ({
    ...item,
    isActive: item.to === pathname,
    isSelected: item.to === pathname,
  }));

  const nodeType = getNodeType(pathname);
  const nodeData = uriMap[pathname] || uriMap['/'];

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
    <div className="APIComponent flex flex-row">
      {layout === 'stacked' ? (
        <StackLayout uriMap={uriMap} tree={tree} />
      ) : (
        <>
          <TableOfContents
            contents={contents}
            rowComponent={Row}
            rowComponentExtraProps={{ pathname, linkComponent: LinkComponent }}
          />
          <div className="flex-grow p-5">
            <div className="flex">
              <Docs className="px-10" nodeData={nodeData} nodeType={nodeType} />
              {showTryIt && (
                <div className="w-2/5 border-l relative">
                  <div className="absolute inset-0 overflow-auto px-10">
                    <TryItHeader />
                    <TryIt nodeType={nodeType} nodeData={nodeData} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
});

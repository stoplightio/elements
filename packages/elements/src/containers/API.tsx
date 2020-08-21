import { NodeType } from '@stoplight/types';
import { TableOfContents } from '@stoplight/ui-kit';
import axios from 'axios';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import useSwr from 'swr';

import { Docs } from '../components/Docs';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { Row } from '../components/TableOfContents/Row';
import { TryIt } from '../components/TryIt';
import { TryItHeader } from '../components/TryIt/header';
import { withRouter } from '../hoc/withRouter';
import { useParsedValue } from '../hooks/useParsedValue';
import { useTocContents } from '../hooks/useTocContents';
import { IAPI } from '../types';
import { computeTocTree, isOas2, isOas3, isOperation, IUriMap, MODEL_REGEXP, OPERATION_REGEXP } from '../utils/oas';
import { computeOas2UriMap } from '../utils/oas/oas2';
import { computeOas3UriMap } from '../utils/oas/oas3';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const API = withRouter<IAPI>(({ apiDescriptionUrl, linkComponent: LinkComponent }) => {
  const [uriMap, setUriMap] = React.useState<IUriMap>({});
  const { pathname } = useLocation();

  const { data, error } = useSwr(apiDescriptionUrl, fetcher);
  if (error) {
    console.error('Could not fetch spec', error);
  }

  const document = useParsedValue(data);
  const showTryIt = isOperation(pathname);

  React.useEffect(() => {
    if (document) {
      let uriMap: IUriMap = {};
      if (isOas3(document)) {
        uriMap = computeOas3UriMap(document);
      } else if (isOas2(document)) {
        uriMap = computeOas2UriMap(document);
      } else {
        console.warn('Document type is unknown');
      }
      setUriMap(uriMap);
    }
  }, [document]);

  const tree = computeTocTree(uriMap);
  const contents = useTocContents(tree).map(item => ({
    ...item,
    isActive: item.to === pathname,
    isSelected: item.to === pathname,
  }));

  const nodeType = MODEL_REGEXP.test(pathname)
    ? NodeType.Model
    : OPERATION_REGEXP.test(pathname)
    ? NodeType.HttpOperation
    : NodeType.HttpService;
  const nodeData = uriMap[pathname] || uriMap['/'];

  return (
    <div className="APIComponent flex flex-row">
      <TableOfContents
        contents={contents}
        rowComponent={Row}
        rowComponentExtraProps={{ pathname, linkComponent: LinkComponent }}
      />
      <div className="flex-grow p-5">
        <div className="flex">
          {data ? <Docs className="px-10" nodeData={nodeData} nodeType={nodeType} /> : <DocsSkeleton />}
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
    </div>
  );
});

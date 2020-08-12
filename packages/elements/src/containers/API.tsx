import { NodeType } from '@stoplight/types';
import { DefaultRow, RowComponentType, TableOfContents } from '@stoplight/ui-kit';
import axios from 'axios';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Docs } from '../components/Docs';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { withRouter } from '../hoc/withRouter';
import { useParsedValue } from '../hooks/useParsedValue';
import { useTocContents } from '../hooks/useTocContents';
import { IAPI, TableOfContentsLinkWithId } from '../types';
import { computeTocTree, isOas2, isOas3, IUriMap, MODEL_REGEXP, OPERATION_REGEXP } from '../utils/oas';
import { computeOas2UriMap } from '../utils/oas/oas2';
import { computeOas3UriMap } from '../utils/oas/oas3';

export const API = withRouter<IAPI>(({ specUrl, renderLink: RenderLink }) => {
  const [data, setData] = React.useState();
  const [uriMap, setUriMap] = React.useState<IUriMap>({});
  const document = useParsedValue(data);
  const { pathname } = useLocation();

  React.useEffect(() => {
    axios
      .get(specUrl)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Could not fetch spec', error);
      });
  }, [specUrl]);

  React.useEffect(() => {
    if (document) {
      setUriMap(isOas3(document) ? computeOas3UriMap(document) : isOas2(document) ? computeOas2UriMap(document) : {});
    }
  }, [document]);

  const rowComponent: RowComponentType<TableOfContentsLinkWithId> = props => {
    if (!props.item.to) {
      return <DefaultRow {...props} />;
    }

    const item = {
      ...props.item,
      isSelected: props.item.to === pathname,
      to: props.item.to ?? '',
    };

    if (RenderLink) {
      return (
        <RenderLink url={item.to} data={{ item }}>
          <DefaultRow {...props} item={item} />
        </RenderLink>
      );
    }

    return (
      <Link to={item.to} className="no-underline block">
        <DefaultRow {...props} item={item} />
      </Link>
    );
  };

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
      <TableOfContents contents={contents} rowComponent={rowComponent} />
      <div className="flex-grow p-5">{data ? <Docs nodeData={nodeData} nodeType={nodeType} /> : <DocsSkeleton />}</div>
    </div>
  );
});

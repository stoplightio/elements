import {
  DefaultRow,
  RowComponentType,
  TableOfContents as UIKitTableOfContents,
} from '@stoplight/ui-kit/TableOfContents';
import * as React from 'react';

import { ActiveInfoContext } from '../../containers/Provider';
import { useComponents } from '../../hooks/useComponents';
import { useComputeToc } from '../../hooks/useComputeToc';
import { IBranchNode, TableOfContentsLinkWithId } from '../../types';

export interface ITableOfContents {
  nodes: IBranchNode[];
  className?: string;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({ nodes, className }) => {
  const contents = useComputeToc(nodes);

  return <UIKitTableOfContents className={className} contents={contents} rowComponent={ElementsTocRow} />;
};

const ElementsTocRow: RowComponentType<TableOfContentsLinkWithId> = props => {
  const { link: Link } = useComponents();
  const info = React.useContext(ActiveInfoContext);

  if (!Link || !props.item.to) {
    return <DefaultRow {...props} />;
  }

  const item = {
    ...props.item,
    isActive: props.item.to ? props.item.to === info.node : false,
    to: props.item.to ?? '',
  };

  return (
    <Link
      parent={null}
      index={0}
      path={[item.to]}
      node={{ ...info, node: item.to, type: 'link', children: [], url: item.to }}
    >
      <DefaultRow {...props} item={item} />
    </Link>
  );
};

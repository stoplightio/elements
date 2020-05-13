import { TableOfContents as UIKitTableOfContents } from '@stoplight/ui-kit/TableOfContents';
import * as React from 'react';

import { ActiveInfoContext } from '../../containers/Provider';
import { useComponents } from '../../hooks/useComponents';
import { useComputeToc } from '../../hooks/useComputeToc';
import { IBranchNode } from '../../types';

export interface ITableOfContents {
  nodes: IBranchNode[];
  className?: string;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({ nodes, className }) => {
  const contents = useComputeToc(nodes);
  const { link: Link } = useComponents();
  const info = React.useContext(ActiveInfoContext);

  const rowRenderer = React.useCallback(
    ({ item: _item, DefaultRow }) => {
      const item = {
        ..._item,
        isActive: _item.to ? _item.to === info.node : false,
      };

      return (
        <Link key={item.href || item.id} parent={null} index={0} path={item.href} node={{ ...info, node: item.href }}>
          <DefaultRow item={item} />
        </Link>
      );
    },
    [info],
  );

  return <UIKitTableOfContents className={className} contents={contents} rowRenderer={rowRenderer} />;
};

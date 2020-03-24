import {
  isParentNode,
  RowRenderer,
  Tree,
  TreeList,
  TreeListEvents,
  TreeListParentNode,
  TreeState,
  TreeStore,
} from '@stoplight/tree-list';
import * as React from 'react';

import { renderTree } from '../../../utils/renderNode';
import { JsonRow } from './JsonRow';

export type JsonViewerProps = {
  node: unknown;
  expanded?: boolean;
  expandedDepth?: number;
  maxRows?: number;
};

export const JsonViewer: React.FunctionComponent<JsonViewerProps> = ({
  node,
  expanded,
  expandedDepth = 2,
  maxRows = 10,
}) => {
  const tree = React.useRef(new Tree());
  const treeStore = React.useRef(
    new TreeStore(tree.current, new TreeState(), {
      defaultExpandedDepth: expanded ? Infinity : expandedDepth,
    }),
  );

  React.useEffect(() => {
    // todo(jr): use tree structure
    tree.current.setRoot(Tree.toTree(renderTree(node)));
  }, [node]);

  treeStore.current.events.on(TreeListEvents.NodeClick, (e, n) => {
    if (isParentNode(n)) {
      treeStore.current.toggleExpand(n as TreeListParentNode);
    }
  });

  const rowRenderer = React.useCallback<RowRenderer>(
    (n, rowOptions) => <JsonRow node={n} isExpanded={!!rowOptions.isExpanded} />,
    [],
  );

  const content =
    typeof node === 'object' ? (
      <TreeList striped maxRows={maxRows} rowRenderer={rowRenderer} store={treeStore.current} />
    ) : (
      String(node)
    );

  return <div className="w-full h-full RequestMaker__JsonViewer">{content}</div>;
};

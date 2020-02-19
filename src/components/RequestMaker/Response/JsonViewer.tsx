import { RowRenderer, Tree, TreeList, TreeListEvents, TreeState, TreeStore } from '@stoplight/tree-list';
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
  }, [tree.current]);

  treeStore.current.events.on(TreeListEvents.NodeClick, (e, n) => treeStore.current.toggleExpand(n));

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

  return <div className="RequestMaker__JsonViewer h-full w-full">{content}</div>;
};

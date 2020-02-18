import { RowRenderer, TreeList, TreeListEvents, TreeStore } from '@stoplight/tree-list';
import { runInAction } from 'mobx';
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
  const treeStore = React.useRef(
    new TreeStore({
      defaultExpandedDepth: expanded ? 2 ** 31 - 3 : expandedDepth,
      nodes: [],
    }),
  );

  React.useEffect(() => {
    runInAction(() => {
      treeStore.current.nodes = renderTree(node);
    });
  }, [node]);

  treeStore.current.on(TreeListEvents.NodeClick, (e, n) => treeStore.current.toggleExpand(n));

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

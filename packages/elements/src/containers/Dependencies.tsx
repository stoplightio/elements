import * as React from 'react';
import { useQuery } from 'urql';

import { InboundDependencies } from '../components/Dependencies/Inbound';
import { OutboundDependencies } from '../components/Dependencies/Outbound';
import { BundledBranchNode, bundledBranchNode } from '../graphql/BranchNodeBySlug';
import { ActiveInfoContext } from './Provider';

export interface IDependencies {
  direction: 'inbound' | 'outbound';
  className?: string;
}

// TODO (CL): add the sl_node_edges query
const nodeEdgesQuery = ``;

export const Dependencies = ({ className, direction }: IDependencies) => {
  const info = React.useContext(ActiveInfoContext);

  const [branchNodeResult] = useQuery<BundledBranchNode>({
    query: bundledBranchNode,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
      branchSlug: info.branch,
      uri: info.node,
    },
  });

  const [nodeEdgesResult] = useQuery({
    query: nodeEdgesQuery,
    variables: {
      branchNodeId: branchNodeResult.data?.id,
      direction,
    },
    pause: !branchNodeResult.data?.id,
  });

  if (branchNodeResult.fetching || nodeEdgesResult.fetching || !branchNodeResult.data) {
    // TODO (CL): loading spinner
    return null;
  }

  const edges = nodeEdgesResult.data.sl_node_edges;

  if (direction === 'inbound') {
    return <InboundDependencies className={className} edges={edges} nodeType={branchNodeResult.data.type} />;
  }

  return <OutboundDependencies className={className} node={branchNodeResult.data} edges={edges} />;
};
